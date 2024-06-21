import React from 'react';
import { Box } from '@mui/material';
import Header from 'components/Header';
import ElementDrop from './Form';

const NewElement = () => {

  return (
    <Box m="1.5rem 2.5rem" height="100vh" display="flex">
      {/* Right side content */}
      <Box flex="1" ml={4}>
        <Header
          title="New Element"
          subtitle="This page enables users to make a new element."
        />
      </Box>
      <ElementDrop/>
    </Box>
  );
};

export default NewElement;
