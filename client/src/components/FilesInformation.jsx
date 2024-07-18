import React, { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton } from '@mui/material';
import { Refresh } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';

const FileTable = () => {
  const [files, setFiles] = useState([]);
  const { personID, dataSpaceID } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();
  const theme = useTheme();

  const fetchFiles = async () => {
    const response = await fetch(`http://localhost:5001/files`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setFiles(data);
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
    } else if (file.considers === 'project') {
      navigate(`/companydataspace/${file.relatedToProject}/${file.fileID}`);
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
              <TableCell>Uploaded At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {files
              .filter((file) => file.personalDataSpaceID === dataSpaceID)
              .map((file) => (
                <TableRow key={file.fileID}>
                  <TableCell onClick={() => handleFileClick(file)} style={{ cursor: 'pointer', color: theme.palette.secondary.main }}>{file.fileID}</TableCell>
                  <TableCell>{file.fileName}</TableCell>
                  <TableCell>{file.fileDescription}</TableCell>
                  <TableCell>{file.hasOwner}</TableCell>
                  <TableCell>{file.personalDataSpaceID}</TableCell>
                  <TableCell>{file.considers}</TableCell>
                  <TableCell onClick={() => handleRowClick(file)} style={{ cursor: 'pointer', color: theme.palette.secondary.main }}>
                    {file.considers === 'building' && file.buildingDataSpaceID}
                    {file.considers === 'element' && file.elementDataSpaceID}
                    {file.considers === 'project' && (
                      <>
                        <div>{file.companyDataSpaceID}</div>
                        <div>{file.relatedToProject}</div>
                      </>
                    )}
                  </TableCell>
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
