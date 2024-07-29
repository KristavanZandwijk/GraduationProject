import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Header from 'components/Header';
import DataSpaceTable from 'components/DataSpaceTable';
import { useTheme } from '@mui/material';
import IFCViewer from 'components/IFCViewer';

const ProjectDataSpace = () => {
  const { projectID } = useParams();
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
        const response = await axios.get('http://localhost:5001/files', {
        });

        const allowedStatuses = ['sharedCompany', 'sharedTeam', 'public'];
        const filteredFiles = response.data.filter(
          (file) => file.relatedToProject === projectID && allowedStatuses.includes(file.status)
        );

        setFiles(filteredFiles);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  const handleFileClick = (fileID) => {
    navigate(`/buildingdataspace/${buildingDataSpaceID}/${fileID}`);
  };

  const handleCheckboxChange = (event, filepath) => {
    if (event.target.checked) {
      setSelectedFilepaths((prevState) => [...prevState, filepath]);
    } else {
      setSelectedFilepaths((prevState) => prevState.filter((path) => path !== filepath));
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
        <Header
          title="Project Data Space"
          subtitle="This page shows all information that is linked to the project"
        />
      </Box>
      <DataSpaceTable
        files={files}
        selectedFilepaths={selectedFilepaths}
        handleFileClick={handleFileClick}
        handleCheckboxChange={handleCheckboxChange}
      />
      <Box flex="1" height="80vh">
        <IFCViewer selectedFilepaths={selectedFilepaths} />
      </Box>
    </Box>
  );
};

export default ProjectDataSpace;
