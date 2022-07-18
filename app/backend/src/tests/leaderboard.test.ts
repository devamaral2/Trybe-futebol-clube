import * as chai from 'chai';
import { before } from 'mocha';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/team';
import teams from './mock/models/teams';
import * as m from './mock/models/teamsWithMatches';
import * as r from './mock/leaderboards';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /leaderboard: caso de sucesso', () => {
  
  before(() => {
    sinon.stub(Team, 'findAll')
      .resolves(m.completeMatches as any) 
  });

  after(() => {
    (Team.findAll as sinon.SinonStub)
      .restore();
  })

  it('a rota exibe a leaderboard', async () => {
    const response = await chai.request(app).get('/leaderboard');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.eql(r.completeBoard); 
  });
});

describe('Rota /leaderboard/home: caso de sucesso', () => {
  
  before(() => {
    sinon.stub(Team, 'findAll')
      .resolves(m.homeMatches as any) 
  });

  after(() => {
    (Team.findAll as sinon.SinonStub)
      .restore();
  })

  it('a rota exibe a leaderboard com as partidas em casa', async () => {
    const response = await chai.request(app).get('/leaderboard/home');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.eql(r.leadreboardHome); 
  });
});

describe('Rota /leaderboard/away: caso de sucesso', () => {
  
  before(() => {
    sinon.stub(Team, 'findAll')
      .resolves(m.awayMatches as any) 
  });

  after(() => {
    (Team.findAll as sinon.SinonStub)
      .restore();
  })

  it('a rota exibe a leaderboard com as partidas fora de  casa', async () => {
    const response = await chai.request(app).get('/leaderboard/away');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.eql(r.leadreboardAway); 
  });
});