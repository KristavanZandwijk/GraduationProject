import React, { useEffect, useState, useMemo } from 'react';
import { Box, Typography, Grid, CircularProgress, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Header from 'components/Header';
import ClientProjectInfo from 'components/ClientProjectInfo';
import ClientTeamInfo from 'components/ClientTeamInfo';

const ClientDataSpace = () => {
  const theme = useTheme();
  const [projects, setProjects] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingTeams, setLoadingTeams] = useState(true);
  const user = useSelector((state) => state.user); // Current logged-in user
  const token = useSelector((state) => state.token); // Authentication token
  const companies = useSelector((state) => state.companies || []);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5001/projects', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects(response.data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoadingProjects(false);
      }
    };

    const fetchTeams = async () => {
      try {
        const response = await axios.get('http://localhost:5001/teams', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTeams(response.data);
      } catch (error) {
        console.error('Failed to fetch teams:', error);
      } finally {
        setLoadingTeams(false);
      }
    };

    fetchProjects();
    fetchTeams();
  }, [token]);

  // Filter projects where the current user is listed as a client
  const clientProjects = useMemo(() => {
    return Array.isArray(projects)
      ? projects.filter(
          (project) =>
            Array.isArray(project.clients) &&
            project.clients.some((client) => client.personID === user.personID)
        )
      : [];
  }, [projects, user.personID]);

  // Filter teams where the current user is listed as a client
  const clientTeams = useMemo(() => {
    return Array.isArray(teams)
      ? teams.filter(
          (team) =>
            Array.isArray(team.clients) &&
            team.clients.some((client) => client.personID === user.personID)
        )
      : [];
  }, [teams, user.personID]);

  return (
    <Box m="1.5rem 2.5rem" height="100vh">
      {/* Header Section */}
      <Header
        title="Client Overview"
        subtitle={
          <>
            This page shows all the projects and teams where you,{' '}
            <Typography component="span" fontWeight="bold">
              {user.firstName} {user.lastName}
            </Typography>
            , are registered as a client. If you do not see your desired project or team, please contact the admin or project/team leader to add you as a client.
          </>
        }
      />

      {/* Projects Section */}
      <Typography
        color={theme.palette.secondary.main}
        fontWeight="bold"
        variant="h6"
        gutterBottom
      >
        Your Projects
      </Typography>

      <Grid container spacing={2}>
        {loadingProjects ? (
          <CircularProgress />
        ) : clientProjects.length > 0 ? (
          clientProjects.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project.projectID}>
              <ClientProjectInfo
                project={project}
                companies={companies}
                users={[]} 
                buildings={[]}
                onProjectUpdate={() => {}}
              />
            </Grid>
          ))
        ) : (
          <Typography>No projects found where you are listed as a client.</Typography>
        )}
      </Grid>

      {/* Teams Section */}
      <Typography
        color={theme.palette.secondary.main}
        fontWeight="bold"
        variant="h6"
        gutterBottom
        sx={{ marginTop: '2rem' }}
      >
        Your Teams
      </Typography>

      <Grid container spacing={2}>
        {loadingTeams ? (
          <CircularProgress />
        ) : clientTeams.length > 0 ? (
          clientTeams.map((team) => (
            <Grid item xs={12} sm={6} md={4} key={team.teamID}>
              <ClientTeamInfo
                team={team}
                onTeamUpdate={() => {}}
              />
            </Grid>
          ))
        ) : (
          <Typography>No teams found where you are listed as a client.</Typography>
        )}
      </Grid>
    </Box>
  );
};

export default ClientDataSpace;
