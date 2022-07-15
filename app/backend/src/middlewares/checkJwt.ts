import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';

dotenv.config();

const secret = process.env.JWT_SECRET || 'jwt_secret';
const error = new Error('Token must be a valid token');

const checkJwt = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  try {
    if (!token) throw error;
    const decoded = jwt.verify(token, secret);
    const { data } = decoded as jwt.JwtPayload;
    req.headers.role = data.role;
    return next();
  } catch (e) {
    next(error);
  }
};

export default checkJwt;
