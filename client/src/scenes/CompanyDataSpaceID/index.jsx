import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Grid, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Header from 'components/Header';
import axios from 'axios';
import { setCompanies, setProjects } from 'state';
import { useNavigate } from 'react-router-dom';
import ProjectInfo from 'components/ProjectInformationWidget';

const CompanyDataSpace = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const companies = useSelector((state) => state.companies || []);
  const projects = useSelector((state) => state.projects || []);
  const user = useSelector((state) => state.user);
  const theme = useTheme();
  const token = useSelector((state) => state.token);

  const [users, setUsers] = useState([]);
  const [buildings, setBuildings] = useState([]);

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

    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5001/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    const fetchBuildings = async () => {
      try {
        const response = await axios.get('http://localhost:5001/buildings/all', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBuildings(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Failed to fetch buildings:', error);
      }
    };

    fetchCompanies();
    fetchProjects();
    fetchUsers();
    fetchBuildings();
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
              <ProjectInfo
                project={project}
                companies={companies}
                users={users}
                buildings={buildings}
                handleProjectClick={handleProjectClick}
              />
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