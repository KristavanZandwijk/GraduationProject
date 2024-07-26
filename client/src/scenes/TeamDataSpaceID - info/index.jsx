import React, { useEffect, useState, useCallback } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import Header from 'components/Header';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import TeamSelection from 'components/SelectTeam';
import TeamInformationWidget from 'components/TeamInformationWidget';
import { setCompanies, setProjects, setUsers } from 'state'; // Ensure these actions are defined in your state management

const TeamDataSpaceID = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { teamID } = useParams();
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const projects = useSelector((state) => state.projects || []);
  const companies = useSelector((state) => state.companies || []);
  const users = useSelector((state) => state.users || []);

  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTeams = useCallback(async () => {
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
  }, [token, user.personID, projects]);

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, companiesResponse, projectsResponse] = await Promise.all([
          axios.get('http://localhost:5001/users', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:5001/companies', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:5001/projects', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        dispatch(setUsers(Array.isArray(usersResponse.data) ? usersResponse.data : []));
        dispatch(setCompanies(Array.isArray(companiesResponse.data) ? companiesResponse.data : []));
        dispatch(setProjects(Array.isArray(projectsResponse.data) ? projectsResponse.data : []));
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, [dispatch, token]);

  useEffect(() => {
    if (teamID) {
      const team = teams.find(team => team.teamID === teamID);
      setSelectedTeam(team);
    }
  }, [teamID, teams]);

  const handleTeamChange = (event) => {
    navigate(`/teamdataspace/${event.target.value}`);
  };
  
  const handleTeamClick = (teamDataSpaceID) => {
    console.log('Navigating to:', `/teamdataspace/${teamID}/${teamDataSpaceID}`);
    navigate(`/teamdataspace/${teamID}/${teamDataSpaceID}`);
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
        <Button variant="contained" color="primary" onClick={() => navigate('/teamdataspace/newteam')}>
          Create New Team
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
            ) : (
              <TeamInformationWidget
                selectedTeam={selectedTeam}
                users={users}
                companies={companies}
                projects={projects}
                handleTeamClick={handleTeamClick} // Ensure this is present
              />
            )}
          </Box>
        );

};

export default TeamDataSpaceID;
