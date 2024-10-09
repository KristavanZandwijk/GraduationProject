import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  DoorFrontOutlined,
  SearchOutlined,
  LocalLibraryOutlined,
  FingerprintOutlined,
  RecyclingOutlined,
  FireExtinguisherOutlined,
  AccountBalanceOutlined,
  HubOutlined,
  PersonOutlined,
  AdminPanelSettingsOutlined,
  FolderSharedOutlined,
  MapOutlined,
  WorkOutlineOutlined,
  FactoryOutlined,
  FileUploadOutlined,
  Diversity3Outlined,
  InfoOutlined,
  SupervisorAccountOutlined,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import { useSelector } from "react-redux";
import UserImage from "./UserImage";

const Sidebar = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  const user = useSelector((state) => state.user);
  const fullName = `${user.firstName} ${user.lastName}`;
  const role = Array.isArray(user.role) ? user.role.join(", ") : user.role;
  const { picturePath } = useSelector((state) => state.user);
  const dataSpaceID = user.dataSpaceID;

  // Determine if user has admin role
  const isAdmin = role.toLowerCase().includes("admin");

  useEffect(() => {
    setActive(pathname);
  }, [pathname]);

  const handleProfileClick = () => {
    navigate("/profile");
  };

  // Define the base navigation items
  const navItems = [
    {
      text: "Home",
      icon: <HubOutlined />,
      path: "/home",
    },
    {
      text: "Public Data Spaces",
      icon: null,
    },
    {
      text: "Building Data Space",
      icon: <AccountBalanceOutlined />,
      path: "/buildingdataspace",
    },
    {
      text: "Element Data Space",
      icon: <DoorFrontOutlined />,
      path: "/elementdataspace",
    },
    {
      text: "Shared Data Spaces",
      icon: null,
    },
    {
      text: "Company Overview",
      icon: <WorkOutlineOutlined />,
      path: "/companyinformation",
    },
    {
      text: "Client Data Space",
      icon: <SupervisorAccountOutlined />,
      path: "/clientdataspace",
    },
    {
      text: "Team Data Space",
      icon: <Diversity3Outlined />,
      path: "/teamdataspace",
    },
    {
      text: "Project Data Space",
      icon: <FactoryOutlined />,
      path: "/projectoverview",
    },
    {
      text: "Private Data Space",
      icon: null,
    },
    {
      text: "Personal Data Space",
      icon: <FolderSharedOutlined />,
      path: "/personaldataspace",
    },
    {
      text: "Data Upload",
      icon: <FileUploadOutlined />,
      path: "/dataupload",
    },
    // {
    //   text: "Features",
    //   icon: null,
    // },
    // {
    //   text: "Search Function",
    //   icon: <SearchOutlined />,
    //   path: "/searchfunction",
    // },
    // {
    //   text: "Project Learning",
    //   icon: <LocalLibraryOutlined />,
    //   path: "/projectlearning",
    // },
    // {
    //   text: "Element Passport",
    //   icon: <FingerprintOutlined />,
    //   path: "/elementpassport",
    // },
    // {
    //   text: "Element Reuse",
    //   icon: <RecyclingOutlined />,
    //   path: "/elementreuse",
    // },
    // {
    //   text: "Emergency Plans",
    //   icon: <FireExtinguisherOutlined />,
    //   path: "/emergencyplans",
    // },
    {
      text: "Profile",
      icon: null,
    },
    {
      text: "Profile Settings",
      icon: <PersonOutlined />,
      path: "/profile",
    },
    // {
    //   text: "Data Privacy",
    //   icon: <AdminPanelSettingsOutlined />,
    //   path: "/dataprivacy",
    // },
    {
      text: "Information",
      icon: <InfoOutlined />,
      path: "/information",
    },
    // Conditionally add Admin Page based on role
    ...(isAdmin
      ? [
          {
            text: "Admin Page",
            icon: <AdminPanelSettingsOutlined />,
            path: "/admin",
          },
        ]
      : []),
  ];

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "0.2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    AECO Data Space
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon, path, disabled }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }

                const isActive = pathname.startsWith(path);

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        if (!disabled) {
                          if (text === "Personal Data Space") {
                            navigate(`/personaldataspace/${dataSpaceID}`);
                          } else {
                            navigate(path);
                          }
                          setActive(path);
                        }
                      }}
                      sx={{
                        backgroundColor: isActive
                          ? theme.palette.secondary[500]
                          : "transparent",
                        color: isActive
                          ? theme.palette.primary[600]
                          : theme.palette.secondary[100],
                        pointerEvents: disabled ? "none" : "auto", // Disable click without changing color
                        opacity: disabled ? 1 : 1, // Keep the same opacity
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "1rem",
                          color: isActive
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {isActive && <ChevronRightOutlined sx={{ ml: "auto" }} />}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          <Box position="relative" bottom="0.2rem">
            <Divider />
            <FlexBetween
              textTransform="none"
              gap="1rem"
              m="1.5rem 2rem 1rem 3rem"
            >
              <UserImage image={picturePath} />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {fullName}
                </Typography>
                <Typography
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {role}
                </Typography>
              </Box>
              <IconButton onClick={handleProfileClick}>
                <SettingsOutlined
                  sx={{
                    color: theme.palette.secondary[300],
                    fontSize: "25px ",
                  }}
                />
              </IconButton>
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
