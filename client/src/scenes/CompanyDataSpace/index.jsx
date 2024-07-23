import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Header from 'components/Header';
import axios from 'axios';
import { setCompanies, setProjects } from 'state';
import { useNavigate } from 'react-router-dom';
import CompanySelect from 'components/CompanySelect'; // Import the new component

const CompanyDataSpace = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const companies = useSelector((state) => state.companies || []);
  const projects = useSelector((state) => state.projects || []);
  const user = useSelector((state) => state.user);
  const theme = useTheme();
  const token = useSelector((state) => state.token);

  const [users, setUsers] = useState([]);
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

      <CompanySelect 
        selectedCompany={selectedCompany} 
        setSelectedCompany={setSelectedCompany}
      />
    </Box>
  );
};

export default CompanyDataSpace;
