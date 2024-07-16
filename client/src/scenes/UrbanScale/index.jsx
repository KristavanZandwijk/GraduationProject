import React from 'react';
import { Box } from '@mui/material';
import Header from 'components/Header';
import MapViewer from 'components/MapViewer';

const UrbanScale = () => {
  return (
    <Box m="1.5rem 2.5rem" height="100vh" display="flex" flexDirection="column">
      {/* Header component */}
      <Box mb={2}>
        <Header
          title="This page visualizes the urban scale of the data."
          subtitle="This map shows the collection of building data spaces"
        />
      </Box>
      {/* MapViewer component */}
      <Box flex="1">
        <MapViewer />
      </Box>
    </Box>
  );
};

export default UrbanScale;
