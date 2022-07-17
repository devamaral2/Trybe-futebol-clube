import * as i from '../protocols/teamProtocols';
import Model from '../database/models/team';
import Match from '../database/models/match';

export default class TeamRepository implements i.ITeamRepository {
  constructor(private model = Model) {
    this.model = model;
  }

  async getAll(): Promise<Model[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  async getAllHomeAndAwayMatches() {
    const teams = await this.model.findAll({ include: [
      {
        model: Match,
        as: 'homeMatches',
        where: { inProgress: false },
        attributes: { exclude: ['id', 'homeTeam', 'awayTeam', 'inProgress'] },
      },
      {
        model: Match,
        as: 'awayMatches',
        where: { inProgress: false },
        attributes: { exclude: ['id', 'homeTeam', 'awayTeam', 'inProgress'] },
      },
    ] });
    return teams;
  }

  async getAllWithMatches(where: string): Promise<any> {
    if (where === 'all') {
      const teams = await this.getAllHomeAndAwayMatches();
      return teams;
    }
    const teams = await this.model.findAll({ include: [
      {
        model: Match,
        as: where,
        where: { inProgress: false },
        attributes: { exclude: ['id', 'homeTeam', 'awayTeam', 'inProgress'] },
      },
    ] });
    return teams;
  }

  async findByPk(id: number) {
    const team = await this.model.findByPk(id);
    return team;
  }
}
