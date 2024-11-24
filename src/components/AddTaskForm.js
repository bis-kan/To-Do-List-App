import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const AddTaskForm = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [status, setStatus] = useState('in-progress');
  const [error, setError] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name || !description || !dueDate || !assignedTo) {
      setError('All fields are required');
      return;
    }
    //after sending value to app, making it ready for the next input by resetting it
    onAdd({ name, description, dueDate, assignedTo, status });

    setName('');
    setDescription('');
    setDueDate('');
    setAssignedTo('');
    setStatus('in-progress');
    setError('');
  };

  return (
    <Box component="form" onSubmit={onSubmit} sx={{ mt: 3 }}>
      {error && (
        <Typography color="error" variant="body2" gutterBottom>
          {error}
        </Typography>
      )}
      <TextField
        label="Task Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="Description"
        variant="outlined"
        multiline
        rows={4}
        fullWidth
        margin="normal"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        label="Due Date"
        type="date"
        variant="outlined"
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <TextField
        label="Assigned To"
        variant="outlined"
        fullWidth
        margin="normal"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
      />
      <Select
        label="Status"
        variant="outlined"
        fullWidth
        margin="normal"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <MenuItem value="in-progress">In-Progress</MenuItem>
        <MenuItem value="completed">Completed</MenuItem>
        <MenuItem value="review">Review</MenuItem>
      </Select>
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Save Task
      </Button>
    </Box>
  );
};

export default AddTaskForm;
