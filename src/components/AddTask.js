import { Dataset, DateRange } from "@mui/icons-material";
import { Box, Button, Input } from "@mui/material";

import React, { useState } from "react";

const AddTask = ({ handleAddItem }) => {
  const [inputValue, setInputValue] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleChange = () => {
    handleAddItem(inputValue, false, dueDate);
    setDueDate("");
    setInputValue("");
  };

  return (
    <Box
      id="addTask"
      // style={{
      //   display: "flex",
      //   flexDirection: "row",
      //   justifyContent: "space-evenly",
      //   width: "100%",
      // }}
    >
      <Input
        id="addTaskInput"
        className="add-task-input"
        value={inputValue}
        placeholder="Task"
        onChange={(e) => setInputValue(e.target.value)}
      />

      <Input
        id="addTaskDuedate"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <Button id="addButton" color="primary" onClick={handleChange}>
        Add
      </Button>
    </Box>
  );
};

export default AddTask;
