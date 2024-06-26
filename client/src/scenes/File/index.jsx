import React, { useState, useEffect } from 'react';
import { Box, Typography, Link, CircularProgress } from '@mui/material';
import Header from 'components/Header';
import { useTheme } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const File = () => {
  const theme = useTheme();
  const { fileID } = useParams(); // Get the fileID from the URL parameters
  const [fileContent, setFileContent] = useState('');
  const [metadata, setMetadata] = useState(null); // State to store metadata
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state) => state.token); // Get the token from the Redux state

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:5001/files/${fileID}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
          responseType: 'json' // Expect the response to be JSON
        });
        setFileContent(response.data.content);
        setMetadata(response.data.metadata);
      } catch (error) {
        console.error('Error fetching file content:', error);
      }
      setIsLoading(false);
    };

    if (fileID) {
      fetchData();
    }
  }, [fileID, token]);

  const handleDownload = () => {
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `file_${fileID}.txt`); // Set the filename for download
    document.body.appendChild(link);
    link.click();
  };

  return (
    <Box m="1.5rem 2.5rem" height="100vh" display="flex">
      <Box flex="1" ml={4}>
        <Header
          title="File"
          subtitle="This page will show the file."
        />
        {metadata && (
          <Box
            maxWidth="100%"
            sx={{
              backgroundColor: theme.palette.background.paper,
              padding: '1rem',
              borderRadius: '8px',
              mt: '1rem',
              overflowY: 'auto',
            }}
          >
            <Typography variant="h6" color={theme.palette.secondary.main}>Metadata:</Typography>
            <Typography>Filename: {metadata.filename}</Typography>
            <Typography>Size: {metadata.size} bytes</Typography>
            <Typography>Created At: {new Date(metadata.createdAt).toLocaleString()}</Typography>
            <Typography>Data Owner: {(metadata.owner)}</Typography>
          </Box>
        )}
        <Box maxWidth="100%" sx={{
          backgroundColor: theme.palette.primary.main,
          padding: '1rem',
          borderRadius: '8px',
          mt: '2rem',
          overflowY: 'auto',
          maxHeight: '30vh', // Adjust the max height as needed
          minHeight: '20vh',
        }}>
          <Typography variant="h6" color={theme.palette.secondary.main}>Data:</Typography>
          <Link onClick={handleDownload} style={{ cursor: 'pointer' }} color={theme.palette.secondary.main}>
            Download Data
          </Link>
          {isLoading ? (
            <>
              <Typography variant="h6">Data is loading...</Typography>
              <CircularProgress size={24} style={{ marginLeft: '0.5rem' }} />
            </>
          ) : (
            <Typography>{fileContent}</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default File;
