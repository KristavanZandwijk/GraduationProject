import React from 'react';
import { Box } from '@mui/material';
import Header from 'components/Header';
import FileDrop from 'components/FileDrop';
import { useSelector } from 'react-redux';

const NewFile = () => {
const { picturePath } = useSelector((state) => state.user);

return (
<Box m="1.5rem 2.5rem" height="100vh" display="flex" flexDirection="column">
{/* Header */}
<Box flex="0 0 auto">
<Header
       title="Personal Data Space"
       subtitle="Here you can upload the data to your personal data space."
     />
</Box>

  {/* FileDrop Component */}
  <Box flex="1" mt="1rem">
    <FileDrop picturePath={picturePath} />
  </Box>
</Box>
);
};

export default NewFile;