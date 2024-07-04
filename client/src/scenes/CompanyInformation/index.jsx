import React, { useEffect } from 'react';
import { Box, Button, CircularProgress, Typography, Grid, Paper, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Header from 'components/Header';
import axios from 'axios';
import { setCompanies } from 'state';
import { useNavigate } from 'react-router-dom';
import UserImage from 'components/UserImage';

const CompanyInformation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const companies = useSelector((state) => state.companies || []);
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
    <Box m="1.5rem 2.5rem" height="100vh" display="flex">
      <Box flex="1" ml={4}>
        <Header
          title="Company Information"
          subtitle="This page will show the meta data of your company."
        />
        <Button variant="contained" color="primary" onClick={handleNewCompanyClick}>
          Create New Company
        </Button>
        <Grid container spacing={2} mt={3}>
          <Grid item xs={12} md={4}>
            <Box display="flex" justifyContent="center">
              {filteredCompanies.length > 0 && (
                <UserImage image={filteredCompanies[0].picturePath} size="400px" />
              )}
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ borderRadius: 10 }}>
              <Box p={3}>
                <Typography color={theme.palette.secondary[200]} fontWeight="bold" variant="h5" gutterBottom>
                  Company Information
                </Typography>
                {filteredCompanies.length > 0 ? (
                  <>
                    <Typography variant="subtitle1">
                      <strong>Company Name:</strong> {filteredCompanies[0].companyName}
                    </Typography>
                    <Typography variant="subtitle1">
                      <strong>Country:</strong> {filteredCompanies[0].country}
                    </Typography>
                    <Typography variant="subtitle1">
                      <strong>City:</strong> {filteredCompanies[0].city}
                    </Typography>
                    <Typography variant="subtitle1">
                      <strong>Data Space ID:</strong> {filteredCompanies[0].companyDataSpaceID}
                    </Typography>
                  </>
                ) : (
                  <Typography>No companies found for this user.</Typography>
                )}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CompanyInformation;
