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

  async getAllFiltered(req: Request, res: Response, next: NextFunction) {
    const { inProgress } = req.query;
    const progress = inProgress === 'true';
    try {
      const matches = await this.matchService.getAllFiltered(progress);
      return res.status(200).json(matches);
    } catch (e) {
      next(e);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newMatch = await this.matchService.create(req.body);
      return res.status(201).json(newMatch);
    } catch (e) {
      next(e);
    }
  }

  async finishMatch(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const message = await this.matchService.finishMatch(id);
      return res.status(200).json({ message });
    } catch (e) {
      next(e);
    }
  }
}
