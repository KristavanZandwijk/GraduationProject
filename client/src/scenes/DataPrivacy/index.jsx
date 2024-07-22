import React from 'react';
import { Box } from '@mui/material';
import Header from 'components/Header';

const DataPrivacy = () => {

  return (
    <Box m="1.5rem 2.5rem" height="100vh" display="flex">
      {/* Right side content */}
      <Box flex="1" ml={4}>
        <Header
          title="Data Privacy"
          subtitle="This page will show what data is shared with whom."
        />
      </Box>
    </Box>
  );
};

export default DataPrivacy;
