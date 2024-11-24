import React from "react";
import Task from "./Task";
import List from "@mui/material/List";

const Tasks = ({ tasks, onEdit, onDelete }) => {
  return (
    <List>
      {tasks.map((task) => (
        <Task key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </List>
  );
};

export default Tasks;
