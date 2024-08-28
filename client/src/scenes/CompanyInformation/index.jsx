import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Header from 'components/Header';
import axios from 'axios';
import { setCompanies } from 'state';
import { useNavigate } from 'react-router-dom';
import CombinedCompanyInfoWidget from 'components/CompnayInformationWidget';

const CompanyInformation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const companies = useSelector((state) => state.companies || []);
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

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

  useEffect(() => {
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
    navigate('/companyinformation/newcompany');
  };

  const handleCompanyUpdate = () => {
    fetchCompanies(); // Ensure fetchCompanies is defined and called here
  };

  return (
    <Box m="1.5rem 2.5rem" height="100vh">
      <Header
        title="Company Information"
        subtitle="This page shows the meta data of all companies where you are registered as an employee. Click on the company to navigate to the company data space."
      />
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" color="primary" onClick={handleNewCompanyClick} sx={{ mr: 2 }}>
          Create New Company
        </Button>
      </Box>
      {filteredCompanies.length > 0 ? (
        <Grid container spacing={2}>
          {filteredCompanies.map((company) => {
            const filteredProjects = projects.filter(project =>
              project.companies.some(comp => comp.companyID === company.companyID)
            );

            const companyEmployees = company.employees.map(employee => {
              const userDetails = users.find(user => user.personID === employee.personID);
              return { ...employee, ...userDetails };
            });

            const companyOwner = company.companyOwner.map(owner => {
              const userDetails = users.find(user => user.personID === owner.personID);
              return { ...owner, ...userDetails };
            });

            return (
              <Grid item xs={12} sm={6} md={4} key={company.companyID}>
                <CombinedCompanyInfoWidget
                  company={company}
                  projects={filteredProjects} // Correct variable name
                  employees={companyEmployees} // Correct variable name
                  companyOwner={companyOwner} // Pass company owners
                  onCompanyUpdate={handleCompanyUpdate} // Pass update callback
                />
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Box p={3}>
          <Typography>No companies found for this user.</Typography>
        </Box>
      )}
    </Box>
  );
};

export default CompanyInformation;
