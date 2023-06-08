import React, { useState } from "react";
import { Button, Input } from "reactstrap";

import "react-datepicker/dist/react-datepicker.css";

const AddTask = ({ handleAddItem }) => {
  const [inputValue, setInputValue] = useState("");

  const [dueDate, setDueDate] = useState("");

  const handleChange = () => {
    handleAddItem(inputValue, false, dueDate);
    setDueDate("");
    setInputValue("");
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "3fr 1fr auto", // Added "auto" for the button column
        gap: "1rem", // Added gap between grid items
        alignItems: "center",
        marginTop: "3%",
        marginBottom: "2%",
      }}
    >
      <Input
        placeholder="Add Task"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{ width: "100%" }}
      />

      <Input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <Button color="primary" onClick={handleChange}>
        Add
      </Button>
    </div>
  );
};

export default AddTask;
