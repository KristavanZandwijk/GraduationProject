import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import Header from 'components/Header';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TeamSelection from 'components/SelectTeam';

const TeamDataSpaces = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const projects = useSelector((state) => state.projects);
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

  const handleNewTeamClick = () => {
    navigate('/teamdataspace/newteam');
  };

  return (
    <Box m="1.5rem 2.5rem" height="100vh">
      <Header
        title="Team Data Spaces"
        subtitle="Team Data Spaces accessible for you."
      />
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNewTeamClick}
        >
          Create New Team
        </Button>
      </Box>

      <Box mb={2}>
        <TeamSelection
          teams={userTeams}
          loading={loading}
          selectedTeam={selectedTeam}
          onTeamChange={handleTeamChange}
        />
      </Box>
    </Box>
  );
};

export default TeamDataSpaces;
