import * as express from 'express';
import leaderboardFactory from '../factory/leaderboardFactory';

const routes = express.Router();

routes.get('/', (req, res, next) => leaderboardFactory().createBoard(req, res, next));
routes.get('/home', (req, res, next) => leaderboardFactory().createBoard(req, res, next));
routes.get('/away', (req, res, next) => leaderboardFactory().createBoard(req, res, next));

export default routes;
