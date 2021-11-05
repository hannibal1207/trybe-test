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
       console.log('deu errado')
     })
  }, []);
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
                  <button>Editar</button>
                  <button>Excluir</button>
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
