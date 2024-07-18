import React from 'react';
import { Box, Typography, Paper, useTheme } from '@mui/material';

const ProjectInfo = ({ project, companies, users, buildings, handleProjectClick }) => {
  const theme = useTheme();

  const getCompanyName = (companyID) => {
    const company = companies.find(c => c.companyID === companyID);
    return company ? company.companyName : companyID;
  };

  const getUserName = (personID) => {
    const user = users.find(u => u.personID === personID);
    return user ? `${user.firstName} ${user.lastName}` : personID;
  };

  const getBuildingName = (buildingID) => {
    const building = buildings.find(b => b.buildingID === buildingID);
    return building ? building.buildingName : buildingID;
  };

  return (
    <Paper elevation={3} sx={{ borderRadius: 10 }}>
      <Box p={2}>
        <Typography
          variant="subtitle1"
          onClick={() => handleProjectClick(project.projectID)}
          sx={{ cursor: 'pointer', color: theme.palette.secondary.main }}
        >
          <strong>Project Name:</strong> {project.projectName}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Project ID:</strong> {project.projectID}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Description:</strong> {project.projectDescription}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Companies Involved:</strong>
        </Typography>
        <ul>
          {project.companies.map((company) => (
            <li key={company.companyID}>
              {getCompanyName(company.companyID)} - {company.companyID}
            </li>
          ))}
        </ul>
        <Typography variant="subtitle1">
          <strong>Employees Involved:</strong>
        </Typography>
        <ul>
          {project.employees.map((employee) => (
            <li key={employee.personID}>{getUserName(employee.personID)} - {employee.personID}</li>
          ))}
        </ul>
        <Typography variant="subtitle1">
          <strong>Clients Involved:</strong>
        </Typography>
        <ul>
          {project.clients.map((client) => (
            <li key={client.personID}>{getUserName(client.personID)} - {client.personID}</li>
          ))}
        </ul>
        <Typography variant="subtitle1">
          <strong>Buildings Involved:</strong>
        </Typography>
        <ul>
          {project.relatesTo.map((relateTo) => (
            <li key={relateTo.buildingID}>{getBuildingName(relateTo.buildingID)} - {relateTo.buildingID}</li>
          ))}
        </ul>
      </Box>
    </Paper>
  );
};

export default ProjectInfo;
