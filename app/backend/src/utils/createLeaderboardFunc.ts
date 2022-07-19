/* eslint-disable function-paren-newline */
import * as it from '../protocols/teamProtocols';
import * as i from '../protocols/leaderboardProtocols';

function settingEfficiency(totalPoints: number, totalGames: number) {
  const efficiency = (totalPoints / (totalGames * 3)) * 100;
  if (Number.isInteger(efficiency)) return efficiency;
  return Number(efficiency.toFixed(2));
}

function getPoints(homeTeamGoals: number, awayTeamGoals: number, boardType: string) {
  if (homeTeamGoals === awayTeamGoals) return 1;
  if (homeTeamGoals > awayTeamGoals) {
    if (boardType === 'homeMatches') return 3;
    return 0;
  }
  if (boardType === 'awayMatches') return 3;
  return 0;
}

// eslint-disable-next-line max-lines-per-function
function getData(name: string, matches: it.goals[], boardType: string): i.ITeamBoard {
  return matches.reduce((acc: i.ITeamBoard, match: it.goals) => {
    const { homeTeamGoals, awayTeamGoals } = match;
    const points = getPoints(homeTeamGoals, awayTeamGoals, boardType);
    // eslint-disable-next-line no-return-assign
    return ({
      name,
      totalPoints: acc.totalPoints += points,
      totalGames: acc.totalGames += 1,
      totalVictories: acc.totalVictories += (points === 3 ? 1 : 0),
      totalDraws: acc.totalDraws += (points === 1 ? 1 : 0),
      totalLosses: acc.totalLosses += (points === 0 ? 1 : 0),
      goalsFavor: acc.goalsFavor += (boardType === 'homeMatches' ? homeTeamGoals : awayTeamGoals),
      goalsOwn: acc.goalsOwn += (boardType === 'homeMatches' ? awayTeamGoals : homeTeamGoals),
      goalsBalance: acc.goalsFavor - acc.goalsOwn,
      efficiency: settingEfficiency(acc.totalPoints, acc.totalGames) });
  }, {
    name: '',
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: 0,
  });
}

function sortingBoard(unSortedBoard: i.ITeamBoard[]) {
  return unSortedBoard
    .sort((teamA: i.ITeamBoard, teamB: i.ITeamBoard) => teamA.goalsOwn - teamB.goalsOwn)
    .sort((teamA: i.ITeamBoard, teamB: i.ITeamBoard) => teamB.goalsFavor - teamA.goalsFavor)
    .sort((teamA: i.ITeamBoard, teamB: i.ITeamBoard) => teamB.goalsBalance - teamA.goalsBalance)
    .sort((teamA: i.ITeamBoard, teamB: i.ITeamBoard) => teamB.totalPoints - teamA.totalPoints);
}

function sumBoards(homeBoard: i.ITeamBoard, awayBoard: i.ITeamBoard) {
  const { name } = homeBoard;
  const goalsFavor = homeBoard.goalsFavor + awayBoard.goalsFavor;
  const goalsOwn = homeBoard.goalsOwn + awayBoard.goalsOwn;
  const totalPoints = homeBoard.totalPoints + awayBoard.totalPoints;
  const totalGames = homeBoard.totalGames + awayBoard.totalGames;
  return ({
    name,
    totalPoints,
    totalGames,
    goalsFavor,
    goalsOwn,
    totalVictories: homeBoard.totalVictories + awayBoard.totalVictories,
    totalDraws: homeBoard.totalDraws + awayBoard.totalDraws,
    totalLosses: homeBoard.totalLosses + awayBoard.totalLosses,
    goalsBalance: goalsFavor - goalsOwn,
    efficiency: settingEfficiency(totalPoints, totalGames),
  });
}

function createCompleteBoard(teams: it.ITeamWithMatches[]): i.ITeamBoard[] {
  const result = teams.map((team: it.ITeamWithMatches) => {
    const homeBoard = getData(team.teamName, team.homeMatches, 'homeMatches');
    const awayBoard = getData(team.teamName, team.awayMatches, 'awayMatches');
    return sumBoards(homeBoard, awayBoard);
  });
  return result;
}

function createDataForBoard(
  teams: it.ITeamWithMatches[],
  boardType: it.IBoardType,
): i.ITeamBoard[] {
  if (boardType === 'all') {
    const result = createCompleteBoard(teams);
    return sortingBoard(result);
  }
  const result: i.ITeamBoard[] = teams.map((team: it.ITeamWithMatches) =>
    getData(team.teamName, team[boardType], boardType));
  return sortingBoard(result);
}

export default createDataForBoard;
