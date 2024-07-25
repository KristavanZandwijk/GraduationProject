import React, { useState, useEffect } from 'react';
import {
  Box,
  Divider,
  InputBase,
  Button,
  Typography,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setProjects, setCompanies, setUsers, setBuildings } from 'state';
import axios from 'axios';

const ProjectDrop = () => {
  const dispatch = useDispatch();
  const [projectID, setProjectID] = useState('');
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  const users = useSelector((state) => state.users || []);
  const buildings = useSelector((state) => state.buildings || []);
  const companies = useSelector((state) => state.companies || []);

  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedRelatesTo, setSelectedRelatesTo] = useState([]);

  const theme = useTheme();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');

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

    const fetchBuildings = async () => {
      try {
        const response = await axios.get('http://localhost:5001/buildings/all', {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setBuildings(Array.isArray(response.data) ? response.data : []));
      } catch (error) {
        console.error('Failed to fetch buildings:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5001/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setUsers(Array.isArray(response.data) ? response.data : []));
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchCompanies();
    fetchBuildings();
    fetchUsers();
  }, [token]);

  const handleProject = async () => {
    const projectData = {
      projectID,
      projectName,
      projectDescription,
      companies: [{ companyID: selectedCompany }],
      employees: selectedEmployees.map(employeeID => ({ personID: employeeID })),
      clients: [{ personID: selectedClient }],
      relatesTo: selectedRelatesTo.map(buildingID => ({ buildingID })),
    };

    try {
      const response = await fetch('http://localhost:5001/newprojects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(projectData),
      });

      const newProject = await response.json();
      if (response.status === 201) {
        dispatch(setProjects(newProject));
        setProjectID('');
        setProjectName('');
        setProjectDescription('');
        setSelectedCompany('');
        setSelectedEmployees([]);
        setSelectedClient('');
        setSelectedRelatesTo([]);
      } else {
        console.error(newProject.message);
      }
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.default,
        borderRadius: '1rem',
        padding: '2rem',
        border: '1px solid',
        borderColor: theme.palette.secondary[100],
      }}
    >
      <Typography
        variant="h4"
        sx={{
          marginBottom: '2rem',
          textAlign: 'center',
          color: theme.palette.secondary[100],
          fontWeight: 'bold',
        }}
      >
        Create the meta-data of a new project here!
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <InputBase
          placeholder='Add a project ID'
          onChange={(e) => setProjectID(e.target.value)}
          value={projectID}
          sx={{
            width: '100%',
            backgroundColor: theme.palette.primary.main,
            borderRadius: '2rem',
            padding: '1rem 2rem',
          }}
        />
        <InputBase
          placeholder='Add a project name'
          onChange={(e) => setProjectName(e.target.value)}
          value={projectName}
          sx={{
            width: '100%',
            backgroundColor: theme.palette.primary.main,
            borderRadius: '2rem',
            padding: '1rem 2rem',
          }}
        />
        <InputBase
          placeholder='Add a project description'
          onChange={(e) => setProjectDescription(e.target.value)}
          value={projectDescription}
          sx={{
            width: '100%',
            backgroundColor: theme.palette.primary.main,
            borderRadius: '2rem',
            padding: '1rem 2rem',
          }}
        />
        <Select
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
          displayEmpty
          sx={{
            width: '100%',
            backgroundColor: theme.palette.primary.default,
            borderRadius: '1rem',
            padding: '0.75rem 1.5rem',
            border: `1px solid ${theme.palette.secondary[100]}`,
          }}
        >
          <MenuItem value='' disabled>
            Select the company
          </MenuItem>
          {companies.map((company) => (
            <MenuItem key={company.companyID} value={company.companyID}>
              {`${company.companyID} - ${company.companyName}`}
            </MenuItem>
          ))}
        </Select>


        <Select
          multiple
          value={selectedEmployees}
          onChange={(e) => setSelectedEmployees(e.target.value)}
          displayEmpty
          sx={{
            width: '100%',
            backgroundColor: theme.palette.primary.default,
            borderRadius: '1rem',
            padding: '0.75rem 1.5rem',
            border: `1px solid ${theme.palette.secondary[100]}`,
          }}
        >
          <MenuItem value='' disabled>
            Select the Employees
          </MenuItem>
          {users.map((user) => (
            <MenuItem key={user.personID} value={user.personID}>
              {`${user.personID} - ${user.firstName} ${user.lastName}`}
            </MenuItem>
          ))}
        </Select>

        <Select
          value={selectedClient}
          onChange={(e) => setSelectedClient(e.target.value)}
          displayEmpty
          sx={{
            width: '100%',
            backgroundColor: theme.palette.primary.default,
            borderRadius: '1rem',
            padding: '0.75rem 1.5rem',
            border: `1px solid ${theme.palette.secondary[100]}`,
          }}
        >
          <MenuItem value='' disabled>
            Select the Client
          </MenuItem>
          {users.map((user) => (
            <MenuItem key={user.personID} value={user.personID}>
              {`${user.personID} - ${user.firstName} ${user.lastName}`}
            </MenuItem>
          ))}
        </Select>

        <Select
          multiple
          value={selectedRelatesTo}
          onChange={(e) => setSelectedRelatesTo(e.target.value)}
          displayEmpty
          sx={{
            width: '100%',
            backgroundColor: theme.palette.primary.default,
            borderRadius: '1rem',
            padding: '0.75rem 1.5rem',
            border: `1px solid ${theme.palette.secondary[100]}`,
          }}
        >
          <MenuItem value='' disabled>
            Select the Building(s) the project is related to
          </MenuItem>
          {buildings.map((building) => (
            <MenuItem key={building.buildingID} value={building.buildingID}>
              {`${building.buildingID} - ${building.buildingName} - ${building.buildingLocation}`}
            </MenuItem>
          ))}
        </Select>

      </Box>
      <Divider sx={{ margin: '2rem 0' }} />
      <Button
        disabled={!projectID || !projectName || !projectDescription || !selectedCompany || !selectedEmployees.length || !selectedClient || !selectedRelatesTo.length}
        onClick={handleProject}
        sx={{
          backgroundColor: theme.palette.secondary[300],
          color: theme.palette.primary.main,
          '&:hover': { color: theme.palette.primary[800] },
          borderRadius: '3rem',
          width: '100%',
          padding: '1rem 2rem',
        }}
      >
        UPLOAD
      </Button>
    </Box>
  );
};

export default ProjectDrop;