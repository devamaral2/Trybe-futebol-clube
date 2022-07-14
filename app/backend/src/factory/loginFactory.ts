import LoginController from '../controllers/loginController';
import LoginService from '../services/LoginService';
import LoginRepository from '../repositories/LoginRepository';

const loginFactory = () => {
  const repository = new LoginRepository();
  const service = new LoginService(repository);
  const controller = new LoginController(service);

  return controller;
};

export default loginFactory;
