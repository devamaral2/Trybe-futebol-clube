import MatchController from '../controllers/MatchController';
import MatchService from '../services/MatchService';
import MatchRepository from '../repositories/MatchRepository';

const TeamFactory = () => {
  const repository = new MatchRepository();
  const service = new MatchService(repository);
  const controller = new MatchController(service);

  return controller;
};

export default TeamFactory;
