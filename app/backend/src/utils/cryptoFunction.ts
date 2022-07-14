import * as bcrypt from 'bcryptjs';

export default function crypto(password: string, encrypted: string) {
  const hash = bcrypt.compareSync(password, encrypted);
  return hash;
}
