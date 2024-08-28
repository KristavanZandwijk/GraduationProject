import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, TextField, FormControl, InputLabel, Button, useTheme, Select, MenuItem, Checkbox, ListItemText, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { updateProject, setUsers } from 'state';

const ProjectInfo = ({ project, companies, users: propUsers, buildings, onProjectUpdate }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(project);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const [selectedEmployees, setSelectedEmployees] = useState(
    Array.isArray(project.employees) ? project.employees.map(emp => emp.personID) : []
  );
  const [selectedProjectleader, setSelectedProjectleader] = useState(
    Array.isArray(project.projectleader) ? project.projectleader.map(leader => leader.personID) : []
  );
  const [selectedCompanies, setSelectedCompanies] = useState(
    Array.isArray(project.companies) ? project.companies.map(comp => comp.companyID) : []
  );
  const [selectedClients, setSelectedClients] = useState(
    Array.isArray(project.clients) ? project.clients.map(client => client.personID) : []
  );
  const [selectedBuildings, setSelectedBuildings] = useState(
    Array.isArray(project.relatesTo) ? project.relatesTo.map(building => building.buildingID) : []
  );

  const token = useSelector((state) => state.token);

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

    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5001/projects', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProjects(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    };

    fetchUsers();
    fetchProjects();
  }, [token, dispatch]);

  const getCompanyName = (companyID) => {
    const company = companies.find(c => c.companyID === companyID);
    return company ? company.companyName : companyID;
  };

  const getUserName = (personID) => {
    const user = users.find(u => u.personID === personID);
    return user ? `${user.firstName} ${user.lastName}` : personID;
  };

  const getBuildingName = (buildingID) => {
    const building = buildings.find(b => b.buildingID === buildingID);
    return building ? building.buildingName : buildingID;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  const handleSave = async () => {
    try {
      const updatedData = {
        ...formData,
        employees: selectedEmployees.map(id => ({ personID: id })),
        projectleader: selectedProjectleader.map(id => ({ personID: id })),
        companies: selectedCompanies.map(id => ({ companyID: id })),
        clients: selectedClients.map(id => ({ personID: id })),
        relatesTo: selectedBuildings.map(id => ({ buildingID: id })),
      };
      const response = await axios.patch(`http://localhost:5001/projects/${project._id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(updateProject(response.data)); 
      setIsEditing(false);
      onProjectUpdate(); 
    } catch (error) {
      console.error('Failed to update project:', error);
    }
  };

  const handleCancel = () => {
    setFormData(project);
    setSelectedEmployees(Array.isArray(project.employees) ? project.employees.map(emp => emp.personID) : []);
    setSelectedProjectleader(Array.isArray(project.projectleader) ? project.projectleader.map(leader => leader.personID) : []);
    setSelectedCompanies(Array.isArray(project.companies) ? project.companies.map(comp => comp.companyID) : []);
    setSelectedClients(Array.isArray(project.clients) ? project.clients.map(client => client.personID) : []);
    setSelectedBuildings(Array.isArray(project.relatesTo) ? project.relatesTo.map(building => building.buildingID) : []);
    setIsEditing(false);
  };

  return (
    <Paper elevation={3} sx={{ borderRadius: 10, p: 3 }}>
      <Typography color={theme.palette.secondary.main} fontWeight="bold" variant="h5" gutterBottom>
        Project Information
      </Typography>
      <Box display="flex" flexDirection="column">
        {isEditing ? (
          <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Project Name"
              name="projectName"
              value={formData.projectName || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              name="projectDescription"
              value={formData.projectDescription || ''}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              multiline
              rows={2}
            />
          </Grid>
          
          <Grid item xs={12}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Companies</InputLabel>
              <Select
                name="companies"
                multiple
                value={selectedCompanies}
                onChange={(e) => setSelectedCompanies(e.target.value)}
                renderValue={(selected) => selected.map(getCompanyName).join(', ')}
                displayEmpty
                sx={{ 
                  backgroundColor: theme.palette.primary.default,
                  borderRadius: "0", // Set borderRadius to 0 for squared edges
                  padding: "0.75rem 1.5rem",
                  '& .MuiSelect-select': {
                    borderRadius: "0", // Ensure the inner part also has squared edges
                    padding: "0.75rem 1.5rem", // Ensure padding is consistent with TextField
                    display: "flex", // Ensure items are properly aligned
                    alignItems: "center", // Align items in the center
                  }
                }}
              >
                <MenuItem value="" disabled>
                  <em>Select the company(s) involved in the project</em>
                </MenuItem>
                {Array.isArray(companies) && companies.map((company) => (
                  <MenuItem key={company.companyID} value={company.companyID}>
                    <Checkbox checked={selectedCompanies.indexOf(company.companyID) > -1} />
                    <ListItemText primary={company.companyName} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        
          <Grid item xs={12}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Project Leader</InputLabel>
              <Select
                name="projectleader"
                multiple
                value={selectedProjectleader}
                onChange={(e) => setSelectedProjectleader(e.target.value)}
                renderValue={(selected) => selected.map(getUserName).join(', ')}
                displayEmpty
                sx={{ 
                  backgroundColor: theme.palette.primary.default,
                  borderRadius: "0", // Set borderRadius to 0 for squared edges
                  padding: "0.75rem 1.5rem",
                  '& .MuiSelect-select': {
                    borderRadius: "0", // Ensure the inner part also has squared edges
                    padding: "0.75rem 1.5rem", // Ensure padding is consistent with TextField
                    display: "flex", // Ensure items are properly aligned
                    alignItems: "center", // Align items in the center
                  }
                }}
              >
                <MenuItem value="" disabled>
                  <em>Select the project leader(s) involved in the project</em>
                </MenuItem>
                {Array.isArray(users) && users.map((user) => (
                  <MenuItem key={user.personID} value={user.personID}>
                    <Checkbox checked={selectedProjectleader.indexOf(user.personID) > -1} />
                    <ListItemText primary={`${user.firstName} ${user.lastName}`} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        
          <Grid item xs={12}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Employees</InputLabel>
              <Select
                name="employees"
                multiple
                value={selectedEmployees}
                onChange={(e) => setSelectedEmployees(e.target.value)}
                renderValue={(selected) => selected.map(getUserName).join(', ')}
                displayEmpty
                sx={{ 
                  backgroundColor: theme.palette.primary.default,
                  borderRadius: "0", // Set borderRadius to 0 for squared edges
                  padding: "0.75rem 1.5rem",
                  '& .MuiSelect-select': {
                    borderRadius: "0", // Ensure the inner part also has squared edges
                    padding: "0.75rem 1.5rem", // Ensure padding is consistent with TextField
                    display: "flex", // Ensure items are properly aligned
                    alignItems: "center", // Align items in the center
                  }
                }}
              >
                <MenuItem value="" disabled>
                  <em>Select the employees involved in the project</em>
                </MenuItem>
                {Array.isArray(users) && users.map((user) => (
                  <MenuItem key={user.personID} value={user.personID}>
                    <Checkbox checked={selectedEmployees.indexOf(user.personID) > -1} />
                    <ListItemText primary={`${user.firstName} ${user.lastName}`} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        
          <Grid item xs={12}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Clients</InputLabel>
              <Select
                name="clients"
                multiple
                value={selectedClients}
                onChange={(e) => setSelectedClients(e.target.value)}
                renderValue={(selected) => selected.length > 0 ? selected.map(getUserName).join(', ') : ''}
                displayEmpty
                sx={{ 
                  backgroundColor: theme.palette.primary.default,
                  borderRadius: "0", // Set borderRadius to 0 for squared edges
                  padding: "0.75rem 1.5rem",
                  '& .MuiSelect-select': {
                    borderRadius: "0", // Ensure the inner part also has squared edges
                    padding: "0.75rem 1.5rem", // Ensure padding is consistent with TextField
                    display: "flex", // Ensure items are properly aligned
                    alignItems: "center", // Align items in the center
                  }
                }}
              >
                <MenuItem value="" disabled>
                  <em>Select Clients</em>
                </MenuItem>
                {Array.isArray(users) && users.map((user) => (
                  <MenuItem key={user.personID} value={user.personID}>
                    <Checkbox checked={selectedClients.indexOf(user.personID) > -1} />
                    <ListItemText primary={`${user.firstName} ${user.lastName}`} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        
          <Grid item xs={12}>
            <FormControl fullWidth margin="normal">
              <InputLabel>Buildings</InputLabel>
              <Select
                name="buildings"
                multiple
                value={selectedBuildings}
                onChange={(e) => setSelectedBuildings(e.target.value)}
                renderValue={(selected) => selected.map(getBuildingName).join(', ')}
                displayEmpty
                sx={{ 
                  backgroundColor: theme.palette.primary.default,
                  borderRadius: "0", // Set borderRadius to 0 for squared edges
                  padding: "0.75rem 1.5rem",
                  '& .MuiSelect-select': {
                    borderRadius: "0", // Ensure the inner part also has squared edges
                    padding: "0.75rem 1.5rem", // Ensure padding is consistent with TextField
                    display: "flex", // Ensure items are properly aligned
                    alignItems: "center", // Align items in the center
                  }
                }}
              >
                <MenuItem value="" disabled>
                  <em>Select the related buildings</em>
                </MenuItem>
                {Array.isArray(buildings) && buildings.map((building) => (
                  <MenuItem key={building.buildingID} value={building.buildingID}>
                    <Checkbox checked={selectedBuildings.indexOf(building.buildingID) > -1} />
                    <ListItemText primary={building.buildingName} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
            <Grid item xs={12} display="flex" justifyContent="flex-end">
              <Button onClick={handleSave} variant="contained" color="primary" sx={{ mr: 1 }}>
                Save
              </Button>
              <Button onClick={handleCancel} variant="outlined">
                Cancel
              </Button>
            </Grid>
          </Grid>
        ) : (
          <>
            <Typography variant="subtitle1">
              <strong>Project Name:</strong> {project.projectName}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Project Description:</strong> {project.projectDescription}
            </Typography>
          </>
        )}
        <Box mt={3}>
          <Typography fontWeight="bold" variant="subtitle1" gutterBottom>
            Companies:
          </Typography>
          {companies.length > 0 ? (
            companies.map((company) => (
              <Typography key={company.companyID} variant="subtitle1">
                {company.companyName} - {company.companyID}
              </Typography>
            ))
          ) : (
            <Typography variant="subtitle1">No companies</Typography>
          )}
        </Box>

        <Box mt={3}>
          <Typography fontWeight="bold" variant="subtitle1" gutterBottom>
            Project Leader(s):
          </Typography>
          {Array.isArray(project.projectleader) && project.projectleader.length > 0 ? (
            project.projectleader.map((leader) => (
              <Typography key={leader.personID} variant="subtitle1">
                {getUserName(leader.personID)} - {leader.personID}
              </Typography>
            ))
          ) : (
            <Typography variant="subtitle1">No project leader(s)</Typography>
          )}
        </Box>

        <Box mt={3}>
          <Typography fontWeight="bold" variant="subtitle1" gutterBottom>
            Employees:
          </Typography>
          {Array.isArray(project.employees) && project.employees.length > 0 ? (
            project.employees.map((employee) => (
              <Typography key={employee.personID} variant="subtitle1">
                {getUserName(employee.personID)} - {employee.personID}
              </Typography>
            ))
          ) : (
            <Typography variant="subtitle1">No employees</Typography>
          )}
        </Box>

        <Box mt={3}>
          <Typography fontWeight="bold" variant="subtitle1" gutterBottom>
            Client(s):
          </Typography>
          {Array.isArray(project.clients) && project.clients.length > 0 ? (
            project.clients.map((client) => (
              <Typography key={client.personID} variant="subtitle1">
                {getUserName(client.personID)} - {client.personID}
              </Typography>
            ))
          ) : (
            <Typography variant="subtitle1">No client(s)</Typography>
          )}
        </Box>

        <Box mt={3}>
          <Typography fontWeight="bold" variant="subtitle1" gutterBottom>
            Related to building(s):
          </Typography>
          {Array.isArray(project.relatesTo) && project.relatesTo.length > 0 ? (
            project.relatesTo.map((building) => (
              <Typography key={building.buildingID} variant="subtitle1">
                {getBuildingName(building.buildingID)} - {building.buildingID}
              </Typography>
            ))
          ) : (
            <Typography variant="subtitle1">No building(s)</Typography>
          )}
        </Box>

        <Box mt={2}>
          <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        </Box>
      </Box>
      <Button
        variant="outlined"
        color='secondary'
        sx={{ mt: 2 }}
      >
        View project specific data space
      </Button>
    </Paper>
  );
};

export default ProjectInfo;
