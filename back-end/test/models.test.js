const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');

const uriConnection = require('./connection');
const taskModel = require('../models/taskModels');

describe('insere uma nova task no BD', () => {
  let connect;
  const payloadTask = { task: 'fazer caminhada'}
  before(async () => {
    connect = await uriConnection();
    sinon.stub(MongoClient, 'connect').resolves(connect); 
  });
  after(async () => {
    await connect.db('todo_list').collection('tasks').deleteMany({});
    MongoClient.connect.restore();
  })
  describe('quando é inserido com sucesso', () => {
    it('verifica se a task é um objeto', () =>  taskModel.createList(payloadTask)
      .then((res) => expect(res).to.be.an('object')));
  });
    it('verifica se as tasks quando não preencidas retornam um array vazio', () => taskModel.getTask()
      .then((res) => expect(res).to.be.empty));
    it('verifica se as tasks quando preencidas retorna um array', () => taskModel.getTask()
      .then((res) => expect(res).to.be.an('array')));
});


