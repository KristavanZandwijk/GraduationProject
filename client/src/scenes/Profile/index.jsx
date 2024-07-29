// Profile.js
import React from 'react';
import Header from 'components/Header';
import { Box, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import UserWidget from 'components/UserInfoWidget';

const Profile = () => {
  const user = useSelector((state) => state.user);

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

      <UserWidget />
    </Box>
  );
};

export default Profile;
