import React, { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableFooter, Paper, Typography, IconButton, Select, MenuItem, Button } from '@mui/material';
import { Refresh } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import { updateFile } from 'state'; 

const FileTable = () => {
  const [files, setFiles] = useState([]);
  const [editingFileID, setEditingFileID] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const { dataSpaceID } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
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

  useEffect(() => {
    fetchFiles();
  }, [token]);

  const handleRowClick = (file) => {
    if (file.considers === 'building') {
      navigate(`/buildingdataspace/${file.buildingDataSpaceID}`);
    } else if (file.considers === 'element') {
      navigate(`/elementdataspace/${file.elementDataSpaceID}`);
    } else if (file.considers === 'project') {
      navigate(`/companydataspace/${file.relatedToProject}`);
    }
  };

  const handleFileClick = (file) => {
    if (file.considers === 'building') {
      navigate(`/buildingdataspace/${file.buildingDataSpaceID}/${file.fileID}`);
    } else if (file.considers === 'element') {
      navigate(`/elementdataspace/${file.elementDataSpaceID}/${file.fileID}`);
    }
  };

  const handleProjectClick = (file) => {
    navigate(`/companydataspace/${file.relatedToProject}/${file.fileID}`);
  };

  const handleEditClick = (fileID, currentStatus) => {
    setEditingFileID(fileID);
    setSelectedStatus(currentStatus);
  };

  const handleSave = async (fileID) => {
    try {
      const response = await fetch(`http://localhost:5001/files/${fileID}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: selectedStatus }),
      });

      if (response.ok) {
        const updatedFile = await response.json();
        dispatch(updateFile(updatedFile));
        setEditingFileID(null);
        setSelectedStatus('');
        fetchFiles();  // Refresh the file list
      } else {
        console.error('Failed to update file:', await response.text());
      }
    } catch (error) {
      console.error('Failed to update file:', error);
    }
  };

  return (
    <Box mt="2rem">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" gutterBottom>
          Personal Data Space Content
        </Typography>
        <IconButton onClick={fetchFiles} color="primary">
          <Refresh />
        </IconButton>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>File ID</TableCell>
              <TableCell>File Name</TableCell>
              <TableCell>File Description</TableCell>
              <TableCell>File Owned By</TableCell>
              <TableCell>Uploaded on Personal Data Space</TableCell>
              <TableCell>File Considers</TableCell>
              <TableCell>Stored in Data Space (projectID)</TableCell>
              <TableCell>Related To Project</TableCell>
              <TableCell>Part of company Data Space</TableCell>
              <TableCell>Related To Team</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Uploaded At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {files
              .filter((file) => file.personalDataSpaceID === dataSpaceID)
              .map((file) => (
                <TableRow key={file.fileID}>
                  <TableCell onClick={() => handleFileClick(file)} style={{ cursor: 'pointer', color: theme.palette.secondary.main }}>
                    {file.fileID}
                  </TableCell>
                  <TableCell>{file.fileName}</TableCell>
                  <TableCell>{file.fileDescription}</TableCell>
                  <TableCell>{file.fileOwner}</TableCell>
                  <TableCell>{file.personalDataSpaceID}</TableCell>
                  <TableCell>{file.considers}</TableCell>
                  <TableCell onClick={() => handleRowClick(file)} style={{ cursor: 'pointer', color: theme.palette.secondary.main }}>
                    {file.considers === 'building' && file.buildingDataSpaceID}
                    {file.considers === 'element' && file.elementDataSpaceID}
                  </TableCell>
                  <TableCell onClick={() => handleProjectClick(file)} style={{ cursor: 'pointer', color: theme.palette.secondary.main }}>
                    {file.relatedToProject}
                  </TableCell>
                  <TableCell>{file.companyDataSpaceID}</TableCell>
                  <TableCell>{file.relatedToTeam}</TableCell>
                  <TableCell>
                    {editingFileID === file.fileID ? (
                      <Select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        fullWidth
                      >
                        <MenuItem value="private">Private</MenuItem>
                        <MenuItem value="sharedCompany">Shared with Company</MenuItem>
                        <MenuItem value="sharedTeam">Shared with Team</MenuItem>
                        <MenuItem value="public">Public</MenuItem>
                      </Select>
                    ) : (
                      file.status
                    )}
                  </TableCell>
                  <TableCell>{new Date(file.createdAt).toLocaleString()}</TableCell>
                  <TableCell>
                    {editingFileID === file.fileID ? (
                      <Button onClick={() => handleSave(file.fileID)} color="primary">
                        Save
                      </Button>
                    ) : (
                      <Button onClick={() => handleEditClick(file.fileID, file.status)} color="secondary">
                        Edit
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={12}>
                <Typography variant="caption" color="textSecondary" component="div">
                  <div>
                    <strong>1. A file could have four types of 'status':</strong>
                    <br />
                    <strong>a. "private":</strong> the file is only accessible by the file owner.
                    <br />
                    <strong>b. "sharedCompany":</strong> the file is accessible to the employees that are part of the project. See the company Data Space for an overview of the employees. 
                    <br />
                    <strong>c. "sharedTeam":</strong> the file is accessible to all employees within the team (this could include multiple companies). See the team data space for an overview of the employees.
                    <br />
                    <strong>d. "public":</strong> the file is accessible to everyone who has an account on the AECO Data Space.
                  </div>
                </Typography>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default FileTable;
