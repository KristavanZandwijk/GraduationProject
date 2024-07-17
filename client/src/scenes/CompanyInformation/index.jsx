import React, { useEffect } from 'react';
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

    fetchCompanies();
  }, [dispatch, token]);

  const filteredCompanies = Array.isArray(companies)
    ? companies.filter(company =>
        company.employees.some(employee => employee.personID === user.personID)
      )
    : [];

  const handleNewCompanyClick = () => {
    navigate('/newcompany');
  };

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
          <Box mt={3} mx="auto" justifyContent="left" >
            {filteredCompanies.length > 0 && (
              <BasicCompanyInfoWidget company={filteredCompanies[0]} />
            )}
          </Box>
        </Grid>

        {/* Employees Section */}
        <Grid item xs={12}>
          <Box mt={3} mx="auto" justifyContent="left">
            {filteredCompanies.length > 0 ? (
              <EmployeeList employees={filteredCompanies[0].employees} />
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
            {filteredCompanies.length > 0 ? (
              <ProjectList projects={filteredCompanies[0].projects} />
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
