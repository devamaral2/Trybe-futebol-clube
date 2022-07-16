import { ITeamRepository } from '../protocols/teamProtocols';
import * as i from '../protocols/leaderboardProtocols';
import createDataForBoard from '../utils/createLeaderboardFunc';

export default class LeaderboardService implements i.ILeaderboardService {
  constructor(private TeamRepository: ITeamRepository) {
    this.TeamRepository = TeamRepository;
  }

  async createBoard(): Promise<string> {
    const boardType = 'home';
    const teams = await this.TeamRepository.getAllWithMatches('homeMatches');
    createDataForBoard(teams, boardType);
    return teams;
  }
}
