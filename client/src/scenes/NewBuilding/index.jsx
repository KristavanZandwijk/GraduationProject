import React from 'react';
import { Box } from '@mui/material';
import Header from 'components/Header';
import BuildingDrop from './Form';

const NewBuilding = () => {
  return (
    <Box 
      m="1.5rem 2.5rem" 
      height="100vh" 
      display="flex" 
      flexDirection="column" 
      alignItems="center"
      sx={{ 
        backgroundColor: (theme) => theme.palette.secondary.default,
        borderRadius: "1rem",
        padding: "2rem"
      }}
    >
      {/* Header */}
      <Box mb="2rem" width="100%">
      </Box>
      {/* Building Drop Form */}
      <Box width="100%" maxWidth="600px">
        <BuildingDrop />
      </Box>
    </Box>
  );
};

export default NewBuilding;
