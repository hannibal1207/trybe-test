import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Todo from'./pages/Home';
import Task from './pages/Task';
import EditTask from './pages/EditTask';

function App() {
  return(
    <Router>
      <Routes>
        <Route exact path="" element={<Task/>} />
        <Route path="todo" element={<Todo/>} />
        <Route path="edit/:id" element={<EditTask/>} />
      </Routes>
    </Router>
  )
}

export default App;
