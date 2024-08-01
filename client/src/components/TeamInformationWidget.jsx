import React, {useState} from 'react';
import { Box, Typography, Paper, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const TeamInformationWidget = ({ team }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const companies = useSelector((state) => state.companies || []);
  const projects = useSelector((state) => state.projects || []);

  const getClientName = (personID) => {
    const user = users.find(u => u.personID === personID);
    return user ? `${user.firstName} ${user.lastName}` : personID;
  };

  const getCompanyName = (companyID) => {
    const company = companies.find(c => c.companyID === companyID);
    return company ? company.companyName : companyID;
  };

  const getProjectName = (projectID) => {
    const project = projects.find(p => p.projectID === projectID);
    return project ? project.projectName : projectID;
  };

  const renderArrayItems = (items, getName, getID) => {
    if (!items || items.length === 0) return 'None';
    return items.map((item, index) => (
      <li key={index}>
        <Typography variant="subtitle1">
          {getName(getID(item))} - {getID(item)}
        </Typography>
      </li>
    ));
  };

  if (!team) {
    return <Typography variant="h6" fontWeight="bold">No team found.</Typography>;
  }

  return (
    <Paper elevation={3} sx={{ borderRadius: 10 }}>
      <Box p={2}>
        <Typography
          variant="subtitle1"
          onClick={() => navigate(`/teamdataspace/${team.teamID}`)}
          sx={{ cursor: 'pointer', color: theme.palette.secondary.main }}
        >
          <strong>Team Name:</strong> {team.teamName}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Team ID:</strong> {team.teamID}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Data Space ID:</strong> {team.teamDataSpaceID}
        </Typography>

        <Box mt={3}>
          <Typography fontWeight="bold" variant="subtitle1" gutterBottom>
            Clients:
          </Typography>
          <ul>
            {renderArrayItems(team.clients, getClientName, item => item.personID)}
          </ul>
        </Box>

        <Box mt={3}>
          <Typography fontWeight="bold" variant="subtitle1" gutterBottom>
            Companies:
          </Typography>
          <ul>
            {renderArrayItems(team.companies, getCompanyName, item => item.companyID)}
          </ul>
        </Box>

        <Box mt={3}>
          <Typography fontWeight="bold" variant="subtitle1" gutterBottom>
            Projects:
          </Typography>
          <ul>
            {renderArrayItems(team.projects, getProjectName, item => item.projectID)}
          </ul>
        </Box>
      </Box>
    </Paper>
  );
};

export default TeamInformationWidget;
