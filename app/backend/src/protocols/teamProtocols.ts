import Model from '../database/models/team';
import Match from '../database/models/match';

export interface ITeam {
  id: number;
  teamName: string;
}

export interface ITeamWithMatches extends ITeam {
  homeMatches: Match[];
  awayMatches: Match[];
}

export interface ITeamService {
  getAll(): Promise<Model[]>;
  findByPk(id: number): Promise<Model | null>;
}

export interface ITeamRepository {
  getAll(): Promise<Model[]>;
  findByPk(id: number): Promise<Model | null>;
  getAllWithMatches(where: string): Promise<any>;
}
