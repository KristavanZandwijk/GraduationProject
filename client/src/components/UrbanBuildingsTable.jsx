import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Checkbox, TextField, Button, Select, MenuItem, FormControl, InputLabel, ListItemText } from '@mui/material';
import { useTheme } from '@emotion/react';
import axios from 'axios';
import { updateBuilding } from 'state';

const UrbanBuildingTable = ({ buildings = [], selectedBuildingDataSpaceIDs, handleCheckboxChange, fetchBuildings }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();

  const [editingBuildingID, setEditingBuildingID] = useState(null);
  const [buildingDetails, setBuildingDetails] = useState({});
  const token = useSelector((state) => state.token);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5001/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const getUserName = (personID) => {
    const user = users.find(u => u.personID === personID);
    return user ? `${user.firstName} ${user.lastName}` : personID;
  };

  const handleEditClick = (building) => {
    setEditingBuildingID(building.buildingID);
    setBuildingDetails(building);
  };

  const handleSave = async (buildingID) => {
    try {
      const response = await fetch(`http://localhost:5001/buildings/${buildingID}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(buildingDetails),
      });

      if (response.ok) {
        const updatedBuilding = await response.json();
        dispatch(updateBuilding(updatedBuilding));
        setEditingBuildingID(null);
        setBuildingDetails({});
        fetchBuildings(); // Fetch buildings after successful save
      } else {
        console.error('Failed to update building:', await response.text());
      }
    } catch (error) {
      console.error('Failed to update building:', error);
    }
  };

  const handleChange = (field, value) => {
    setBuildingDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleOwnerChange = (event) => {
    const selectedOwners = event.target.value;
    setBuildingDetails((prev) => ({
      ...prev,
      buildingOwner: selectedOwners.map(personID => ({ personID })),
    }));
  };

  const handleCancelEdit = () => {
    setEditingBuildingID(null);
    setBuildingDetails({});
  };

  if (!Array.isArray(buildings) || buildings.length === 0) {
    return <Typography mt="2rem">Unfortunately, there are no buildings that are accessible by you.</Typography>;
  }

  const handleRowClick = (buildingDataSpaceID) => {
    if (editingBuildingID) return;
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
            <TableCell><Typography variant="h6">Building Name</Typography></TableCell>
            <TableCell><Typography variant="h6">Building Location</Typography></TableCell>
            <TableCell><Typography variant="h6">Building Owner(s)</Typography></TableCell>
            <TableCell><Typography variant="h6">Created At</Typography></TableCell>
            {editingBuildingID && <TableCell>Actions</TableCell>}
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
              <TableCell>
                {editingBuildingID === building.buildingID ? (
                  <TextField
                    value={buildingDetails.buildingName}
                    onChange={(e) => handleChange('buildingName', e.target.value)}
                  />
                ) : (
                  building.buildingName
                )}
              </TableCell>
              <TableCell>
                {editingBuildingID === building.buildingID ? (
                  <TextField
                    value={buildingDetails.buildingLocation}
                    onChange={(e) => handleChange('buildingLocation', e.target.value)}
                  />
                ) : (
                  building.buildingLocation
                )}
              </TableCell>
              <TableCell>
                {editingBuildingID === building.buildingID ? (
                  <FormControl fullWidth>
                  <Select
                    multiple 
                    value={buildingDetails.buildingOwner ? buildingDetails.buildingOwner.map(owner => owner.personID) : []}
                    onChange={handleOwnerChange}
                    renderValue={(selected) => 
                      selected.map(id => users.find(user => user.personID === id).firstName + ' ' + users.find(user => user.personID === id).lastName).join(', ')
                    }
                  >
                    {users.map((user) => (
                      <MenuItem key={user.personID} value={user.personID}>
                        <Checkbox checked={buildingDetails.buildingOwner ? buildingDetails.buildingOwner.some(owner => owner.personID === user.personID) : false} />
                        <ListItemText primary={`${user.firstName} ${user.lastName}`} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                
                ) : (
                  building.buildingOwner && building.buildingOwner.length > 0 ? (
                    building.buildingOwner.map((owner, index) => (
                      <Typography key={index} variant="body2">
                        {getUserName(owner.personID)}
                      </Typography>
                    ))
                  ) : (
                    <Typography variant="body2">No Owners</Typography>
                  )
                )}
              </TableCell>
              <TableCell>{new Date(building.createdAt).toLocaleString()}</TableCell>
              {editingBuildingID === building.buildingID && (
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleSave(building.buildingID)}>Save</Button>
                  <Button variant="outlined" color="secondary" onClick={handleCancelEdit}>Cancel</Button>
                </TableCell>
              )}
              {!editingBuildingID && (
                <TableCell>
                  <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => handleEditClick(building)}>Edit</Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UrbanBuildingTable;
