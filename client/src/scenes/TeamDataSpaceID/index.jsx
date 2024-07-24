import React from 'react';
import { Box } from '@mui/material';
import Header from 'components/Header';

const TeamDataSpaceID = () => {

  return (
    <Box m="1.5rem 2.5rem" height="100vh" display="flex">
      {/* Right side content */}
      <Box flex="1" ml={4}>
        <Header
          title="Team Data Space"
          subtitle="Team Data Spaces with ID:."
        />
      </Box>
    </Box>
  );
};

export default TeamDataSpaceID;
