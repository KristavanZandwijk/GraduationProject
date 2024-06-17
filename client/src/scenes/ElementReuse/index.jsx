import React from 'react';
import { Box, Grid, Typography } from '@mui/material'; // Importing Box, Grid, and Typography from @mui/material
import Header from 'components/Header';
import { useTheme } from '@mui/material'; // Importing useTheme from @mui/material

const ElementReuse = () => {
  const theme = useTheme();

  return (
    <Box m="1.5rem 2.5rem" display="flex">
      {/* Right side content */}
      <Box flex="1" ml={4}>
        <Header
          title="Element Reuse"
          subtitle="This page provides an element market place to stimulate the reuse of building components."
        />
        {/* Grid with one full-width box and two equal-sized boxes */}
        <Grid container spacing={2}>
          {/* Full-width box */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom color={theme.palette.secondary[100]} style={{ fontWeight: 'bold' }}>
              Search Query:
            </Typography>
            <Box
              sx={{
                backgroundColor: theme.palette.primary.main,
                padding: '1rem',
                borderRadius: '8px',
                height: '250px', // Example height, adjust as needed
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h5" color={theme.palette.secondary.main}>
                Here search queries should be provided to enable the user to search for components with specific requirements/ attributes/ characteristics.
              </Typography>
            </Box>
          </Grid>

          {/* Projects fulfilling request */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom color={theme.palette.secondary[100]} style={{ fontWeight: 'bold' }}>
              Elements to chose from:
            </Typography>
          </Grid>

          {/* Nested Grid for a 2x2 matrix */}
          <Grid container item xs={12} spacing={2}>
            {/* Project 1 */}
            <Grid item xs={6}>
              <Box
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  padding: '1rem',
                  borderRadius: '8px',
                  height: '200px', // Example height, adjust as needed
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h5" color={theme.palette.primary.main}>
                  Element 1<br />
                  (when one clicks on this element, it would be really cool if it directs to the related ElementDataSpace!)
                </Typography>
              </Box>
            </Grid>
            {/* Project 2 */}
            <Grid item xs={6}>
              <Box
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  padding: '1rem',
                  borderRadius: '8px',
                  height: '200px', // Example height, adjust as needed
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h5" color={theme.palette.primary.main}>
                  Element 2
                </Typography>
              </Box>
            </Grid>
            {/* Project 3 */}
            <Grid item xs={6}>
              <Box
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  padding: '1rem',
                  borderRadius: '8px',
                  height: '200px', // Example height, adjust as needed
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h5" color={theme.palette.primary.main}>
                  Element 3
                </Typography>
              </Box>
            </Grid>
            {/* Project 4 */}
            <Grid item xs={6}>
              <Box
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  padding: '1rem',
                  borderRadius: '8px',
                  height: '200px', // Example height, adjust as needed
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h5" color={theme.palette.primary.main}>
                  Element 4
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ElementReuse;
