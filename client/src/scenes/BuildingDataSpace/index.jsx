import React, { useState, useEffect } from 'react';
import { Box, Typography, Link, Select, MenuItem, Button, CircularProgress } from '@mui/material';
import Header from 'components/Header';
import { useTheme } from '@mui/material';
import axios from 'axios';
import ComunicaComponent1 from 'components/Comunica';

const BuildingDataSpace = () => {
    const theme = useTheme();
    const [queryResults, setQueryResults] = useState([]);
    const [selectedFolder, setSelectedFolder] = useState('');
    const [selectedFile, setSelectedFile] = useState('');
    const [selectedData, setSelectedData] = useState([]);
    const [searchClicked, setSearchClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Added loading state

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // Set loading to true when fetching data
            try {
                const response = await axios.get(`http://localhost:1000/${selectedFolder}/${selectedFile}`);
                setSelectedData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            setIsLoading(false); // Set loading to false after fetching data
        };

        if (searchClicked && selectedFolder && selectedFile) {
            fetchData();
            setSearchClicked(false); // Reset searchClicked after initiating data fetch
        }
    }, [searchClicked, selectedFolder, selectedFile]);

    const sources = `http://localhost:1000/${selectedFolder}/${selectedFile}`;

    const handleDownload = () => {
        const url = window.URL.createObjectURL(new Blob([selectedData]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', selectedFile); // Set the filename for download
        document.body.appendChild(link);
        link.click();
    };

    const handleSearch = () => {
        setSearchClicked(true); // Set search button clicked
    };
    const handleRefresh = () => {
        setSelectedFolder('');
        setSelectedFile('');
        setSearchClicked(false);
        setSelectedData([]); // Clear selectedData
    };


    return (
        <Box m="1.5rem 2.5rem" height="100vh" display="flex" flexDirection="column">
            <Header
                title="Building Data Space"
                subtitle="This page gives a general overview of the building data space."
            />
            <Box display="flex" justifyContent="space-between"> 
                {/* Left box */}
                <Box
                width="48%"
                sx={{
                    backgroundColor: theme.palette.primary.main,
                    padding: '1rem',
                    borderRadius: '8px',
                    height: '40vh',	
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center', // Adjusted to space-between
                    mt: '2rem',
                }}
            >
                <Typography variant="h5" color={theme.palette.secondary.main}>
                    SELECT A FILE:
                </Typography>
                <Select
                    value={selectedFolder}
                    onChange={(e) => setSelectedFolder(e.target.value)}
                    sx={{ mt: '1rem', width: '80%' }}
                    placeholder="Select a folder"
                >
                    <MenuItem value="" disabled>
                        Select a folder
                    </MenuItem>
                    <MenuItem value="Atlas">Atlas</MenuItem>
                    <MenuItem value="Home">Home</MenuItem>
                    <MenuItem value="JerryHome">Jerry Home</MenuItem>
                    <MenuItem value="Surprise">Surprise file</MenuItem>
                    {/* Add more MenuItem components for additional folders */}
                </Select>
                {selectedFolder === 'Atlas' && (
                    <Select
                        value={selectedFile}
                        onChange={(e) => setSelectedFile(e.target.value)}
                        sx={{ mt: '1rem', width: '80%' }}
                        placeholder="Select a file"
                    >
                        <MenuItem value="" disabled>
                            Select a file
                        </MenuItem>
                        <MenuItem value="Atlas_8_floor.ttl">Atlas Floor 8 (.ttl)</MenuItem>
                        <MenuItem value="atlasfloor.ifc">Atlas Floor 8 (.ifc)</MenuItem>
                        {/* Add more MenuItem components for additional files */}
                    </Select>
                )}
                {selectedFolder === 'Home' && (
                    <Select
                        value={selectedFile}
                        onChange={(e) => setSelectedFile(e.target.value)}
                        sx={{ mt: '1rem', width: '80%' }}
                        placeholder="Select a file"
                    >
                        <MenuItem value="" disabled>
                            Select a file
                        </MenuItem>
                        <MenuItem value="7m900_tue_hello_beam.ifc">Beam IFC</MenuItem>
                        <MenuItem value="7m900_tue_hello_wall_with_door.ifc">Wall with door (.ifc)</MenuItem>
                        <MenuItem value="7m900_tue_hello_wall_with_door.ttl">Wall with door (.ttl)</MenuItem>
                        {/* Add more MenuItem components for additional files */}
                    </Select>
                )}
                {selectedFolder === 'JerryHome' && (
                    <Select
                        value={selectedFile}
                        onChange={(e) => setSelectedFile(e.target.value)}
                        sx={{ mt: '1rem', width: '80%' }}
                        placeholder="Select a file"
                    >
                        <MenuItem value="" disabled>
                            Select a file
                        </MenuItem>
                        <MenuItem value="Gordelweg33a.ifc">Jerry's Home (.ifc)</MenuItem>
                        {/* Add more MenuItem components for additional files */}
                    </Select>
                )}
                {selectedFolder === 'Surprise' && (
                    <Select
                        value={selectedFile}
                        onChange={(e) => setSelectedFile(e.target.value)}
                        sx={{ mt: '1rem', width: '80%' }}
                        placeholder="Select a file"
                    >
                        <MenuItem value="" disabled>
                            Select a file
                        </MenuItem>
                        <MenuItem value="superhero.ttl">Surprise (.ttl)</MenuItem>
                        <MenuItem value="surprise.ifc">Surprise (.ifc)</MenuItem>
                        {/* Add more MenuItem components for additional files */}
                    </Select>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '80%' }}>
                    <Button onClick={handleSearch} variant="contained" color="primary" sx={{ mt: '1rem' }}>
                            Search
                        </Button>
                        <Button onClick={handleRefresh} variant="outlined" color="secondary" sx={{ mt: '1rem' }}>
                            Refresh
                        </Button>
                </Box>
            </Box>

                {/* Right box */}
                <Box
                    width="48%"
                    sx={{
                        backgroundColor: theme.palette.secondary.main,
                        padding: '1rem',
                        borderRadius: '8px',
                        height: '40vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mt: '2rem',
                    }}
                >
                    <Typography variant="h5" color={theme.palette.primary.main}>
                        The IFC Viewer to show the entire building must be displayed here.
                    </Typography>
                </Box>
            </Box>
            {/* Third box with scrollbar */}
            <Box
        maxWidth="100%"
        sx={{
            backgroundColor: theme.palette.primary.main,
            padding: '1rem',
            borderRadius: '8px',
            mt: '2rem',
            overflowY: 'auto',
            maxHeight: '30vh', // Adjust the max height as needed
            minHeight: '20vh',
        }}
    >
        <Typography variant="h6" color={theme.palette.secondary.main}>
            SPARQL Query Results:
        </Typography>
        <Typography variant="h7" color={theme.palette.primary.main[600]}>
            (Results are only shown for .ttl files)
        </Typography>
        <ComunicaComponent1 sources={sources} setQueryResults={setQueryResults} />
        {isLoading && <Typography variant="h6">Data is loading...</Typography>}
        {queryResults.length === 0 && !isLoading ? (
            <Typography variant="body1" color={theme.palette.error.main}>
                Query does not yield any results.
            </Typography>
        ) : (
            <ul>
                {queryResults.map((result, index) => (
                    <div key={index}>{result}</div>
                ))}
            </ul>
        )}
    </Box>

            {/* Fourth box with scrollbar */}
            <Box
                maxWidth="100%"
                sx={{
                    backgroundColor: theme.palette.primary.main,
                    padding: '1rem',
                    borderRadius: '8px',
                    mt: '2rem',
                    overflowY: 'auto',
                    maxHeight: '30vh', // Adjust the max height as needed
                    minHeight: '20vh',
                }}
            >
                <Typography variant="h6" color={theme.palette.secondary.main}>Data:</Typography>
                <Link onClick={handleDownload} style={{cursor: 'pointer' }} color={theme.palette.secondary.main}>
                    Download Data
                </Link>
                {isLoading && <Typography variant="h6">Data is loading...</Typography>} 
                {isLoading ? (
                    <CircularProgress size={24} style={{ marginLeft: '0.5rem' }} /> 
                ) : (
                    <ul>
                        {selectedData}
                    </ul>
                )}
            </Box>
        </Box>
    );
};

export default BuildingDataSpace;