import Match from '../database/models/match';
// import { ITeamWithMatches } from '../protocols/teamProtocols';
import * as i from '../protocols/leaderboardProtocols';

function getPoints(homeTeamGoals: number, awayTeamGoals: number, boardType: string) {
  if (homeTeamGoals === awayTeamGoals) return 1;
  if (homeTeamGoals > awayTeamGoals) {
    if (boardType === 'homeMatches') return 3;
    return 0;
  }
  if (boardType === 'awayMatches') return 3;
  return 0;
}

function getData(homeMatches: Match[], boardType: string): i.ITeamBoardData {
  let totalPoints = 0;
  let totalVictories = 0;
  let totalDraws = 0;
  let totalLosses = 0;
  let goalsFavor = 0;
  let goalsOwn = 0;
  homeMatches.forEach((match):void => {
    const { homeTeamGoals, awayTeamGoals } = match;
    const points = getPoints(homeTeamGoals, awayTeamGoals, boardType);
    totalPoints += points;
    totalVictories += (points === 3 ? 1 : 0);
    totalDraws += (points === 1 ? 1 : 0);
    totalLosses += (points === 0 ? 1 : 0);
    goalsFavor += (boardType === 'homeMatches' ? homeTeamGoals : awayTeamGoals);
    goalsOwn += (boardType === 'homeMatches' ? awayTeamGoals : homeTeamGoals);
    // totalPoints: acc.totalPoints += points,
    // totalVictories: acc.totalVictories += (points === 3 ? 1 : 0),
    // totalDraws: acc.totalDraws += (points === 1 ? 1 : 0),
    // totalLosses: acc.totalLosses += (points === 0 ? 1 : 0),
    // goalsFavor: acc.goalsFavor += (boardType === 'home' ? homeTeamGoals : awayTeamGoals),
    // goalsOwn: acc.goalsOwn += (boardType === 'home' ? awayTeamGoals : homeTeamGoals),
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

function createDataForBoard(teams: any, boardType: string) {
  const result = teams.map((team: any) => {
    const boardData = getData(team[boardType], boardType);
    return creatingStats(team.teamName, boardData, team[boardType].length);
  });
  return sortingBoard(result);
}

export default createDataForBoard;
