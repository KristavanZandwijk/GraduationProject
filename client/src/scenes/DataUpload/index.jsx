import React from 'react';
import { Box, Button } from '@mui/material';
import Header from 'components/Header';
import FileDrop from 'components/FileDrop';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const NewFile = () => {
  const { picturePath } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleConverterClick = () => {
    navigate('/dataupload/IFCtoRDFConverter'); 
  };
  
  return (
    <Box m="1.5rem 2.5rem" height="100vh" display="flex" flexDirection="column">
      {/* Header */}
      <Box flex="0 0 auto" mb="1rem">
        <Header
          title="Personal Data Space"
          subtitle="Here you can upload the data to your personal data space."
        />
      </Box>

      {/* IFC to RDF Converter Button */}
      <Box flex="0 0 auto" mb="1rem" display="flex" justifyContent="right">
        <Button variant="contained" color="primary" onClick={handleConverterClick}>
          IFC To RDF Converter
        </Button>
      </Box>

      {/* FileDrop Component */}
      <Box flex="1" display="left" flexDirection="column" alignItems="center" justifyContent="center">
        <FileDrop picturePath={picturePath} />
      </Box>
    </Box>
  );
};

export default NewFile;
