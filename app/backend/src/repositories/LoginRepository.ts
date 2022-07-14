import * as i from '../protocols/loginProtocols';
import Model from '../database/models/user';

export default class LoginRepository implements i.ILoginRepository {
  constructor(private model = Model) {
    this.model = model;
  }

  async logIn(email: string): Promise<i.IUser> {
    const [res] = await this.model.findAll({ where: { email } });
    // console.log('---------rep----------', res);
    return res;
  }
}
