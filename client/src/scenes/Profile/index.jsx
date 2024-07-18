import React, { useState } from 'react';
import Header from 'components/Header';
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Paper,
  TextField,
  Button,
  useTheme,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import UserImage from 'components/UserImage';
import { updateUser } from 'state';

const Profile = () => {
  const { palette } = useTheme();
  const user = useSelector((state) => state.user);
  const { picturePath } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token); // Get the token from the Redux store
  const theme = useTheme();
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);

  if (!user) {
    return <CircularProgress />;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async (token) => {
    const response = await fetch(`http://localhost:5001/users/${user._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Include the token in the request
      },
      body: JSON.stringify(formData),
    }); 
  
    if (response.ok) {
      const updatedUser = await response.json();
      dispatch(updateUser(updatedUser)); // Update the user in the Redux store
      setIsEditing(false);
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      {/* Header */}
      <Header
        title="Profile Settings"
        subtitle="This page gives an overview of the profile information."
      />
      
      {/* Main content grid */}
      <Grid container spacing={2} mt={3}>
        {/* Left section with user image */}
        <Grid item xs={12} md={4}>
          <Box display="flex" justifyContent="center">
            <UserImage image={picturePath} size="400px" />
          </Box>
        </Grid>

        {/* Right section with profile information */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ borderRadius: 10 }}>
            <Box p={3}>
              <Typography color={theme.palette.secondary[200]} fontWeight="bold" variant="h5" gutterBottom>
                Profile Information
              </Typography>
              {isEditing ? (
                <>
                  <TextField
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Phone Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="Country"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  <TextField
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                  {/* Add more fields as needed */}
                  <Box mt={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleSave(token)}
                    >
                      Save
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => setIsEditing(false)}
                      sx={{ ml: 2 }}
                    >
                      Cancel
                    </Button>
                  </Box>
                </>
              ) : (
                <>
                  <Typography variant="subtitle1">
                    <strong>First name:</strong> {user.firstName}
                  </Typography>
                  <Typography variant="subtitle1">
                    <strong>Last name:</strong> {user.lastName}
                  </Typography>
                  <Typography variant="subtitle1">
                    <strong>Email:</strong> {user.email}
                  </Typography>
                  <Typography variant="subtitle1">
                    <strong>Phone number:</strong> {user.phoneNumber}
                  </Typography>
                  <Typography variant="subtitle1">
                    <strong>Country:</strong> {user.country}
                  </Typography>
                  <Typography variant="subtitle1">
                    <strong>City:</strong> {user.city}
                  </Typography>
                  {/* Add more fields as needed */}
                  <Box mt={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit
                    </Button>
                  </Box>
                </>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
