import * as i from '../protocols/matchProtocols';
import Model from '../database/models/match';
import Team from '../database/models/team';

export default class MatchRepository implements i.IMatchRepository {
  constructor(private model = Model) {
    this.model = model;
  }

  async getAll(): Promise<Model[]> {
    const matches = await this.model.findAll({ include: [
      {
        model: Team, as: 'teamHome', attributes: ['teamName'],
      },
      {
        model: Team, as: 'teamAway', attributes: ['teamName'],
      },
    ] });
    return matches;
  }

  async getAllFiltered(): Promise<Model[]> {
    const matches = await this.model.findAll();
    return matches;
  }

  // async findByPk(id: string) {
  //   const team = await this.model.findByPk(id);
  //   return team;
  // }
}
