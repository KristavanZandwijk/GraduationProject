import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Header from 'components/Header';
import axios from 'axios';
import { setCompanies } from 'state';
import { useNavigate } from 'react-router-dom';
import EmployeeList from 'components/EmployeesWidget';
import BasicCompanyInfoWidget from 'components/CompnayInformationWidget';
import ProjectList from 'components/ProjectsWidget';

const CompanyInformation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const companies = useSelector((state) => state.companies || []);
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

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
        setProjects(Array.isArray(response.data) ? response.data : []);
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

    fetchCompanies();
    fetchProjects();
    fetchUsers();
  }, [dispatch, token]);

  const filteredCompanies = Array.isArray(companies)
    ? companies.filter(company =>
        company.employees.some(employee => employee.personID === user.personID)
      )
    : [];

  const handleNewCompanyClick = () => {
    navigate('/newcompany');
  };

  const selectedCompany = filteredCompanies[0];
  const filteredProjects = selectedCompany
    ? projects.filter(project =>
        project.companies.some(comp => comp.companyID === selectedCompany.companyID)
      )
    : [];

  const companyEmployees = selectedCompany
    ? selectedCompany.employees.map(employee => {
        const userDetails = users.find(user => user.personID === employee.personID);
        return { ...employee, ...userDetails };
      })
    : [];

  return (
    <Box m="1.5rem 2.5rem" height="100vh">
      <Header
        title="Company Information"
        subtitle="This page will show the meta data of your company."
      />
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" color="primary" onClick={handleNewCompanyClick} sx={{ mr: 2 }}>
          Create New Company
        </Button>
      </Box>
      <Grid container spacing={2}>
        {/* Basic Company Info Section */}
        <Grid item xs={12}>
          <Box mt={3} mx="auto" justifyContent="left">
            {selectedCompany && (
              <BasicCompanyInfoWidget company={selectedCompany} />
            )}
          </Box>
        </Grid>

        {/* Employees Section */}
        <Grid item xs={12}>
          <Box mt={3} mx="auto" justifyContent="left">
            {selectedCompany ? (
              <EmployeeList employees={companyEmployees} />
            ) : (
              <Box p={3}>
                <Typography>No employees found for this user.</Typography>
              </Box>
            )}
          </Box>
        </Grid>

        {/* Projects Section */}
        <Grid item xs={12}>
          <Box mt={2} mx="auto" justifyContent="right">
            {selectedCompany ? (
              <ProjectList projects={filteredProjects} />
            ) : (
              <Box p={3}>
                <Typography>No projects found for this user.</Typography>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompanyInformation;
