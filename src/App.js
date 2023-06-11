import React, { useEffect, useReducer, useState } from "react";
import "./App.css";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import Reducer from "./components/Reducer";
import { v4 as uuidv4 } from "uuid";
import { ADD_ITEM, CHANGE_ITEM, DELETE_ITEM } from "./components/Action";
import {
  Box,
  Button,
  Container,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { CheckBoxSharp } from "@mui/icons-material";

const App = () => {
  const [state, dispatch] = useReducer(Reducer, getInitialTodoList());
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [selectedSort, setSelectedSort] = useState("");
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

  const handleSortItem = (e) => {
    setSelectedSort(e);
  };

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(state));
  }, [state]);

  const handleClickToggle = (e) => {
    setSelectedSort(e.target.value);
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

  // const filteredData = [...state].sort((a, b) => {
  //   const dateA = new Date(a.dueDate);
  //   const dateB = new Date(b.dueDate);
  //   return dateA - dateB;
  // });

  // const filteredData =
  //   state.filter((task) =>
  //     selectedFilter === "delay"
  //       ? task.dueDate <= formattedYesterday && task.done !== true
  //       : selectedFilter === null
  //       ? task.done !== true
  //       : formatDueDate(task.dueDate) === selectedFilter
  //       ? task.dueDate
  //       : task.done === selectedFilter ||
  //         task.text.toLowerCase().includes(selectedFilter)
  //   ) && selectedFilter === "old"
  //     ? [...state].sort((a, b) => {
  //         const dateA = new Date(a.dueDate);
  //         const dateB = new Date(b.dueDate);
  //         return dateA - dateB;
  //       })
  //     : selectedFilter === "new"
  //     ? [...state].sort((a, b) => {
  //         const dateA = new Date(a.dueDate);
  //         const dateB = new Date(b.dueDate);
  //         return dateB - dateA;
  //       })

  let filteredData = state.filter((task) => {
    if (selectedFilter === "delay") {
      return task.dueDate <= formattedYesterday && task.done !== true;
    } else if (selectedFilter === null) {
      return task.done !== true;
    } else if (formatDueDate(task.dueDate) === selectedFilter) {
      return true;
    } else {
      return (
        task.done === selectedFilter ||
        task.text.toLowerCase().includes(selectedFilter)
      );
    }
  });
  console.log("Filtered", filteredData);

  if (selectedSort === "Old to New") {
    filteredData = [...filteredData].sort((a, b) => {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      return dateA - dateB;
    });
  } else if (selectedSort === "New to Old") {
    filteredData = [...filteredData].sort((a, b) => {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      return dateB - dateA;
    });
  }

  return (
    <Container id="list">
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 id="heading">
          <CheckBoxSharp id="checkIcon" /> Task App
        </h1>
      </Box>

      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AddTask handleAddItem={handleAddItem} />
      </Box>

      <hr
        style={{
          height: "1px",
          width: "70%",
          marginLeft: "15%",
          backgroundColor: "black",
          marginRight: "1rem",
        }}
      />
      <Box
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
          // style={{ width: "50%" }}
        />

        <FormControl
          sx={{
            width: {
              md: "150px",
              xs: "100px",
              fontSize: { md: "1.2rem", xs: "1rem" },
            },
          }}
        >
          <InputLabel id="demo-simple-select-label">SortBy</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedSort}
            label="Sort"
            onChange={handleClickToggle}
          >
            <MenuItem
              sx={{ fontSize: { md: "1.2rem", xs: "1rem" } }}
              value={"SortBy"}
            >
              Default
            </MenuItem>
            <MenuItem value={"Old to New"}>Old to New</MenuItem>
            <MenuItem value={"New to Old"}>New to Old</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box
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
      </Box>
      <hr
        style={{
          height: "3px",
          backgroundColor: "black",
          marginRight: "1rem",
        }}
      />
      <Box
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
      </Box>
      <Box>
        {" "}
        {filteredData.map((task) => (
          <Box
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
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default App;
