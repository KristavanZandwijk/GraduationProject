import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, TextField, FormControl, InputLabel, Button, useTheme, Select, MenuItem, Checkbox, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { updateTeam, setUsers, setCompanies } from 'state';

const TeamInformationWidget = ({ team, onTeamUpdate }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(team);
  const token = useSelector((state) => state.token);
  const users = useSelector((state) => state.users || []);
  const companies = useSelector((state) => state.companies || []);
  const projects = useSelector((state) => state.projects || []);
  const user = useSelector((state) => state.user); // Get the current logged-in user

  const [selectedClients, setSelectedClients] = useState(
    Array.isArray(team.clients) ? team.clients.map(client => client.personID) : []
  );

  const [selectedCompanies, setSelectedCompanies] = useState(
    Array.isArray(team.companies) ? team.companies.map(company => company.companyID) : []
  );

  const [selectedProjects, setSelectedProjects] = useState(
    Array.isArray(team.projects) ? team.projects.map(project => project.projectID) : []
  );

  const [selectedTeamleader, setSelectedTeamleader] = useState(
    Array.isArray(team.teamleader) ? team.teamleader.map(teamleader => teamleader.personID) : []
  );

    // Filter the companies that are involved in the team
    const filteredCompanies = companies.filter(company =>
      selectedCompanies.includes(company.companyID)
    );

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5001/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setUsers(Array.isArray(response.data) ? response.data : []));
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    const fetchCompanies = async () => {
      try {
        const response = await axios.get("http://localhost:5001/companies/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setCompanies(Array.isArray(response.data) ? response.data : []));
      } catch (error) {
        console.error("Failed to fetch companies:", error);
      }
    };

    fetchUsers();
    fetchCompanies();
  }, [token, dispatch]);

  const getClientName = (personID) => {
    const user = users.find(u => u.personID === personID);
    return user ? `${user.firstName} ${user.lastName}` : personID;
  };

  const getUserName = (personID) => {
    const user = users.find(u => u.personID === personID);
    return user ? `${user.firstName} ${user.lastName}` : personID;
  };

  const getCompanyName = (companyID) => {
    const company = companies.find(c => c.companyID === companyID);
    return company ? company.companyName : companyID;
  };

  const getProjectName = (projectID) => {
    const project = projects.find(p => p.projectID === projectID);
    return project ? project.projectName : projectID;
  };

  const getTeamleaderName = (personID) => {
    const user = users.find(u => u.personID === personID);
    return user ? `${user.firstName} ${user.lastName}` : personID;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const updatedData = {
        ...formData,
        clients: selectedClients.map(id => ({ personID: id })),
        companies: selectedCompanies.map(id => ({ companyID: id })),
        projects: selectedProjects.map(id => ({ projectID: id })),
        teamleader: selectedTeamleader.map(id => ({ personID: id })),
      };
      const response = await axios.patch(`http://localhost:5001/teams/${team._id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(updateTeam(response.data)); 
      setIsEditing(false);
      onTeamUpdate(); 
    } catch (error) {
      console.error('Failed to update team:', error);
    }
  };

  const handleCancel = () => {
    setFormData(team);
    setSelectedClients(Array.isArray(team.clients) ? team.clients.map(client => client.personID) : []);
    setSelectedTeamleader(Array.isArray(team.teamleader) ? team.teamleader.map(leader => leader.personID) : []);
    setSelectedCompanies(Array.isArray(team.companies) ? team.companies.map(company => company.companyID) : []);
    setSelectedProjects(Array.isArray(team.projects) ? team.projects.map(project => project.projectID) : []);
    setIsEditing(false);
  };

  const handleViewTeamDataSpace = () => {
    navigate(`/teamdataspace/${team.teamID}`);
  };

  // Determine if the current user can edit the team information
  const isTeamLeader = team.teamleader.some(leader => leader.personID === user.personID);
  const isAdmin = user.role.includes('admin');
  const canEdit = isTeamLeader || isAdmin;

  return (
    <Paper elevation={3} sx={{ borderRadius: 10, p: 3 }}>
      <Box>
      <Typography color={theme.palette.secondary.main} fontWeight="bold" variant="h5" gutterBottom>
       Team Information
      </Typography>
        {isEditing ? (
          <Box>
            <TextField
              label="Team Name"
              name="teamName"
              value={formData.teamName}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Team Leader</InputLabel>
              <Select
                label="Team Leader"
                multiple
                value={selectedTeamleader}
                onChange={(e) => setSelectedTeamleader(e.target.value)}
                renderValue={(selected) =>
                  selected.map(id => getTeamleaderName(id)).join(', ')
                }
              >
                <MenuItem value="" disabled>
                    <em>Select the team leader(s) involved in the team</em>
                  </MenuItem>
                {users.map((user) => (
                  <MenuItem key={user.personID} value={user.personID}>
                    <Checkbox checked={selectedTeamleader.includes(user.personID)} />
                    <ListItemText primary={`${user.firstName} ${user.lastName}`} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Companies</InputLabel>
              <Select
                label="Companies"
                multiple
                value={selectedCompanies}
                onChange={(e) => setSelectedCompanies(e.target.value)}
                renderValue={(selected) =>
                  selected.map(companyID => getCompanyName(companyID)).join(', ')
                }
              >
                <MenuItem value="" disabled>
                    <em>Select the company(s) involved in the team</em>
                  </MenuItem>
                {companies.map((company) => (
                  <MenuItem key={company.companyID} value={company.companyID}>
                    <Checkbox checked={selectedCompanies.includes(company.companyID)} />
                    <ListItemText primary={company.companyName} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Projects</InputLabel>
              <Select
                label="Projects"
                multiple
                value={selectedProjects}
                onChange={(e) => setSelectedProjects(e.target.value)}
                renderValue={(selected) =>
                  selected.map(id => getProjectName(id)).join(', ')
                }
              >
                <MenuItem value="" disabled>
                    <em>Select the team project(s) involved in the team</em>
                  </MenuItem>
                {projects.map((project) => (
                  <MenuItem key={project.projectID} value={project.projectID}>
                    <Checkbox checked={selectedProjects.includes(project.projectID)} />
                    <ListItemText primary={project.projectName} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleCancel} sx={{ ml: 2 }}>
                Cancel
              </Button>
            </Box>
          </Box>
        ) : (
          <>
            <Typography variant="subtitle1">
              <strong>Team Name:</strong> {team.teamName}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Team ID:</strong> {team.teamID}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Team Data Space:</strong> {team.teamDataSpaceID}
            </Typography>
          </>
        )}
          <Box mt={3}>
          <Typography fontWeight="bold" variant="subtitle1" gutterBottom>
            Team Leader(s):
          </Typography>
          {Array.isArray(team.teamleader) && team.teamleader.length > 0 ? (
            team.teamleader.map((leader) => (
              <Typography key={leader.personID} variant="subtitle1">
                {getUserName(leader.personID)} - {leader.personID}
              </Typography>
            ))
          ) : (
            <Typography variant="subtitle1">No team leader(s)</Typography>
          )}
        </Box>
        <Box mt={3}>
          <Typography fontWeight="bold" variant="subtitle1" gutterBottom>
            Companies:
          </Typography>
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map((company) => (
              <Typography key={company.companyID} variant="subtitle1">
                {company.companyName} - {company.companyID}
              </Typography>
            ))
          ) : (
            <Typography variant="subtitle1">No companies involved in the team</Typography>
          )}
        </Box>

        <Box mt={3}>
          <Typography fontWeight="bold" variant="subtitle1" gutterBottom>
            Project(s):
          </Typography>
          {Array.isArray(team.projects) && team.projects.length > 0 ? (
            team.projects.map((project) => (
              <Typography key={project.projectID} variant="subtitle1">
                {getProjectName(project.projectID)} - {project.projectID}
              </Typography>
            ))
          ) : (
            <Typography variant="subtitle1">No project(s)</Typography>
          )}
        </Box>

        {/* Only show the Edit button if the user is allowed to edit */}
        {canEdit && (
          <Box mt={2}>
            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          </Box>
        )}

      </Box>
      <Button
        variant="outlined"
        color='secondary'
        sx={{ mt: 2 }}
        onClick={handleViewTeamDataSpace}
      >
        View team specific data space
      </Button>
    </Paper>
  );
};

export default TeamInformationWidget;
