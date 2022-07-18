import { ITeamRepository } from '../protocols/teamProtocols';
import * as i from '../protocols/leaderboardProtocols';
import * as it from '../protocols/teamProtocols';
import createDataForBoard from '../utils/createLeaderboardFunc';

export default class LeaderboardService implements i.ILeaderboardService {
  constructor(private TeamRepository: ITeamRepository) {
    this.TeamRepository = TeamRepository;
  }

  async createBoard(boardType: it.IBoardType): Promise<i.ITeamBoard[]> {
    const teams = await this.TeamRepository.getAllWithMatches(boardType);
    return createDataForBoard(teams, boardType);
  }
}
