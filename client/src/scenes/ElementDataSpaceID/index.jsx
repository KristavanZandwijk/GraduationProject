import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Header from 'components/Header';
import { useTheme } from "@mui/material";

const ElementDataSpaceID = () => {
  const { elementDataSpaceID } = useParams(); // Assuming you use react-router-dom v6
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/files`, {
          params: { relatedTo: elementDataSpaceID }
        });
        setFiles(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [elementDataSpaceID]);

  const handleFileClick = (fileID) => {
    navigate(`/elementdataspace/${elementDataSpaceID}/${fileID}`); // Navigate to the specified route
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box m="1.5rem 2.5rem">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Element Data Space ID" subtitle="This space shows all information that is stored in this data space." />
      </Box>
      {files.length > 0 ? (
        <TableContainer component={Paper} sx={{ marginTop: "2rem" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>File ID</TableCell>
                <TableCell>File Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>File Path</TableCell>
                <TableCell>Uploaded At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {files.map((file) => (
                <TableRow key={file._id}>
                  <TableCell  onClick={() => handleFileClick(file.fileID)} style={{ cursor: 'pointer', color: theme.palette.secondary.main }}>{file.fileID}</TableCell>
                  <TableCell>{file.fileName}</TableCell>
                  <TableCell>{file.description}</TableCell>
                  <TableCell>{file.filePath}</TableCell>
                  <TableCell>{new Date(file.createdAt).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography mt="2rem">Unfortunately, there are no files related to this dataspace yet.</Typography>
      )}
    </Box>
  );
};

export default ElementDataSpaceID;
