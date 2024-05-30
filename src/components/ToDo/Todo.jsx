import React, { useState } from 'react';
import '../ToDo/Todo.css';

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), title: newTask, status: 'To Do' }]);
      setNewTask('');
    }
  };

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const removeTask = taskId => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const renderTasks = (status) => {
    return tasks
      .filter(task => task.status === status)
      .map(task => (
        <div key={task.id} className="task">
          <input type="text" value={task.title} readOnly />
          <div className="task-controls">
            {status !== 'To Do' && (
              <button onClick={() => updateTaskStatus(task.id, 'To Do')}>To Do</button>
            )}
            {status !== 'In Progress' && (
              <button onClick={() => updateTaskStatus(task.id, 'In Progress')}>In Progress</button>
            )}
            {status !== 'Done' && (
              <button onClick={() => updateTaskStatus(task.id, 'Done')}>Done</button>
            )}
            <button onClick={() => removeTask(task.id)}>Remove</button>
          </div>
        </div>
      ));
  };

  return (
    <div className="kanban-board">
      <div className="kanban-column">
        <h2>To Do</h2>
        {renderTasks('To Do')}
      </div>
      <div className="kanban-column">
        <h2>In Progress</h2>
        {renderTasks('In Progress')}
      </div>
      <div className="kanban-column">
        <h2>Done</h2>
        {renderTasks('Done')}
      </div>
      <div className="add-task">
        <input 
          type="text" 
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)} 
          placeholder="New task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
    </div>
  );
};

export default Todo;
