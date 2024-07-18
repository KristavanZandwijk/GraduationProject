import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Checkbox } from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Header from 'components/Header';
import { useTheme } from "@mui/material";
import IFCViewer from 'components/IFCViewer';

const BuildingDataSpaceID = () => {
  const { buildingDataSpaceID } = useParams();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFilepaths, setSelectedFilepaths] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/files`, {
          params: { buildingDataSpaceID: buildingDataSpaceID }
        });
        setFiles(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [buildingDataSpaceID]);

  const handleFileClick = (fileID) => {
    navigate(`/buildingdataspace/${buildingDataSpaceID}/${fileID}`);
  };

  const handleCheckboxChange = (event, filepath) => {
    if (event.target.checked) {
      setSelectedFilepaths(prevState => [...prevState, filepath]);
    } else {
      setSelectedFilepaths(prevState => prevState.filter(path => path !== filepath));
    }
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
        <Header title="Building Data Space ID" subtitle="This space shows all information that is stored in this data space." />
      </Box>
      {files.length > 0 ? (
        <TableContainer component={Paper} sx={{ marginTop: "2rem" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Visualize IFC</TableCell>
                <TableCell>File ID</TableCell>
                <TableCell>File Name</TableCell>
                <TableCell>File Description</TableCell>
                <TableCell>File is Owned by</TableCell>
                <TableCell>Uploaded At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {files.map((file) => (
                <TableRow key={file._id}>
                  <TableCell>
                    {file.filePath.endsWith('.ifc') && (
                      <Checkbox
                        checked={selectedFilepaths.includes(file.filePath)}
                        onChange={(event) => handleCheckboxChange(event, file.filePath)}
                      />
                    )}
                  </TableCell>
                  <TableCell onClick={() => handleFileClick(file.fileID)} style={{ cursor: 'pointer', color: theme.palette.secondary.main }}>{file.fileID}</TableCell>
                  <TableCell>{file.fileName}</TableCell>
                  <TableCell>{file.fileDescription}</TableCell>
                  <TableCell>{file.hasOwner}</TableCell>
                  <TableCell>{new Date(file.createdAt).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography mt="2rem">Unfortunately, there are no files related to this dataspace yet.</Typography>
      )}
      <Box flex="1" height="80vh">
        <IFCViewer selectedFilepaths={selectedFilepaths} />
      </Box>
    </Box>
  );
};

export default BuildingDataSpaceID;
