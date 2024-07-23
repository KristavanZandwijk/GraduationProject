import React from 'react';
import { MenuItem, Select, Typography, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';

const CompanySelect = ({ selectedCompany, setSelectedCompany }) => {
  const navigate = useNavigate();
  const companies = useSelector((state) => state.companies || []);
  const theme = useTheme();

  const handleCompanyChange = (event) => {
    const companyDataSpaceID = event.target.value;
    setSelectedCompany(companyDataSpaceID);
    navigate(`/companydataspace/${companyDataSpaceID}`);
  };

  return (
    <Box mb={2}>
      <Typography color={theme.palette.secondary.main} fontWeight="bold" variant="h6" gutterBottom>
        Select Company
      </Typography>
      <Select
        fullWidth
        value={selectedCompany}
        onChange={handleCompanyChange}
        displayEmpty
      >
        <MenuItem value="" disabled>
          Select a company
        </MenuItem>
        {companies.map(company => (
          <MenuItem key={company.companyID} value={company.companyID}>
            {company.companyName}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default CompanySelect;
