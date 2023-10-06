import React, { useState, useReducer } from "react";
import Popup from "reactjs-popup";
import { v4 as uuidv4 } from "uuid";
import "./NewTodoForm.css";

function NewTodoForm({ task, createTodo }) {
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      task: ""
    }
  );

  const handleChange = (evt) => {
    setUserInput({ [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (userInput.task === "") {
      userInput.task = "sample task";
    }
    const newTodo = { id: uuidv4(), task: userInput.task, completed: false };
    createTodo(newTodo);
    setUserInput({ task: "" });
  };

  // return (
  //   <form className="NewTodoForm" onSubmit={handleSubmit}>
  //     <label htmlFor="task">New todo</label>
  //     <input
  //       value={userInput.task}
  //       onChange={handleChange}
  //       id="task"
  //       type="text"
  //       name="task"
  //       placeholder="New Todo"
  //     />
  //     <button>+ New task</button>
  //   </form>
  // );

  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    setUserInput({ task: "" });
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (   
    <div>
      <button className="button" onClick={handleOpen}>+ New task</button>
      
      <Popup modal nested open={isOpen}>
      {
        <div className="bg-form">
          <div className="form-box">
            <p className="Title">CREATE NEW TASK</p>
            <form className="NewTodoForm" onSubmit={handleSubmit}>
              <input
                value={userInput.task}
                onChange={handleChange}
                id="task"
                type="text"
                name="task"
                placeholder="Sample"
                style={{width:"200px"}}
              />
              <div style={{display:"flex",justifyContent:"right",marginTop:"10px"}}>
                <button type="submit" className="button" style={{marginRight:"5px"}}>Save</button>
                <button type="button" className="button-close" onClick={handleClose}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      }
    </Popup>
    </div>
  );

}

export default NewTodoForm;
