import * as express from 'express';
import matchFactory from '../factory/matchFactory';
// import checkJwt from '../middlewares/checkJwt';
// import adminConfirmation from '../middlewares/adminConfirmation';

const routes = express.Router();

routes.get('/', (req, res, next) => matchFactory().getAll(req, res, next));
// routes.get('/:id', (req, res, next) => teamFactory().findByPk(req, res, next));

export default routes;
