import React, { useState, useEffect } from 'react';

function Todo() {
   
  const [task, setTask] = useState("")
  const [itemsList, setItemsList] = useState([])

  function handleChangeInput(event) {
    const inputTask = event.target.value;
    setTask(inputTask)
  };

  function handleAddItemToList(event) {
    event.preventDefault();
    if(task) {
      setItemsList([...itemsList, task]);

      setTask(" ");
    }
  }

  return (
    <div>
      <h1>Todo List</h1>
      <form>
        <input type="text" placeholder="Adiciona uma tarefa" onChange={handleChangeInput} value={task} />
        <button type="submit" onClick={handleAddItemToList}>Adicionar</button>
      </form>
      <ul>
        {itemsList.map(item => 
          (<li key={item.length}>
            {item}
            <div>
              <button>excluir</button>
              <button>editar</button>
            </div>
          </li>))}
      </ul>
    </div>
  );
}

export default Todo;