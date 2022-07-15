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

  async getAllFiltered(inProgress: boolean): Promise<Model[]> {
    const matches = await this.model.findAll(
      {
        where: {
          inProgress,
        },

        include: [
          {
            model: Team, as: 'teamHome', attributes: ['teamName'],
          },
          {
            model: Team, as: 'teamAway', attributes: ['teamName'],
          },
        ],
      },
    );
    return matches;
  }

  async create(payLoad: i.INewMatch): Promise<Model> {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = payLoad;
    const newTeam = await this.model.create({
      homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress: true });
    console.log(newTeam);
    return newTeam;
  }

  async finishMatch(id: string): Promise<number> {
    const [updatedMatch] = await this.model.update({ inProgress: false }, { where: { id } });
    return updatedMatch;
  }
}
