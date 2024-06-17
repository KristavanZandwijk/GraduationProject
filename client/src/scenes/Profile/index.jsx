import React from 'react';
import Header from 'components/Header';
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Paper,
  useTheme,
} from '@mui/material';
import { useSelector } from 'react-redux';
import UserImage from 'components/UserImage';

const Profile = () => {
  const { palette } = useTheme();
  const user = useSelector((state) => state.user);
  const { picturePath } = useSelector((state) => state.user);
  const theme = useTheme();

  if (!user) {
    return <CircularProgress />;
  }

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
              <Typography variant="subtitle1">
                <strong>Role:</strong> {user.role}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Role ID:</strong> {user.roleID}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Personal ID:</strong> {user.personID}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Data Space ID:</strong> {user.dataSpaceID}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
