import React from 'react';
import { Box, Typography, Button } from '@mui/material'; // Import Typography from @mui/material
import Header from 'components/Header';
import { useTheme } from '@mui/material'; // Importing useTheme from @mui/material

const ElementDataSpace = () => {
  const theme = useTheme();
  const redirectToIfcViewerHTML = () => {
    window.location.href = 'http://localhost:1002/client/src/components/IfcviewerHTML/index.html';
  };

  return (
    <Box m="1.5rem 2.5rem" height="100vh" display="flex">
      {/* Right side content */}
      <Box flex="1" ml={4}>
        <Header
          title="Element Data Space"
          subtitle="This page gives a general overview of the element data space authorized by the user."
        />
<Box display="flex" justifyContent="space-between" height="100%">
          {/* Left box */}
          <Box
            width="48%" // Set width to 48% for equal sizing with space in between
            sx={{
              backgroundColor: theme.palette.primary.main,
              padding: '1rem',
              borderRadius: '8px',
              height: '75%', // Set height to 100% of parent container
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mt: '2rem', // Margin top added to move the box lower
            }}
          >
            <Typography variant="h5" color={theme.palette.secondary.main}>
              Selection Options must be shown here
            </Typography>

          </Box>
          {/* Right box */}
          <Box
            width="48%" // Set width to 48% for equal sizing with space in between
            sx={{
              backgroundColor: theme.palette.secondary.main,
              padding: '1rem',
              borderRadius: '8px',
              height: '75%', // Set height to 100% of parent container
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mt: '2rem', // Margin top added to move the box lower
            }}
          >
            <Typography variant="h5" color={theme.palette.primary.main}>
              The IFC Viewer showing the element must be displayed here.
            </Typography>
          </Box>
        </Box>
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

export default ElementDataSpace
