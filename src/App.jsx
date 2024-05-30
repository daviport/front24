// import { useState } from 'react'
// import './App.css';

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import TodoApp from './components/Tasks/Tasks';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/task" element={<TodoApp />} />
    </Routes>
  );
};

export default App;
