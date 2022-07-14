import { NextFunction, Response, Request } from 'express';
import { ILoginService } from '../protocols/loginProtocols';

export default class LoginController {
  constructor(private LoginService: ILoginService) {
    this.LoginService = LoginService;
  }

  async logIn(req: Request, res: Response, next: NextFunction) {
    try {
      const token = await this.LoginService.logIn(req.body);
      return res.status(200).json({ token });
    } catch (e) {
      next(e);
    }
  }
}
