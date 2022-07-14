import * as express from 'express';
import teamFactory from '../factory/teamFactory';
// import checkJwt from '../middlewares/checkJwt';
// import adminConfirmation from '../middlewares/adminConfirmation';

const routes = express.Router();

routes.get('/', (req, res, next) => teamFactory().getAll(req, res, next));

export default routes;
