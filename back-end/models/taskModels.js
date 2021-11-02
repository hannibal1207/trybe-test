const connection = require('./connection');

const createList = async (task) => {
  // const date = new Date();
  const db = await connection();
  const create = db.collection('tasks').insertOne(task);
  return create;
};

const getTask = async () => {
  const db = await connection();
  const getAll = db.collection('tasks').find().toArray();
  return getAll;
}; 

module.exports = { createList, getTask };