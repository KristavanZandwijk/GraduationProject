import React from 'react';
import { Box, Grid, Typography } from '@mui/material'; // Importing Box, Grid, and Typography from @mui/material
import Header from 'components/Header';
import { useTheme } from '@mui/material'; // Importing useTheme from @mui/material

const ProjectLearning = () => {
  const theme = useTheme();

  return (
    <Box m="1.5rem 2.5rem" display="flex">
      {/* Right side content */}
      <Box flex="1" ml={4}>
        <Header
          title="Project Learning"
          subtitle="This page gives insights into previous projects to stimulate project learning over time."
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
              Here search queries should be provided to enable the user to search for projects with specific requirements/ attributes/ characteristics.
              </Typography>
            </Box>
          </Grid>

          {/* Projects fulfilling request */}
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom color={theme.palette.secondary[100]} style={{ fontWeight: 'bold' }}>
              Projects to learn from:
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
                  Project 1
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
                  Project 2
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
                  Project 3
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
                  Project 4
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
export default ProjectLearning;
