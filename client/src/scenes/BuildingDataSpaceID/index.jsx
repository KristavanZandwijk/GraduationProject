import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from 'components/Header';
import DataSpaceTable from 'components/DataSpaceTable';
import { useTheme } from "@mui/material";
import IFCViewer from 'components/IFCViewer';

const BuildingDataSpaceID = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
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
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const filteredFiles = response.data.filter(
          (file) => file.buildingDataSpaceID === buildingDataSpaceID && file.status === 'public'
        );

        setFiles(filteredFiles);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [buildingDataSpaceID, token]);

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

export default BuildingDataSpaceID;
