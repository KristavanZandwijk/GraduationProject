import React, { useState, useRef } from 'react';
import { Box, Button, Typography, useTheme, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

const IFCtoRDFConverter = () => {
  const [ifcFile, setIfcFile] = useState(null);
  const [ttlFilePath, setTtlFilePath] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const theme = useTheme();
  const token = useSelector((state) => state.token);

  const fileInputRef = useRef(null);

  const handleIfcFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.name.split('.').pop().toLowerCase() === 'ifc') {
      setIfcFile(file);
      setTtlFilePath(null);
      setError('');
    } else {
      setIfcFile(null);
      setTtlFilePath(null);
      setError('Only .ifc files are allowed.');
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ifcFile) {
      setError('IFC file is required.');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('ifcFile', ifcFile);

    // Generate a ttlFilename
    const ttlFileName = ifcFile.name.replace(/\.[^/.]+$/, '') + '.ttl';
    formData.append('ttlFileName', ttlFileName);

    try {
      const response = await fetch('http://localhost:5001/converter', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setTtlFilePath(result.ttlFilePath);
        console.log(setTtlFilePath)
        setIfcFile(null);
        setError('');
        if (fileInputRef.current) {
          fileInputRef.current.value = null;
        }
      } else {
        const errorText = await response.text();
        setError(`Conversion failed: ${errorText}`);
      }
    } catch (err) {
      setError('Conversion failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      width="100%"
      maxWidth="600px"
      p="2rem"
      boxShadow={3}
      borderRadius="1rem"
      backgroundColor={theme.palette.primary.default}
      border={`1px solid ${theme.palette.secondary[100]}`}
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
        Convert your IFC file to RDF
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb="1rem">
          <Typography variant="h6">IFC File:</Typography>
          <input
            type="file"
            onChange={handleIfcFileChange}
            required
            style={{
              width: '100%',
              backgroundColor: theme.palette.primary.main,
              borderRadius: '2rem',
              padding: '1rem 2rem',
            }}
            ref={fileInputRef}
          />
        </Box>
        {error && (
          <Box mb="1rem">
            <Typography color="error">{error}</Typography>
          </Box>
        )}
        <Divider sx={{ margin: "2rem 0" }} />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          disabled={loading}
          fullWidth
          sx={{
            backgroundColor: theme.palette.secondary[300],
            color: theme.palette.primary.main,
            "&:hover": { color: theme.palette.primary[800] },
            borderRadius: "3rem",
            padding: "1rem 2rem",
          }}
        >
          {loading ? 'Converting...' : 'Convert'}
        </Button>
      </form>
      {ttlFilePath && (
        <Box mt="2rem">
          <Typography variant="h6">Conversion successful!</Typography>
        </Box>
      )}
    </Box>
  );
};

export default IFCtoRDFConverter;