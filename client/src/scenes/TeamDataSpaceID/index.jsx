import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import Header from 'components/Header';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import TeamSelection from 'components/SelectTeam';

const TeamDataSpaceID = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { teamID } = useParams();
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const projects = useSelector((state) => state.projects);

  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get('http://localhost:5001/teams', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const allTeams = Array.isArray(response.data) ? response.data : [];
        
        // Filter teams based on user projects
        const filteredProjects = Array.isArray(projects)
          ? projects.filter(project =>
              project.employees.some(employee => employee.personID === user.personID)
            )
          : [];

        const userTeams = Array.isArray(allTeams)
          ? allTeams.filter(team =>
              team.projects.some(teamProject =>
                filteredProjects.some(filteredProject => filteredProject.projectID === teamProject.projectID)
              )
            )
          : [];

        setTeams(userTeams);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch teams:', error);
        setLoading(false);
      }
    };

    fetchTeams();
  }, [token, user.personID, projects]);

  useEffect(() => {
    if (teamID) {
      const team = teams.find(team => team.teamID === teamID);
      setSelectedTeam(team);
    }
  }, [teamID, teams]);

  const handleTeamChange = (event) => {
    navigate(`/teamdataspace/${event.target.value}`);
  };

  const renderArrayItems = (items, property) => {
    if (!items || items.length === 0) return 'None';
    return items.map((item, index) => (
      <Typography key={index} variant="subtitle1">
        {item[property] || 'Unknown'}
      </Typography>
    ));
  };

  return (
    <Box m="1.5rem 2.5rem" height="100vh">
      <Header
        title="Team Data Spaces"
        subtitle={
          <>
            This page shows the details of team{' '}
            <Typography component="span" fontWeight="bold">
              {selectedTeam?.teamName || 'N/A'}
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
        teams={teams}
        loading={loading}
        selectedTeam={teamID}
        onTeamChange={handleTeamChange}
      />

      {loading ? (
        <CircularProgress />
      ) : selectedTeam ? (
        <Box mt={4}>
          <Typography variant="h6" fontWeight="bold">Team Name: {selectedTeam.teamName}</Typography>
          <Typography variant="h6" fontWeight="bold">Team ID: {selectedTeam.teamID}</Typography>
          <Typography variant="h6" fontWeight="bold">Data Space ID: {selectedTeam.teamDataSpaceID}</Typography>
          
          <Box mt={3}>
            <Typography fontWeight="bold" variant="subtitle1" gutterBottom>
              Clients:
            </Typography>
            {renderArrayItems(selectedTeam.clients, 'personID')}
          </Box>

          <Box mt={3}>
            <Typography fontWeight="bold" variant="subtitle1" gutterBottom>
              Companies:
            </Typography>
            {renderArrayItems(selectedTeam.companies, 'companyID')}
          </Box>

          <Box mt={3}>
            <Typography fontWeight="bold" variant="subtitle1" gutterBottom>
              Projects:
            </Typography>
            {renderArrayItems(selectedTeam.projects, 'projectID')}
          </Box>
        </Box>
      ) : (
        <Typography variant="h6" fontWeight="bold">No team selected or team not found.</Typography>
      )}
    </Box>
  );
};

export default TeamDataSpaceID;
