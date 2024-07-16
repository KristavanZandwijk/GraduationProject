import React, { useEffect } from 'react';
import { Box, Button, Typography, Grid, Paper, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Header from 'components/Header';
import axios from 'axios';
import { setCompanies, setProjects } from 'state';
import { useNavigate } from 'react-router-dom';

const CompanyDataSpace = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const companies = useSelector((state) => state.companies || []);
  const projects = useSelector((state) => state.projects || []);
  const user = useSelector((state) => state.user);
  const theme = useTheme();
  const token = useSelector((state) => state.token);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('http://localhost:5001/companies', {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setCompanies(Array.isArray(response.data) ? response.data : []));
      } catch (error) {
        console.error('Failed to fetch companies:', error);
      }
    };

    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5001/projects', {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setProjects(Array.isArray(response.data) ? response.data : []));
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    };

    fetchCompanies();
    fetchProjects();
  }, [dispatch, token]);

  const filteredCompanies = Array.isArray(companies)
    ? companies.filter(company =>
        company.employees.some(employee => employee.personID === user.personID)
      )
    : [];

  const userCompanyIds = filteredCompanies.map(company => company.companyID);

  const filteredProjects = Array.isArray(projects)
    ? projects.filter(project =>
        project.companies.some(company => userCompanyIds.includes(company.companyID))
      )
    : [];

  const handleNewProjectClick = () => {
    navigate('/newproject');
  };

  const handleProjectClick = (projectID) => {
    navigate(`/companydataspace/${projectID}`);
  };

  return (
    <Box m="1.5rem 2.5rem" height="100vh">
      <Header
        title="Company Data Space"
        subtitle="This page will show an overview of the projects of the company. Click on the project name to navigate to the specific project data space."
      />
      <Box display="flex" justifyContent="flex-end" mb={1}>
        <Button variant="contained" color="primary" onClick={handleNewProjectClick}>
          Create New Project
        </Button>
      </Box>

      <Typography color={theme.palette.secondary.main} fontWeight="bold" variant="h6" gutterBottom>
        Company Projects
      </Typography>
      <Grid container spacing={2}>
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project.projectID}>
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
                </Box>
              </Paper>
            </Grid>
          ))
        ) : (
          <Typography>No projects found for this company.</Typography>
        )}
      </Grid>
    </Box>
  );
};

export default CompanyDataSpace;
