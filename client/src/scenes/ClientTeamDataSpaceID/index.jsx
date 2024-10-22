import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import Header from 'components/Header';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import TeamInformationWidget from 'components/TeamInformationWidget';
import DataSpaceTable from 'components/DataSpaceTable';
import IFCViewer from 'components/IFCViewer';
import { setCompanies, setProjects, setUsers, setTeams } from 'state';

const ClientTeamDataSpaceID = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { teamID } = useParams();
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const teams = useSelector((state) => state.teams || []);
  const projects = useSelector((state) => state.projects || []);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [selectedFilepaths, setSelectedFilepaths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get('http://localhost:5001/teams', {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setTeams(Array.isArray(response.data) ? response.data : []));
      } catch (error) {
        console.error('Failed to fetch teams:', error);
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

    const fetchFiles = async () => {
      try {
        const response = await axios.get('http://localhost:5001/files', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const allowedStatuses = ['sharedClient', 'public'];
        const filteredFiles = response.data.filter(
          (file) => file.relatedToTeam === teamID && allowedStatuses.includes(file.status)
        );

        setFiles(filteredFiles);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
    fetchProjects();
    fetchUsers();
    fetchCompanies();
    fetchFiles();
  }, [dispatch, token, teamID]);

  const handleTeamChange = (event) => {
    navigate(`/teamdataspace/${event.target.value}`);
  };

  const handleTeamClick = (teamDataSpaceID) => {
    navigate(`/teamdataspace/${teamID}/${teamDataSpaceID}`);
  };

  // Filter teams based on user projects
  const filteredProjects = Array.isArray(projects)
    ? projects.filter(project =>
        project.employees.some(employee => employee.personID === user.personID)
      )
    : [];

  const userTeams = Array.isArray(teams)
    ? teams.filter(team =>
        team.projects.some(teamProject =>
          filteredProjects.some(filteredProject => filteredProject.projectID === teamProject.projectID)
        )
      )
    : [];

  const selectedTeam = teams.find(team => team.teamID === teamID);

  const handleCheckboxChange = (event, filepath) => {
    if (event.target.checked) {
      setSelectedFilepaths((prevState) => [...prevState, filepath]);
    } else {
      setSelectedFilepaths((prevState) => prevState.filter((path) => path !== filepath));
    }
  };

  const handleFileClick = (filepath) => {
    // Implement your logic to handle file click
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box m="1.5rem 2.5rem" height="100vh">
      <Header
        title="Client View Team Data Space"
        subtitle={
          <>
            This page shows the files of team{' '}
            <Typography component="span" fontWeight="bold">
              {selectedTeam ? selectedTeam.teamName : 'N/A'}
            </Typography>{' '}
            where you{' '}
            <Typography component="span" fontWeight="bold">
              ({user.firstName} {user.lastName})
            </Typography>{' '}
            are registered client.
          </>
        }
      />
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" color="primary" onClick={() => navigate('/teamdataspace/newteam')}>
          Create New Team
        </Button>
      </Box>
      <DataSpaceTable
        files={files}
        selectedFilepaths={selectedFilepaths}
        handleFileClick={handleFileClick}
        handleCheckboxChange={handleCheckboxChange}
      />
      <Box flex="1" height="80vh">
        <IFCViewer selectedFilepaths={selectedFilepaths} />
      </Box>
    </Box>
  );
};

export default ClientTeamDataSpaceID;
