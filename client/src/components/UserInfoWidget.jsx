import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  useTheme,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import UserImage from 'components/UserImage';
import { updateUser } from 'state';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const UserWidget = () => {
  const { palette } = useTheme();
  const user = useSelector((state) => state.user);
  const { picturePath } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const theme = useTheme();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);
  const [companies, setCompanies] = useState([]);
  const [projects, setProjects] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [teams, setTeams] = useState([]); // New state for teams

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('http://localhost:5001/companies', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const companies = Array.isArray(response.data) ? response.data : [];
        setCompanies(companies);
        const filteredCompanies = companies.filter(company =>
          company.employees.some(employee => employee.personID === user.personID)
        );
        setFilteredCompanies(filteredCompanies);
      } catch (error) {
        console.error('Failed to fetch companies:', error);
      }
    };

    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5001/projects', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const projects = Array.isArray(response.data) ? response.data : [];
        setProjects(projects);
        const filteredProjects = projects.filter(project =>
          project.employees.some(employee => employee.personID === user.personID)
        );
        setFilteredProjects(filteredProjects);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    };

    const fetchTeams = async () => { // New function to fetch teams
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

    fetchCompanies();
    fetchProjects();
    fetchTeams(); // Fetch teams
  }, [dispatch, token, user.personID]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`http://localhost:5001/users/${user._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        dispatch(updateUser(updatedUser));
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  const handleCompanyClick = (companyID) => {
    navigate(`/companydataspace/${companyID}`);
  };

  const handleProjectClick = (companyID, projectID) => {
    navigate(`/companydataspace/${companyID}/${projectID}`);
  };

  const handleTeamClick = (teamID) => {
    navigate(`/teamdataspace/${teamID}`);
  };

  // Map projects to include team names
  const projectsWithTeams = filteredProjects.map(project => {
    const relatedTeams = teams.filter(team => team.projects.some(p => p.projectID === project.projectID));
    return {
      ...project,
      relatedTeams
    };
  });

  return (
    <Box>
      <Grid container spacing={2} mt={3}>
        {/* Left section with user image */}
        <Grid item xs={12} md={4}>
          <Box display="flex" justifyContent="center">
            <UserImage image={picturePath} size="350px" />
          </Box>
        </Grid>

        {/* Right section with profile information */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ borderRadius: 10 }}>
            <Box p={3}>
              <Typography color={palette.secondary[200]} fontWeight="bold" variant="h5" gutterBottom>
                Profile Information
              </Typography>
              {isEditing ? (
                <>
                  <TextField
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Phone Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <Box mt={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSave}
                    >
                      Save
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => setIsEditing(false)}
                      sx={{ ml: 2 }}
                    >
                      Cancel
                    </Button>
                  </Box>
                </>
              ) : (
                <>
                  <Typography variant="subtitle1">
                    <strong>First name:</strong> {user.firstName}
                  </Typography>
                  <Typography variant="subtitle1">
                    <strong>Last name:</strong> {user.lastName}
                  </Typography>
                  <Typography variant="subtitle1">
                    <strong>Email:</strong> {user.email}
                  </Typography>
                  <Typography variant="subtitle1">
                    <strong>Phone number:</strong> {user.phoneNumber}
                  </Typography>
                  <Typography variant="subtitle1">
                    <strong>Country:</strong> {user.country}
                  </Typography>
                  <Typography variant="subtitle1">
                    <strong>City:</strong> {user.city}
                  </Typography>
                  <Typography variant="subtitle1">
                    <strong>Role:</strong> {user.role}
                  </Typography>
                  <Typography variant="subtitle1">
                    <strong>PersonID:</strong> {user.personID}
                  </Typography>
                  <Typography variant="subtitle1">
                    <strong>Personal Data Space ID:</strong> {user.dataSpaceID}
                  </Typography>
                  <Box mt={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit
                    </Button>
                  </Box>
                </>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Companies section */}
      <Box mt={3}>
        <Typography color={palette.secondary[200]} fontWeight="bold" variant="h6" gutterBottom>
          Companies
        </Typography>
        {filteredCompanies.length > 0 ? (
          filteredCompanies.map((company) => (
            <Paper
              key={company.companyID}
              elevation={2}
              sx={{ p: 2, mb: 2, cursor: 'pointer' }}
              onClick={() => handleCompanyClick(company.companyID)}
            >
              <Typography variant="subtitle1">
                <strong>Company Name:</strong> {company.companyName}
              </Typography>
              <Typography variant="subtitle2">
                <strong>Company ID:</strong> {company.companyID}
              </Typography>
            </Paper>
          ))
        ) : (
          <Typography>No companies associated with this user.</Typography>
        )}
      </Box>

      {/* Projects section */}
      <Box mt={3}>
        <Typography color={palette.secondary[200]} fontWeight="bold" variant="h6" gutterBottom>
          Projects
        </Typography>
        {projectsWithTeams.length > 0 ? (
          projectsWithTeams.map((project) => (
            <Paper
              key={project.projectID}
              elevation={2}
              sx={{ p: 2, mb: 2, cursor: 'pointer' }}
            >
              <Typography
                variant="subtitle1"
                onClick={() => handleProjectClick(project.companyID, project.projectID)}
                style={{ cursor: 'pointer'}} // Fixed project click handler
              >
                <strong>Project Name:</strong> {project.projectName}
              </Typography>
              <Typography variant="subtitle2" mt={1}>
                <strong>Project ID:</strong> {project.projectID}
              </Typography>
              {project.relatedTeams.length > 0 && (
                <Box mt={1}>
                  {project.relatedTeams.map((team) => (
                    <Typography
                      key={team.teamID}
                      variant="subtitle2"
                      onClick={() => handleTeamClick(team.teamID)}
                      style={{ cursor: 'pointer'}}
                    >
                       <span style={{ color: theme.palette.secondary.main, fontWeight: 'bold' }}>
                        Related to Team:
                      </span> {team.teamName}
                    </Typography>
                  ))}
                </Box>
              )}
            </Paper>
          ))
        ) : (
          <Typography>No projects associated with this user.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default UserWidget;
