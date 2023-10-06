import React, { useState } from "react";
import Todo from "./Todo";
import NewTodoForm from "./NewTodoForm";
import { v4 as uuidv4 } from "uuid";
import "./TodoList.css";

function TodoList() {
  const [todos, setTodos] = useState([
  ]);

  const create = (newTodo) => {
    console.log(newTodo);
    setTodos([...todos, newTodo]);
  };

  const remove = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const update = (id, updtedTask) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, task: updtedTask };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const todosList = todos.map((todo) => (
    <Todo
      toggleComplete={toggleComplete}
      update={update}
      remove={remove}
      key={todo.id}
      todo={todo}
    />
  ));

  return (
  <>
    <h1 className="Title">TO DO LIST</h1>
    <div className="TodoList">
      <div className="Menu">
        <div>  
          <p className="TodoTitle"> <span>{todos.length}</span> TO DO</p>
        </div>
        <NewTodoForm createTodo={create} />
      </div>
      <ul>{todosList}</ul>
    </div>
  </>
  );
}

export default TodoList;
