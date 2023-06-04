import React, { useState } from "react";

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

  let content;
  if (isEditing) {
    content = (
      <>
        <input value={editedText} onChange={handleTextChange} />
        <button onClick={handleDoneClick}>Done</button>
      </>
    );
  } else {
    content = (
      <>
        {task.text}
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </>
    );
  }

  const handleCheckboxChange = () => {
    handleChangeItem(task.id, !task.done, task.text);
  };

  return (
    <label>
      <input
        type="checkbox"
        checked={task.done}
        onChange={handleCheckboxChange}
      />
      {content}
      <button onClick={() => handleDeleteItem(task.id)}>Delete</button>
    </label>
  );
};

export default TaskList;
