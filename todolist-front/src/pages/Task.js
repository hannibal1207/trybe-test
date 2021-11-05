import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Task() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/tasks')
     .then(({ data }) => {
       setTasks(data);
     })
     .catch(() => {
       console.log('deu errado');
     })
  }, []);

  const taskDelete = (id) => {
    axios.delete(`http://localhost:3001/tasks/${id}`);
     
    // função para atualizar a pagina quando uma task é excluida
    setTasks(tasks.filter(task => task._id !== id));
  };

  return (
    <div>
      <div>
        <h1>pagina para mostrar a task</h1>
        <Link to="todo">
          <button>Add new task</button>
        </Link>
      </div>
      <div>
        {tasks.map((data, key) => {
          return(
            <div>
              <div>
                <header>
                  <h2 key={key}>Tarefa: {data.task}</h2>
                  <Link to={{ pathname: `/edit/${data._id}` }}>
                    <button>Editar</button>
                  </Link>
                  <button onClick={() => taskDelete(data._id)}>Excluir</button>
                </header>
              </div>
           </div>
          )
        })}
      </div>
    </div>
  )
}

export default Task;
