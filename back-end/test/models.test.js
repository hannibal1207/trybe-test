const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient, ObjectID } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

const taskModel = require('../models/taskModels');

describe('insere uma nova task no BD', () => {
  let connectionMock;
  const DBServer = new MongoMemoryServer();
  before(async () => {
    const urlMock = await DBServer.getUri();

    connectionMock = await MongoClient.connect(urlMock, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    MongoClient.connect.restore();
    await DBServer.stop();
  });
  describe('quando é inserido com sucesso', () => {
    before(async () => {
      await connectionMock.db('todo_list').collection('tasks').insertOne({ task: 'nadar' })
    })

    after(async() => {
      await connectionMock.db('todo_list').collection('tasks').deleteMany({});
    })
    it('verifica se a task é um objeto', async () => {
      const payloadTask = { task: 'nadar'}
      const response = await taskModel.createList(payloadTask);
      
      expect(response).to.be.a('object');
    });
    it('tal objeto possui o "id" na nova task inserida', async () => {
      const payloadTask = { task: 'caminhar'}

      const response = await taskModel.createList(payloadTask);

      expect(response.ops[0]).to.include.keys('_id');
    });
    it('tal objeto possui a chave "task" na nova task inserida', async () => {
      const payloadTask = { task: 'musculação'}
      const response = await taskModel.createList(payloadTask);

      expect(response.ops[0]).to.have.a.property('task');
    });
  });
  describe('verifica a listagem das tasks', () => {
    it('verifica se as tasks quando preencidas retornam um array', async () => {
      const response = await taskModel.getTask();
  
      expect(response).to.be.an('array');
    });
  });

  describe('quando busca um produto pelo id', () => {
    before(async () => {
      await connectionMock.db('todo_list').collection('tasks').insertOne({ _id: ObjectID("5bce15b6bc525d895d4afbcc"), task: 'estudar' });    
    });
    after(async () => {
      await connectionMock.db('todo_list').collection('task').deleteMany({});
    });
    it('retorna um objeto', async () => {
      const id = "5bce15b6bc525d895d4afbcc";
      const response = await taskModel.getById(id)

      expect(response).to.be.an('object');
    });
    it('retorna um objeto com as keys: "_id" e "task"', async () => {
      const id = "5bce15b6bc525d895d4afbcc";
      const response = await taskModel.getById(id)

      expect(response).to.include.keys('_id', 'task')
    });
    it('Quando o id não existe retorna nulo', async () => {
      const id = "5bce15b6bc525d895d4afccc";
      const response = await taskModel.getById(id)

      expect(response).to.be.an('null');
    });
  });

  describe('quando edita uma task', () => {
    const FakeId = '618327afa2627e574ec952aa';
    const fakeTask = { task: 'ir a praia' };
    const editFakeTask = { task: 'nadar' };
    before(async () => {
      await connectionMock.db('todo_list').collection('tasks').insertOne({ _id: ObjectID(FakeId), fakeTask });    
    });
    after(async () => {
      await connectionMock.db('todo_list').collection('tasks').deleteMany({});
    });
    it('verifica se retona um objeto', async () => {
      const response = await taskModel.editTask(FakeId, fakeTask);
      expect(response).to.be.an('object');
    });
    it('verifica se a task foi editada', async () => {
      const response = await taskModel.editTask(FakeId, editFakeTask);

      expect(response.modifiedCount).to.be.equal(1);
    });
  });
  describe('testa a exclusão de uma task', () => {
    const FakeId = '618327afa2627e574ec952aa';
    const fakeTask = { task: 'nadar' };
    before(async () => {
      await connectionMock.db('todo_list').collection('tasks').insertOne({ _id: ObjectID(FakeId), fakeTask });    
    });
    after(async () => {
      await connectionMock.db('todo_list').collection('tasks').deleteMany({});
    });
    it('testa se a task foi excluida', async () => {
      const response = await taskModel.deleteTask(FakeId);

      expect(response.deletedCount).to.be.equal(1);
    });
    it('verifica se depois de excluida o id se torna nulo', async () => {
      const response = await taskModel.getById(FakeId);
      expect(response).to.be.null;
    });
  });
});
