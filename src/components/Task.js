import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import Box from "@mui/material/Box";
import TaskStatusButton from "./TaskStatusButton";
import { Stack } from "@mui/material";
import Divider from "@mui/material/Divider";

const Task = ({ task, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });
  const [status, setStatus] = useState("Not Started");

  const handleEdit = (e) => {
    e.preventDefault();
    setIsEditing(!isEditing);
    if (isEditing) {
      onEdit(editedTask);
    }
  };

  const handleButtonClick = () => {
    switch (status) {
      case "Not Started":
        setStatus("In-progress");
        break;
      case "In-progress":
        setStatus("Review");
        break;
      case "Review":
        setStatus("Completed");
        break;
      case "Completed":
        setStatus("Not Started"); // You can change this behavior if needed
        break;
      default:
        setStatus("Not Started");
        break;
    }
  };

  // Color background status
  const getStatusStyle = (status) => {
    switch (status) {
      case "Not Started":
        return { backgroundColor: "lightgray", color: "black" };
      case "In-progress":
        return { backgroundColor: "yellow", color: "black" };
      case "Review":
        return { backgroundColor: "blue", color: "white" };
      case "Completed":
        return { backgroundColor: "green", color: "white" };
      default:
        return { backgroundColor: "lightgray", color: "black" };
    }
  };

  //when the due dute is soon
  const isDueSoon = (dueDate) => {
    const currentDate = new Date();
    const taskDueDate = new Date(dueDate);
    const differenceInTime = taskDueDate - currentDate;
    const differenceInDays = differenceInTime / (1000 * 3600 * 24); // Convert milliseconds to days
    return differenceInDays >= 0 && differenceInDays <= 3; // Due within the next 3 days
  };

  //formatted date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0"); // Get day and pad it to 2 digits
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month (0-11) and pad it
    const year = date.getFullYear(); // Get year
    return `${day}-${month}-${year}`; // Return formatted date
  };

  // Reset task status to Not Status
  const resetTask = (e) => {
    e.preventDefault();
    setStatus("Not Started");
  };
  return (
    <Card
      sx={{
        mb: 2,
        border:
          status === "Completed" ? "2px solid green" : "2px solid lightgray", // Change border color based on status
        marginBottom: "1rem",
        transition: "border-color 0.3s", // Smooth transition for border color change
      }}
    >
      <CardContent>
        {!isEditing ? (
          <>
            <Box sx={{ pb: "16px" }}>
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  justifyContent: "space-between",
                }}
              >
                <Stack direction="row" spacing={2}>
                  <Typography variant="h6">{task.name}</Typography>
                  <Typography
                    variant="body2"
                    style={{
                      ...getStatusStyle(status),
                      padding: "6px",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {status}
                  </Typography>
                </Stack>
                <TaskStatusButton
                  currentStatus={status}
                  onButtonClick={handleButtonClick}
                />
              </Stack>
              <Divider sx={{ pb: "16px" }} />
            </Box>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ pb: "16px" }}
            >
              {task.description}
            </Typography>
            <Stack spacing={2} direction="column" sx={{ pb: "12px" }}>
              <Typography variant="body2">
                <span style={{ fontWeight: "bold" }}>Assigned to: </span>
                {task.assignedTo}
              </Typography>
              <Typography
                variant="body2"
                style={{ color: isDueSoon(task.dueDate) ? "red" : "black" }}
              >
                <span style={{ fontWeight: "bold" }}>Due Date: </span>
                {formatDate(task.dueDate)}
              </Typography>

              {/* <Typography variant="body2">
                <span style={{ fontWeight: "bold" }}>Status: </span>{" "}
              </Typography> */}
            </Stack>
          </>
        ) : (
          <>
            <Box
              component="form"
              sx={{ display: "flex", flexDirection: "column", gap: 1 }}
            >
              <input
                type="text"
                value={editedTask.name}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, name: e.target.value })
                }
              />
              <textarea
                value={editedTask.description}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, description: e.target.value })
                }
              ></textarea>
              <input
                type="date"
                value={editedTask.dueDate}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, dueDate: e.target.value })
                }
              />
              <input
                type="text"
                value={editedTask.assignedTo}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, assignedTo: e.target.value })
                }
              />
              <select
                value={editedTask.status}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, status: e.target.value })
                }
              >
                <option value="not-started">Not Started</option>
                <option value="in-progress">In-Progress</option>
                <option value="review">Review</option>
                <option value="completed">Completed</option>
              </select>
            </Box>
          </>
        )}
      </CardContent>
      <Divider />
      <Box
        sx={{ display: "flex", justifyContent: "flex-end", gap: 1, padding: 1 }}
      >
        <IconButton onClick={handleEdit} color="primary">
          {!isEditing ? <EditIcon /> : <SaveIcon />}
        </IconButton>
        <IconButton onClick={() => onDelete(task.id)} color="error">
          <DeleteIcon />
        </IconButton>
      </Box>
    </Card>
  );
};

export default Task;
