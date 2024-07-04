import React from 'react';
import { Box } from '@mui/material';
import Header from 'components/Header';

const CompanyDataSpace = () => {

  return (
    <Box m="1.5rem 2.5rem" height="100vh" display="flex">
      {/* Right side content */}
      <Box flex="1" ml={4}>
        <Header
          title="Company Data Space"
          subtitle="This page will show the files of your company that are accessible to you."
        />
      </Box>
    </Box>
  );
};

export default CompanyDataSpace;
