import { NextFunction, Request, Response } from 'express';

interface IError {
  status: number;
  message: string;
}
const getStatus = (message: string): IError => {
  if (message === 'Incorrect email or password') return { status: 401, message };
  if (message === 'All fields must be filled') return { status: 400, message };
  return { status: 500, message: 'Internal server error' };
};

const errorMiddleware = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  const error = getStatus(err.message);
  return res.status(error.status).json({ message: error.message });
};

export default errorMiddleware;
