import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Todo() {

  let navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const addTask = (data) => axios.post('http://localhost:3001/tasks', data)
    .then(() => {
      console.log('Deu tudo certo');
      navigate("/")
    })
    .catch(() => {
      console.log('deu ruim');
    })

  return (
    <div>
      <div>
        <Link to="/">
          <button>Ver tarefas</button>
        </Link>
      </div>
      <div>
        <h1>criar tarefas</h1>
        <form onSubmit={handleSubmit(addTask)} >
          <div>
            <label>Tarefa</label>
            <input type='text' name="task" {...register('task')} />
          </div>
          <div>
            <button type='submit'>criar</button>
          </div>
        </form>
      </div>
    </div>
  )
};

export default Todo;
