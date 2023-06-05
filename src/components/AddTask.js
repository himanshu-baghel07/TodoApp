import React, { useEffect, useState } from "react";

const AddTask = ({ handleAddItem }) => {
  const [inputValue, setInputValue] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [dueDate, setDueDate] = useState("");

  const handleChange = () => {
    handleAddItem(inputValue, false, dueDate);
    setDueDate("");
    setInputValue("");
  };

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCurrentDateTime(new Date());
  //   }, 1000);
  //   return clearInterval(timer);
  // }, []);

  // const formatDate = (date) => {
  //   const option = { day: "2-digit", month: "2-digit", year: "numeric" };
  //   return date.toLocaleDateString(undefined, option);
  // };

  // const formatTime = (date) => {
  //   const option = { hour: "2-digit", minute: "2-digit" };
  //   return date.toLocaleTimeString(undefined, option);
  // };

  const formatDueDate = (date) => {
    const day = date.slice(8, 10);
    const month = date.slice(5, 7);
    const year = date.slice(0, 4);
    return `${day}/${month}/${year}`;
  };

  return (
    <div>
      <input
        placeholder="Add Task"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      {/* <p>Date: {formatDate(currentDateTime)}</p>
      {/* <p>Time: {formatTime(currentDateTime)}</p> */}
      <p>Due Date: {formatDueDate(dueDate)}</p>
      <button onClick={handleChange}>Add</button>
    </div>
  );
};

export default AddTask;
