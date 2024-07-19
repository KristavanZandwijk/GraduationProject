import React from 'react';
import { Box, Paper, Typography, useTheme } from '@mui/material';
import UserImage from 'components/UserImage'; // Import UserImage component

const BasicCompanyInfoWidget = ({ company }) => {
  const theme = useTheme();

  return (
    <Paper elevation={3} sx={{ borderRadius: 10 }}>
      <Box p={3}>
        <Typography color={theme.palette.secondary.main} fontWeight="bold" variant="h5" gutterBottom>
          Company Information
        </Typography>
        <Box display="flex" alignItems="center" mb={2}>
          <UserImage image={company.picturePath} size="100px" /> {/* Render UserImage component with company picture */}
          <Box ml={2}>
            <Typography variant="subtitle1">
              <strong>Company Name:</strong> {company.companyName}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Country:</strong> {company.country}
            </Typography>
            <Typography variant="subtitle1">
              <strong>City:</strong> {company.city}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Company ID:</strong> {company.companyID}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Company Data Space ID:</strong> {company.companyDataSpaceID}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default BasicCompanyInfoWidget;