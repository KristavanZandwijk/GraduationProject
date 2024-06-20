// client/src/scenes/BuildingDataSpace/index.js
import React, { useEffect } from 'react';
import { Box, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Header from 'components/Header';
import { setBuildings } from '../../state';
import axios from 'axios';

const BuildingDataSpace = () => {
  const dispatch = useDispatch();
  const buildings = useSelector((state) => state.buildings);
  const { personID } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const response = await axios.get('http://localhost:5001/buildings', {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setBuildings({ buildings: response.data }));
      } catch (error) {
        console.error("Failed to fetch buildings", error);
      }
    };

    fetchBuildings();
  }, [dispatch, token]);

  const filteredBuildings = buildings.filter(building => building.hasOwner === personID);

  return (
    <Box m="1.5rem 2.5rem">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Building Data Space" subtitle="This space shows all the buildings that are owned by you." />
      </Box>
      <Box mt={3}>
        {!buildings.length ? (
          <CircularProgress />
        ) : !filteredBuildings.length ? (
          <Typography variant="h6">You unfortunately do not own any buildings (yet).</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><Typography variant="h6">Building ID</Typography></TableCell>
                  <TableCell><Typography variant="h6">Building Data Space ID</Typography></TableCell>
                  <TableCell><Typography variant="h6">Archived Building Data Space ID</Typography></TableCell>
                  <TableCell><Typography variant="h6">Owner ID</Typography></TableCell>
                  <TableCell><Typography variant="h6">Building Name</Typography></TableCell>
                  <TableCell><Typography variant="h6">Building Location</Typography></TableCell>
                  <TableCell><Typography variant="h6">Created At</Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredBuildings.map((building) => (
                  <TableRow key={building.buildingID}>
                    <TableCell>{building.buildingID}</TableCell>
                    <TableCell>{building.buildingDataSpaceID}</TableCell>
                    <TableCell>{building.archivedBuildingDataSpaceID}</TableCell>
                    <TableCell>{building.hasOwner}</TableCell>
                    <TableCell>{building.buildingName}</TableCell>
                    <TableCell>{building.buildingLocation}</TableCell>
                    <TableCell>{new Date(building.createdAt).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
};

export default BuildingDataSpace;
