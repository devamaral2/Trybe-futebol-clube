import Model from '../database/models/match';

export interface ITeam {
  id: number;
  teamName: string;
}

export interface IMatchService {
  getAll(): Promise<Model[]>;
  getAllFiltered(): Promise<Model[]>;
  // findByPk(id: string): Promise<Model | null>;
}

export interface IMatchRepository {
  getAll(): Promise<Model[]>;
  getAllFiltered(): Promise<Model[]>;
  // findByPk(id: string): Promise<Model | null>;
}
