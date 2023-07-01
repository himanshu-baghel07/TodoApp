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
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { CheckBoxSharp } from "@mui/icons-material";
import { motion } from "framer-motion";

const App = () => {
  const [state, dispatch] = useReducer(Reducer, getInitialTodoList());
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

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const formattedYesterday = yesterday.toISOString().slice(0, 10);

  let filteredData = state.filter((task) => {
    if (selectedFilter === "delay") {
      return task.dueDate <= formattedYesterday && task.done !== true;
    } else if (selectedFilter === null) {
      return task;
    } else if (formatDueDate(task.dueDate) === selectedFilter) {
      return true;
    } else {
      return (
        task.done === selectedFilter ||
        task.text.toLowerCase().includes(selectedFilter.toLowerCase())
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
    <Container id="list" maxWidth={false}>
      <Box
        component={motion.div}
        initial={{ scale: 10 }}
        animate={{ scale: 1, transition: { duration: 0.5 } }}
        id="header"
      >
        <Box
          component={motion.div}
          initial={{ scale: 4 }}
          animate={{ scale: 1, transition: { duration: 1, delay: 1 } }}
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
          component={motion.div}
          initial={{ x: -1500 }}
          animate={{ x: 0, transition: { duration: 1, delay: 1.5 } }}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AddTask handleAddItem={handleAddItem} />
        </Box>

        <motion.hr
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1, transition: { duration: 0.8, delay: 1.2 } }}
          style={{
            height: "1px",
            width: "70%",
            marginLeft: "15%",
            color: "white",

            marginRight: "1rem",
            marginTop: "1%",
          }}
        />
        <Box
          id="searchSort"
          component={motion.div}
          initial={{ x: -1500 }}
          animate={{ x: 0, transition: { duration: 1, delay: 1.5 } }}
        >
          <TextField
            id="searchText"
            type="text"
            placeholder="Search Task"
            onChange={(e) => handleFilterItem(e.target.value)}
          />

          <FormControl
            id="sortBy"
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
              sx={{
                backgroundColor: "white",
                height: { xs: "6vh", md: "100%" },
              }}
            >
              <MenuItem sx={{ fontSize: "1rem" }} value={"SortBy"}>
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
            justifyContent: "center",
            alignItems: "center",
            gap: "1%",
            paddingBottom: "1%",
          }}
        >
          <Button
            component={motion.button}
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { duration: 0.5, delay: 2 } }}
            style={{
              backgroundColor: title === "All" ? "#1bfa57" : "white",
              color: "black",
              height: "6vh",
            }}
            onClick={() => (handleFilterItem(null), setTitle("All"))}
          >
            All Tasks
          </Button>
          <Button
            component={motion.button}
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { duration: 0.5, delay: 2.5 } }}
            style={{
              backgroundColor: title === "Today" ? "#1bfa57" : "white",
              color: "black",
              height: "6vh",
            }}
            onClick={() =>
              handleFilterItem(formatDueDate(currentDate), setTitle("Today"))
            }
          >
            Today's Tasks
          </Button>
          <Button
            component={motion.button}
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { duration: 0.5, delay: 3 } }}
            style={{
              backgroundColor: title === "Completed" ? "#1bfa57" : "white",
              color: "black",
              height: "6vh",
            }}
            onClick={() => (handleFilterItem(true), setTitle("Completed"))}
          >
            Completed Tasks
          </Button>
          <Button
            component={motion.button}
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { duration: 0.5, delay: 3.5 } }}
            style={{
              backgroundColor: title === "Delay" ? "#1bfa57" : "white",
              color: "black",
              height: "6vh",
            }}
            onClick={() => (handleFilterItem("delay"), setTitle("Delay"))}
          >
            Overdue Tasks
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        {" "}
        {state.length !== 0
          ? filteredData.map((task) => (
              <Box
                key={task.id}
                style={{
                  padding: "5px",

                  margin: "5px",
                }}
              >
                <TaskList
                  task={task}
                  handleChangeItem={handleChangeItem}
                  handleDeleteItem={handleDeleteItem}
                />
              </Box>
            ))
          : "No Data"}
      </Box>
    </Container>
  );
};

export default App;
