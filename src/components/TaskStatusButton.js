import React from "react";
import Button from "@mui/material/Button";

const TaskStatusButton = ({ currentStatus, onButtonClick }) => {
  const getButtonLabel = () => {
    switch (currentStatus) {
      case "Not Status":
        return "Accept Task";
      case "In-progress":
        return "Mark to Review";
      case "Review":
        return "Mark Completed";
      case "Completed":
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
