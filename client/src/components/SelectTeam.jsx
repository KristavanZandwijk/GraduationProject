import React from 'react';
import { CircularProgress, MenuItem, Select, Typography, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@emotion/react';

const TeamSelection = ({ teams, loading, selectedTeam, onTeamChange }) => {

    const theme = useTheme();


  return (
    <Box mb={2}>
      <Typography color={theme.palette.secondary.main} fontWeight="bold" variant="h6" gutterBottom>
        Select A Team
      </Typography>
      <Select
        fullWidth
        value={selectedTeam}
        onChange={onTeamChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Select Team' }}
        sx={{ minWidth: 200 }}
      >
        {loading ? (
          <MenuItem disabled>
            <CircularProgress size={24} />
          </MenuItem>
        ) : (
          teams.map((team) => (
            <MenuItem key={team.teamID} value={team.teamID}>
              {team.teamName}
            </MenuItem>
          ))
        )}
      </Select>
    </Box>
  );
};

export default TeamSelection;
