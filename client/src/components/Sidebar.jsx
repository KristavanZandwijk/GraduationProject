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
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import FlexBetween from "./FlexBetween";
import { useSelector } from "react-redux";
import UserImage from "./UserImage";

const navItems = [
  {
    text: "Home",
    icon: <HubOutlined />,
  },
  {
    text: "Data Spaces",
    icon: null,
  },
  {
    text: "UrbanScale",
    icon: <MapOutlined />,
  },
  {
    text: "BuildingDataSpace",
    icon: <AccountBalanceOutlined />,
  },
  {
    text: "ElementDataSpace",
    icon: <DoorFrontOutlined />,
  },
  {
    text: 'Organization(s)',
    icon: null,
  },
  {
    text: 'CompanyInformation',
    icon: <WorkOutlineOutlined/>,
  },
  {
    text: 'CompanyDataSpace',
    icon: <FactoryOutlined/>,
  },
  {
    text: "Features",
    icon: null,
  },
  {
    text: "SearchFunction",
    icon: <SearchOutlined />,
  },
  {
    text: "ProjectLearning",
    icon: <LocalLibraryOutlined />,
  },
  {
    text: "ElementPassport",
    icon: <FingerprintOutlined />,
  },
  {
    text: "ElementReuse",
    icon: <RecyclingOutlined />,
  },
  {
    text: "EmergencyPlans",
    icon: <FireExtinguisherOutlined />,
  },
  {
    text: "Profile",
    icon: null,
  },
  {
    text: "Profile",
    icon: <PersonOutlined />,
  },
  {
    text: "PersonalDataSpace",
    icon: <FolderSharedOutlined />,
  },
  {
    text: "DataPrivacy",
    icon: <AdminPanelSettingsOutlined />,
  },
];

const Sidebar = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate hook
  const theme = useTheme();
  const user = useSelector((state) => state.user);
  const fullName = `${user.firstName} ${user.lastName}`;
  const role = user.role;
  const { picturePath } = useSelector((state) => state.user);
  const dataSpaceID = user.dataSpaceID; // Assuming dataSpaceID is part of the user object

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  const handleProfileClick = () => {
    navigate("/profile");
  };

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
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        if (text === "PersonalDataSpace") {
                          navigate(`/personaldataspace/${dataSpaceID}`);
                        } else {
                          navigate(`/${lcText}`);
                        }
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[500]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "1rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
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
