import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Header from 'components/Header';
import axios from 'axios';
import ProjectInfo from 'components/ProjectInformationWidget';

const ProjectDataSpace = () => {

  return (
    <Box m="1.5rem 2.5rem" height="100vh" display="flex">
      {/* Right side content */}
      <Box flex="1" ml={4}>
        <Header
          title="Project Data Space"
          subtitle="This page shows all information that is linked to the project"
        />
      </Box>
    </Box>
  );
};

export default ProjectDataSpace;
