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
import { setProjects, setCompanies, setUsers, setBuildings, setTeams } from 'state';
import axios from 'axios';

const TeamDrop = () => {
  const dispatch = useDispatch();
  const [teamID, setTeamID] = useState('');
  const [teamName, setTeamName] = useState('');
  const [teamDataSpaceID, setTeamDataSpaceID] = useState('');

  const users = useSelector((state) => state.users || []);
  const buildings = useSelector((state) => state.buildings || []);
  const projects = useSelector((state) => state.projects || []);

  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedProjects, setSelectedProjects] = useState([]);

  const theme = useTheme();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('http://localhost:5001/companies', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCompanies(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Failed to fetch companies:', error);
      }
    };

    const fetchBuildings = async () => {
      try {
        const response = await axios.get('http://localhost:5001/buildings', {
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
    fetchBuildings();
    fetchUsers();
    fetchProjects();
  }, [token, dispatch]);

  const handleTeam = async () => {
    const teamData = {
      teamID,
      teamName,
      teamDataSpaceID,
      companies: [{ companyID: selectedCompany }],
      employees: selectedEmployees.map(employeeID => ({ personID: employeeID })),
      clients: [{ personID: selectedClient }],
      projects: selectedProjects.map(projectID => ({ projectID })),
    };

    try {
      const response = await fetch('http://localhost:5001/newteam', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(teamData),
      });

      const newTeam = await response.json();
      if (response.status === 201) {
        dispatch(setTeams(newTeam));
        setTeamID('');
        setTeamName('');
        setTeamDataSpaceID('');
        setSelectedCompany([]);
        setSelectedEmployees([]);
        setSelectedClient('');
        setSelectedProjects([]);
      } else {
        console.error(newTeam.message);
      }
    } catch (error) {
      console.error('Failed to create team:', error);
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
        Create the meta-data of a new team here!
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <InputBase
          placeholder='Add a team ID'
          onChange={(e) => setTeamID(e.target.value)}
          value={teamID}
          sx={{
            width: '100%',
            backgroundColor: theme.palette.primary.main,
            borderRadius: '2rem',
            padding: '1rem 2rem',
          }}
        />
        <InputBase
          placeholder='Add a team name'
          onChange={(e) => setTeamName(e.target.value)}
          value={teamName}
          sx={{
            width: '100%',
            backgroundColor: theme.palette.primary.main,
            borderRadius: '2rem',
            padding: '1rem 2rem',
          }}
        />
        <InputBase
          placeholder='Add a Team Data Space ID'
          onChange={(e) => setTeamDataSpaceID(e.target.value)}
          value={teamDataSpaceID}
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
          value={selectedProjects}
          onChange={(e) => setSelectedProjects(e.target.value)}
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
            Select the projects that are part of this team
          </MenuItem>
          {projects.map((project) => (
            <MenuItem key={project.projectID} value={project.projectID}>
              {`${project.projectID} - ${project.projectName}`}
            </MenuItem>
          ))}
        </Select>

      </Box>
      <Divider sx={{ margin: '2rem 0' }} />
      <Button
        disabled={!teamID || !teamName || !teamDataSpaceID || !selectedCompany || !selectedEmployees.length || !selectedClient || !selectedProjects.length}
        onClick={handleTeam}
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

export default TeamDrop;
