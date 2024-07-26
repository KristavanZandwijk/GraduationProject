import React from 'react';
import { Box, Typography, Paper, useTheme } from '@mui/material';

const TeamInformationWidget = ({ selectedTeam, users, companies, projects, handleTeamClick }) => {
  const theme = useTheme();

  const getClientName = (personID) => {
    const user = users.find(u => u.personID === personID);
    return user ? `${user.firstName} ${user.lastName}` : personID;
  };

  const getCompanyName = (companyID) => {
    const company = companies.find(c => c.companyID === companyID);
    return company ? company.companyName : companyID;
  };

  const getProjectName = (projectID) => {
    const project = projects.find(p => p.projectID === projectID);
    return project ? project.projectName : projectID;
  };

  const renderArrayItems = (items, getName, getID) => {
    if (!items || items.length === 0) return 'None';
    return items.map((item, index) => (
      <li key={index}>
        <Typography variant="subtitle1">
          {getName(getID(item))} - {getID(item)}
        </Typography>
      </li>
    ));
  };

  if (!selectedTeam) {
    return <Typography variant="h6" fontWeight="bold">No team selected or team not found.</Typography>;
  }

  return (
    <Paper elevation={3} sx={{ borderRadius: 10 }}>
      <Box p={2}>
      <Typography
        variant="subtitle1"
        onClick={() => handleTeamClick(selectedTeam.teamDataSpaceID)} // Ensure this is calling the function correctly
        sx={{ cursor: 'pointer', color: theme.palette.secondary.main }}
      >
        <strong>Team Name:</strong> {selectedTeam.teamName}
      </Typography>

        <Typography variant="subtitle1">
          <strong>Team ID:</strong> {selectedTeam.teamID}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Data Space ID:</strong> {selectedTeam.teamDataSpaceID}
        </Typography>

        <Box mt={3}>
          <Typography fontWeight="bold" variant="subtitle1" gutterBottom>
            Clients:
          </Typography>
          <ul>
            {renderArrayItems(selectedTeam.clients, getClientName, item => item.personID)}
          </ul>
        </Box>

        <Box mt={3}>
          <Typography fontWeight="bold" variant="subtitle1" gutterBottom>
            Companies:
          </Typography>
          <ul>
            {renderArrayItems(selectedTeam.companies, getCompanyName, item => item.companyID)}
          </ul>
        </Box>

        <Box mt={3}>
          <Typography fontWeight="bold" variant="subtitle1" gutterBottom>
            Projects:
          </Typography>
          <ul>
            {renderArrayItems(selectedTeam.projects, getProjectName, item => item.projectID)}
          </ul>
        </Box>
      </Box>
    </Paper>
  );
};

export default TeamInformationWidget;
