import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Header from 'components/Header';
import { setBuildings } from '../../state';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UrbanBuildingTable from 'components/UrbanBuildingsTable';
import IFCViewer from 'components/IFCViewer';
import RoleBasedButton from 'components/RoleBasedButton';

const UrbanScale = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const buildings = useSelector((state) => state.buildings || []);
  const [selectedBuildingDataSpaceIDs, setSelectedBuildingDataSpaceIDs] = useState([]);
  const [selectedFilePaths, setSelectedFilePaths] = useState([]);
  const [files, setFiles] = useState([]);
  const token = useSelector((state) => state.token);

  const fetchBuildings = async () => {
    try {
      const response = await axios.get('http://localhost:5001/buildings/urban', {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setBuildings(Array.isArray(response.data) ? response.data : []));
    } catch (error) {
      console.error('Failed to fetch buildings:', error);
    }
  };

  useEffect(() => {
    fetchBuildings();
    const fetchFiles = async () => {
      try {
        const response = await axios.get('http://localhost:5001/files', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFiles(response.data.filter(file => file.filePath.endsWith('.ifc') && file.status === 'public'));
      } catch (error) {
        console.error('Failed to fetch files:', error);
      }
    };

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

  return (
    <Box m="1.5rem 2.5rem" height="100vh" display="flex" flexDirection="column">
      <Header
        title="Buildings"
        subtitle="This map shows the buildings (ifc files) that are publicly available. Click on the building to navigate to the specific building data space."
      />
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <RoleBasedButton
          roles={['admin', 'building owner', 'team leader', 'project leader']}
          buttonText="Create New Building"
          navigateTo="/buildingdataspace/newbuilding"
        />
      </Box>
      <Box mt={3}>
        {buildings.length === 0 ? (
          <CircularProgress />
        ) : (
          <UrbanBuildingTable 
            buildings={buildings}
            selectedBuildingDataSpaceIDs={selectedBuildingDataSpaceIDs}
            handleCheckboxChange={handleCheckboxChange}
            fetchBuildings={fetchBuildings} // Pass the function as a prop
          />
        )}
      </Box>
      <Box flex="1" height="100vh">
        <IFCViewer selectedFilepaths={selectedFilePaths} />
      </Box>
    </Box>
  );
};

export default UrbanScale;

