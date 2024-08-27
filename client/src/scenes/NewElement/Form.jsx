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
  import { setElements, setUsers, setBuildings } from "state";
  import axios from "axios";
  
  const ElementDrop = () => {
    const dispatch = useDispatch();
    const [elementID, setElementID] = useState("");
    const [elementDataSpaceID, setElementDataSpaceID] = useState("");
    const [elementName, setElementName] = useState("");
    const [elementLocation, setElementLocation] = useState("");
    const [selectedElementOwner, setSelectedElementOwner] = useState("");
    const [selectedBuilding, setSelectedBuilding] = useState(""); // New state for selected building
    const theme = useTheme();
    const token = useSelector((state) => state.token);
    const users = useSelector((state) => state.users);
    const buildings = useSelector((state) => state.buildings); // Selector for buildings
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
  
      const fetchBuildings = async () => {
        try {
          const response = await axios.get("http://localhost:5001/buildings", {
            headers: { Authorization: `Bearer ${token}` },
          });
          dispatch(setBuildings(Array.isArray(response.data) ? response.data : []));
        } catch (error) {
          console.error("Failed to fetch buildings:", error);
        }
      };
  
      fetchUsers();
      fetchBuildings();
    }, [token, dispatch]);
  
    const handleElement = async () => {
      const elementData = {
        elementID,
        elementDataSpaceID,
        elementOwner: selectedElementOwner ? { personID: selectedElementOwner } : null,
        elementName,
        elementLocation,
        isPartOfBuilding: selectedBuilding ? { buildingID: selectedBuilding } : null, // Adjusted for single building
      };
  
      try {
        const response = await fetch(`http://localhost:5001/newelements`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(elementData),
        });
  
        const newElement = await response.json();
        if (response.status === 201) {
          dispatch(setElements(newElement));
          setElementID("");
          setElementDataSpaceID("");
          setElementName("");
          setElementLocation("");
          setSelectedElementOwner("");
          setSelectedBuilding(""); // Reset selected building
        } else {
          console.error(newElement.message);
        }
      } catch (error) {
        console.error("Failed to create element:", error);
      }
    };
  
    return (
      <Box
        sx={{
          backgroundColor: theme.palette.secondary.default,
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
          Create the meta-data of a new element here!
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <InputBase
            placeholder="Add an element ID"
            onChange={(e) => setElementID(e.target.value)}
            value={elementID}
            sx={{
              width: "100%",
              backgroundColor: theme.palette.primary.main,
              borderRadius: "2rem",
              padding: "1rem 2rem",
            }}
          />
          <InputBase
            placeholder="Add an element data space ID"
            onChange={(e) => setElementDataSpaceID(e.target.value)}
            value={elementDataSpaceID}
            sx={{
              width: "100%",
              backgroundColor: theme.palette.primary.main,
              borderRadius: "2rem",
              padding: "1rem 2rem",
            }}
          />
          <InputBase
            placeholder="Add an element name"
            onChange={(e) => setElementName(e.target.value)}
            value={elementName}
            sx={{
              width: "100%",
              backgroundColor: theme.palette.primary.main,
              borderRadius: "2rem",
              padding: "1rem 2rem",
            }}
          />
          <InputBase
            placeholder="Add an element location"
            onChange={(e) => setElementLocation(e.target.value)}
            value={elementLocation}
            sx={{
              width: "100%",
              backgroundColor: theme.palette.primary.main,
              borderRadius: "2rem",
              padding: "1rem 2rem",
            }}
          />
          <Select
            value={selectedElementOwner}
            onChange={(e) => setSelectedElementOwner(e.target.value)}
            displayEmpty
            renderValue={(selected) => {
              if (!selected) {
                return <em>Select the Element Owner</em>;
              }
  
              const user = users.find((user) => user.personID === selected);
              return user ? `${user.personID} - ${user.firstName} ${user.lastName}` : "";
            }}
            sx={{
              width: "100%",
              backgroundColor: theme.palette.primary.default,
              borderRadius: "1rem",
              padding: "0.75rem 1.5rem",
              border: `1px solid ${theme.palette.secondary[100]}`,
            }}
          >
            <MenuItem value="" disabled>Select the Element Owner</MenuItem>
            {users.map((user) => (
              <MenuItem key={user.personID} value={user.personID}>
                {`${user.personID} - ${user.firstName} ${user.lastName}`}
              </MenuItem>
            ))}
          </Select>
          <Select
            value={selectedBuilding}
            onChange={(e) => setSelectedBuilding(e.target.value)}
            displayEmpty
            renderValue={(selected) => {
                if (!selected) {
                return <em>Select the Building</em>;
                }

                const building = buildings.find((building) => building.buildingID === selected);
                return building ? `${building.buildingID} - ${building.buildingName}` : "";
            }}
            sx={{
                width: "100%",
                backgroundColor: theme.palette.primary.default,
                borderRadius: "1rem",
                padding: "0.75rem 1.5rem",
                border: `1px solid ${theme.palette.secondary[100]}`,
            }}
            >
            <MenuItem value="" disabled>Select the Building</MenuItem>
            {(Array.isArray(buildings) ? buildings : []).map((building) => (
                <MenuItem key={building.buildingID} value={building.buildingID}>
                {`${building.buildingID} - ${building.buildingName}`}
                </MenuItem>
            ))}
            </Select>

          
          
        </Box>
        <Divider sx={{ margin: "2rem 0" }} />
        <Button
          disabled={
            !elementID ||
            !elementDataSpaceID ||
            !selectedElementOwner ||
            !elementName ||
            !elementLocation ||
            !selectedBuilding // Updated to check for selected building
          }
          onClick={handleElement}
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
  
  export default ElementDrop;
  