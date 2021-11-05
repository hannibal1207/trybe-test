import React from 'react';
import { Link } from 'react-router-dom';

function Task() {
  return (
    <div>
      <h1>pagina para mostrar a task</h1>
      <Link to="todo">
        <button>Add new task</button>
      </Link>
    </div>
  )
}

export default Task;
