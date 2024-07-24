import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Header from 'components/Header';
import { setBuildings } from '../../state';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UrbanBuildingTable from 'components/UrbanBuildingsTable';
import IFCViewer from 'components/IFCViewer';

const UrbanScale = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const buildings = useSelector((state) => state.buildings || []);
  const { personID } = useSelector((state) => state.user);
  const [selectedBuildingDataSpaceIDs, setSelectedBuildingDataSpaceIDs] = useState([]);
  const [selectedFilePaths, setSelectedFilePaths] = useState([]);
  const [files, setFiles] = useState([]);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const response = await axios.get('http://localhost:5001/buildings', {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setBuildings(Array.isArray(response.data) ? response.data : []));
      } catch (error) {
        console.error('Failed to fetch buildings:', error);
      }
    };

    const fetchFiles = async () => {
      try {
        const response = await axios.get('http://localhost:5001/files', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFiles(response.data.filter(file => file.filePath.endsWith('.ifc')));
      } catch (error) {
        console.error('Failed to fetch files:', error);
      }
    };

    fetchBuildings();
    fetchFiles();
  }, [dispatch, token]);

  const handleCheckboxChange = (event, buildingDataSpaceID) => {
    if (event.target.checked) {
      setSelectedBuildingDataSpaceIDs(prevState => [...prevState, buildingDataSpaceID]);
      const relatedFiles = files.filter(file => file.buildingDataSpaceID === buildingDataSpaceID);
      setSelectedFilePaths(prevState => [...prevState, ...relatedFiles.map(file => file.filePath)]);
    } else {
      setSelectedBuildingDataSpaceIDs(prevState => prevState.filter(id => id !== buildingDataSpaceID));
      setSelectedFilePaths(prevState => prevState.filter(path => !files.some(file => file.buildingDataSpaceID === buildingDataSpaceID && file.filePath === path)));
    }
  };

  const filteredBuildings = Array.isArray(buildings)
    ? buildings.filter(building => building.hasOwner === personID)
    : [];

    const handleNewBuildingClick = () => {
      navigate('/urbanscale/newbuilding');
    };

  return (
    <Box m="1.5rem 2.5rem" height="100vh" display="flex" flexDirection="column">
        <Header
          title="Urban Scale"
          subtitle="This map shows the buildings (ifc files) that are accessible by you."
        />
        <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" color="primary" onClick={handleNewBuildingClick} sx={{ mr: 2 }}>
          Create New Building
        </Button>
      </Box>
      <Box mt={3}>
        {buildings.length === 0 ? (
          <CircularProgress />
        ) : filteredBuildings.length === 0 ? (
          <Typography variant="h6">You unfortunately do not own any buildings (yet).</Typography>
        ) : (
          <UrbanBuildingTable 
            buildings={filteredBuildings}
            selectedFilePaths={selectedFilePaths} 
            handleCheckboxChange={handleCheckboxChange} />
        )}
      </Box>
      <Box flex="1" height="80vh">
        <IFCViewer selectedFilepaths={selectedFilePaths} />
      </Box>
    </Box>
  );
};

export default UrbanScale;
