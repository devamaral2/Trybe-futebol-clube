export interface ILoggedUser {
  email: string;
  password: string;
}

export interface IUser extends ILoggedUser {
  id: number;
  username: string;
  role: string;
}

export interface ILoginService {
  logIn(data: ILoggedUser): Promise<string>;
}

export interface ILoginRepository {
  logIn(email: string): Promise<IUser>;
}

export interface IJwtPayLoad {
  id: number,
  username: string,
  email: string,
  role: string,
}
