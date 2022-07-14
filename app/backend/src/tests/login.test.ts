import * as chai from 'chai';
import { before } from 'mocha';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/user';
import users from './mock/models/users';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota /login: caso de sucesso', () => {
  const loggedUser = {
    email: 'admin@admin.com',
    password: 'secret_admin'
  }

  before(() => {
    sinon.stub(User, 'findAll')
      .resolves([users[0]] as User[]) 
  });

  after(() => {
    (User.findAll as sinon.SinonStub)
      .restore();
  })

  it('quando o usuário é cadastrado e preenche todos os campos', async () => {
    const response = await chai.request(app).post('/login').send(loggedUser);
    expect(response.status).to.be.equal(200);
    expect(response.body).to.have.property("token"); 
  });
});

describe('Rota /login: casos de erro', () => {
  const userWithoutPassword = {
    email: 'admin@admin.com',
  }

  const userWithoutEmail = {
    password: 'secret_admin'
  }

  const notInDbUser = {
    email: 'admina@admin.com',
    password: 'secret_admin'
  }

  before(() => {
    sinon.stub(User, 'findAll')
      .resolves(undefined) 
  });

  after(() => {
    (User.findAll as sinon.SinonStub)
      .restore();
  })

  it('quando o campo password não é preenxido', async () => {
    const response = await chai.request(app).post('/login').send(userWithoutPassword);
    expect(response.status).to.be.equal(400);
    expect(response.body).to.have.property("message"); 
    expect(response.body).to.be.eql({ message: 'All fields must be filled' }); 
  });
  it('quando o campo email não é preenxido', async () => {
    const response = await chai.request(app).post('/login').send(userWithoutEmail);
    expect(response.status).to.be.equal(400);
    expect(response.body).to.have.property("message"); 
    expect(response.body).to.be.eql({ message: 'All fields must be filled' }); 
  });
  it('quando o usuário não é cadastrado ou o password está incorreto', async () => {
    const response = await chai.request(app).post('/login').send(notInDbUser);
    expect(response.status).to.be.equal(401);
    expect(response.body).to.have.property("message"); 
    expect(response.body).to.be.eql({ message: 'Incorrect email or password' });
  });
});
