import { NextFunction, Response, Request } from 'express';
import * as i from '../protocols/teamProtocols';

export default class TeamController {
  constructor(private TeamService: i.ITeamService) {
    this.TeamService = TeamService;
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const teams = await this.TeamService.getAll();
      return res.status(200).json(teams);
    } catch (e) {
      next(e);
    }
  }

  async findByPk(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const team = await this.TeamService.findByPk(id);
      return res.status(200).json(team);
    } catch (e) {
      next(e);
    }
  }
}
