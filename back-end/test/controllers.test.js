const sinon = require('sinon');
const { expect } = require('chai');

const taskController = require('../controllers/taskController');
const taskModel = require('../models/taskModels');

describe('Ao chamar o controller create', () => {
  describe('quando é inserido com sucesso', () => {
    const res = {};
    const req = {};

    before(() => {
      req.body = { task: 'praia'};
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      sinon.stub(taskModel, 'createList').resolves(true);
    });
    after(() => {
      taskModel.createList.restore();
    });

    it('é chamado o codigo com o status 201', async () => {
      await taskController.createTask(req, res);

      expect(res.status.calledWith(201)).to.be.equal(true);
    });   
    it('é retornado um json com uma mensagem de sucesso', async () => {
      await taskController.createTask(req, res);

      expect(res.json.calledWith({ message: 'Task criada com sucesso!' })).to.be.equal(true);
    });
  });
});

describe('busca uma task através do ID', () => {
  describe('quando não é encontrado uma task para o ID indicado', async () => {
    const res = {};
    const req = {};
    before(() => {
        req.params = {
          id: '604cb554311d68f491ba5781',
       };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);

      sinon.stub(taskModel, 'getById').resolves(null);
    });
    after(() => {
      taskModel.getById.restore();
    });
    it('retorna status 404', async () => {
      await taskController.getTasksById(req, res);

      expect(res.status.calledWith(404)).to.be.equal(true);
    });
    it('é chamado o método "json" passando a mensagem "id invalido"', async () => {
      await taskController.getTasksById(req, res);
  
      expect(res.json.calledWith({ message: 'id invalido' })).to.be.equal(true);
    });
  });
});