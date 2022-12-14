export interface ITeamBoardData {
  totalPoints: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
}

export interface ITeamBoard extends ITeamBoardData {
  name: string,
  goalsBalance: number,
  efficiency: number | string,
  totalGames: number,
}

export interface ILeaderboardService {
  createBoard(boardType: string): Promise<ITeamBoard[]>;
}
