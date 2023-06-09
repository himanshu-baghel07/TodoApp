import React, { useEffect, useReducer, useState } from "react";
import "./App.css";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import Reducer from "./components/Reducer";
import { v4 as uuidv4 } from "uuid";
import { ADD_ITEM, CHANGE_ITEM, DELETE_ITEM } from "./components/Action";
import "bootstrap/dist/css/bootstrap.css";
import {
  Button,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
} from "reactstrap";
import "react-icons/fa";
import { FaCheckSquare, FaLightbulb } from "react-icons/fa";

const App = () => {
  const [state, dispatch] = useReducer(Reducer, getInitialTodoList());
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [title, setTitle] = useState("All");
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [today, setToday] = useState(new Date());

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
      setToday(new Date());
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  console.log("TT", formatDueDate(currentDate));

  // const currentDate = new Date().toISOString().slice(0, 10);
  // console.log("DD", dd);

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const formattedYesterday = yesterday.toISOString().slice(0, 10);

  // const filteredData = state.filter((task) =>
  //   task.text.toLowerCase().includes(selectedFilter)
  // );

  const filteredData = state.filter((task) =>
    selectedFilter === "delay"
      ? task.dueDate <= formattedYesterday && task.done !== true
      : selectedFilter === null
      ? task.done !== true
      : formatDueDate(task.dueDate) === selectedFilter
      ? task.dueDate
      : task.done === selectedFilter ||
        task.text.toLowerCase().includes(selectedFilter)
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
          width: "70%",
          marginLeft: "15%",
          backgroundColor: "black",
          marginRight: "1rem",
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          marginTop: "2%",
          marginBottom: "5%",
        }}
      >
        <Input
          type="text"
          placeholder="Search Task"
          onChange={(e) => handleFilterItem(e.target.value)}
          style={{ width: "50%" }}
        />
        <Dropdown isOpen={isOpen} toggle={handleClickToggle}>
          <DropdownToggle caret>Filter</DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => handleFilterItem(null)}>
              All
            </DropdownItem>
            <DropdownItem
              onClick={() => handleFilterItem(formatDueDate(currentDate))}
            >
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
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Button
          style={{
            backgroundColor: title === "All" ? "#1bfa57" : "white",
            color: "black",
          }}
          onClick={() => (handleFilterItem(null), setTitle("All"))}
        >
          All Tasks
        </Button>
        <Button
          style={{
            backgroundColor: title === "Today" ? "#1bfa57" : "white",
            color: "black",
          }}
          onClick={() =>
            handleFilterItem(formatDueDate(currentDate), setTitle("Today"))
          }
        >
          Today's Tasks
        </Button>
        <Button
          style={{
            backgroundColor: title === "Completed" ? "#1bfa57" : "white",
            color: "black",
          }}
          onClick={() => (handleFilterItem(true), setTitle("Completed"))}
        >
          Completed Tasks
        </Button>
        <Button
          style={{
            backgroundColor: title === "Delay" ? "#1bfa57" : "white",
            color: "black",
          }}
          onClick={() => (handleFilterItem("delay"), setTitle("Delay"))}
        >
          Overdue Tasks
        </Button>
      </div>
      <hr
        style={{
          height: "3px",
          backgroundColor: "black",
          marginRight: "1rem",
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: "5%",
          paddingRight: "5%",
          border: "2px solid black",
          paddingTop: "1%",
          fontSize: "1.1rem",
          fontWeight: "600",
          borderRadius: "10px",
        }}
      >
        <p>Status</p>
        <p>Tasks</p>

        <p>Due Date</p>
        <p>Actions</p>
      </div>
      <div>
        {" "}
        {filteredData.map((task) => (
          <div
            key={task.id}
            style={{
              backgroundColor: task.done
                ? "#47de54"
                : "rgb(234, 239, 244)" &&
                  task.dueDate < new Date().toISOString().slice(0, 10)
                ? task.done
                  ? "#47de54"
                  : "#fc6d76"
                : "rgb(234, 239, 244)",
              padding: "5px",
              borderRadius: "10px",
              margin: "5px",
              border: "1px solid navy",
            }}
          >
            {/* "#47de54" : "#fc6d76" */}
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
