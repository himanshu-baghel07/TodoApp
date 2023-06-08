import React, { useEffect, useReducer, useState } from "react";
import "./App.css";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import Reducer from "./components/Reducer";
import { v4 as uuidv4 } from "uuid";
import { ADD_ITEM, CHANGE_ITEM, DELETE_ITEM } from "./components/Action";
import "bootstrap/dist/css/bootstrap.css";
import {
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import "react-icons/fa";
import { FaCheckSquare } from "react-icons/fa";

const App = () => {
  const [state, dispatch] = useReducer(Reducer, getInitialTodoList());
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);

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

  const handleChangeItem = (id, done, text, dueDate) => {
    dispatch({
      type: CHANGE_ITEM,
      id,
      text,
      done,
      dueDate,
    });
  };

  const handleDeleteItem = (id) => {
    dispatch({
      type: DELETE_ITEM,
      id,
    });
  };

  const handleFilterItem = (done) => {
    setSelectedFilter(done);
  };

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(state));
  }, [state]);

  const handleClickToggle = () => {
    setIsOpen(!isOpen);
  };

  const dd = new Date().toISOString().slice(0, 10);
  console.log("DD", dd);

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const formattedYesterday = yesterday.toISOString().slice(0, 10);

  // const filteredData = state.filter((task) =>
  //   task.text.includes(selectedFilter)
  // );

  const filteredData = state.filter((task) =>
    selectedFilter === "delay"
      ? task.dueDate <= formattedYesterday
      : selectedFilter === null
      ? state
      : formatDueDate(task.dueDate) === selectedFilter
      ? task.dueDate
      : task.done === selectedFilter
  );

  return (
    <Container id="list" fluid>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 style={{ textAlign: "center", color: "blue" }}>
          <FaCheckSquare /> Task App
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

      <Dropdown isOpen={isOpen} toggle={handleClickToggle}>
        <DropdownToggle caret>Filter</DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => handleFilterItem(null)}>
            All
          </DropdownItem>
          <DropdownItem onClick={() => handleFilterItem(formatDueDate(dd))}>
            Today's Task
          </DropdownItem>
          <DropdownItem onClick={() => handleFilterItem(true)}>
            Completed
          </DropdownItem>
          <DropdownItem onClick={() => handleFilterItem("delay")}>
            Delay
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginLeft: "5%",
          marginRight: "5%",
        }}
      >
        <p>Status</p>
        <p>Task</p>

        <p>Due Date</p>
        <p>Actions</p>
      </div>
      <div>
        {" "}
        {filteredData.map((task) => (
          <div
            key={task.id}
            style={{
              // backgroundColor: task.done ? "#47de54" : "rgb(234, 239, 244)" || dueDate >= Date ? 'red':'rgb(234, 239, 244',
              backgroundColor:
                task.dueDate < new Date().toISOString().slice(0, 10)
                  ? "#fc6d76"
                  : task.done
                  ? "#47de54"
                  : "rgb(234, 239, 244)",
              padding: "5px",
              borderRadius: "10px",
              margin: "5px",
              borderBottom: "1px solid navy",
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
