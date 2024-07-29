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
import Dropzone from 'react-dropzone';
import UserImage from 'components/UserImage';
import WidgetWrapper from 'components/WidgetWrapper';
import FlexBetween from 'components/FlexBetween';
import { useDispatch, useSelector } from 'react-redux';
import { setFiles, setBuildings, setElements, setCompanies, setProjects, setUsers, setTeams } from 'state';
import axios from 'axios';

const FileDrop = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isData, setIsData] = useState(false);
  const [data, setData] = useState(null);
  const [selectedProject, setSelectedProject] = useState('');
  const [fileDetails, setFileDetails] = useState({
    fileName: '',
    fileDescription: '',
    considers: '',
    elementDataSpaceID: '',
    buildingDataSpaceID: '',
    companyDataSpaceID: '',
    hasOwner: '',
    status: '',
    relatedToProject: '',
    relatedToTeam: '',
    relatedToElement: '',
    relatedToBuilding: '',
  });
  const theme = useTheme();
  const { _id, token } = useSelector((state) => ({
    _id: state.user._id,
    token: state.token
  }));
  const buildings = useSelector((state) => state.buildings || []);
  const elements = useSelector((state) => state.elements || []);
  const companies = useSelector((state) => state.companies || []);
  const projects = useSelector((state) => state.projects || []);
  const teams = useSelector((state) => state.teams || []);
  const users = useSelector((state) => state.users || []);
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');

  const filteredProjects = Array.isArray(projects)
    ? projects.filter(project =>
        Array.isArray(project.employees) &&
        project.employees.some(employee => 
          employee.personID === user?.personID
        )
      )
    : [];

  const filteredTeams = Array.isArray(teams)
    ? teams.filter(team =>
        Array.isArray(team.projects) &&
        team.projects.some(project => 
          project.projectID === selectedProject
        )
      )
    : [];

  const styleProps = {
    width: '100%',
    backgroundColor: theme.palette.primary.default,
    borderRadius: '1rem',
    padding: '0.75rem 1.5rem',
    border: `1px solid ${theme.palette.secondary[100]}`,
  };

  const SelectField = ({ value, onChange, items, placeholder, disabled }) => (
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      displayEmpty
      sx={styleProps}
    >
      <MenuItem value="" disabled={disabled}>
        {placeholder}
      </MenuItem>
      {items.map((item) => (
        <MenuItem key={item._id || item.value} value={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </Select>
  );

  useEffect(() => {
    const fetchData = async () => {
      const endpoints = [
        { url: 'teams', action: setTeams },
        { url: 'projects/employee', action: setProjects },
        { url: 'companies', action: setCompanies },
        { url: 'elements', action: setElements },
        { url: 'buildings/all', action: setBuildings },
      ];
      for (const { url, action } of endpoints) {
        try {
          const response = await axios.get(`http://localhost:5001/${url}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          dispatch(action(response.data));
        } catch (error) {
          console.error(`Error fetching ${url}:`, error);
        }
      }
    };
    fetchData();
  }, [dispatch, token]);

  const handleFile = async () => {
    const formData = new FormData();
    Object.entries(fileDetails).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });
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
      setFileDetails({
        fileName: '',
        fileDescription: '',
        considers: '',
        elementDataSpaceID: '',
        buildingDataSpaceID: '',
        companyDataSpaceID: '',
        hasOwner: '',
        status: '',
        relatedToProject: '',
        relatedToTeam: '',
        relatedToElement: '',
        relatedToBuilding: '',
      });
      setData(null);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const generateFileID = () => Math.random().toString(36).substr(2, 10).toUpperCase();

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <Box display="flex" flexDirection="column" gap="1rem" width="100%">
          <UserImage image={picturePath} />
          <InputBase
            placeholder="Add a name to your file"
            onChange={(e) => setFileDetails(prev => ({ ...prev, fileName: e.target.value }))}
            value={fileDetails.fileName}
            sx={styleProps}
          />
          <InputBase
            placeholder="Add a description to your file"
            onChange={(e) => setFileDetails(prev => ({ ...prev, fileDescription: e.target.value }))}
            value={fileDetails.fileDescription}
            sx={styleProps}
          />
          <SelectField
            value={fileDetails.hasOwner}
            onChange={(value) => setFileDetails(prev => ({ ...prev, hasOwner: value }))}
            items={users.map(user => ({
              _id: user.personID,
              value: user.personID,
              label: `${user.personID} - ${user.firstName} ${user.lastName}`,
            }))}
            placeholder="Select Owner of the file"
            disabled={!users.length}
          />
          <SelectField
            value={fileDetails.considers}
            onChange={(value) => setFileDetails(prev => ({ ...prev, considers: value }))}
            items={[
              { value: 'element', label: 'Element' },
              { value: 'building', label: 'Building' },
            ]}
            placeholder="Is the file related to an element or building?"
          />
          <SelectField
            value={fileDetails.buildingDataSpaceID}
            onChange={(value) => setFileDetails(prev => ({ ...prev, buildingDataSpaceID: value }))}
            items={buildings.map(building => ({
              _id: building._id,
              value: building.buildingDataSpaceID,
              label: `${building.buildingName} - ${building.buildingDataSpaceID}`,
            }))}
            placeholder="Select Building Data Space ID"
          />
          {fileDetails.considers === 'element' && (
            <SelectField
              value={fileDetails.elementDataSpaceID}
              onChange={(value) => setFileDetails(prev => ({ ...prev, elementDataSpaceID: value }))}
              items={elements.map(element => ({
                _id: element._id,
                value: element.elementDataSpaceID,
                label: `${element.elementDataSpaceID} - ${element.elementName}`,
              }))}
              placeholder="Select Element Data Space ID"
            />
          )}
          <SelectField
            value={fileDetails.companyDataSpaceID}
            onChange={(value) => setFileDetails(prev => ({ ...prev, companyDataSpaceID: value }))}
            items={companies.map(company => ({
              _id: company._id,
              value: company.companyDataSpaceID,
              label: `${company.companyDataSpaceID} - ${company.companyName}`,
            }))}
            placeholder="Select Company"
          />
          <SelectField
            value={fileDetails.relatedToProject}
            onChange={(value) => {
              setFileDetails(prev => ({ ...prev, relatedToProject: value }));
              setSelectedProject(value);
            }}
            items={filteredProjects.map(filteredProject => ({
              _id: filteredProject._id,
              value: filteredProject.projectID,
              label: `${filteredProject.projectID} - ${filteredProject.projectName}`,
            }))}
            placeholder="Select Project"
          />
          {filteredTeams.length > 0 && (
            <SelectField
              value={fileDetails.relatedToTeam}
              onChange={(value) => setFileDetails(prev => ({ ...prev, relatedToTeam: value }))}
              items={filteredTeams.map(filteredTeam => ({
                _id: filteredTeam._id,
                value: filteredTeam.teamID,
                label: `${filteredTeam.teamID} - ${filteredTeam.teamName}`,
              }))}
              placeholder="Select Team"
              disabled={!filteredTeams.length}
            />
          )}
          <SelectField
            value={fileDetails.status}
            onChange={(value) => setFileDetails(prev => ({ ...prev, status: value }))}
            items={[
              { value: 'private', label: 'Private' },
              { value: 'sharedCompany', label: 'Shared within project team within the company' },
              { value: 'sharedTeam', label: 'Shared with entire team (also with the employees of other companies)' },
              { value: 'public', label: 'Public' },
            ]}
            placeholder="What is the sharing status of the file?"
          />
        </Box>
      </FlexBetween>
      {isData && (
        <Box border={`1px solid ${theme.palette.neutral.medium}`} borderRadius="5px" mt="1rem" p="1rem">
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png,.gif,.bmp,.tiff,.webp,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.rtf,.odt,.ods,.odp,.mp3,.wav,.ogg,.m4a,.flac,.mp4,.mov,.wmv,.avi,.mkv,.webm,.flv,.zip,.rar,.7z,.tar,.gz,.html,.css,.js,.ts,.json,.xml,.yaml,.yml,.csv,.md,.sql,.ifc,.obj,.stl,.fbx,.dae,.3ds,.gltf,.glb"
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
                  <IconButton onClick={() => setData(null)} sx={{ width: '15%' }}>
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
        {isNonMobileScreens && (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: theme.palette.secondary.main }} />
          </FlexBetween>
        )}
        <Button
          disabled={!fileDetails.fileDescription && !data}
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
