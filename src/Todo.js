import React, { useState } from "react";
import "./Todo.css";
import "./NewTodoForm.css";
import "./tooltip.css";


function Todo({ todo, remove, update, toggleComplete}) {
  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState(todo.task);
  const today = new Date();
  const time = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear() + '  ' + 
  ((today.getHours()<10) ? ('0' + today.getHours()) : today.getHours()) + ':' + 
  ((today.getMinutes()<10) ? ('0' + today.getMinutes()) : today.getMinutes()) + ':' + 
  ((today.getSeconds()<10) ? ('0' + today.getSeconds()) : today.getSeconds());
  const [now,setNow] = useState(time);


  const handleClick = evt => {
    remove(evt.target.id);
  };
  const toggleForm = () => {
    setIsEditing(!isEditing);
  };
  const handleUpdate = evt => {
    evt.preventDefault();
    update(todo.id, task);
    setNow(time);
    toggleForm();
  };
  const handleChange = evt => {
    setTask(evt.target.value);
  };
  const toggleCompleted = evt => {
    toggleComplete(evt.target.id);
  };

  let result;

  const CopyToClipboard = task => {
    navigator.clipboard.writeText(task);
    console.log(task);
    }

  if (isEditing) {
    result = (
      <div className="Todo">
        <form className="Todo-edit-form" onSubmit={handleUpdate}>
          <input onChange={handleChange} value={task} type="text" />
          <button type="submit" className="button">Save</button>
          {/* <button type="button" className="button" onClick={CopyToClipboard(todo.task)} style={{marginLeft:"5px"}}>Copy</button> */}
        </form>
      </div>
    );
  } else {
    result = (
      <div className="Todo">
        <div className="Time">
          <p>Last edited: {now}</p>
        </div>
        <div className="Task">
          <li
            id={todo.id}
            onClick={toggleCompleted}
            className={todo.completed ? "Todo-task completed tooltip" : "Todo-task tooltip"}
          >
            {todo.task} <span class="tooltiptext">Click to make it completed (incompleted)</span>
          </li>
          <div style={{display:"flex",flexFlow:"row nowrap"}}>
            <button onClick={toggleForm} className="edit tooltip">✎ <span class="tooltiptext">Click to edit</span></button>
            <button onClick={handleClick} className="edit tooltip" id={todo.id}>🗑️ <span class="tooltiptext">Click to remove</span></button>
            <button onClick={() => CopyToClipboard(todo.task)} className="edit tooltip">🗒️ <span class="tooltiptext">Click to copy</span></button>
          </div>
        </div>
      </div>
    );
  }
  return result;
}

export default Todo;
