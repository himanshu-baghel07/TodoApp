import React, { useEffect, useState } from "react";
import { FaCalendar } from "react-icons/fa";
import { Button, Input, Label } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
    <div
      style={{
        display: "flex",
        alignItems: "center",
        // width: "80%",
        marginTop: "3%",
        marginBottom: "2%",
      }}
    >
      <Input
        placeholder="Add Task"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{ width: "100%", marginRight: "1rem" }}
      />

      <Input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        style={{ marginRight: "1rem" }}
      />
      <Button onClick={handleChange}>Add</Button>
    </div>
  );
};

export default AddTask;
