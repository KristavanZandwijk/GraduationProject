import React from 'react';
import { Box } from '@mui/material';
import Header from 'components/Header';
import AdminTable from 'components/AdminTable';

const Admin = () => {
  return (
    <Box m="1.5rem 2.5rem" height="100vh" display="flex" flexDirection="column">
      {/* Header Section */}
      <Box flex="0 0 auto">
        <Header
          title="Admin Page"
          subtitle="This page enables admins to change admin settings."
        />
      </Box>

      {/* Main Content Section */}
      <Box flex="1" mt={4}>
        <AdminTable />
      </Box>
    </Box>
  );
};

export default Admin;
