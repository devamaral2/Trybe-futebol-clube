import Model from '../database/models/team';

export interface ITeam {
  id: number;
  teamName: string;
}

export type goals = {
  homeTeamGoals: number,
  awayTeamGoals: number,
};

export type IBoardType = 'homeMatches' | 'awayMatches' | 'all';

export interface ITeamWithMatches extends ITeam {
  homeMatches: goals[];
  awayMatches: goals[];
}

export interface ITeamService {
  getAll(): Promise<Model[]>;
  findByPk(id: number): Promise<Model | null>;
}

export interface ITeamRepository {
  getAll(): Promise<Model[]>;
  findByPk(id: number): Promise<Model | null>;
  getAllWithMatches(where: string): Promise<ITeamWithMatches[]>;
}
