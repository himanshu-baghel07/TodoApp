import {
  Box,
  Button,
  Card,
  CardContent,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { motion } from "framer-motion";

const TaskList = ({ task, handleChangeItem, handleDeleteItem }) => {
  const [Open, setOpen] = useState(false);
  const [editedText, setEditedText] = useState(task.text);
  const [editedDueDate, setEditedDueDate] = useState(task.dueDate);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleTextChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleDueDateChange = (e) => {
    setEditedDueDate(e.target.value);
  };

  const handleDoneClick = () => {
    setOpen(false);
    handleChangeItem(task.id, task.done, editedText, editedDueDate);
  };

  const handleCheckboxChange = () => {
    handleChangeItem(task.id, !task.done, task.text, task.dueDate);
  };

  const formatDueDate = (date) => {
    const formattedDate = new Date(date);
    const day = formattedDate.getDate();
    const month = formattedDate.getMonth() + 1;
    const year = formattedDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div>
      <Modal
        open={Open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box id="modalView">
          <Typography
            sx={{
              textAlign: "center",
              marginBottom: "10px",
              fontSize: "1.5rem",
            }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Change User Details
          </Typography>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-evenly",
              padding: "10px",
            }}
          >
            <TextField
              fullWidth
              type="text"
              value={editedText}
              onChange={handleTextChange}
            />
            <TextField
              fullWidth
              type="date"
              value={editedDueDate}
              onChange={handleDueDateChange}
            />

            <Button
              sx={{
                color: "white",
                backgroundColor: "green",
                "&:hover": { backgroundColor: "darkgreen" },
              }}
              onClick={handleDoneClick}
            >
              Done
            </Button>
          </Box>
        </Box>
      </Modal>
      <Box id="box1">
        <Box
          style={{
            display: "flex",

            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Card
            component={motion.div}
            initial={{ scale: 0 }}
            animate={{
              scale: 1,
              transition: { duration: 0.5, delay: 1 },
              rotate: 360,
            }}
            id="card"
            style={{
              height: "300px",
              width: "300px",
              padding: "10px",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-evenly",
                height: "100%",
              }}
            >
              <Checkbox
                checked={task.done}
                onChange={handleCheckboxChange}
                sx={{
                  width: "3rem",
                  height: "3rem",
                  "& .MuiSvgIcon-root": {
                    fontSize: "3rem",
                  },
                  color: "navy",
                }}
              />
              <Typography
                variant="h5"
                sx={{
                  fontFamily: "serif",
                  fontWeight: "600",
                  textShadow: "1px 5px 7px white",

                  borderRadius: "10px",
                }}
              >
                {" "}
                {task.text}
              </Typography>

              <Typography variant="body1">
                Due Date: {formatDueDate(task.dueDate)}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "600",
                  fontFamily: "serif",

                  color: task.done
                    ? "#56fc58"
                    : "#fffff" &&
                      task.dueDate < new Date().toISOString().slice(0, 10)
                    ? task.done
                      ? "#56fc58"
                      : "#d4150b"
                    : "#fff",
                }}
              >
                Status:{" "}
                {task.done
                  ? "Completed"
                  : "Open" &&
                    task.dueDate < new Date().toISOString().slice(0, 10)
                  ? task.done
                    ? "Completed"
                    : "Overdue"
                  : "Open"}
              </Typography>

              <Button
                fullWidth
                onClick={handleOpen}
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Edit
              </Button>
              {"  "}
              <Button
                fullWidth
                onClick={() => handleDeleteItem(task.id)}
                style={{
                  backgroundColor: "red",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Delete
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </div>
  );
};

export default TaskList;
