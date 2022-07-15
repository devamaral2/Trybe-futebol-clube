import Model from '../database/models/team';

export interface ITeam {
  id: number;
  teamName: string;
}

export interface ITeamService {
  getAll(): Promise<Model[]>;
  findByPk(id: string): Promise<Model | null>;
}

export interface ITeamRepository {
  getAll(): Promise<Model[]>;
  findByPk(id: string): Promise<Model | null>;
}
