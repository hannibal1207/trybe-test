import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Edit() {
    const { id } = useParams();
    console.log(id, 'vindo do params');
    let navigate = useNavigate();
    
    const { register, handleSubmit } = useForm();

  
    const addTask = (data) => axios.put(`http://localhost:3001/tasks/${id}`, data)
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
          <h1>editar tarefa</h1>
          <form onSubmit={handleSubmit(addTask)} >
            <div>
              <label>Tarefa</label>
              <input type='text' name="task" {...register('task')} />
            </div>
            <div>
              <button type='submit'>editar</button>
            </div>
          </form>
        </div>
      </div>
    )
  };


export default Edit;
