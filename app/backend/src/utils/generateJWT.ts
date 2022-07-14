import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import * as i from '../protocols/loginProtocols';

dotenv.config();

const secret = process.env.JWT_SECRET || 'jwt_secret';

const removePassword = (
  id: number,
  username: string,
  email: string,
  role: string,
): i.IJwtPayLoad => ({ id, username, email, role });

const generateJwt = (payload: i.IUser) => {
  const { id, username, email, role } = payload;
  const data = removePassword(id, username, email, role);
  const token = jwt.sign({ data }, secret, { expiresIn: '1d' });
  return token as string;
};

export default generateJwt;
