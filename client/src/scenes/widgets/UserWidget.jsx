import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
  BackupOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserWidget = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const [files, setFiles] = useState([]); // State to hold user files
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const theme = useTheme();
  const companies = useSelector((state) => state.companies || []);

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

  useEffect(() => {
    getUser();
    fetchFiles();
  }, [userId, token]);

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    city,
    role,
    friends,
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
            <Typography color={palette.neutral.medium}>{friends.length} friends</Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
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
        <Box display="flex" alignItems="center" gap="1rem">
          <BackupOutlined fontSize="large" sx={{ color: theme.palette.secondary[200] }} />
          <Typography color={palette.neutral.medium}>{files.length} files</Typography>
        </Box>
      </Box>

      <Divider />
    </WidgetWrapper>
  );
};

export default UserWidget;