import LeaderboardController from '../controllers/LeaderboardController';
import LeaderboardService from '../services/LeaderboardService';
import TeamRepository from '../repositories/TeamRepository';

const leaderboardFactory = () => {
  const repository = new TeamRepository();
  const service = new LeaderboardService(repository);
  const controller = new LeaderboardController(service);

  return controller;
};

export default leaderboardFactory;
