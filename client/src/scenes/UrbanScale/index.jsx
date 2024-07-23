import React, { useEffect } from 'react';
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
  const buildings = useSelector((state) => state.buildings || []);
  const { personID } = useSelector((state) => state.user);
  const navigate = useNavigate();
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

    fetchBuildings();
  }, [dispatch, token]);

  const filteredBuildings = Array.isArray(buildings) 
    ? buildings.filter(building => building.hasOwner === personID) 
    : [];

  const handleNewBuildingClick = () => {
    navigate('/newbuilding');
  };


    return (
      <Box m="1.5rem 2.5rem" height="100vh" display="flex" flexDirection="column">
        {/* Header component */}
        <Box mb={2}>
          <Header
            title="Urban Scale"
            subtitle="This map shows the collection of building data spaces"
          />
        </Box>
      <Box mt={3}>
        {buildings.length === 0 ? (
          <CircularProgress />
        ) : filteredBuildings.length === 0 ? (
          <Typography variant="h6">You unfortunately do not own any buildings (yet).</Typography>
        ) : (
          <UrbanBuildingTable buildings={filteredBuildings} />
        )}
      </Box>
    </Box>
  );
};

export default UrbanScale;





