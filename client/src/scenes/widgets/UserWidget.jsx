import {
  LocationOnOutlined,
  WorkOutlineOutlined,
  HomeWorkOutlined,
  AssignmentIndOutlined,
  GroupOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { setCompanies, setProjects, setTeams } from 'state'; // Make sure setTeams is imported

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const [files, setFiles] = useState([]);
  const [teams, setTeamsState] = useState([]); // Use local state for teams
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const companies = useSelector((state) => state.companies || []);
  const projects = useSelector((state) => state.projects || []);
  
  // Fetch user data
  const getUser = async () => {
    try {
      const response = await fetch(`http://localhost:5001/users/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Failed to fetch user:', error);
    }
  };

  // Fetch files data
  const fetchFiles = async () => {
    try {
      const response = await fetch(`http://localhost:5001/files/user/${userId}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setFiles(data);
    } catch (error) {
      console.error('Failed to fetch files:', error);
    }
  };

  // Fetch companies data
  const fetchCompanies = async () => {
    try {
      const response = await axios.get('http://localhost:5001/companies/all', {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setCompanies(Array.isArray(response.data) ? response.data : []));
    } catch (error) {
      console.error('Failed to fetch companies:', error);
    }
  };

  // Fetch projects data
  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5001/projects', {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setProjects(Array.isArray(response.data) ? response.data : []));
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  };

  // Fetch teams data
  const fetchTeams = async () => {
    try {
      const response = await axios.get('http://localhost:5001/teams', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const teams = Array.isArray(response.data) ? response.data : [];
      setTeamsState(teams); // Set local state
    } catch (error) {
      console.error('Failed to fetch teams:', error);
    }
  };

  useEffect(() => {
    fetchCompanies();
    fetchProjects();
    fetchTeams();
    fetchFiles();
    getUser(); 
  }, [dispatch, userId, token]);

  if (!user) {
    return null;
  }

  // Filter projects based on the user's involvement
  const filteredProjects = Array.isArray(projects)
    ? projects.filter(project =>
        project.employees.some(employee => employee.personID === user.personID)
      )
    : [];

  // Filter companies based on the user's involvement
  const filteredCompanies = Array.isArray(companies)
    ? companies.filter(company =>
        company.employees.some(employee => employee.personID === user.personID)
      )
    : [];

  // Filter teams based on the user's involvement in projects
  const filteredTeams = Array.isArray(teams)
    ? teams.filter(team =>
        team.projects.some(p => filteredProjects.some(project => project.projectID === p.projectID))
      )
    : [];

  const {
    firstName,
    lastName,
    city,
    email
  } = user;

  const role = Array.isArray(user.role) ? user.role.join(", ") : user.role; // Join roles with a comma

  return (
    <WidgetWrapper>
      {/* FIRST ROW */}
      <FlexBetween
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/home/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={palette.secondary[200]}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.secondary.main,
                  cursor: "pointer",
                },
              }}
            >
              {firstName} {lastName}
            </Typography>
            <Typography color={palette.neutral.medium}>{email}</Typography>
          </Box>
        </FlexBetween>
      </FlexBetween>

      <Divider />

      {/* PERSONAL INFO HEADER */}
      <Typography
        variant="h6"
        color={palette.secondary.main}
        fontWeight="600"
        pt="1rem"
        pb="0.5rem"
      >
        Personal Information
      </Typography>

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined
            fontSize="large"
            sx={{ color: palette.secondary[200] }}
          />
          <Typography color={palette.neutral.medium}>{city}</Typography>
        </Box>

        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined
            fontSize="large"
            sx={{ color: palette.secondary[200] }}
          />
          <Typography color={palette.neutral.medium}>{role}</Typography>
        </Box>

        <Divider />

      {/* PERSONAL INFO HEADER */}
      <Typography
        variant="h6"
        color={palette.secondary.main}
        fontWeight="600"
        pt="1rem"
        pb="0.5rem"
      >
        Companies
      </Typography>
       
        {filteredCompanies.map((company, index) => (
          <Box key={index} display="flex" alignItems="center" gap="1rem">
            <HomeWorkOutlined
              fontSize="large"
              sx={{ color: palette.secondary[200] }}
            />
            <Typography color={palette.neutral.medium}>
              {company.companyName}
            </Typography>
          </Box>
        ))}

        
      </Box>

      <Divider />

      {/* PROJECTS INVOLVED HEADER */}
      <Typography
        variant="h6"
        color={palette.secondary.main}
        fontWeight="600"
        pt="1rem"
        pb="0.5rem"
      >
        Involved in the projects:
      </Typography>

      {/* THIRD ROW */}
      <Box p="1rem 0">
        {filteredProjects.map((project, index) => (
          <Box key={index} display="flex" alignItems="center" gap="1rem">
            <AssignmentIndOutlined
              fontSize="large"
              sx={{ color: palette.secondary[200] }}
            />
            <Typography color={palette.neutral.medium}>
              {project.projectName}
            </Typography>
          </Box>
        ))}
      </Box>

      <Divider />

      {/* TEAMS INVOLVED HEADER */}
      <Typography
        variant="h6"
        color={palette.secondary.main}
        fontWeight="600"
        pt="1rem"
        pb="0.5rem"
      >
        Involved in the teams:
      </Typography>

      {/* FOURTH ROW */}
      <Box p="1rem 0">
        {filteredTeams.map((team, index) => (
          <Box key={index} display="flex" alignItems="center" gap="1rem">
            <GroupOutlined
              fontSize="large"
              sx={{ color: palette.secondary[200] }}
            />
            <Typography color={palette.neutral.medium}>
              {team.teamName}
            </Typography>
          </Box>
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default UserWidget;
