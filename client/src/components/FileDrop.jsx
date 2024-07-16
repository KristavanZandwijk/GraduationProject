import React, { useEffect, useState } from 'react';
import {
  EditOutlined,
  DeleteOutlined,
  PublishOutlined,
  MoreHorizOutlined,
} from '@mui/icons-material';
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
  Select,
  MenuItem,
} from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import Dropzone from 'react-dropzone';
import UserImage from 'components/UserImage';
import WidgetWrapper from 'components/WidgetWrapper';
import { useDispatch, useSelector } from 'react-redux';
import state, { setFiles, setBuildings, setElements, setCompanies, setProjects } from 'state'; // Update the imports accordingly
import axios from 'axios';

const FileDrop = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isData, setIsData] = useState(false);
  const [data, setData] = useState(null);
  const [relatedToElement, setRelatedToElement] = useState('');
  const [relatedToBuilding, setRelatedToBuilding] = useState('');
  const [relatedToProject, setRelatedToProject] = useState('');
  const [fileDescription, setFileDescription] = useState('');
  const [fileName, setFileName] = useState('');
  const [considers, setConsiders] = useState('');
  const [elementDataSpaceID, setElementDataSpaceID] = useState('');
  const [buildingDataSpaceID, setBuildingDataSpaceID] = useState('');
  const [companyDataSpaceID, setCompanyDataSpaceID] = useState('');
  const [hasOwner, setHasOwner] = useState('');
  const theme = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const buildings = useSelector((state) => state.buildings || []);
  const elements = useSelector((state) => state.elements || []); // Add state for elements
  const companies = useSelector((state) => state.companies || []); // Add state for companies
  const projects = useSelector((state) => state.projects || []);
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');
  const mediumMain = theme.palette.neutral.mediumMain;
  const medium = theme.palette.neutral.medium;

  useEffect(() => {
    
    const fetchBuildings = async () => {
      try {
        const response = await axios.get('http://localhost:5001/buildings', {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setBuildings(Array.isArray(response.data) ? response.data : []));
      } catch (error) {
        console.error('Failed to fetch buildings:', error);
      }
    };

    const fetchElements = async () => {
      try {
        const response = await axios.get('http://localhost:5001/elements', {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setElements(Array.isArray(response.data) ? response.data : []));
      } catch (error) {
        console.error('Failed to fetch elements:', error);
      }
    };

    const fetchCompanies = async () => {
      try {
        const response = await axios.get('http://localhost:5001/companies', {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setCompanies(Array.isArray(response.data) ? response.data : []));
      } catch (error) {
        console.error('Failed to fetch companies:', error);
      }
    };

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

    fetchBuildings();
    fetchElements();
    fetchCompanies();
    fetchProjects();
  }, [dispatch, token]);

  const generateFileID = () => {
    return Math.random().toString(36).substr(2, 10).toUpperCase();
  };

  const handleFile = async () => {
    const formData = new FormData();
    formData.append('fileDescription', fileDescription);
    formData.append('fileName', fileName);
    formData.append('hasOwner', hasOwner);
    formData.append('considers', considers);
    formData.append('relatedToProject', relatedToProject);
    formData.append('elementDataSpaceID', elementDataSpaceID);
    formData.append('buildingDataSpaceID', buildingDataSpaceID);
    formData.append('companyDataSpaceID', companyDataSpaceID);
    if (data) {
      formData.append('data', data);
      formData.append('filePath', data.name);
      formData.append('fileID', generateFileID());
    }

    const response = await fetch('http://localhost:5001/files', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const files = await response.json();
    dispatch(setFiles({ files }));
    setData(null);
    setFileDescription(''); // Clear description after file upload
    setFileName('');
    setHasOwner('');
    setConsiders('');
    setElementDataSpaceID('');
    setBuildingDataSpaceID('');
    setCompanyDataSpaceID('');
    setRelatedToElement('');
    setRelatedToBuilding('');
    setRelatedToProject('');
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <Box display="flex" flexDirection="column" gap="1rem" width="100%">
          <UserImage image={picturePath} />
          <InputBase
            placeholder="Add a name to your file"
            onChange={(e) => setFileName(e.target.value)}
            value={fileName}
            sx={{
              width: '100%',
              backgroundColor: theme.palette.primary.default,
              borderRadius: '2rem',
              padding: '1rem 2rem',
              border: `2px solid ${theme.palette.secondary[100]}`,
            }}
          />
          <InputBase
            placeholder="Add a description to your file"
            onChange={(e) => setFileDescription(e.target.value)}
            value={fileDescription}
            sx={{
              width: '100%',
              backgroundColor: theme.palette.primary.default,
              borderRadius: '2rem',
              padding: '1rem 2rem',
              border: `2px solid ${theme.palette.secondary[100]}`,
            }}
          />
          <InputBase
            placeholder="Add the owner of the file (use the personID of the owner)"
            onChange={(e) => setHasOwner(e.target.value)}
            value={hasOwner}
            sx={{
              width: '100%',
              backgroundColor: theme.palette.primary.default,
              borderRadius: '2rem',
              padding: '1rem 2rem',
              border: `2px solid ${theme.palette.secondary[100]}`,
            }}
          />
          <Select
            value={considers}
            onChange={(e) => setConsiders(e.target.value)}
            displayEmpty
            sx={{
              width: '100%',
              backgroundColor: theme.palette.primary.default,
              borderRadius: '2rem',
              padding: '1rem 2rem',
              border: `2px solid ${theme.palette.secondary[100]}`,
            }}
          >
            <MenuItem value="" disabled>
              Is the file related to an element, building, or project?
            </MenuItem>
            <MenuItem value="element">Element</MenuItem>
            <MenuItem value="building">Building</MenuItem>
            <MenuItem value="project">Project</MenuItem>
          </Select>

          {considers === 'element' && (
            <>
              <Select
                value={elementDataSpaceID}
                onChange={(e) => setElementDataSpaceID(e.target.value)}
                displayEmpty
                sx={{
                  width: '100%',
                  backgroundColor: theme.palette.primary.default,
                  borderRadius: '2rem',
                  padding: '1rem 2rem',
                  border: `2px solid ${theme.palette.secondary[100]}`,
                }}
              >
                <MenuItem value="" disabled>
                  Select Element Data Space ID
                </MenuItem>
                {elements.map((element) => (
                  <MenuItem key={element._id} value={element.elementDataSpaceID}>
                    {`${element.elementDataSpaceID} - ${element.elementName}`}
                  </MenuItem>
                ))}
              </Select>
            </>
          )}

          {considers === 'building' && (
            <>
              <Select
                value={buildingDataSpaceID}
                onChange={(e) => setBuildingDataSpaceID(e.target.value)}
                displayEmpty
                sx={{
                  width: '100%',
                  backgroundColor: theme.palette.primary.default,
                  borderRadius: '2rem',
                  padding: '1rem 2rem',
                  border: `2px solid ${theme.palette.secondary[100]}`,
                }}
              >
                <MenuItem value="" disabled>
                  Select Building Data Space ID
                </MenuItem>
                {buildings.map((building) => (
                  <MenuItem key={building._id} value={building.buildingDataSpaceID}>
                    {`${building.buildingDataSpaceID} - ${building.buildingName}`}
                  </MenuItem>
                ))}
              </Select>
            </>
          )}

          {considers === 'project' && (
            <>
            <Select
              value={companyDataSpaceID}
              onChange={(e) => setCompanyDataSpaceID(e.target.value)}
              displayEmpty
              sx={{
                width: '100%',
                backgroundColor: theme.palette.primary.default,
                borderRadius: '2rem',
                padding: '1rem 2rem',
                border: `2px solid ${theme.palette.secondary[100]}`,
              }}
            >
              <MenuItem value="" disabled>
                Select Company
              </MenuItem>
              {companies.map((company) => (
                <MenuItem key={company._id} value={company.companyDataSpaceID}>
                  {`${company.companyDataSpaceID} - ${company.companyName}`}
                </MenuItem>
              ))}
            </Select>
            <Select
              value={relatedToProject}
              onChange={(e) => setRelatedToProject(e.target.value)}
              displayEmpty
              sx={{
                width: '100%',
                backgroundColor: theme.palette.primary.default,
                borderRadius: '2rem',
                padding: '1rem 2rem',
                border: `2px solid ${theme.palette.secondary[100]}`,
              }}
            >
              <MenuItem value="" disabled>
                Select Project
              </MenuItem>
              {projects.map((project) => (
                <MenuItem key={project._id} value={project.projectID}>
                  {`${project.projectID} - ${project.projectName}`}
                </MenuItem>
              ))}
            </Select>
          </>
        )}
        </Box>
      </FlexBetween>
      {isData && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png,.gif,.bmp,.tiff,.webp,
                          .pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.rtf,.odt,.ods,.odp,
                          .mp3,.wav,.ogg,.m4a,.flac,
                          .mp4,.mov,.wmv,.avi,.mkv,.webm,.flv,
                          .zip,.rar,.7z,.tar,.gz,
                          .html,.css,.js,.ts,.json,.xml,.yaml,.yml,.csv,.md,.sql,
                          .ifc,.obj,.stl,.fbx,.dae,.3ds,.gltf,.glb"
            multiple={false}
            onDrop={(acceptedFiles) => setData(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${theme.palette.secondary[100]}`}
                  p="1rem"
                  width="100%"
                  sx={{ '&:hover': { cursor: 'pointer' } }}
                >
                  <input {...getInputProps()} />
                  {!data ? (
                    <p>Add File Here. Only one at a time!</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{data.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {data && (
                  <IconButton
                    onClick={() => setData(null)}
                    sx={{ width: '15%' }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: '1.25rem 0' }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsData(!isData)}>
          <PublishOutlined sx={{ color: theme.palette.secondary[100] }} />
          <Typography
            color={theme.palette.secondary[100]}
            sx={{ '&:hover': { cursor: 'pointer', color: theme.palette.secondary.main } }}
          >
            Add Data
          </Typography>
        </FlexBetween>

        {isNonMobileScreens ? (
          <>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: theme.palette.secondary.main }} />
          </FlexBetween>
        )}

        <Button
          disabled={!fileDescription && !data}
          onClick={handleFile}
          sx={{
            color: theme.palette.secondary[100],
            backgroundColor: theme.palette.background.alt,
            borderRadius: '3rem',
          }}
        >
          UPLOAD
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default FileDrop;
