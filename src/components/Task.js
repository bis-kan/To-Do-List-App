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

/**
 * Task Component
 * 
 * Displays individual task details with options to edit, delete, and change the task's status.
 * The component allows toggling between viewing and editing the task details.
 * 
 * Props:
 * - `task` (object): The task object containing the task's details (name, description, assignedTo, etc.).
 * - `onEdit` (function): Callback function to handle task editing (usually to update the task in the parent component).
 * - `onDelete` (function): Callback function to handle task deletion.
 */

const Task = ({ task, onEdit, onDelete }) => {
  // useState hooks to manage local state for editing mode and edited task data
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  /**
   * Updates the status of the task and triggers the onEdit callback.
   */

  const setStatus = (newStatus) => {
    const updatedTask = { ...editedTask, status: newStatus };
    onEdit(updatedTask); //Calling the parent component's onEdit function to update the task
    setEditedTask(updatedTask); // Updating the local state with the new task details
  }

  const handleEdit = (e) => {
    e.preventDefault();
    setIsEditing(!isEditing); // Toggle editing mode
    if (isEditing) {
      onEdit(editedTask); // Save the edited task if switching to view mode
    }
  };

   /**
   * Handles the status change when the task status button is clicked.
   * The status cycles through a predefined set of statuses: not-started, in-progress, review, and completed.
   */
  
  const handleButtonClick = () => {
    switch (editedTask.status) {
      case "not-started":
        setStatus("in-progress");
        break;
      case "in-progress":
        setStatus("review");
        break;
      case "review":
        setStatus("completed");
        break;
      case "completed":
        setStatus("not-started"); // You can change this behavior if needed
        break;
      default:
        setStatus("not-started");
        break;
    }
  };

  

  // Color background status
  const getStatusStyle = (status) => {
    switch (status) {
      case "not Started":
        return { backgroundColor: "lightgray", color: "black" };
      case "in-progress":
        return { backgroundColor: "yellow", color: "black" };
      case "review":
        return { backgroundColor: "blue", color: "white" };
      case "completed":
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
    setStatus({
    name: "", // Initial name
    description: "", // Initial description
    dueDate: new Date(), // Today's date (or some default value)
    assignedTo: "", // Initial assigned to
    status: "Not Started", // Initial status
  });
  };
  return (
    <Card
      sx={{
        mb: 2,
        border:
        editedTask.status === "completed" ? "2px solid green" : "2px solid lightgray", // Change border color based on status
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
                      ...getStatusStyle(editedTask.status),
                      padding: "6px",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {editedTask.status}
                  </Typography>
                </Stack>
                <TaskStatusButton
                  currentStatus={editedTask.status}
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
        <IconButton onClick={resetTask} color="primary"></IconButton>
      </Box>
    </Card>
  );
};

export default Task;
