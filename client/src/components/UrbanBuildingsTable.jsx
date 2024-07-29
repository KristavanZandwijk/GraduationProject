import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Checkbox } from '@mui/material';
import { useTheme } from '@emotion/react';

const UrbanBuildingTable = ({ buildings, selectedBuildingDataSpaceIDs, handleCheckboxChange }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  if (buildings.length === 0) {
    return <Typography mt="2rem">Unfortunately, there are no buildings that are accessible by you.</Typography>;
  }

  const handleRowClick = (buildingDataSpaceID) => {
    navigate(`/buildingdataspace/${buildingDataSpaceID}`);
  };

  return (
    <TableContainer component={Paper} sx={{ marginTop: "0rem" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Visualize IFC</TableCell>
            <TableCell><Typography variant="h6">Building ID</Typography></TableCell>
            <TableCell><Typography variant="h6">Building Data Space ID</Typography></TableCell>
            <TableCell><Typography variant="h6">Owner ID</Typography></TableCell>
            <TableCell><Typography variant="h6">Building Name</Typography></TableCell>
            <TableCell><Typography variant="h6">Building Location</Typography></TableCell>
            <TableCell><Typography variant="h6">Created At</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {buildings.map((building) => (
            <TableRow key={building.buildingDataSpaceID}>
              <TableCell>
                <Checkbox
                  checked={selectedBuildingDataSpaceIDs.includes(building.buildingDataSpaceID)}
                  onChange={(event) => handleCheckboxChange(event, building.buildingDataSpaceID)}
                />
              </TableCell>
              <TableCell
                onClick={() => handleRowClick(building.buildingDataSpaceID)}
                style={{ cursor: 'pointer', color: theme.palette.secondary.main }}
              >
                {building.buildingID}
              </TableCell>
              <TableCell
                onClick={() => handleRowClick(building.buildingDataSpaceID)}
                style={{ cursor: 'pointer', color: theme.palette.secondary.main }}
              >
                {building.buildingDataSpaceID}
              </TableCell>
              <TableCell>{building.hasOwner}</TableCell>
              <TableCell>{building.buildingName}</TableCell>
              <TableCell>{building.buildingLocation}</TableCell>
              <TableCell>{new Date(building.createdAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UrbanBuildingTable;
