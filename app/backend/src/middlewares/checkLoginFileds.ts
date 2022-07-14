import { NextFunction, Response, Request } from 'express';

const checkLoginFields = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) throw new Error('All fields must be filled');
  next();
};

export default checkLoginFields;
