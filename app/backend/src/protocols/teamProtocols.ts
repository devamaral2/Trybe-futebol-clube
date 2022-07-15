import Model from '../database/models/team';

export interface ITeam {
  id: number;
  teamName: string;
}

export interface ITeamService {
  getAll(): Promise<Model[]>;
  findByPk(id: number): Promise<Model | null>;
}

export interface ITeamRepository {
  getAll(): Promise<Model[]>;
  findByPk(id: number): Promise<Model | null>;
}
