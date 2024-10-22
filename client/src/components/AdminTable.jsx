import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Checkbox,
  ListItemText,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { updateUser } from 'state'; // Update this path based on your project structure

const roles = [
  "admin",
  "architect",
  "BIM manager",
  "building manager",
  "building owner",
  "CEO",
  "civil engineer",
  "client",
  "company owner",
  "contract officer",
  "contractor",
  "cost estimator",
  "design manager",
  "digital twin specialist",
  "director",
  "electrical engineer",
  "element owner",
  "employee",
  "energy consultant",
  "engineering manager",
  "facility manager",
  "finance manager",
  "geotechnical engineer",
  "health and safety officer",
  "HR manager",
  "HVAC specialist",
  "installation engineer",
  "IT support",
  "legal advisor",
  "logistics manager",
  "MEP engineer",
  "project director",
  "project leader",
  "procurement manager",
  "quality manager",
  "site manager",
  "structural engineer",
  "sustainability consultant",
  "team leader",
  "urban designer",
  "urban planner",
  "visitor"
];

const AdminTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editUserId, setEditUserId] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5001/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const users = Array.isArray(response.data) ? response.data : [];
        setUsers(users);
      } catch (error) {
        setError('Failed to fetch users');
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  const handleRoleChange = (userId, roles) => {
    setEditUserId(userId);
    setSelectedRoles(roles);
    setIsEditing(true);
  };

  const handleSelectRoleChange = (event) => {
    setSelectedRoles(event.target.value);
  };

  const handleSave = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5001/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ role: selectedRoles }),
      });
  
      if (response.ok) {
        const updatedUser = await response.json();
        setUsers(users.map(user => user._id === userId ? updatedUser : user));
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };
  

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box m="1.5rem 2.5rem">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>PersonID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.personID}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                <TableCell>{user.country}</TableCell>
                <TableCell>{user.city}</TableCell>
                <TableCell>
                  {isEditing && editUserId === user._id ? (
                    <FormControl fullWidth margin="normal">
                      <InputLabel>Select the role(s) of the user</InputLabel>
                      <Select
                        multiple
                        value={selectedRoles}
                        onChange={handleSelectRoleChange}
                        renderValue={(selected) => 
                          selected.join(', ')
                        }
                      >
                        <MenuItem value="" disabled>
                          <em>Select the role(s)</em>
                        </MenuItem>
                        {roles.map((role) => (
                          <MenuItem key={role} value={role}>
                            <Checkbox checked={selectedRoles.indexOf(role) > -1} />
                            <ListItemText primary={role} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  ) : (
                    Array.isArray(user.role) ? user.role.join(", ") : user.role
                  )}
                </TableCell>
                <TableCell>
                  {isEditing && editUserId === user._id ? (
                    <Button onClick={() => handleSave(user._id)} variant="contained" color="primary">
                      Save
                    </Button>
                  ) : (
                    <Button onClick={() => handleRoleChange(user._id, user.role || [])} variant="contained" color="secondary">
                      Edit Role
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminTable;
