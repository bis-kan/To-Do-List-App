import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const Task = ({ task, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleEdit = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      onEdit(editedTask);
    }
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        {!isEditing ? (
          <>
            <Typography variant="h6">{task.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              {task.description}
            </Typography>
            <Typography variant="body2">Due: {task.dueDate}</Typography>
            <Typography variant="body2">Assigned to: {task.assignedTo}</Typography>
            <Typography variant="body2">Status: {task.status}</Typography>
          </>
        ) : (
          <>
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <input
                type="text"
                value={editedTask.name}
                onChange={(e) => setEditedTask({ ...editedTask, name: e.target.value })}
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
                onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
              />
              <input
                type="text"
                value={editedTask.assignedTo}
                onChange={(e) => setEditedTask({ ...editedTask, assignedTo: e.target.value })}
              />
              <select
                value={editedTask.status}
                onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value })}
              >
                <option value="in-progress">In-Progress</option>
                <option value="completed">Completed</option>
                <option value="review">Review</option>
              </select>
            </Box>
          </>
        )}
      </CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, padding: 1 }}>
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
