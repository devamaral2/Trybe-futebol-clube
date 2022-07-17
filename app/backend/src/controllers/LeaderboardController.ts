import { NextFunction, Response, Request } from 'express';
import * as i from '../protocols/leaderboardProtocols';

export default class LeaderboardController {
  constructor(private LeaderboardService: i.ILeaderboardService) {
    this.LeaderboardService = LeaderboardService;
  }

  async createBoard(req: Request, res: Response, next: NextFunction) {
    const { originalUrl } = req;
    let boardType = 'all';
    if (originalUrl.includes('home')) boardType = 'homeMatches';
    if (originalUrl.includes('away')) boardType = 'awayMatches';
    try {
      const board = await this.LeaderboardService.createBoard(boardType);
      return res.status(200).json(board);
    } catch (e) {
      next(e);
    }
  }
}
