import React, { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton, Link } from '@mui/material';
import { Refresh } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';

const FileTable = () => {
  const [files, setFiles] = useState([]);
  const { personID, dataSpaceID } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
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
                  <TableCell>{file.fileID}</TableCell>
                  <TableCell>{file.fileName}</TableCell>
                  <TableCell>{file.fileDescription}</TableCell>
                  <TableCell>{file.hasOwner}</TableCell>
                  <TableCell>{file.personalDataSpaceID}</TableCell>
                  <TableCell>{file.considers}</TableCell>
                  <TableCell>
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
