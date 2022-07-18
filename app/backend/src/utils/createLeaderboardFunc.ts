import * as i from '../protocols/leaderboardProtocols';
import * as it from '../protocols/teamProtocols';

function getPoints(homeTeamGoals: number, awayTeamGoals: number, boardType: string) {
  if (homeTeamGoals === awayTeamGoals) return 1;
  if (homeTeamGoals > awayTeamGoals) {
    if (boardType === 'homeMatches') return 3;
    return 0;
  }
  if (boardType === 'awayMatches') return 3;
  return 0;
}

function getData(homeMatches: it.goals[], boardType: string): i.ITeamBoardData {
  let totalPoints = 0;
  let totalVictories = 0;
  let totalDraws = 0;
  let totalLosses = 0;
  let goalsFavor = 0;
  let goalsOwn = 0;
  homeMatches.forEach((match: it.goals):void => {
    const { homeTeamGoals, awayTeamGoals } = match;
    const points = getPoints(homeTeamGoals, awayTeamGoals, boardType);
    totalPoints += points;
    totalVictories += (points === 3 ? 1 : 0);
    totalDraws += (points === 1 ? 1 : 0);
    totalLosses += (points === 0 ? 1 : 0);
    goalsFavor += (boardType === 'homeMatches' ? homeTeamGoals : awayTeamGoals);
    goalsOwn += (boardType === 'homeMatches' ? awayTeamGoals : homeTeamGoals);
  });
  return ({ totalPoints, totalVictories, totalDraws, totalLosses, goalsFavor, goalsOwn });
}

function settingEfficiency(totalPoints: number, totalGames: number) {
  const efficiency = (totalPoints / (totalGames * 3)) * 100;
  if (Number.isInteger(efficiency)) return efficiency;
  return efficiency.toFixed(2);
}

function creatingStats(name: string, data: i.ITeamBoardData, totalGames: number) {
  const {
    totalPoints, totalLosses, totalVictories, totalDraws, goalsFavor, goalsOwn,
  } = data;
  return ({
    name,
    totalPoints,
    totalGames,
    totalVictories,
    totalDraws,
    totalLosses,
    goalsFavor,
    goalsOwn,
    goalsBalance: goalsFavor - goalsOwn,
    efficiency: settingEfficiency(totalPoints, totalGames),
  });
}

function sortingBoard(unSortedBoard: i.ITeamBoard[]) {
  return unSortedBoard
    .sort((teamA: i.ITeamBoard, teamB: i.ITeamBoard) => teamA.goalsOwn - teamB.goalsOwn)
    .sort((teamA: i.ITeamBoard, teamB: i.ITeamBoard) => teamB.goalsFavor - teamA.goalsFavor)
    .sort((teamA: i.ITeamBoard, teamB: i.ITeamBoard) => teamB.goalsBalance - teamA.goalsBalance)
    .sort((teamA: i.ITeamBoard, teamB: i.ITeamBoard) => teamB.totalPoints - teamA.totalPoints);
}

function sumBoards(homeBoard: i.ITeamBoardData, awayBoard: i.ITeamBoardData) {
  return ({
    totalPoints: homeBoard.totalPoints + awayBoard.totalPoints,
    totalVictories: homeBoard.totalVictories + awayBoard.totalVictories,
    totalDraws: homeBoard.totalDraws + awayBoard.totalDraws,
    totalLosses: homeBoard.totalLosses + awayBoard.totalLosses,
    goalsFavor: homeBoard.goalsFavor + awayBoard.goalsFavor,
    goalsOwn: homeBoard.goalsOwn + awayBoard.goalsOwn,
  });
}

function createCompleteBoard(teams: it.ITeamWithMatches[]): i.ITeamBoard[] {
  const result = teams.map((team: it.ITeamWithMatches) => {
    const matchesLength = team.homeMatches.length + team.awayMatches.length;
    const homeBoard = getData(team.homeMatches, 'homeMatches');
    const awayBoard = getData(team.awayMatches, 'awayMatches');
    const boardData = sumBoards(homeBoard, awayBoard);
    return creatingStats(team.teamName, boardData, matchesLength);
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
  // const boardTypeExist = boardType === 'homeMatches' ? 'homeMatches' : 'awayMatches';
  const result: i.ITeamBoard[] = teams.map((team: it.ITeamWithMatches) => {
    const boardData = getData(team[boardType], boardType);
    return creatingStats(team.teamName, boardData, team[boardType].length);
  });
  return sortingBoard(result);
}

export default createDataForBoard;
