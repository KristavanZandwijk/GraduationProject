import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Typography, Grid } from '@mui/material';
import Header from 'components/Header';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TeamInformationWidget from 'components/TeamInformationWidget';
import { setTeams } from 'state';
import { useTheme } from '@emotion/react';
import RoleBasedButton from 'components/RoleBasedButton';

const TeamDataSpaces = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const teams = useSelector((state) => state.teams || []);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const projects = useSelector((state) => state.projects || []);
  const user = useSelector((state) => state.user || {});

  const fetchTeams = async () => {
    try {
      const response = await axios.get('http://localhost:5001/teams', {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setTeams(Array.isArray(response.data) ? response.data : []));
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch teams:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, [dispatch, token]);

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

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box m="1.5rem 2.5rem">
       <Box flex="1" ml={4}>
        <Header
          title="Team Data Spaces"
          subtitle="Overview of your team data spaces"
        />
       </Box>
       <Box display="flex" justifyContent="flex-end" mb={2}>
        <RoleBasedButton
          roles={['admin', 'team leader']}
          buttonText="Create New Team"
          navigateTo="/teamdataspace/newteam"
        />
      </Box>
      <Typography color={theme.palette.secondary.main} fontWeight="bold" variant="h6" gutterBottom>
        Teams:
      </Typography>
      <Grid container spacing={2}>
        {userTeams.length > 0 ? (
          userTeams.map((userTeam) => (
            <Grid item xs={12} sm={6} md={4} key={userTeam.teamID}>
              <TeamInformationWidget 
              team={userTeam} 
              onTeamUpdate={fetchTeams}
              />
            </Grid>
          ))
        ) : (
          <Typography>No teams found for this user.</Typography>
        )}
      </Grid>
    </Box>
  );
};

export default TeamDataSpaces;
