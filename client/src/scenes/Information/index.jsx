import React from 'react';
import { Box } from '@mui/material';
import Header from 'components/Header';

const Information = () => {

  return (
    <Box m="1.5rem 2.5rem" height="100vh" display="flex">
      {/* Right side content */}
      <Box flex="1" ml={4}>
        <Header
          title="Information"
          subtitle="This page explains how the AECO data space works."
        />
      </Box>
    </Box>
  );
};

export default Information;
