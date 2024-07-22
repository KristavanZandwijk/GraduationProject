// src/pages/IFCtoRDFPage.js

import React from 'react';
import { Box } from '@mui/material';
import Header from 'components/Header';
import IFCtoRDFConverter from 'components/IFCtoRDFconverter';

const IFCtoRDFPage = () => {
  return (
    <Box m="1.5rem 2.5rem" height="100vh" display="flex" flexDirection="column">
      <Box flex="0 0 auto" mb="1rem">
        <Header
          title="IFC to RDF Converter"
          subtitle="Here you can convert your IFC file to RDF."
        />
      </Box>
      <Box flex="1" display="flex" alignItems="center" justifyContent="center">
        <IFCtoRDFConverter />
      </Box>
    </Box>
  );
};

export default IFCtoRDFPage;
