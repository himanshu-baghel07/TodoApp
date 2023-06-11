import { Box, Button, Input, Typography } from "@mui/material";
import React, { useState } from "react";

const AddTask = ({ handleAddItem }) => {
  const [inputValue, setInputValue] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState(false);

  const handleChange = () => {
    if (inputValue && dueDate) {
      handleAddItem(inputValue, false, dueDate);
      setDueDate("");
      setInputValue("");
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <Box id="addTask">
      <Input
        id="addTaskInput"
        className="add-task-input"
        value={inputValue}
        placeholder="Task"
        required
        onChange={(e) => setInputValue(e.target.value)}
      />

      <Input
        id="addTaskDuedate"
        type="date"
        value={dueDate}
        placeholder="date"
        required
        onChange={(e) => setDueDate(e.target.value)}
      />
      {error && (
        <Typography variant="caption" color="error">
          Please enter a value in both fields.
        </Typography>
      )}
      <Button id="addButton" color="primary" onClick={handleChange}>
        Add
      </Button>
    </Box>
  );
};

export default AddTask;
