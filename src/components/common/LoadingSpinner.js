import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const LoadingSpinner = ({ size = 40, color = 'primary' }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="200px"
    >
      <CircularProgress 
        size={size} 
        color={color}
        thickness={4}
      />
    </Box>
  );
};

export default LoadingSpinner;
