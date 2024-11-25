import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Header from "./components/Header";
import AddTaskForm from "./components/AddTaskForm";
import Tasks from "./components/Tasks";
import Footer from "./components/Footer";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [sortStatus, setSortStatus] = useState("");

  // Load tasks from localStorage on initial render
  //useEffect(callback, [variables to listen to] );

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
    setLoaded(true);
  }, []);

  // Save tasks to localStorage whenever tasks array changes
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add Task
  const addTask = (task) => {
    const newTask = { id: Date.now(), ...task };
    setTasks([...tasks, newTask]);
  };

  // Edit Task
  const editTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    // Optional: Save the updated task list to localStorage if needed
    localStorage.setItem('tasks', JSON.stringify(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))));

  };
  
    
  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Sort tasks by status
  const sortTasks = (status) => {
    setSortStatus(status);
  };

  const filteredTasks = sortStatus
    ? tasks.filter((task) => task.status === sortStatus)
    : tasks;

  return (
    <Container maxWidth="md">
      <Box
        sx={{ mt: 4, mb: 4, boxShadow: 3, padding: 3, borderRadius: 2 }}
        style={{ backgroundColor: "white" }}
      >
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />

        {showAddTask && <AddTaskForm onAdd={addTask} />}

        <Box display="flex" justifyContent="space-between" my={2}>
          {/* <Button
            variant="contained"
            color="primary"
            onClick={() => setShowAddTask(true)}
          >
            Add Task
          </Button> */}
          <Select
            value={sortStatus}
            onChange={(e) => sortTasks(e.target.value)}
            displayEmpty
          >
            <MenuItem value="">All Tasks</MenuItem>
            <MenuItem value={"not-started"}>Not Started</MenuItem>
            <MenuItem value={"in-progress"}>In-Progress</MenuItem>
            <MenuItem value={"review"}>Review</MenuItem>
            <MenuItem value={"completed"}>Completed</MenuItem>
          </Select>
        </Box>

        <Tasks tasks={filteredTasks} onEdit={editTask} onDelete={deleteTask} />

        <Footer />
      </Box>
    </Container>
  );
};

export default App;
