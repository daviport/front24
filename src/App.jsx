import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Todo from './components/ToDo/Todo';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/todo" element={<Todo />} />
    </Routes>
  );
};

export default App;
