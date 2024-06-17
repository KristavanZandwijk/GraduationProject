import React, { useState, useCallback } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import Header from 'components/Header';
import ComunicaComponent3 from 'components/Communica3';

const EmergencyPlans = () => {
    const [query, setQuery] = useState('PREFIX bot:  <https://w3id.org/bot#> \n SELECT ?elementLabel ?elementGuid\n WHERE {\n?element rdf:type bot:Element ;\n rdfs:label ?elementLabel ;\n bot:hasGuid ?elementGuid .\n}\n LIMIT 50\n');
    const [queryResults, setQueryResults] = useState([]);

    // Execute the query whenever the query state changes
    const handleQueryChange = useCallback((event) => {
        setQuery(event.target.value);
        setQueryResults([]); // Clear previous results
    }, []);

    return (
        <Box m="1.5rem 2.5rem" display="flex" flexDirection="column">
            {/* Header */}
            <Header
                title="Emergency Plans"
                subtitle="This page gives the best routing in case of emergencies."
            />

            {/* Query input */}
            <TextField
                label="Enter SPARQL Query"
                multiline
                rows={6}
                value={query}
                onChange={handleQueryChange} // Execute the query when the text field changes
                variant="outlined"
                margin="normal"
            />

            {/* Render ComunicaComponent2 and pass necessary props */}
            <ComunicaComponent3
                sources="http://localhost:1000/Atlas/Atlas_8_floor.ttl"
                setQueryResults={setQueryResults}
                query={query}
            />

            {/* Display query results */}
            <Typography variant="h5">Query Results:</Typography>
            <ul>
                {queryResults.map((result, index) => (
                    <li key={index}>{result}</li>
                ))}
            </ul>
        </Box>
    );
};

export default EmergencyPlans;
