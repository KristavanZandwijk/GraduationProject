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
import { setFiles, setBuildings, setElements, setCompanies, setProjects, setUsers } from 'state'; // Update the imports accordingly
import axios from 'axios';

const FileDrop = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isData, setIsData] = useState(false);
  const [data, setData] = useState(null);
  const [relatedToProject, setRelatedToProject] = useState('');
  const [relatedToTeam, setRelatedToTeam] = useState('');
  const [fileDescription, setFileDescription] = useState('');
  const [fileName, setFileName] = useState('');
  const [considers, setConsiders] = useState('');
  const [elementDataSpaceID, setElementDataSpaceID] = useState('');
  const [buildingDataSpaceID, setBuildingDataSpaceID] = useState('');
  const [companyDataSpaceID, setCompanyDataSpaceID] = useState('');
  const [hasOwner, setHasOwner] = useState('');
  const [status, setStatus] = useState('');
  const [teams, setTeams] = useState([]); // Add teams state variable
  const [relatedToElement, setRelatedToElement] = useState(''); // Add relatedToElement state variable
  const [relatedToBuilding, setRelatedToBuilding] = useState(''); // Add relatedToBuilding state variable
  const theme = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const buildings = useSelector((state) => state.buildings || []);
  const elements = useSelector((state) => state.elements || []); // Add state for elements
  const companies = useSelector((state) => state.companies || []); // Add state for companies
  const projects = useSelector((state) => state.projects || []);
  const users = useSelector((state) => state.users || []);
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');
  const mediumMain = theme.palette.neutral.mediumMain;
  const medium = theme.palette.neutral.medium;

  const generateFileID = () => {
    return Math.random().toString(36).substr(2, 10).toUpperCase();
  };

  const handleFile = async () => {
    const formData = new FormData();

    formData.append('fileName', fileName);
    formData.append('fileDescription', fileDescription);
    formData.append('hasOwner', hasOwner);
    formData.append('considers', considers);
    formData.append('relatedToProject', relatedToProject);
    formData.append('relatedToTeam', relatedToTeam);
    formData.append('elementDataSpaceID', elementDataSpaceID);
    formData.append('buildingDataSpaceID', buildingDataSpaceID);
    formData.append('companyDataSpaceID', companyDataSpaceID);
    formData.append('status', status);
    if (data) {
      formData.append('data', data);
      formData.append('filePath', data.name);
      formData.append('fileID', generateFileID());
    }

    try {
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
      setRelatedToTeam('');
      setStatus('');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
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
              borderRadius: '1rem',
              padding: '0.75rem 1.5rem',
              border: `1px solid ${theme.palette.secondary[100]}`,
            }}
          />
          <InputBase
            placeholder="Add a description to your file"
            onChange={(e) => setFileDescription(e.target.value)}
            value={fileDescription}
            sx={{
              width: '100%',
              backgroundColor: theme.palette.primary.default,
              borderRadius: '1rem',
              padding: '0.75rem 1.5rem',
              border: `1px solid ${theme.palette.secondary[100]}`,
            }}
          />
          <Select
            value={hasOwner}
            onChange={(e) => setHasOwner(e.target.value)}
            displayEmpty
            sx={{
              width: '100%',
              backgroundColor: theme.palette.primary.default,
              borderRadius: '1rem',
              padding: '0.75rem 1.5rem',
              border: `1px solid ${theme.palette.secondary[100]}`,
            }}
          >
            <MenuItem value="" disabled>
              Select Owner of the file
            </MenuItem>
            {users.map((user) => (
              <MenuItem key={user.personID} value={user.personID}>
                {`${user.personID} - ${user.firstName} ${user.lastName}`}
              </MenuItem>
            ))}
          </Select>
          <Select
            value={considers}
            onChange={(e) => setConsiders(e.target.value)}
            displayEmpty
            sx={{
              width: '100%',
              backgroundColor: theme.palette.primary.default,
              borderRadius: '1rem',
              padding: '0.75rem 1.5rem',
              border: `1px solid ${theme.palette.secondary[100]}`,
            }}
          >
            <MenuItem value="" disabled>
              Is the file related to an element or building?
            </MenuItem>
            <MenuItem value="element">Element</MenuItem>
            <MenuItem value="building">Building</MenuItem>
          </Select>

          {considers === 'element' && (
            <Select
              value={elementDataSpaceID}
              onChange={(e) => setElementDataSpaceID(e.target.value)}
              displayEmpty
              sx={{
                width: '100%',
                backgroundColor: theme.palette.primary.default,
                borderRadius: '1rem',
                padding: '0.75rem 1.5rem',
                border: `1px solid ${theme.palette.secondary[100]}`,
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
          )}

          {considers === 'building' && (
            <Select
              value={buildingDataSpaceID}
              onChange={(e) => setBuildingDataSpaceID(e.target.value)}
              displayEmpty
              sx={{
                width: '100%',
                backgroundColor: theme.palette.primary.default,
                borderRadius: '1rem',
                padding: '0.75rem 1.5rem',
                border: `1px solid ${theme.palette.secondary[100]}`,
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
          )}
          <Select
            value={companyDataSpaceID}
            onChange={(e) => setCompanyDataSpaceID(e.target.value)}
            displayEmpty
            sx={{
              width: '100%',
              backgroundColor: theme.palette.primary.default,
              borderRadius: '1rem',
              padding: '0.75rem 1.5rem',
              border: `1px solid ${theme.palette.secondary[100]}`,
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
              borderRadius: '1rem',
              padding: '0.75rem 1.5rem',
              border: `1px solid ${theme.palette.secondary[100]}`,
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
          <Select
            value={relatedToTeam}
            onChange={(e) => setRelatedToTeam(e.target.value)}
            displayEmpty
            sx={{
              width: '100%',
              backgroundColor: theme.palette.primary.default,
              borderRadius: '1rem',
              padding: '0.75rem 1.5rem',
              border: `1px solid ${theme.palette.secondary[100]}`,
            }}
          >
            <MenuItem value="" disabled>
              Select Team
            </MenuItem>
            {teams.map((team) => (
              <MenuItem key={team._id} value={team.teamID}>
                {`${team.teamID} - ${team.teamName}`}
              </MenuItem>
            ))}
          </Select>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            displayEmpty
            sx={{
              width: '100%',
              backgroundColor: theme.palette.primary.default,
              borderRadius: '1rem',
              padding: '0.75rem 1.5rem',
              border: `1px solid ${theme.palette.secondary[100]}`,
            }}
          >
            <MenuItem value="" disabled>
              What is the sharing status of the file?
            </MenuItem>
            <MenuItem value="private">Private</MenuItem>
            <MenuItem value="sharedCompany">Shared within project team within the company</MenuItem>
            <MenuItem value="sharedTeam">Shared with entire team (also with the employees of other companies)</MenuItem>
            <MenuItem value="public">Shared with everyone</MenuItem>
          </Select>
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
                  border={`1px dashed ${theme.palette.secondary[100]}`}
                  p="1rem"
                  width="100%"
                  sx={{ '&:hover': { cursor: 'pointer' } }}
                >
                  <input {...getInputProps()} />
                  {!data ? (
                    <Typography>Add File Here. Only one at a time!</Typography>
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
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: theme.palette.secondary.main }} />
          </FlexBetween>
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
