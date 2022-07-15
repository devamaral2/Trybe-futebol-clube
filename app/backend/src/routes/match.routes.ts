import * as express from 'express';
import matchFactory from '../factory/matchFactory';
import checkeJwtAdmin from '../middlewares/checkJwtAdmin';
import checkJwt from '../middlewares/checkJwt';
import matchValidation from '../middlewares/matchValidation';

const routes = express.Router();

routes.get('/search', (req, res, next) => matchFactory().getAllFiltered(req, res, next));
routes.get('/', (req, res, next) => matchFactory().getAll(req, res, next));
routes.post(
  '/',
  checkJwt,
  checkeJwtAdmin,
  matchValidation,
  (req, res, next) => matchFactory().create(req, res, next),
);
routes.patch('/:id/finish', (req, res, next) => matchFactory().finishMatch(req, res, next));

export default routes;
