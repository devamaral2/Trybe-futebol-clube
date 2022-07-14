import { NextFunction, Request, Response } from 'express';

const error = new Error('unauthorized user');

const checkJwt = async (req: Request, res: Response, next: NextFunction) => {
  const { role } = req.headers;
  if (role === 'admin') return res.status(200).json({ role });
  next(error);
};

export default checkJwt;
