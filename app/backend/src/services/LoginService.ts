import * as i from '../protocols/loginProtocols';
import crypto from '../utils/cryptoFunction';
import generateJwt from '../utils/generateJWT';

// const error = (status: number, message: string): Error => ({ status, message });

export default class LoginService implements i.ILoginService {
  constructor(private LoginRepository: i.ILoginRepository) {
    this.LoginRepository = LoginRepository;
  }

  async logIn(data: i.ILoggedUser): Promise<string> {
    const { email, password } = data;
    try {
      const user = await this.LoginRepository.logIn(email);
      const validPassword = crypto(password, user.password);
      if (!validPassword) throw new Error('Incorrect email or password');
      const token = generateJwt(user);
      return token;
    } catch (e: unknown) {
      throw new Error('Incorrect email or password');
    }
  }
}
