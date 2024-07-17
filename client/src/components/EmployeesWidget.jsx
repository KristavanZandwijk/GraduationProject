import React from 'react';
import { Box, Paper, Typography, useTheme } from '@mui/material';

const EmployeeList = ({ employees }) => {
  const theme = useTheme();

  return (
    <Paper elevation={3} sx={{ borderRadius: 10 }}>
      <Box p={3}>
      <Typography color={theme.palette.secondary.main} fontWeight="bold" variant="h5" gutterBottom>
          Employees
        </Typography>
        {employees.map((employee, index) => (
          <Typography key={index} variant="subtitle1">
            {employee.personID}
          </Typography>
        ))}
      </Box>
    </Paper>
  );
};

export default EmployeeList;
