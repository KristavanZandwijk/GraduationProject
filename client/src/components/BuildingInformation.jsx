import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';

const BuildingTable = ({ buildings }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleRowClick = (buildingDataSpaceID) => {
    navigate(`/buildingdataspace/${buildingDataSpaceID}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
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
            <TableRow key={building.buildingID}>
              <TableCell>{building.buildingID}</TableCell>
              <TableCell onClick={() => handleRowClick(building.buildingDataSpaceID)} style={{ cursor: 'pointer', color: theme.palette.secondary.main }}>
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

export default BuildingTable;
