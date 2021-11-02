const model = require('../models/taskModels');

const createTask = async (req, res) => {
  const create = await model.createList(req.body);
  res.status(201).json(create.ops[0]);
};

const getTask = async (req, res) => {
  const getAll = await model.getTask();
  res.status(200).json(getAll)
};

const getTasksById = async (req, res) => {
  const { _id } = req.params;
  const findId = await model.getById(_id);
  if (!findId) return res.status(400).json({ message: 'id invalido' })
  res.status(200).json(findId);
}

const editTask = async (req, res) => {
  const { _id } = req.params;
  const { task } = req.body;
  const edit = await model.editTask(_id, task)
  if(!edit) return res.status(400).json({ message: 'id invalido' });
  res.status(200).json({ _id, task });
};

const deleteTask = async (req, res) => {
  const { _id } = req.params;
  const deleteTask = await model.deleteTask(_id);
  if(!deleteTask) return res.status(400).json({ message: 'id invalido' });
  res.status(200).json({ message: 'tarefa excluida com sucesso'});
}
module.exports = { createTask, getTask, editTask, getTasksById, deleteTask };