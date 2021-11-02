const model = require('../models/taskModels');

const createTask = async (req, res) => {
  const create = await model.createList(req.body);
  res.status(201).json(create.ops[0]);
};

const getTask = async (req, res) => {
  const getAll = await model.getTask();
  res.status(200).json(getAll)
};

module.exports = { createTask, getTask };