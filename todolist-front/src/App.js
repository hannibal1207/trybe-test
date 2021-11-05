import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Todo from'./pages/Home';
import Task from './pages/Task'

function App() {
  return(
    <Router>
      <Routes>
        <Route exact path="" element={<Task/>} />
        <Route path="todo" element={<Todo/>} />
      </Routes>
    </Router>
  )
}

export default App;
