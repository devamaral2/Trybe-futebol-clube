import * as chai from 'chai';
import { before } from 'mocha';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Match from '../database/models/match';
import matches from './mock/models/matches';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /matches e /matches/search: caso de sucesso', () => {
  
  before(() => {
    sinon.stub(Match, 'findAll')
      .resolves(matches as any) 
  });

  after(() => {
    (Match.findAll as sinon.SinonStub)
      .restore();
  })

  it('a rota /matches exibe uma lista com todos as partidas registradas na db', async () => {
    const response = await chai.request(app).get('/matches');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.eql(matches); 
  });

  it('a rota /matches/search exibe uma lista com todos as partidas registradas na db', async () => {
    const response = await chai.request(app).get('/matches/search?inProgress=false');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.eql(matches); 
  });
});

// describe('Rota /matches create: caso de sucesso', () => {
//   const newMatch = {
//     homeTeam: 10, 
//     awayTeam: 8,
//     homeTeamGoals: 2,
//     awayTeamGoals: 2
//   }
//   const result = {
//     id: 1,
//     homeTeam: 10, 
//     awayTeam: 8,
//     homeTeamGoals: 2,
//     awayTeamGoals: 2,
//     inProgress: true,
//   }
//   before(() => {
//     sinon.stub(Match, 'create')
//       .resolves(result as any) 
//   });

//   after(() => {
//     (Match.create as sinon.SinonStub)
//       .restore();
//   })

//   it('uma nova match é adicionada a db', async () => {
//     const response = await chai.request(app).post('/matches').send(newMatch);
//     expect(response.status).to.be.equal(201);
//     expect(response.body).to.be.eql(result); 
//   });
// });

describe('Rota /:id/finish Match patch: caso de sucesso', () => {

  before(() => {
    sinon.stub(Match, 'update')
      .resolves([1] as any) 
  });

  after(() => {
    (Match.update as sinon.SinonStub)
      .restore();
  })

  it('a match da id de referência é finalizada', async () => {
    const response = await chai.request(app).patch('/matches/45/finish');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.eql({ message: "Finished" }); 
  });

});

describe('Rota /:id/ Match patch: caso de sucesso', () => {

  before(() => {
    sinon.stub(Match, 'update')
      .resolves([1] as any) 
  });

  after(() => {
    (Match.update as sinon.SinonStub)
      .restore();
  })

  it('a match da id de referência é atualizada', async () => {
    const response = await chai.request(app).patch('/matches/45');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.eql({ done: 1 }); 
  });

});
