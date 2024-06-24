import React, { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton, Link } from '@mui/material';
import { Refresh } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useTheme } from '@emotion/react';

const FileTable = () => {
  const [files, setFiles] = useState([]);
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const theme = useTheme();

  const fetchFiles = async () => {
    const response = await fetch(`http://localhost:5001/files/user/${_id}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setFiles(data);
  };

  useEffect(() => {
    fetchFiles();
  }, [_id, token]);

  const renderRelatedToLink = (considers, relatedTo) => {
    if (considers === 'building') {
      return <Link style={{ cursor: 'pointer', color: theme.palette.secondary.main }} href={`http://localhost:3000/buildingdataspace/${relatedTo}`}>{relatedTo}</Link>;
    }
    if (considers === 'element') {
      return <Link style={{ cursor: 'pointer', color: theme.palette.secondary.main }} href={`http://localhost:3000/elementdataspace/${relatedTo}`}>{relatedTo}</Link>;
    }
    return relatedTo;
  };

  return (
    <Box mt="2rem">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" gutterBottom>
          PersonalData Space Content
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
              <TableCell>Description</TableCell>
              <TableCell>Related To</TableCell>
              <TableCell>Related To Data Space ID</TableCell>
              <TableCell>Uploaded At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {files.map((file) => (
              <TableRow key={file.fileID}>
                <TableCell>{file.fileID}</TableCell>
                <TableCell>{file.fileName}</TableCell>
                <TableCell>{file.description}</TableCell>
                <TableCell>{file.considers}</TableCell>
                <TableCell >{renderRelatedToLink(file.considers, file.relatedTo) }</TableCell>
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
