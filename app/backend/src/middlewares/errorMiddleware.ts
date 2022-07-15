import { NextFunction, Request, Response } from 'express';

interface IError {
  status: number;
  message: string;
}

const getStatus = (message: string): IError => {
  switch (message) {
    case 'Incorrect email or password':
      return { status: 401, message };
    case 'Token must be a valid token':
      return { status: 401, message };
    case 'unauthorized user':
      return { status: 401, message };
    case 'All fields must be filled':
      return { status: 400, message };
    default:
      return { status: 500, message: 'Internal server error' };
  }
};

const errorMiddleware = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  const error = getStatus(err.message);
  return res.status(error.status).json({ message: error.message });
};

export default errorMiddleware;
