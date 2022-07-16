import Model from '../database/models/match';

export interface ITeam {
  id: number;
  teamName: string;
}

export interface IUpdateMatch{
  homeTeamGoals: number,
  awayTeamGoals: number
}

export interface INewMatch {
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface IMatchService {
  getAll(): Promise<Model[]>;
  getAllFiltered(inProgress: boolean) : Promise<Model[]>;
  create(payLoad: INewMatch): Promise<Model>;
  finishMatch(id: string): Promise<string>;
  updateMatch(id: string, payLoad: IUpdateMatch): Promise<number>;
}

export interface IMatchRepository {
  getAll(): Promise<Model[]>;
  getAllFiltered(inProgress: boolean): Promise<Model[]>;
  create(payLoad: INewMatch): Promise<Model>;
  finishMatch(id: string): Promise<number>
  updateMatch(id: string, payLoad: IUpdateMatch): Promise<number>;
}
