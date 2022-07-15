import * as i from '../protocols/teamProtocols';
import Model from '../database/models/team';

export default class TeamRepository implements i.ITeamRepository {
  constructor(private model = Model) {
    this.model = model;
  }

  async getAll(): Promise<Model[]> {
    const teams = await this.model.findAll();
    return teams;
  }

  async findByPk(id: string) {
    const team = await this.model.findByPk(id);
    return team;
  }
}
