require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { PORT } = process.env;

const controllers = require('./controllers/taskController');

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    // allowedHeaders: ['Authorization'],
  }),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/tasks', controllers.createTask);
app.get('/tasks', controllers.getTask);
app.get('/tasks/:_id', controllers.getTasksById);
app.put('/tasks/:_id', controllers.editTask);
app.delete('/tasks/:_id', controllers.deleteTask);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
