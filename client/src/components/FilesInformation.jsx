import React, { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton } from '@mui/material';
import { Refresh } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';

const FileTable = () => {
  const [files, setFiles] = useState([]);
  const { dataSpaceID } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();
  const theme = useTheme();

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
                  <TableCell>{file.hasOwner}</TableCell>
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
                  <TableCell>{file.status}</TableCell>
                  <TableCell>{new Date(file.createdAt).toLocaleString()}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default FileTable;
