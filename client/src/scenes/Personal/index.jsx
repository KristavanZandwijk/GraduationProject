import React from 'react';
import { Box, Button } from '@mui/material';
import Header from 'components/Header';

const Personal = () => {

  const redirectToIfcViewerHTML = () => {
    window.location.href = 'http://localhost:1002/client/src/components/IfcviewerHTML/index.html';
  };

  return (
    <Box m="1.5rem 2.5rem" height="100vh" display="flex" flexDirection="column">
      {/* Header */}
      <Box flex="0 0 auto">
        <Header
          title="Personal Data Space"
          subtitle="This page will show your data."
        />
      </Box>

      {/* Button */}
      <Box flex="0 0 auto">
        <Button onClick={redirectToIfcViewerHTML} variant="contained" color="primary">
          Open IFC Viewer
        </Button>
      </Box>
    </Box>
  );
};

export default Personal;
