import * as chai from 'chai';
import { before } from 'mocha';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/team';
import teams from './mock/models/teams';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /leaderboard: caso de sucesso', () => {
  
  before(() => {
    sinon.stub(Team, 'findAll')
      .resolves(teams as Team[]) 
  });

  after(() => {
    (Team.findAll as sinon.SinonStub)
      .restore();
  })

  it('a rota exibe uma lista com todos os times na db', async () => {
    const response = await chai.request(app).get('/teams');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.eql(teams); 
  });
});