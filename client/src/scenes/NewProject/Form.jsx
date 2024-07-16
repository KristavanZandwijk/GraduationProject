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
  import { setProjects } from "state";
  
  const ProjectDrop = () => {
    const dispatch = useDispatch();
    const [projectID, setProjectID] = useState("");
    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const theme = useTheme();
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  
    const handleProject = async () => {
      const projectData = {
        projectID,
        projectName,
        projectDescription,
      };
  
      const response = await fetch(`http://localhost:5001/newprojects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(projectData),
      });
  
      const newProject = await response.json(); 
      if (response.status === 201) {
        dispatch(setProjects(newProject));
        setProjectID("");
        setProjectName("");
        setProjectDescription("");
      } else {
        console.error(newProject.message);
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
          Create the meta-data of a new project here!
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <InputBase
            placeholder="Add a project ID"
            onChange={(e) => setProjectID(e.target.value)}
            value={projectID}
            sx={{
              width: "100%",
              backgroundColor: theme.palette.primary.main,
              borderRadius: "2rem",
              padding: "1rem 2rem",
            }}
          />
          <InputBase
            placeholder="Add a project name"
            onChange={(e) => setProjectName(e.target.value)}
            value={projectName}
            sx={{
              width: "100%",
              backgroundColor: theme.palette.primary.main,
              borderRadius: "2rem",
              padding: "1rem 2rem",
            }}
          />
            <InputBase
            placeholder="Add a project description"
            onChange={(e) => setProjectDescription(e.target.value)}
            value={projectDescription}
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
            !projectID ||
            !projectName ||
            !projectDescription
          }
          onClick={handleProject}
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
  
  export default ProjectDrop;
  