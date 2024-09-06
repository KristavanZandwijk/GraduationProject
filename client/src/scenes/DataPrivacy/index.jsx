import React from 'react';
import { Box } from '@mui/material';
import Header from 'components/Header';
import IFCViewer3 from 'components/IFCViewer3';


const DataPrivacy = () => {
  return (
    <Box m="1.5rem 2.5rem">
      {/* Header at the top */}
      <Header
        title="Data Privacy"
        subtitle="This page will show what data is shared with whom."
      />
      
      {/* Viewer under the header */}
      <Box mt={4} height="80vh">
        <IFCViewer3 />
      </Box>
    </Box>
  );
};

export default DataPrivacy;
