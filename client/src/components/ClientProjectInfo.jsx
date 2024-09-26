import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Button, useTheme, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ClientProjectInfo = ({ project, companies, users: propUsers, buildings }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState(
    Array.isArray(project.companies) ? project.companies.map(comp => comp.companyID) : []
  );

  const user = useSelector((state) => state.user); // Get the current logged-in user

  useEffect(() => {
    setUsers(propUsers);
  }, [propUsers]);

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

  const handleViewProjectDataSpace = () => {
    navigate(`/clientdataspace/project/${project.projectID}`);
  };

  // Filter companies to only include those related to the project
  const filteredCompanies = companies.filter(company => selectedCompanies.includes(company.companyID));

  return (
    <Paper elevation={3} sx={{ borderRadius: 10, p: 3 }}>
      <Typography color={theme.palette.secondary.main} fontWeight="bold" variant="h5" gutterBottom>
        Project Information
      </Typography>
      <Box display="flex" flexDirection="column">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              <strong>Project Name:</strong> {project.projectName}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              <strong>Project Description:</strong> {project.projectDescription}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              <strong>Project ID:</strong> {project.projectID}
            </Typography>
          </Grid>
        </Grid>

        <Box mt={3}>
          <Typography fontWeight="bold" variant="subtitle1" gutterBottom>
            Companies:
          </Typography>
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map((company) => (
              <Typography key={company.companyID} variant="subtitle1">
                {company.companyName} - {company.companyID}
              </Typography>
            ))
          ) : (
            <Typography variant="subtitle1">No companies</Typography>
          )}
        </Box>

        <Box mt={3}>
          <Typography fontWeight="bold" variant="subtitle1" gutterBottom>
            Project Leader(s):
          </Typography>
          {Array.isArray(project.projectleader) && project.projectleader.length > 0 ? (
            project.projectleader.map((leader) => (
              <Typography key={leader.personID} variant="subtitle1">
                {getUserName(leader.personID)} - {leader.personID}
              </Typography>
            ))
          ) : (
            <Typography variant="subtitle1">No project leader(s)</Typography>
          )}
        </Box>

        <Box mt={3}>
          <Typography fontWeight="bold" variant="subtitle1" gutterBottom>
            Employees:
          </Typography>
          {Array.isArray(project.employees) && project.employees.length > 0 ? (
            project.employees.map((employee) => (
              <Typography key={employee.personID} variant="subtitle1">
                {getUserName(employee.personID)} - {employee.personID}
              </Typography>
            ))
          ) : (
            <Typography variant="subtitle1">No employees</Typography>
          )}
        </Box>

        <Box mt={3}>
          <Typography fontWeight="bold" variant="subtitle1" gutterBottom>
            Client(s):
          </Typography>
          {Array.isArray(project.clients) && project.clients.length > 0 ? (
            project.clients.map((client) => (
              <Typography key={client.personID} variant="subtitle1">
                {getUserName(client.personID)} - {client.personID}
              </Typography>
            ))
          ) : (
            <Typography variant="subtitle1">No client(s)</Typography>
          )}
        </Box>

        <Box mt={3}>
          <Typography fontWeight="bold" variant="subtitle1" gutterBottom>
            Related to building(s):
          </Typography>
          {Array.isArray(project.relatesTo) && project.relatesTo.length > 0 ? (
            project.relatesTo.map((building) => (
              <Typography key={building.buildingID} variant="subtitle1">
                {getBuildingName(building.buildingID)} - {building.buildingID}
              </Typography>
            ))
          ) : (
            <Typography variant="subtitle1">No building(s)</Typography>
          )}
        </Box>
      </Box>
      <Button
        variant="outlined"
        color="secondary"
        sx={{ mt: 2 }}
        onClick={handleViewProjectDataSpace}
      >
        View Project in Client View
      </Button>
    </Paper>
  );
};

export default ClientProjectInfo;
