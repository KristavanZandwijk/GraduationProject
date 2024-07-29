import React from 'react';
import { Box, Button  } from '@mui/material';
import Header from 'components/Header';
import FileTable from 'components/FilesInformation';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Personal = () => {
const { picturePath } = useSelector((state) => state.user);
const navigate = useNavigate();

return (
<Box m="1.5rem 2.5rem" height="100vh" display="flex" flexDirection="column">
{/* Header */}
<Box flex="0 0 auto">
<Header
       title="Personal Data Space"
       subtitle="Here you can see all information that is stored in your personal data space."
     />
</Box>
<Box display="flex" justifyContent="flex-end" mb={1}>
        <Button variant="contained" color="primary" onClick={() => navigate('/dataupload')}>
          Upload Data Here
        </Button>
      </Box>
  
  {/* FileTable Component */}
  <Box flex="1" mt="1rem">
    <FileTable />
  </Box>
</Box>
);
};

export default Personal;