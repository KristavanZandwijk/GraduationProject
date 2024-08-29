import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Checkbox, TextField, Button, Select, MenuItem, FormControl, InputLabel, ListItemText } from '@mui/material';
import { useTheme } from '@emotion/react';
import axios from 'axios';
import { updateElement } from 'state';

const ElementTable = ({ elements = [], fetchElements }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();


  const [editingElementID, setEditingElementID] = useState(null);
  const [elementDetails, setElementDetails] = useState({});
  const token = useSelector((state) => state.token);
  const [users, setUsers] = useState([]);
  const [buildings, setBuildings] = useState([]);

  useEffect(() => {
    // Fetch users and buildings for editing options
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

    const fetchBuildings = async () => {
      try {
        const response = await axios.get("http://localhost:5001/buildings/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBuildings(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Failed to fetch buildings:", error);
      }
    };

    fetchUsers();
    fetchBuildings();
  }, [token]);

  const handleEditClick = (element) => {
    setEditingElementID(element.elementID);
    setElementDetails(element);
  };

  const handleSave = async (elementID) => {
    try {
      const response = await fetch(`http://localhost:5001/elements/${elementID}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(elementDetails),
      });

      if (response.ok) {
        const updatedElement = await response.json();
        dispatch(updateElement(updatedElement));
        setEditingElementID(null);
        setElementDetails({});
        fetchElements(); // Fetch elements after successful save
      } else {
        console.error('Failed to update element:', await response.text());
      }
    } catch (error) {
      console.error('Failed to update element:', error);
    }
  };

  const handleChange = (field, value) => {
    setElementDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleOwnerChange = (event) => {
    const selectedOwners = event.target.value;
    setElementDetails((prev) => ({
      ...prev,
      elementOwner: selectedOwners.map(personID => ({ personID })),
    }));
  };

  const handleBuildingChange = (event) => {
    const selectedBuildings = event.target.value;
    setElementDetails((prev) => ({
      ...prev,
      isPartOfBuilding: selectedBuildings.map(buildingID => ({ buildingID })),
    }));
  };

  const handleCancelEdit = () => {
    setEditingElementID(null);
    setElementDetails({});
  };

  const handleRowClickElement = (elementDataSpaceID) => {
    if (editingElementID) return;
    navigate(`/elementdataspace/${elementDataSpaceID}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><Typography variant="h6">Element ID</Typography></TableCell>
            <TableCell><Typography variant="h6">Element Data Space ID</Typography></TableCell>
            <TableCell><Typography variant="h6">Element Name</Typography></TableCell>
            <TableCell><Typography variant="h6">Element Location</Typography></TableCell>
            <TableCell><Typography variant="h6">Element Owner(s)</Typography></TableCell>
            <TableCell><Typography variant="h6">Part of Building</Typography></TableCell>
            <TableCell><Typography variant="h6">Created At</Typography></TableCell>
            {editingElementID && <TableCell>Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(elements) && elements.map((element) => (
            <TableRow key={element.elementID}>
              <TableCell>{element.elementID}</TableCell>
              <TableCell
                onClick={() => handleRowClickElement(element.elementDataSpaceID)}
                style={{ cursor: 'pointer', color: theme.palette.secondary.main }}
              >
                {element.elementDataSpaceID}
              </TableCell>
              <TableCell>
                {editingElementID === element.elementID ? (
                  <TextField
                    value={elementDetails.elementName || ''}
                    onChange={(e) => handleChange('elementName', e.target.value)}
                  />
                ) : (
                  element.elementName
                )}
              </TableCell>
              <TableCell>
                {editingElementID === element.elementID ? (
                  <TextField
                    value={elementDetails.elementLocation || ''}
                    onChange={(e) => handleChange('elementLocation', e.target.value)}
                  />
                ) : (
                  element.elementLocation
                )}
              </TableCell>
              <TableCell>
                {editingElementID === element.elementID ? (
                  <FormControl fullWidth>
                    <Select
                      multiple
                      value={elementDetails.elementOwner ? elementDetails.elementOwner.map(owner => owner.personID) : []}
                      onChange={handleOwnerChange}
                      renderValue={(selected) =>
                        selected.map(id => {
                          const user = users.find(user => user.personID === id);
                          return user ? `${user.firstName} ${user.lastName}` : id;
                        }).join(', ')
                      }
                    >
                      {users.map((user) => (
                        <MenuItem key={user.personID} value={user.personID}>
                          <Checkbox
                            checked={elementDetails.elementOwner ? elementDetails.elementOwner.some(owner => owner.personID === user.personID) : false}
                          />
                          <ListItemText primary={`${user.firstName} ${user.lastName}`} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  element.elementOwner && element.elementOwner.length > 0 ? (
                    element.elementOwner.map((owner, index) => (
                      <Typography key={index} variant="body2">
                        {owner.personID}
                      </Typography>
                    ))
                  ) : (
                    <Typography variant="body2">No Owners</Typography>
                  )
                )}
              </TableCell>
              <TableCell>
                {editingElementID === element.elementID ? (
                  <FormControl fullWidth>
                    <Select
                      multiple
                      value={elementDetails.isPartOfBuilding ? elementDetails.isPartOfBuilding.map(b => b.buildingID) : []}
                      onChange={handleBuildingChange}
                      renderValue={(selected) =>
                        selected.map(id => {
                          const building = buildings.find(building => building.buildingID === id);
                          return building ? building.buildingName : id;
                        }).join(', ')
                      }
                    >
                      {buildings.map((building) => (
                        <MenuItem key={building.buildingID} value={building.buildingID}>
                          <Checkbox
                            checked={elementDetails.isPartOfBuilding ? elementDetails.isPartOfBuilding.some(b => b.buildingID === building.buildingID) : false}
                          />
                          <ListItemText primary={building.buildingName} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  element.isPartOfBuilding && element.isPartOfBuilding.length > 0 ? (
                    element.isPartOfBuilding.map((building, index) => (
                      <Typography key={index} variant="body2">
                        {building.buildingID}
                      </Typography>
                    ))
                  ) : (
                    <Typography variant="body2">No related building</Typography>
                  )
                )}
              </TableCell>
              <TableCell>{new Date(element.createdAt).toLocaleString()}</TableCell>
              {editingElementID === element.elementID && (
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleSave(element.elementID)}>Save</Button>
                  <Button variant="outlined" color="secondary" onClick={handleCancelEdit}>Cancel</Button>
                </TableCell>
              )}
              {!editingElementID && (
                <TableCell>
                  <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => handleEditClick(element)}>Edit</Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}  
export default ElementTable;
