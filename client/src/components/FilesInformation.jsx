import React, { useEffect, useState } from 'react';
import { Box, Accordion, AccordionSummary, AccordionDetails, Typography, IconButton, Select, MenuItem, Button, InputBase, Grid, Paper } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { updateFile, setUsers } from 'state';
import axios from 'axios';

const FileTable = () => {
  const [files, setFiles] = useState([]);
  const [editingFileID, setEditingFileID] = useState(null);
  const [fileDetails, setFileDetails] = useState({});
  const { dataSpaceID } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const [buildings, setBuildings] = useState([]);
  const [elements, setElements] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();

  const fetchFiles = async () => {
    try {
      const response = await fetch(`http://localhost:5001/files`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setFiles(data);
    } catch (error) {
      console.error('Error fetching files:', error);
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

  const fetchBuildings = async () => {
    try {
      const response = await axios.get("http://localhost:5001/buildings/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setBuildings(Array.isArray(response.data) ? response.data : []));
    } catch (error) {
      console.error("Failed to fetch buildings:", error);
    }
  };

  const fetchElements = async () => {
    try {
      const response = await axios.get("http://localhost:5001/elements", {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setElements(Array.isArray(response.data) ? response.data : []));
    } catch (error) {
      console.error("Failed to fetch elements:", error);
    }
  };

  const fetchCompanies = async () => {
    try {
      const response = await axios.get("http://localhost:5001/companies", {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setCompanies(Array.isArray(response.data) ? response.data : []));
    } catch (error) {
      console.error("Failed to fetch companies:", error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:5001/projects", {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setProjects(Array.isArray(response.data) ? response.data : []));
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchFiles();
    fetchBuildings();
    fetchElements();
    fetchCompanies();
    fetchProjects();
  }, [token]);

  const getUserName = (personID) => {
    const user = users.find(u => u.personID === personID);
    return user ? `${user.firstName} ${user.lastName}` : personID;
  };

  const getProjectName = (projectID) => {
    const project = projects.find(p => p.projectID === projectID);
    return project ? project.projectName : projectID;
  };

  const getCompanyName = (companyDataSpaceID) => {
    const company = companies.find(c => c.companyDataSpaceID === companyDataSpaceID);
    return company ? company.companyName : companyDataSpaceID;
  };

  const getBuildingName = (buildingDataSpaceID) => {
    const building = buildings.find(building => building.buildingDataSpaceID === buildingDataSpaceID);
    return building ? building.buildingName : buildingDataSpaceID;
  };

  const getElementName = (elementDataSpaceID) => {
    const element = elements.find(element => element.elementDataSpaceID === elementDataSpaceID);
    return element ? element.elementName : elementDataSpaceID;
  };

  const handleEditClick = (file) => {
    setEditingFileID(file.fileID);
    setFileDetails(file);
  };

  const handleSave = async (fileID) => {
    try {
      const response = await fetch(`http://localhost:5001/files/${fileID}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(fileDetails),
      });

      if (response.ok) {
        const updatedFile = await response.json();
        dispatch(updateFile(updatedFile));
        setEditingFileID(null);
        setFileDetails({});
        fetchFiles(); // Refresh the file list
      } else {
        console.error('Failed to update file:', await response.text());
      }
    } catch (error) {
      console.error('Failed to update file:', error);
    }
  };

  const handleChange = (field, value) => {
    setFileDetails((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Box mt="2rem">
      <Grid container spacing={2}>
        {files
          .filter((file) => file.personalDataSpaceID === dataSpaceID)
          .map((file) => (
            <Grid item xs={12} key={file.fileID}>
              <Paper elevation={3}>
                <Accordion>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Box display="flex" flexDirection="column" width="100%">
                      <Typography
                        color={theme.palette.secondary[100]}
                        fontWeight="bold"
                        variant="h5"
                        gutterBottom
                      >
                        {file.fileName}
                      </Typography>
                      <Box mt={1}>
                        <Typography variant="h6">
                          <strong>File Description:</strong>
                        </Typography>
                        {editingFileID === file.fileID ? (
                          <InputBase
                            value={fileDetails.fileDescription || ''}
                            onChange={(e) => handleChange('fileDescription', e.target.value)}
                            fullWidth
                            placeholder="Enter file description"
                            sx={{
                              padding: '0.5rem',
                              borderRadius: '0.25rem',
                              border: `1px solid ${theme.palette.divider}`,
                              marginTop: '0.5rem',
                            }}
                          />
                        ) : (
                          <Typography variant="h6" mt={0.5}>
                            {file.fileDescription}
                          </Typography>
                        )}
                      </Box>
                      <Box mt={2}>
                        <Typography variant="h6">
                          <strong>File Status:</strong>
                        </Typography>
                        {editingFileID === file.fileID ? (
                          <Select
                            value={fileDetails.status || ''}
                            onChange={(e) => handleChange('status', e.target.value)}
                            fullWidth
                          >
                            <MenuItem value="private">Private</MenuItem>
                            <MenuItem value="sharedClient">Shared with Client</MenuItem>
                            <MenuItem value="sharedCompany">Shared with Company</MenuItem>
                            <MenuItem value="sharedTeam">Shared with Team</MenuItem>
                            <MenuItem value="public">Public</MenuItem>
                          </Select>
                        ) : (
                          <Typography variant="h6" mt={0.5}>
                            {file.status}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="h6"><strong>File ID:</strong> {file.fileID}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="h6"><strong>Uploaded At:</strong> {file.createdAt}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="h6"><strong>File Owned By:</strong> {getUserName(file.fileOwner)} - {file.fileOwner}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="h6"><strong>Personal Data Space ID:</strong> {file.personalDataSpaceID}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="h6"><strong>File Considers:</strong></Typography>
                        {editingFileID === file.fileID ? (
                          <Select
                            value={fileDetails.considers || ''}
                            onChange={(e) => handleChange('considers', e.target.value)}
                            fullWidth
                          >
                            <MenuItem value="element">Element</MenuItem>
                            <MenuItem value="building">Building</MenuItem>
                          </Select>
                        ) : (
                          <Typography variant="h6">{file.considers}</Typography>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="h6">
                          <strong>Relates to building/ element (Data Space ID):</strong>
                        </Typography>
                        {editingFileID === file.fileID ? (
                          fileDetails.considers === 'building' ? (
                            <Select
                              value={fileDetails.buildingDataSpaceID || ''}
                              onChange={(e) => handleChange('buildingDataSpaceID', e.target.value)}
                              fullWidth
                            >
                              {buildings.map((building) => (
                                <MenuItem
                                  key={building.buildingDataSpaceID}
                                  value={building.buildingDataSpaceID}
                                >
                                  {building.buildingName} - {building.buildingDataSpaceID}
                                </MenuItem>
                              ))}
                            </Select>
                          ) : (
                            <Select
                              value={fileDetails.elementDataSpaceID || ''}
                              onChange={(e) => handleChange('elementDataSpaceID', e.target.value)}
                              fullWidth
                            >
                              {elements.map((element) => (
                                <MenuItem
                                  key={element.elementDataSpaceID}
                                  value={element.elementDataSpaceID}
                                >
                                  {element.elementName} - {element.elementDataSpaceID}
                                </MenuItem>
                              ))}
                            </Select>
                          )
                        ) : (
                          <Typography variant="h6">
                            {file.considers === 'building'
                              ? `${getBuildingName(file.buildingDataSpaceID)} - ${file.buildingDataSpaceID}`
                              : file.considers === 'element'
                              ? `${getElementName(file.elementDataSpaceID)} - ${file.elementDataSpaceID}`
                              : 'N/A'}
                          </Typography>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="h6"><strong>Related To Project (Project ID):</strong></Typography>
                        {editingFileID === file.fileID ? (
                          <Select
                            value={fileDetails.relatedToProject || ''}
                            onChange={(e) => handleChange('relatedToProject', e.target.value)}
                            fullWidth
                          >
                            {projects.map((project) => (
                              <MenuItem key={project.projectID} value={project.projectID}>
                                {project.projectName} - {project.projectID}
                              </MenuItem>
                            ))}
                          </Select>
                        ) : (
                          <Typography variant="h6">{getProjectName(file.relatedToProject)} - {file.relatedToProject}</Typography>
                        )}
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="h6"><strong>Part of Company (Company Data Space ID):</strong></Typography>
                        {editingFileID === file.fileID ? (
                          <Select
                            value={fileDetails.companyDataSpaceID || ''}
                            onChange={(e) => handleChange('companyDataSpaceID', e.target.value)}
                            fullWidth
                          >
                            {companies.map((company) => (
                              <MenuItem key={company.companyID} value={company.companyID}>
                                {company.companyName} - {company.companyID}
                              </MenuItem>
                            ))}
                          </Select>
                        ) : (
                          <Typography variant="h6">{getCompanyName(file.companyDataSpaceID)} - {file.companyDataSpaceID} </Typography>
                        )}
                      </Grid>
                      <Grid item xs={12}>
                        {editingFileID === file.fileID ? (
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => handleSave(file.fileID)}
                          >
                            Save
                          </Button>
                        ) : (
                          <Button variant="contained" color="primary" onClick={() => handleEditClick(file)}>
                            <Typography>Edit</Typography>
                          </Button>
                        )}
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Paper>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default FileTable;
