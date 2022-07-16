import { NextFunction, Response, Request } from 'express';
import * as i from '../protocols/leaderboardProtocols';

export default class LeaderboardController {
  constructor(private LeaderboardService: i.ILeaderboardService) {
    this.LeaderboardService = LeaderboardService;
  }

  async createBoard(req: Request, res: Response, next: NextFunction) {
    try {
      const board = await this.LeaderboardService.createBoard();
      return res.status(290).json(board);
    } catch (e) {
      next(e);
    }
  }
}
