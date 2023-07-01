import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { motion } from "framer-motion";

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
    <Box id="addTask" initial={{ x: -1000 }} animate={{ x: 0 }}>
      <TextField
        id="addTaskInput"
        className="add-task-input"
        value={inputValue}
        placeholder="Task Name"
        required
        onChange={(e) => setInputValue(e.target.value)}
      />

      <TextField
        id="addTaskDuedate"
        type="date"
        value={dueDate}
        placeholder="date"
        required
        onChange={(e) => setDueDate(e.target.value)}
        sx={{ backgroundColor: "whitesmoke", borderRadius: "5px" }}
      />

      {error && (
        <Typography variant="caption" color="error">
          Please enter a value in both fields.
        </Typography>
      )}

      <Button
        component={motion.button}
        whileHover={{
          scale: 1.2,
          rotate: [0, -10, 10, -10, 0],
          boxShadow: "0px 0px 20px red",
        }}
        transition={{ duration: 0.3 }}
        id="addButton"
        onClick={handleChange}
      >
        Add
      </Button>
    </Box>
  );
};

export default AddTask;
