import React, { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Button, Input, Label } from "reactstrap";

const TaskList = ({ task, handleChangeItem, handleDeleteItem }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);
  const [editedDueDate, setEditedDueDate] = useState(task.dueDate);

  const handleTextChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleDueDateChange = (e) => {
    setEditedDueDate(e.target.value);
  };

  const handleDoneClick = () => {
    setIsEditing(false);
    handleChangeItem(task.id, task.done, editedText, editedDueDate);
  };

  const formatDueDate = (date) => {
    const formattedDate = new Date(date);
    const day = formattedDate.getDate();
    const month = formattedDate.getMonth() + 1;
    const year = formattedDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  let content;
  if (isEditing) {
    content = (
      <>
        <Input
          value={editedText}
          onChange={handleTextChange}
          style={{ width: "50%" }}
        />
        <Input
          type="date"
          value={editedDueDate}
          onChange={handleDueDateChange}
          style={{ width: "30%" }}
        />

        <Button onClick={handleDoneClick}>Done</Button>
      </>
    );
  } else {
    content = (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "50%",
          }}
        >
          <Label
            style={{
              width: "70%",
              wordWrap: "break-word",

              borderLeft: "2px solid black",
              paddingLeft: "10px",
            }}
          >
            {" "}
            {task.text}
          </Label>
          <Label
            style={{
              width: "20%",
              borderLeft: "2px solid black",
              paddingLeft: "10px",
            }}
          >
            {" "}
            {formatDueDate(task.dueDate)}
          </Label>
        </div>

        <div style={{ marginLeft: "auto", justifySelf: "end" }}>
          <FaEdit
            onClick={() => setIsEditing(true)}
            style={{ color: "blue", cursor: "pointer" }}
          />
          {"  "}
          <FaTrashAlt
            onClick={() => handleDeleteItem(task.id)}
            style={{ color: "red", cursor: "pointer" }}
          />
        </div>
      </>
    );
  }

  const handleCheckboxChange = () => {
    handleChangeItem(task.id, !task.done, task.text, task.dueDate);
  };

  return (
    <div
      style={{
        marginLeft: "5%",
        marginRight: "5%",
        display: "flex",
        alignContent: "center",
        gap: "15%",
        fontSize: "1.2rem",
      }}
    >
      <Input
        type="checkbox"
        checked={task.done}
        onChange={handleCheckboxChange}
      />
      {content}
    </div>
  );
};

export default TaskList;
