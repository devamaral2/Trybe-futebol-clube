import Model from '../database/models/team';

export interface ITeam {
  id: number;
  teamName: string;
}

export interface ITeamService {
  getAll(): Promise<Model[]>;
}

export interface ITeamRepository {
  getAll(): Promise<Model[]>;
}
