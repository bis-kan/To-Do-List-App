import React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const Header = ({ onAdd, showAdd }) => {
  return (
    <Box my-tag="header-box" display="flex" justifyContent="space-between" alignItems="center" mb={2}>
      <Typography variant="h4">Task Tracker</Typography>
      <Button variant="contained" color={showAdd ? 'secondary' : 'primary'} onClick={onAdd}>
        {showAdd ? 'Close' : 'Add Task'}
      </Button>
    </Box>
  );
};

export default Header;
