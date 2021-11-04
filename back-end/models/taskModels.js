const { connection } = require('./connection');
const { ObjectID } = require('mongodb');

const createList = async (task) => {
  if (!task) return null;
  // const date = new Date();
  const db = await connection();
  const create = db.collection('tasks').insertOne(task);
  return create ;
};

const getTask = async () => {
  const db = await connection();
  const getAll = db.collection('tasks').find().toArray();
  return getAll;
};

const getById = async (_id) => {
  if(!ObjectID.isValid(_id)) return null;
  const db = await connection();
  const findById = db.collection('tasks').findOne(ObjectID(_id));
  return findById;
};

const editTask = async (_id, task) => {
  if(!ObjectID.isValid(_id)) return null;
  const db = await connection();
  const edit = db.collection('tasks').updateMany(
    {
      _id: ObjectID(_id)},
      { $set: { task }
    },
  );
  return edit;
};

const deleteTask = async (_id) => {
  if(!ObjectID.isValid(_id)) return null;
  const db = await connection();
  const deleteTask = db.collection('tasks').deleteOne(
    {
      _id: ObjectID(_id),
    },
  );
  return deleteTask 
};

module.exports = { createList, getTask, editTask, getById, deleteTask };