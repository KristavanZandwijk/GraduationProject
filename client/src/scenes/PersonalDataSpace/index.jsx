import React from 'react';
import { Box } from '@mui/material';
import Header from 'components/Header';
import FileTable from 'components/FilesInformation';
import { useSelector } from 'react-redux';

const Personal = () => {
const { picturePath } = useSelector((state) => state.user);

return (
<Box m="1.5rem 2.5rem" height="100vh" display="flex" flexDirection="column">
{/* Header */}
<Box flex="0 0 auto">
<Header
       title="Personal Data Space"
       subtitle="Here you can see all information that is stored in your personal data space."
     />
</Box>
  
  {/* FileTable Component */}
  <Box flex="1" mt="1rem">
    <FileTable />
  </Box>
</Box>
);
};

export default Personal;