import React, { useState } from "react";

const AddTask = ({ handleAddItem }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = () => {
    handleAddItem(inputValue);
    setInputValue("");
  };

  return (
    <div>
      <input
        placeholder="Add Task"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleChange}>Add</button>
    </div>
  );
};

export default AddTask;
