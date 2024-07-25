// TeamInformationWidget.js
import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';

const TeamInformationWidget = ({ team }) => {
  if (!team) {
    return <Typography>Loading team information...</Typography>;
  }

  return (
    <Box mt={4}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom>
          {team.teamName}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Team ID:</Typography>
            <Typography>{team.teamID}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Data Space ID:</Typography>
            <Typography>{team.teamDataSpaceID}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Companies:</Typography>
            {team.companies && team.companies.map((company, index) => (
              <Typography key={index}>{company}</Typography>
            ))}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Clients:</Typography>
            {team.clients && team.clients.map((client, index) => (
              <Typography key={index}>{client}</Typography>
            ))}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Projects:</Typography>
            {team.projects && team.projects.map((project, index) => (
              <Typography key={index}>{project}</Typography>
            ))}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default TeamInformationWidget;
