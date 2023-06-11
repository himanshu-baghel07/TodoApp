import { DeleteForever, Edit } from "@mui/icons-material";
import { Box, Button, Input, List } from "@mui/material";
import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";

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
  const gui = task.dueDate;

  console.log("dddd", formatDueDate(gui));
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
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "50%",
          }}
        >
          <List
            style={{
              width: "70%",
              wordWrap: "break-word",

              borderLeft: "2px solid black",
              paddingLeft: "10px",
            }}
          >
            {" "}
            {task.text}
          </List>
          <List
            style={{
              width: "20%",
              borderLeft: "2px solid black",
              paddingLeft: "10px",
            }}
          >
            {" "}
            {formatDueDate(task.dueDate)}
          </List>
        </Box>

        <Box
          style={{
            marginLeft: "auto",
            justifySelf: "end",
            display: "flex",
            alignItems: "center",
            gap: { md: "10px", xs: 0 },
          }}
        >
          <Edit
            onClick={() => setIsEditing(true)}
            style={{ color: "blue", cursor: "pointer" }}
          />
          {"  "}
          <DeleteForever
            onClick={() => handleDeleteItem(task.id)}
            style={{ color: "red", cursor: "pointer" }}
          />
        </Box>
      </>
    );
  }

  const handleCheckboxChange = () => {
    handleChangeItem(task.id, !task.done, task.text, task.dueDate);
  };

  return (
    <Box id="box1">
      <Checkbox
        checked={task.done}
        onChange={handleCheckboxChange}
        style={{
          cursor: "pointer",
          fontSize: "1.5rem",
          color: "blue",
        }}
      />
      {content}
    </Box>
  );
};

export default TaskList;
