import {
  LocationOnOutlined,
  WorkOutlineOutlined,
  BackupOutlined,
  HomeWorkOutlined,
  AssignmentIndOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const [files, setFiles] = useState([]);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const theme = useTheme();
  const companies = useSelector((state) => state.companies || []);
  const projects = useSelector((state) => state.projects || []);

  const getUser = async () => {
    const response = await fetch(`http://localhost:5001/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  const fetchFiles = async () => {
    const response = await fetch(`http://localhost:5001/files/user/${userId}`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setFiles(data);
  };

  const fetchCompanies = async () => {
    try {
      const response = await axios.get('http://localhost:5001/companies', {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({ type: 'SET_COMPANIES', payload: Array.isArray(response.data) ? response.data : [] });
    } catch (error) {
      console.error('Failed to fetch companies:', error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:5001/projects', {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({ type: 'SET_PROJECTS', payload: Array.isArray(response.data) ? response.data : [] });
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  };

  useEffect(() => {
    fetchCompanies();
    fetchProjects();
    fetchFiles();
    getUser(); 
  }, [dispatch, userId, token]);

  if (!user) {
    return null;
  }

  const userCompanyIds = companies
    .filter(company => company.employees.some(employee => employee.personID === user.personID))
    .map(company => company.companyID);

    const filteredProjects = Array.isArray(projects)
    ? projects.filter(project =>
        project.employees.some(employee => employee.personID === user.personID)
      )
    : [];

  const {
    firstName,
    lastName,
    city,
    role,
    email
  } = user;

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
              color={theme.palette.secondary[200]}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: theme.palette.secondary.main,
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

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: theme.palette.secondary[200] }} />
          <Typography color={palette.neutral.medium}>{city}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: theme.palette.secondary[200] }} />
          <Typography color={palette.neutral.medium}>{role}</Typography>
        </Box>
        {Array.isArray(companies) && companies
          .filter(company => company.employees.some(employee => employee.personID === user.personID))
          .map((company, index) => (
            <Box key={index} display="flex" alignItems="center" gap="1rem">
              <HomeWorkOutlined fontSize="large" sx={{ color: theme.palette.secondary[200] }} />
              <Typography color={palette.neutral.medium}>{company.companyName}</Typography>
            </Box>
        ))}
        {Array.isArray(filteredProjects) && filteredProjects.map((project, index) => (
          <Box key={index} display="flex" alignItems="center" gap="1rem">
            <AssignmentIndOutlined fontSize="large" sx={{ color: theme.palette.secondary[200] }} />
            <Typography color={palette.neutral.medium}>{project.projectName}</Typography>
          </Box>
        ))}
      </Box>

      <Divider />
    </WidgetWrapper>
  );
};

export default UserWidget;
