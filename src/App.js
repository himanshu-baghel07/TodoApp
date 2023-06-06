import React, { useEffect, useReducer } from "react";
import "./App.css";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import Reducer from "./components/Reducer";
import { v4 as uuidv4 } from "uuid";
import { ADD_ITEM, CHANGE_ITEM, DELETE_ITEM } from "./components/Action";
import "bootstrap/dist/css/bootstrap.css";
import { Container, ModalHeader } from "reactstrap";
import "react-icons/fa";
import { FaCheckSquare } from "react-icons/fa";

const App = () => {
  const [state, dispatch] = useReducer(Reducer, getInitialTodoList());
  const ID = uuidv4();

  function getInitialTodoList() {
    const storedTodo = localStorage.getItem("todoList");
    return storedTodo ? JSON.parse(storedTodo) : [];
  }

  const formatDueDate = (date) => {
    const formattedDate = new Date(date);
    const day = formattedDate.getDate();
    const month = formattedDate.getMonth() + 1;
    const year = formattedDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleAddItem = (text, done, dueDate) => {
    dispatch({
      type: ADD_ITEM,
      payload: {
        id: ID,
        text: text,
        done: done,
        dueDate: dueDate,
      },
    });
  };

  const handleChangeItem = (id, done, text) => {
    dispatch({
      type: CHANGE_ITEM,
      id,
      text,
      done,
    });
  };

  const handleDeleteItem = (id) => {
    dispatch({
      type: DELETE_ITEM,
      id,
    });
  };

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(state));
  }, [state]);

  return (
    <Container id="list" fluid>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 style={{ textAlign: "center" }}>
          <FaCheckSquare /> List of Items
        </h1>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AddTask handleAddItem={handleAddItem} />
      </div>

      <hr
        style={{
          height: "1px",

          backgroundColor: "black",
          marginRight: "1rem",
        }}
      />
      <div>
        {" "}
        {state.map((task) => (
          <div
            key={task.id}
            style={{
              textDecorationLine: task.done ? "line-through" : "none",
              margin: "5px",
            }}
          >
            <TaskList
              task={task}
              handleChangeItem={handleChangeItem}
              handleDeleteItem={handleDeleteItem}
            />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default App;
