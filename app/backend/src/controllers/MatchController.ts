import { NextFunction, Response, Request } from 'express';
import * as i from '../protocols/matchProtocols';

export default class MatchController {
  constructor(private matchService: i.IMatchService) {
    this.matchService = matchService;
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const matches = await this.matchService.getAll();
      return res.status(200).json(matches);
    } catch (e) {
      next(e);
    }
  }

  // async findByPk(req: Request, res: Response, next: NextFunction) {
  //   const { id } = req.params;
  //   try {
  //     const team = await this.matchService.findByPk(id);
  //     return res.status(200).json(team);
  //   } catch (e) {
  //     next(e);
  //   }
  // }
}
