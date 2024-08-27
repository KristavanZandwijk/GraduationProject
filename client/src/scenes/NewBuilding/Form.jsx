import {
  Box,
  Divider,
  InputBase,
  Button,
  Typography,
  Select,
  MenuItem,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBuildings, setUsers } from "state";
import axios from "axios";

const BuildingDrop = () => {
  const dispatch = useDispatch();
  const [buildingID, setBuildingID] = useState("");
  const [buildingDataSpaceID, setBuildingDataSpaceID] = useState("");
  const [archivedBuildingDataSpaceID, setArchivedBuildingDataSpaceID] = useState("");
  const [buildingName, setBuildingName] = useState("");
  const [buildingLocation, setBuildingLocation] = useState("");
  const [selectedBuildingOwner, setSelectedBuildingOwner] = useState([]); // Updated state for building owners
  const theme = useTheme();
  const token = useSelector((state) => state.token);
  const users = useSelector((state) => state.users);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5001/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setUsers(Array.isArray(response.data) ? response.data : []));
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, [token, dispatch]);

  const handleBuilding = async () => {
    const buildingData = {
      buildingID,
      buildingDataSpaceID,
      archivedBuildingDataSpaceID,
      buildingName,
      buildingLocation,
      buildingOwner: Array.isArray(selectedBuildingOwner) ? selectedBuildingOwner.map((ownerID) => ({ personID: ownerID })) : [],
    };

    try {
      const response = await fetch(`http://localhost:5001/newbuildings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(buildingData),
      });

      const newBuilding = await response.json();
      if (response.status === 201) {
        dispatch(setBuildings(newBuilding));
        setBuildingID("");
        setBuildingDataSpaceID("");
        setArchivedBuildingDataSpaceID("");
        setBuildingName("");
        setBuildingLocation("");
        setSelectedBuildingOwner([]);
      } else {
        console.error(newBuilding.message);
      }
    } catch (error) {
      console.error("Failed to create building:", error);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.default,
        borderRadius: "1rem",
        padding: "2rem",
        border: "1px solid",
        borderColor: theme.palette.secondary[100],
      }}
    >
      <Typography
        variant="h4"
        sx={{
          marginBottom: "2rem",
          textAlign: "center",
          color: theme.palette.secondary[100],
          fontWeight: "bold",
        }}
      >
        Create the meta-data of a new building here!
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <InputBase
          placeholder="Add a building ID"
          onChange={(e) => setBuildingID(e.target.value)}
          value={buildingID}
          sx={{
            width: "100%",
            backgroundColor: theme.palette.primary.main,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
        <InputBase
          placeholder="Add a building data space ID"
          onChange={(e) => setBuildingDataSpaceID(e.target.value)}
          value={buildingDataSpaceID}
          sx={{
            width: "100%",
            backgroundColor: theme.palette.primary.main,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
        <InputBase
          placeholder="Add an archived building data space ID"
          onChange={(e) => setArchivedBuildingDataSpaceID(e.target.value)}
          value={archivedBuildingDataSpaceID}
          sx={{
            width: "100%",
            backgroundColor: theme.palette.primary.main,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
        <InputBase
          placeholder="Add a building name"
          onChange={(e) => setBuildingName(e.target.value)}
          value={buildingName}
          sx={{
            width: "100%",
            backgroundColor: theme.palette.primary.main,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
        <InputBase
          placeholder="Add a building location"
          onChange={(e) => setBuildingLocation(e.target.value)}
          value={buildingLocation}
          sx={{
            width: "100%",
            backgroundColor: theme.palette.primary.main,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
        <Select
          multiple
          value={selectedBuildingOwner}
          onChange={(e) => setSelectedBuildingOwner(e.target.value)}
          displayEmpty
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>Select the Building Owner</em>; // Placeholder when no owner is selected
            }

            return selected.map((value) => {
              const user = users.find((user) => user.personID === value);
              return user ? `${user.personID} - ${user.firstName} ${user.lastName}` : null;
            }).join(", ");
          }}
          sx={{
            width: "100%",
            backgroundColor: theme.palette.primary.default,
            borderRadius: "1rem",
            padding: "0.75rem 1.5rem",
            border: `1px solid ${theme.palette.secondary[100]}`,
          }}
        >
          <MenuItem value="" disabled>Select the Building Owner</MenuItem> {/* Placeholder option */}
          {users.map((user) => (
            <MenuItem key={user.personID} value={user.personID}>
              {`${user.personID} - ${user.firstName} ${user.lastName}`}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Divider sx={{ margin: "2rem 0" }} />
      <Button
        disabled={
          !buildingID ||
          !buildingDataSpaceID ||
          !archivedBuildingDataSpaceID ||
          !buildingName ||
          !buildingLocation ||
          !selectedBuildingOwner.length
        }
        onClick={handleBuilding}
        sx={{
          backgroundColor: theme.palette.secondary[300],
          color: theme.palette.primary.main,
          "&:hover": { color: theme.palette.primary[800] },
          borderRadius: "3rem",
          width: "100%",
          padding: "1rem 2rem",
        }}
      >
        UPLOAD
      </Button>
    </Box>
  );
};

export default BuildingDrop;
