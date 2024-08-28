import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, TextField, Button, useTheme, Select, MenuItem, Checkbox, ListItemText, Grid, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UserImage from 'components/UserImage';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { updateCompany, setUsers } from 'state';

const CombinedCompanyInfoWidget = ({ company, projects, employees, companyOwner, onCompanyUpdate }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(company);
  const [teams, setTeams] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState(company.employees.map(emp => emp.personID));
  const [selectedOwners, setSelectedOwners] = useState(companyOwner.map(owner => owner.personID));
  const token = useSelector((state) => state.token);
  const users = useSelector((state) => state.users || []);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get('http://localhost:5001/teams', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const teams = Array.isArray(response.data) ? response.data : [];
        setTeams(teams);
      } catch (error) {
        console.error('Failed to fetch teams:', error);
      }
    };

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

    fetchUsers();
    fetchTeams();
  }, [token, dispatch]);

  const projectsWithTeams = projects.map(project => {
    const relatedTeams = teams.filter(team => team.projects.some(p => p.projectID === project.projectID));
    return {
      ...project,
      relatedTeams,
    };
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const updatedData = { 
        ...formData, 
        employees: selectedEmployees.map(id => ({ personID: id })), 
        companyOwner: selectedOwners.map(id => ({ personID: id })) 
      };
      const response = await axios.patch(`http://localhost:5001/companies/${company._id}`, updatedData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        const updatedCompany = response.data;
        dispatch(updateCompany(updatedCompany));
        setIsEditing(false);

        if (onCompanyUpdate) {
          onCompanyUpdate();
        }
      }
    } catch (error) {
      console.error('Failed to update company:', error);
    }
  };

  const handleCancel = () => {
    setFormData(company);
    setSelectedEmployees(company.employees.map(emp => emp.personID));
    setSelectedOwners(companyOwner.map(owner => owner.personID));
    setIsEditing(false);
  };

  const handleTeamClick = (teamID) => {
    navigate(`/teamdataspace/${teamID}`);
  };

  const getEmployeeName = (id) => {
    const user = users.find((u) => u.personID === id);
    return user ? `${user.firstName} ${user.lastName}` : 'Unknown';
  };

  const getCompanyOwnerName = (id) => {
    const user = users.find((u) => u.personID === id);
    return user ? `${user.firstName} ${user.lastName}` : 'Unknown';
  };

  return (
    <Paper elevation={3} sx={{ borderRadius: 10, p: 3 }}>
      <Typography color={theme.palette.secondary.main} fontWeight="bold" variant="h5" gutterBottom>
        Company Information
      </Typography>
      <Box display="flex" flexDirection="column">
        <Box sx={{ cursor: 'pointer' }}>
          <UserImage image={company.picturePath} size="100px" />
        </Box>
        <Box ml={2} width="100%">
          {isEditing ? (
            <>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Company Name"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Employees</InputLabel>
                    <Select
                      name="employees"
                      label="Employees"
                      multiple
                      value={selectedEmployees}
                      onChange={(e) => setSelectedEmployees(e.target.value)}
                      renderValue={(selected) => selected.map(getEmployeeName).join(", ")}
                    >
                      <MenuItem value="" disabled>
                        <em>Select the Employees</em>
                      </MenuItem>
                      {Array.isArray(users) && users.map((user) => (
                        <MenuItem key={user.personID} value={user.personID}>
                          <Checkbox checked={selectedEmployees.includes(user.personID)} />
                          <ListItemText primary={`${user.firstName} ${user.lastName}`} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Company Owner</InputLabel>
                    <Select
                      name="companyOwner"
                      label="Company Owner"
                      multiple
                      value={selectedOwners}
                      onChange={(e) => setSelectedOwners(e.target.value)}
                      renderValue={(selected) => selected.map(getCompanyOwnerName).join(', ')}
                    >
                      <MenuItem value="" disabled>
                        <em>Select the Company Owner</em>
                      </MenuItem>
                      {users.map((user) => (
                        <MenuItem key={user.personID} value={user.personID}>
                          <Checkbox checked={selectedOwners.includes(user.personID)} />
                          <ListItemText primary={`${user.firstName} ${user.lastName}`} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Box mt={2}>
                <Button variant="contained" color="primary" onClick={handleSave}>
                  Save
                </Button>
                <Button variant="outlined" color="secondary" onClick={handleCancel} sx={{ ml: 2 }}>
                  Cancel
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Typography variant="subtitle1">
                <strong>Company Name:</strong> {company.companyName}
              </Typography>
              <Typography variant="subtitle1">
                <strong>City:</strong> {company.city}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Country:</strong> {company.country}
              </Typography>

              <Typography variant="subtitle1">
                <strong>Company ID:</strong> {company.companyID}
              </Typography>
                <Typography variant="subtitle1">
                  <strong>Company Data Space ID:</strong> {company.companyDataSpaceID}
                </Typography>
              </>
            )}
          </Box>
        </Box>

        <Box mt={3}>
          <Typography fontWeight="bold" variant="subtitle1" gutterBottom>
            Employees:
          </Typography>
          {employees.length > 0 ? (
            employees.map((employee) => (
              <Typography key={employee.personID} variant="subtitle1">
                {employee.firstName} {employee.lastName} - {employee.personID}
              </Typography>
            ))
          ) : (
            <Typography variant="subtitle1">No employees</Typography>
          )}
        </Box>

        <Box mt={3}>
          <Typography fontWeight="bold" variant="subtitle1" gutterBottom>
            Company Owner:
          </Typography>
          {companyOwner.length > 0 ? (
            companyOwner.map((owner) => (
              <Typography key={owner.personID} variant="subtitle1">
                {owner.firstName} {owner.lastName} - {owner.personID}
              </Typography>
            ))
          ) : (
            <Typography variant="subtitle1">No Company Owner</Typography>
          )}
        </Box>

        <Box mt={3}>
          <Typography fontWeight="bold" variant="subtitle1" gutterBottom>
            Projects:
          </Typography>
          {projectsWithTeams.length > 0 ? (
            projectsWithTeams.map((project) => (
              <Box key={project.projectID} mb={2}>
                <Typography variant="subtitle1">
                  <strong>{project.projectName}</strong> - {project.projectID}
                </Typography>
                {project.relatedTeams.length > 0 && (
                  <Box ml={2}>
                    {project.relatedTeams.map((team) => (
                      <Typography
                        key={team.teamID}
                        variant="subtitle2"
                        onClick={() => handleTeamClick(team.teamID)}
                        sx={{ cursor: 'pointer', color: theme.palette.secondary.main, fontWeight: 'bold' }}
                      >
                        Related to Team: {team.teamName}
                      </Typography>
                    ))}
                  </Box>
                )}
              </Box>
            ))
          ) : (
            <Typography variant="subtitle1">No projects</Typography>
          )}
        </Box>

        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        </Box>

    </Paper>
  );
};

export default CombinedCompanyInfoWidget;
