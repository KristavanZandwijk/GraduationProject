import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';
import Header from 'components/Header';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TeamSelection from 'components/SelectTeam';

const TeamDataSpaceID = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const projects = useSelector((state) => state.projects);
  const companies = useSelector((state) => state.companies || []);
  const users = useSelector((state) => state.users || []);
  const buildings = useSelector((state) => state.buildings || []);

  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeam, setSelectedTeam] = useState('');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get('http://localhost:5001/teams', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTeams(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch teams:', error);
        setLoading(false);
      }
    };

    fetchTeams();
  }, [token]);

  const teamID = window.location.pathname.split('/').pop();

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

  const handleTeamChange = (event) => {
    setSelectedTeam(event.target.value);
    navigate(`/teamdataspace/${event.target.value}`);
  };

  const handleProjectClick = (projectID) => {
    navigate(`/teamdataspace/${teamID}/${projectID}`);
  };

  return (
    <Box m="1.5rem 2.5rem" height="100vh">
      <Header
        title="Team Data Spaces"
        subtitle={
          <>
            This page shows the projects of team{' '}
            <Typography component="span" fontWeight="bold">
              {userTeams.length > 0 ? userTeams.find(team => team.teamID === teamID)?.teamName : 'N/A'}
            </Typography>{' '}
            where you{' '}
            <Typography component="span" fontWeight="bold">
              ({user.firstName} {user.lastName})
            </Typography>{' '}
            are registered as a member.
          </>
        }
      />
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" color="primary" onClick={() => navigate('/teamdataspace/newproject')}>
          Create New Project
        </Button>
      </Box>

      <TeamSelection
        teams={userTeams}
        loading={loading}
        selectedTeam={selectedTeam}
        onTeamChange={handleTeamChange}
      />

    </Box>
  );
};

export default TeamDataSpaceID;
