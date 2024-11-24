import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import Alert from "@mui/material/Alert";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const AddTaskForm = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name || !description || !dueDate || !assignedTo) {
      setError("All fields are required");
      return;
    }

    //after sending value to app, making it ready for the next input by resetting it
    onAdd({ name, description, dueDate, assignedTo, status });

    setName("");
    setDescription("");
    setDueDate("");
    setAssignedTo("");
    setStatus("in-progress");
    setError("");
  };

  return (
    <Box component="form" onSubmit={onSubmit} sx={{ mt: 3 }}>
      <Divider>
        <Chip label="Add Task" size="small" />
      </Divider>
      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        label="Task Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={error}
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
        error={error}
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
        error={error}
      />
      <TextField
        label="Assigned To"
        variant="outlined"
        fullWidth
        margin="normal"
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
        error={error}
      />

      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          label="Status"
          variant="outlined"
          fullWidth
          margin="normal"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          error={error}
        >
          <MenuItem value="not-started">Not Started</MenuItem>
          <MenuItem value="in-progress">In-Progress</MenuItem>
          <MenuItem value="review">Review</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </Select>
      </FormControl>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        Save Task
      </Button>
      <Divider sx={{ pb: "16px" }} />
    </Box>
  );
};

export default AddTaskForm;
