import React from "react";
import Button from "@mui/material/Button";

const TaskStatusButton = ({ currentStatus, onButtonClick }) => {
  const getButtonLabel = () => {
    switch (currentStatus) {
      case "not-started":
        return "Accept Task";
      case "in-progress":
        return "Mark to Review";
      case "review":
        return "Mark Completed";
      case "completed":
        return "Reset Task"; // or any other relevant action
      default:
        return "Accept Task";
    }
  };

  return (
    <Button variant="outlined" onClick={onButtonClick}>
      {getButtonLabel()}
    </Button>
  );
};


export default TaskStatusButton;
