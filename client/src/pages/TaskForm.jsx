// TaskForm.js  task_title,priority,category,hours
import React, { useState } from 'react';

const TaskForm = ({ createTask }) => {
  // console.log("IN THE TaskForm.jsx file")

  const [task_title, setTitle] = useState('');
  const [priority, setPriority] = useState('');
  const [category, setCategory] = useState('');
  const [hours, setHours] = useState('');
  const [email, setEmail] = useState('');

  // console.log("IN THE TaskForm.jsx file, TITLE IS  --- ", task_title);

  const handleSubmit = (e) => {
    
    e.preventDefault();
    createTask(task_title,priority,category,hours, email);
    setTitle('');
    setPriority('');
    setCategory('');
    setHours('');
    setEmail('');
    
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Task</h2>
      
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={task_title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      
      <div>
        <label>Priority:</label>
        <textarea
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        ></textarea>
      </div>

      <div>
        <label>Category:</label>
        <textarea
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        ></textarea>
      </div>

      <div>
        <label>Hours Needed:</label>
        <textarea
          value={hours}
          onChange={(e) => setHours(e.target.value)}
        ></textarea>
      </div>

      <div>
        <label>Email Address:</label>
        <textarea
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></textarea>
      </div>


      <button type="submit">Create</button>
    </form>
  );
};

export default TaskForm;
