import Model from '../database/models/match';
import * as i from '../protocols/matchProtocols';

export default class MatchService implements i.IMatchService {
  constructor(private MatchRepository: i.IMatchRepository) {
    this.MatchRepository = MatchRepository;
  }

  async getAll(): Promise<Model[]> {
    const matches = await this.MatchRepository.getAll();
    return matches;
  }

  async getAllFiltered(inProgress: boolean): Promise<Model[]> {
    const matches = await this.MatchRepository.getAllFiltered(inProgress);
    return matches;
  }

  async create(payLoad: i.INewMatch): Promise<Model> {
    const newMatch = await this.MatchRepository.create(payLoad);
    return newMatch;
  }

  async finishMatch(id: string): Promise<string> {
    const updatedMatch = await this.MatchRepository.finishMatch(id);
    if (updatedMatch === 1) return 'Finished';
    return 'Not updated';
  }
}
