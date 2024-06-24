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
import { setElements } from "state";

const ElementDrop = () => {
    const dispatch = useDispatch();
    const [elementID, setElementID] = useState("");
    const [elementDataSpaceID, setElementDataSpaceID] = useState("");
    const [hasOwner, setHasOwner] = useState("");
    const [hasBuilding, setHasBuilding] = useState("");
    const [elementName, setElementName] = useState("");
    const [elementLocation, setElementLocation] = useState("");
    const theme = useTheme();
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    const handleElement = async () => {
        const elementData = {
            elementID,
            elementDataSpaceID,
            hasOwner,
            elementName,
            elementLocation,
            hasBuilding,
        };

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
            setHasOwner("");
            setElementName("");
            setElementLocation("");
            setHasBuilding("");
        } else {
            console.error(newElement.message);
        }
    };

    return (
        <Box
        sx={{
          backgroundColor: theme.palette.secondary.default,
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
          Create the meta-data of a new element here!
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <InputBase
                placeholder="Add a element ID"
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
                placeholder="Add a element data space ID"
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
                placeholder="Add a element name"
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
                placeholder="Add a element location"
                onChange={(e) => setElementLocation(e.target.value)}
                value={elementLocation}
                sx={{
                    width: "100%",
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: "2rem",
                    padding: "1rem 2rem",
                }}
            />
            <InputBase
                placeholder="Add a Building"
                onChange={(e) => setHasBuilding(e.target.value)}
                value={hasBuilding}
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
                    !elementID ||
                    !elementDataSpaceID ||
                    !hasOwner ||
                    !elementName ||
                    !elementLocation ||
                    !hasBuilding
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
