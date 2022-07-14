import TeamController from '../controllers/TeamController';
import TeamService from '../services/TeamService';
import TeamRepository from '../repositories/TeamRepository';

const TeamFactory = () => {
  const repository = new TeamRepository();
  const service = new TeamService(repository);
  const controller = new TeamController(service);

  return controller;
};

export default TeamFactory;
