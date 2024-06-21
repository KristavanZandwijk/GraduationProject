// client/src/scenes/BuildingDataSpace/index.js
import React, { useEffect } from 'react';
import { Box, Button, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import Header from 'components/Header';


const BuildingDataSpaceID = () => {


  return (
    <Box m="1.5rem 2.5rem">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Building Data Space ID" subtitle="This space shows all information that is stored in this data space." />
        </Box>
    </Box>
  );
};


export default BuildingDataSpaceID;