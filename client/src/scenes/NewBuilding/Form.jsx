import {
    Box,
    Divider,
    InputBase,
    Button,
    Typography,
    useTheme,
    useMediaQuery,
  } from "@mui/material";
  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setBuildings } from "state";
  
  const BuildingDrop = () => {
    const dispatch = useDispatch();
    const [buildingID, setBuildingID] = useState("");
    const [buildingDataSpaceID, setBuildingDataSpaceID] = useState("");
    const [archivedBuildingDataSpaceID, setArchivedBuildingDataSpaceID] = useState("");
    const [hasOwner, setHasOwner] = useState("");
    const [buildingName, setBuildingName] = useState("");
    const [buildingLocation, setBuildingLocation] = useState("");
    const theme = useTheme();
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  
    const handleBuilding = async () => {
      const buildingData = {
        buildingID,
        buildingDataSpaceID,
        archivedBuildingDataSpaceID,
        hasOwner,
        buildingName,
        buildingLocation,
      };
  
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
        setHasOwner("");
        setBuildingName("");
        setBuildingLocation("");
      } else {
        console.error(newBuilding.message);
      }
    };
  
    return (
      <Box
        sx={{
          backgroundColor: theme.palette.primary.default,
          borderRadius: "1rem",
          padding: "2rem",
          border: "1px solid", // Set the border width and style
          borderColor: theme.palette.secondary[100] // Set the border colo
        }}
      >
        <Typography
          variant="h4"
          sx={{
            marginBottom: "2rem",
            textAlign: "center",
            color: theme.palette.secondary[100],
            fontweight: "bold",
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
            placeholder="Add an Owner"
            onChange={(e) => setHasOwner(e.target.value)}
            value={hasOwner}
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
        </Box>
        <Divider sx={{ margin: "2rem 0" }} />
        <Button
          disabled={
            !buildingID ||
            !buildingDataSpaceID ||
            !archivedBuildingDataSpaceID ||
            !hasOwner ||
            !buildingName ||
            !buildingLocation
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
  