import React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

/**
 * Header Component
 * 
 * This component displays the header section of the task management application.
 * It includes:
 * 1. A title ("Task Management App").
 * 2. A button that toggles between displaying "Add Task" and "Close" depending on the current state.
 * 
 * Props:
 * - `onAdd` (function): A callback function to handle the click event for the button (i.e., toggling the form visibility).
 * - `showAdd` defined at line81 (boolean): A boolean value that determines the button text ("Add Task" or "Close") and button color (primary or secondary).
 */

const Header = ({ onAdd, showAdd }) => {
  return (
    <Box
      my-tag="header-box"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={2}
    >
      <Typography variant="h4">Task Management App</Typography>
      <Button
        variant="contained"
        color={showAdd ? "secondary" : "primary"} // Changes color based on `showAdd` state
        onClick={onAdd} // Triggers the `onAdd` callback when clicked
      >
        {showAdd ? "Close" : "Add Task"}
      </Button>
    </Box>
  );
};

export default Header;
