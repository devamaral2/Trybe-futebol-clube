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

  async getAllFiltered(): Promise<Model[]> {
    const matches = await this.MatchRepository.getAllFiltered();
    return matches;
  }

  // async findByPk(id: string) {
  //   const team = await this.MatchRepository.findByPk(id);
  //   return team;
  // }
}
