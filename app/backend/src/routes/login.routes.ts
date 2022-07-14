import * as express from 'express';
import loginFactory from '../factory/loginFactory';
import checkLoginFields from '../middlewares/checkLoginFileds';
import checkJwt from '../middlewares/checkJwt';
import adminConfirmation from '../middlewares/adminConfirmation';

const routes = express.Router();

routes.post(
  '/',
  checkLoginFields,
  (req, res, next) => loginFactory().logIn(req, res, next),
);

routes.get(
  '/validate',
  checkJwt,
  adminConfirmation,
);

export default routes;
