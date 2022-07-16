import Match from '../database/models/match';
import { ITeamWithMatches } from '../protocols/teamProtocols';
import * as i from '../protocols/leaderboardProtocols';

const initialLeaderboardNumbers = {
  totalPoints: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
};

function getPoints(homeTeamGoals: number, awayTeamGoals: number, boardType: string) {
  if (homeTeamGoals === awayTeamGoals) return 1;
  if (homeTeamGoals > awayTeamGoals) {
    if (boardType === 'home') return 3;
    return 0;
  }
  if (boardType === 'away') return 3;
  return 0;
}

function getData(homeMatches: Match[], boardType: string): i.ITeamBoardData {
  const teamData = homeMatches.reduce((acc, match): i.ITeamBoardData => {
    const { homeTeamGoals, awayTeamGoals } = match;
    const points = getPoints(homeTeamGoals, awayTeamGoals, boardType);
    // eslint-disable-next-line no-return-assign
    return ({
      totalPoints: acc.totalPoints += points,
      totalVictories: acc.totalVictories += (points === 3 ? 1 : 0),
      totalDraws: acc.totalDraws += (points === 1 ? 1 : 0),
      totalLosses: acc.totalLosses += (points === 0 ? 1 : 0),
      goalsFavor: acc.goalsFavor += (boardType === 'home' ? homeTeamGoals : awayTeamGoals),
      goalsOwn: acc.goalsOwn += (boardType === 'home' ? awayTeamGoals : homeTeamGoals),
    });
  }, initialLeaderboardNumbers);
  return teamData;
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
    efficiency: (totalPoints / (totalGames * 3)) * 100,
  });
}

function createDataForBoard(teams: any, boardType: string) {
  const result = teams.map((team: ITeamWithMatches) => {
    const teamDataWithoutStatistics = getData(team.homeMatches, boardType);
    return creatingStats(team.teamName, teamDataWithoutStatistics, team.homeMatches.length);
  });
  console.log(result);
  return result;
}

export default createDataForBoard;
