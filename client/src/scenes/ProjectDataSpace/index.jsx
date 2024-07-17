import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Header from 'components/Header';
import axios from 'axios';
import ProjectInfo from 'components/ProjectInformationWidget';

const ProjectDataSpace = () => {
  const { projectID } = useParams();
  const token = useSelector((state) => state.token);
  const [project, setProject] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const [projectResponse, companiesResponse] = await Promise.all([
          axios.get(`http://localhost:5001/projects/${projectID}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:5001/companies', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setProject(projectResponse.data);
        setCompanies(Array.isArray(companiesResponse.data) ? companiesResponse.data : []);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch project data:', error);
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [projectID, token]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!project) {
    return <Typography>No project found.</Typography>;
  }

  return (
    <Box m="1.5rem 2.5rem" height="100vh" display="flex">
      {/* Right side content */}
      <Box flex="1" ml={4}>
        <Header
          title="Project Data Space"
          subtitle="This page shows all information that is linked to the project"
        />
        <ProjectInfo project={project} companies={companies} handleProjectClick={() => {}} />
      </Box>
    </Box>
  );
};

export default ProjectDataSpace;
