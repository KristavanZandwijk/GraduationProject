import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Grid, useTheme, MenuItem, Select } from '@mui/material';
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
  const [selectedCompany, setSelectedCompany] = useState('');

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

    fetchCompanies();
    fetchProjects();
    fetchUsers();
  }, [dispatch, token]);

  const filteredCompanies = Array.isArray(companies)
    ? companies.filter(company =>
        company.employees.some(employee => employee.personID === user.personID)
      )
    : [];

  const filteredProjects = projects.filter(project =>
    project.companies.some(comp => filteredCompanies.map(company => company.companyID).includes(comp.companyID))
  );

  useEffect(() => {
    if (filteredCompanies.length === 1) {
      navigate(`/companydataspace/${filteredCompanies[0].companyID}`);
    }
  }, [filteredCompanies, navigate]);

  const handleNewProjectClick = () => {
    navigate('/newproject');
  };

  const handleCompanyChange = (event) => {
    const companyID = event.target.value;
    navigate(`/companydataspace/${companyID}`);
  };

  const handleProjectClick = (projectID) => {
    navigate(`/companydataspace/${projectID}`);
  };

  return (
    <Box m="1.5rem 2.5rem" height="100vh">
      <Header
        title="Select a company to go to Data Space."
        subtitle="" // You might want to provide a meaningful subtitle or remove it
      />
      <Box display="flex" justifyContent="flex-end" mb={1}>
        {/* <Button variant="contained" color="primary" onClick={handleNewProjectClick}>
          Create New Project
        </Button> */}
      </Box>

      <Box mb={2}>
        <Typography color={theme.palette.secondary.main} fontWeight="bold" variant="h6" gutterBottom>
          Select Company
        </Typography>
        <Select
          fullWidth
          value={selectedCompany}
          onChange={handleCompanyChange}
          displayEmpty
        >
          <MenuItem value="" disabled>
            Select a company
          </MenuItem>
          {filteredCompanies.map(company => (
            <MenuItem key={company.companyID} value={company.companyID}>
              {company.companyName}
            </MenuItem>
          ))}
        </Select>
      </Box>
      {/* You might want to add content here, like the ProjectInfo component */}
    </Box>
  );
};

export default CompanyDataSpace;
