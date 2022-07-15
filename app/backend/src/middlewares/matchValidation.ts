import { NextFunction, Request, Response } from 'express';
import TeamRepository from '../repositories/TeamRepository';

const errNoId = new Error('There is no team with such id!');
const errSameTeam = new Error('It is not possible to create a match with two equal teams');

const teamsExistCheck = async (homeTeam: number, awayTeam: number) => {
  const repository = new TeamRepository();
  const homeTeamExist = await repository.findByPk(homeTeam);
  const awayTeamExist = await repository.findByPk(awayTeam);
  if (!homeTeamExist || !awayTeamExist) throw errNoId;
};

const teamsAreDifferentcheck = (homeTeam: number, awayTeam: number) => {
  if (homeTeam === awayTeam) throw errSameTeam;
};

const checkeJwtAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const { homeTeam, awayTeam } = req.body;
  try {
    teamsAreDifferentcheck(homeTeam, awayTeam);
    await teamsExistCheck(homeTeam, awayTeam);
    return next();
  } catch (e) {
    next(e);
  }
};

export default checkeJwtAdmin;
