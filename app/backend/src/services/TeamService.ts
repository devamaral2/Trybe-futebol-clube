import Team from '../database/models/team';
import * as i from '../protocols/teamProtocols';

export default class TeamService implements i.ITeamService {
  constructor(private TeamRepository: i.ITeamRepository) {
    this.TeamRepository = TeamRepository;
  }

  async getAll(): Promise<Team[]> {
    const teams = await this.TeamRepository.getAll();
    return teams;
  }

  async findByPk(id: number) {
    const team = await this.TeamRepository.findByPk(id);
    return team;
  }
}
