import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Checkbox } from '@mui/material';
import { useTheme } from '@emotion/react';

const UrbanBuildingTable = ({ buildings }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [selectedBuildingIDs, setSelectedBuildingIDs] = useState([]);

  const handleRowClick = (buildingDataSpaceID) => {
    navigate(`/buildingdataspace/${buildingDataSpaceID}`);
  };

  const handleCheckboxChange = (event, buildingID) => {
    const isChecked = event.target.checked;
    setSelectedBuildingIDs(prevSelected => 
      isChecked 
        ? [...prevSelected, buildingID] 
        : prevSelected.filter(id => id !== buildingID)
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Select</TableCell>
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
              <TableCell>
                <Checkbox
                  checked={selectedBuildingIDs.includes(building.buildingID)}
                  onChange={(event) => handleCheckboxChange(event, building.buildingID)}
                />
              </TableCell>
              <TableCell onClick={() => handleRowClick(building.buildingDataSpaceID)} style={{ cursor: 'pointer', color: theme.palette.secondary.main }}>
                {building.buildingID}
              </TableCell>
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

export default UrbanBuildingTable;
