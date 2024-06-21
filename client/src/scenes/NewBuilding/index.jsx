import React from 'react';
import { Box } from '@mui/material';
import Header from 'components/Header';
import BuildingDrop from './Form';

const NewBuilding = () => {

  return (
    <Box m="1.5rem 2.5rem" height="100vh" display="flex">
      {/* Right side content */}
      <Box flex="1" ml={4}>
        <Header
          title="New Building"
          subtitle="This page enables users to make a new building."
        />
      </Box>
      <BuildingDrop/>
    </Box>
  );
};

export default NewBuilding;
