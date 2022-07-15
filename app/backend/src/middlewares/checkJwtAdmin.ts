import { NextFunction, Request, Response } from 'express';

const error = new Error('Token must be a valid token');

const checkeJwtAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const { role } = req.headers;
  if (role === 'admin') return next();
  return next(error);
};

export default checkeJwtAdmin;
