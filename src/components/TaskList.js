import React, { useState } from "react";
import { Button, Input, Label } from "reactstrap";

const TaskList = ({ task, handleChangeItem, handleDeleteItem }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);

  const handleTextChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleDoneClick = () => {
    setIsEditing(false);
    handleChangeItem(task.id, task.done, editedText);
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
        <Input value={editedText} onChange={handleTextChange} />
        <Button onClick={handleDoneClick}>Done</Button>
      </>
    );
  } else {
    content = (
      <>
        <Label> {task.text}</Label>
        <Label> {task.dueDate}</Label>
        <Button onClick={() => setIsEditing(true)}>Edit</Button>
      </>
    );
  }

  const handleCheckboxChange = () => {
    handleChangeItem(task.id, !task.done, task.text);
  };

  return (
    <Label
      style={{ marginLeft: "5%", display: "flex", alignContent: "center" }}
    >
      <Input
        type="checkbox"
        checked={task.done}
        onChange={handleCheckboxChange}
      />
      {content}

      <Button onClick={() => handleDeleteItem(task.id)}>Delete</Button>
    </Label>
  );
};

export default TaskList;
