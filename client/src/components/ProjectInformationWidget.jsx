import React from 'react';
import { Box, Typography, Paper, useTheme } from '@mui/material';

const ProjectInfo = ({ project, companies, handleProjectClick }) => {
  const theme = useTheme();

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
          {project.companies.map((company) => {
            const companyInfo = companies.find(c => c.companyID === company.companyID);
            return (
              <li key={company.companyID}>
                {companyInfo ? companyInfo.companyName : company.companyID}
              </li>
            );
          })}
        </ul>
        <Typography variant="subtitle1">
          <strong>Employees Involved:</strong>
        </Typography>
        <ul>
          {project.employees.map((employee) => (
            <li key={employee.personID}>{employee.personID}</li>
          ))}
        </ul>
        <Typography variant="subtitle1">
          <strong>Clients Involved:</strong>
        </Typography>
        <ul>
          {project.clients.map((client) => (
            <li key={client.personID}>{client.personID}</li>
          ))}
        </ul>
        <Typography variant="subtitle1">
          <strong>Buildings Involved:</strong>
        </Typography>
        <ul>
          {project.relatesTo.map((relateTo) => (
            <li key={relateTo.buildingID}>{relateTo.buildingID}</li>
          ))}
        </ul>
      </Box>
    </Paper>
  );
};

export default ProjectInfo;
