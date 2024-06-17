import React from 'react';
import { Box, Typography, Button } from '@mui/material'; // Import Typography from @mui/material
import Header from 'components/Header';
import { useTheme } from '@mui/material'; // Importing useTheme from @mui/material
const ElementPassport = () => {

  const theme = useTheme();

  return (
    <Box m="1.5rem 2.5rem" height="100vh" display="flex">
      {/* Right side content */}
      <Box flex="1" ml={4}>
        <Header
          title="Material Passports"
          subtitle="This page allows the user to generate component of building passports of authorized data."
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
              Visualization of the material passport.
            </Typography>
          </Box>
        </Box>
        <Box sx={{ position: 'absolute', bottom: '-5rem', right: '2.5rem' }}>
              <Button variant="contained" color="primary">
                Export
              </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ElementPassport
