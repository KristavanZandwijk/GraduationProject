import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Button, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setUsers, setCompanies } from 'state';

const ClientTeamInfo = ({ team, onTeamUpdate }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.token);
  const users = useSelector((state) => state.users || []);
  const companies = useSelector((state) => state.companies || []);
  const projects = useSelector((state) => state.projects || []);
  const user = useSelector((state) => state.user); // Get the current logged-in user

  const filteredCompanies = companies.filter(company =>
    team.companies.map(c => c.companyID).includes(company.companyID)
  );

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5001/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setUsers(Array.isArray(response.data) ? response.data : []));
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    const fetchCompanies = async () => {
      try {
        const response = await axios.get("http://localhost:5001/companies/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setCompanies(Array.isArray(response.data) ? response.data : []));
      } catch (error) {
        console.error("Failed to fetch companies:", error);
      }
    };

    fetchUsers();
    fetchCompanies();
  }, [token, dispatch]);

  const getUserName = (personID) => {
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

  const handleViewTeamDataSpace = () => {
    navigate(`/clientdataspace/team/${team.teamID}`);
  };

  return (
    <Paper elevation={3} sx={{ borderRadius: 10, p: 3 }}>
      <Box>
        <Typography color={theme.palette.secondary.main} fontWeight="bold" variant="h5" gutterBottom>
          Team Information
        </Typography>
        <Typography variant="subtitle1">
          <strong>Team Name:</strong> {team.teamName}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Team ID:</strong> {team.teamID}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Team Data Space:</strong> {team.teamDataSpaceID}
        </Typography>

        <Box mt={3}>
          <Typography fontWeight="bold" variant="subtitle1" gutterBottom>
            Client(s):
          </Typography>
          {Array.isArray(team.clients) && team.clients.length > 0 ? (
            team.clients.map((clients) => (
              <Typography key={clients.personID} variant="subtitle1">
                {getUserName(clients.personID)} - {clients.personID}
              </Typography>
            ))
          ) : (
            <Typography variant="subtitle1">No client(s)</Typography>
          )}
        </Box>

        <Box mt={3}>
          <Typography fontWeight="bold" variant="subtitle1" gutterBottom>
            Team Leader(s):
          </Typography>
          {Array.isArray(team.teamleader) && team.teamleader.length > 0 ? (
            team.teamleader.map((leader) => (
              <Typography key={leader.personID} variant="subtitle1">
                {getUserName(leader.personID)} - {leader.personID}
              </Typography>
            ))
          ) : (
            <Typography variant="subtitle1">No team leader(s)</Typography>
          )}
        </Box>

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
            <Typography variant="subtitle1">No companies involved in the team</Typography>
          )}
        </Box>

        <Box mt={3}>
          <Typography fontWeight="bold" variant="subtitle1" gutterBottom>
            Project(s):
          </Typography>
          {Array.isArray(team.projects) && team.projects.length > 0 ? (
            team.projects.map((project) => (
              <Typography key={project.projectID} variant="subtitle1">
                {getProjectName(project.projectID)} - {project.projectID}
              </Typography>
            ))
          ) : (
            <Typography variant="subtitle1">No project(s)</Typography>
          )}
        </Box>
      </Box>
      <Button
        variant="outlined"
        color='secondary'
        sx={{ mt: 2 }}
        onClick={handleViewTeamDataSpace}
      >
        View team in client view
      </Button>
    </Paper>
  );
};

export default ClientTeamInfo;
