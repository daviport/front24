import React, { useState, useEffect } from 'react';
import './Tasks.css';


const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editValue, setEditValue] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [oldInputValue, setOldInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [filterValue, setFilterValue] = useState('all');

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(savedTodos);
  }, []);

  const saveTodo = (text, done = false, save = true) => {
    const newTodo = { text, done };
    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos, newTodo];
      if (save) {
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
      }
      return updatedTodos;
    });
    setInputValue('');
  };

  const updateTodo = (newText) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) =>
        todo.text === oldInputValue ? { ...todo, text: newText } : todo
      );
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      return updatedTodos;
    });
    setIsEditing(false);
    setEditValue('');
  };

  const toggleDone = (text) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) =>
        todo.text === text ? { ...todo, done: !todo.done } : todo
      );
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  };

  const removeTodo = (text) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.filter((todo) => todo.text !== text);
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  };

  const handleSearch = (search) => {
    setSearchValue(search.toLowerCase());
  };

  const filteredTodos = todos.filter((todo) => {
    if (filterValue === 'all') return true;
    if (filterValue === 'done') return todo.done;
    if (filterValue === 'todo') return !todo.done;
    return true;
  }).filter((todo) => todo.text.toLowerCase().includes(searchValue));

  return (
    <div>
      <form id="todo-form" onSubmit={(e) => { e.preventDefault(); saveTodo(inputValue); }}>
        <input
          id="todo-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>

      <form
        id="edit-form"
        className={isEditing ? '' : 'hide'}
        onSubmit={(e) => { e.preventDefault(); updateTodo(editValue); }}
      >
        <input
          id="edit-input"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
        />
        <button type="submit">Update Todo</button>
        <button
          id="cancel-edit-btn"
          onClick={(e) => {
            e.preventDefault();
            setIsEditing(false);
          }}
        >
          Cancel
        </button>
      </form>

      <input
        id="search-input"
        value={searchValue}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <button
        id="erase-button"
        onClick={() => setSearchValue('')}
      >
        Erase
      </button>
      <select
        id="filter-select"
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
      >
        <option value="all">All</option>
        <option value="done">Done</option>
        <option value="todo">Todo</option>
      </select>

      <div id="todo-list">
        {filteredTodos.map((todo) => (
          <div key={todo.text} className={`todo ${todo.done ? 'done' : ''}`}>
            <h3>{todo.text}</h3>
            <button onClick={() => toggleDone(todo.text)}>
              <i className="fa-solid fa-check"></i>
            </button>
            <button onClick={() => {
              setIsEditing(true);
              setEditValue(todo.text);
              setOldInputValue(todo.text);
            }}>
              <i className="fa-solid fa-pen"></i>
            </button>
            <button onClick={() => removeTodo(todo.text)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoApp;
