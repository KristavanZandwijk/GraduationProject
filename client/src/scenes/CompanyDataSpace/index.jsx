import React, { useEffect, useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Header from 'components/Header';
import axios from 'axios';
import { setCompanies, setProjects } from 'state';
import { useNavigate } from 'react-router-dom';
import CompanySelect from 'components/SelectCompany'; // Import the new component

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
        const companiesData = Array.isArray(response.data) ? response.data : [];
        dispatch(setCompanies(companiesData));
        console.log('Fetched companies:', companiesData); // Debugging log
      } catch (error) {
        console.error('Failed to fetch companies:', error);
      }
    };

    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5001/projects', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const projectsData = Array.isArray(response.data) ? response.data : [];
        dispatch(setProjects(projectsData));
        console.log('Fetched projects:', projectsData); // Debugging log
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5001/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const usersData = Array.isArray(response.data) ? response.data : [];
        setUsers(usersData);
        console.log('Fetched users:', usersData); // Debugging log
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchCompanies();
    fetchProjects();
    fetchUsers();
  }, [dispatch, token]);

  // Filter companies ensuring `user` and `user.personID` are defined
  const filteredCompanies = Array.isArray(companies)
    ? companies.filter(company => 
        Array.isArray(company.employees) &&
        company.employees.some(employee => employee.personID === user?.personID)
      )
    : [];

  // Log filtered companies to debug
  console.log('Filtered companies:', filteredCompanies);

  // Filter projects ensuring `filteredCompanies` is valid
  const filteredProjects = Array.isArray(projects)
    ? projects.filter(project =>
        Array.isArray(project.companies) &&
        project.companies.some(comp => 
          filteredCompanies.map(company => company.companyID).includes(comp.companyID)
        )
      )
    : [];

  // Log filtered projects to debug
  console.log('Filtered projects:', filteredProjects);

  useEffect(() => {
    if (filteredCompanies.length === 1) {
      navigate(`/companydataspace/${filteredCompanies[0].companyID}`);
    }
  }, [filteredCompanies, navigate]);

  return (
    <Box m="1.5rem 2.5rem" height="100vh">
      <Header
        title="Select a company to go to Data Space."
        subtitle="" // You might want to provide a meaningful subtitle or remove it
      />
      <Box display="flex" justifyContent="flex-end" mb={1}>
      </Box>

      <CompanySelect 
        selectedCompany={selectedCompany} 
        setSelectedCompany={setSelectedCompany}
      />
    </Box>
  );
};

export default CompanyDataSpace;
