import React from 'react';
import { Box, Paper, Typography, useTheme } from '@mui/material';

const ProjectList = ({ projects }) => {
  const theme = useTheme();

  return (
    <Paper elevation={3} sx={{ borderRadius: 10 }}>
      <Box p={3}>
      <Typography color={theme.palette.secondary.main} fontWeight="bold" variant="h5" gutterBottom>
          Projects
        </Typography>
        {projects.map((project, index) => (
          <Typography key={index} variant="subtitle1">
            {project.projectID}
          </Typography>
        ))}
      </Box>
    </Paper>
  );
};

export default ProjectList;