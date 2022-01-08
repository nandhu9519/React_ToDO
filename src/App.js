import React, { useState,useEffect } from 'react';
import './App.css';

function Task({ task, index, completeTask, removeTask, editTask }) {
  return (
      <div
          className="task"
          style={{ textDecoration: task.completed ? "line-through" : "" }}
      >
          {task.title}
          <button style={{ background: "red" }} onClick={() => removeTask(index)}>x</button>
          <button style={{ background: "green" }} onClick={() => completeTask(index)}>Complete</button>
          <button style={{ background: "Orange" }} onClick={() => editTask(index)}>Edit</button>
      </div>
  );
}
function Todo() {
  const [tasksRemaining, setTasksRemaining] = useState(0);
  const [tasks, setTasks] = useState([]);
    
  useEffect(() => { 
    setTasksRemaining(tasks.filter(task => !task.completed).length) 
  });

  const addTask = title => {
      const newTasks = [...tasks, { title, completed: false }];
      setTasks(newTasks);
  };
  
  const completeTask = index => {
      const newTask = [...tasks];
      newTask[index].completed = true;
      setTasks(newTask);
  };
  
  const removeTask = index => {
      const newTask = [...tasks];
      newTask.splice(index, 1);
      setTasks(newTask);
  };

  const editTask = index =>{
      const newTasks =  [...tasks]
      const data = newTasks.slice(index)
      const editTask=data[0].title
      console.log('edit',editTask);

      document.getElementById('task').innerHTML=editTask
  }

  return (
      <div className="todo-container">
          <div className="header">TODO - ITEMS</div>
          
          <div className="header">Tasks Pending ({tasksRemaining})</div>
          <div className="tasks">
              {tasks.map((task, index) => (
                  <Task
                  task={task}
                  index={index}
                  completeTask={completeTask}
                  removeTask={removeTask}
                  editTask={editTask}
                  key={index}
                  />
              ))}
          </div>
          <div className="create-task" >
              <CreateTask addTask={addTask} />
          </div>
      </div>
  );
}

    function CreateTask({ addTask }) {
      const [value, setValue] = useState("");
  
      const handleSubmit = e => {
          e.preventDefault();
          if (!value) return;
          
          addTask(value);
          setValue("");
      }
      
      return (
          <form onSubmit={handleSubmit}>
              <input
                  id='task'
                  type="text"
                  className="input"
                  value={value}
                  placeholder="Add a new task"
                  onChange={e => setValue(e.target.value)}
              />
          </form>
      );
  }

export default Todo;
