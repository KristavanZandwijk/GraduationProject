import React, { useState } from 'react';
import { Box, TextField, Button, Typography, List, ListItem, ListItemText, CircularProgress } from '@mui/material'; // Import necessary components from @mui/material
import Header from 'components/Header';
import ComunicaComponent2 from 'components/Comunica2';

const SearchFunction = () => {
    // State variables to store the SPARQL query parts
    const [prefix, setPrefix] = useState('PREFIX bot:  <https://w3id.org/bot#>');
    const [subject1, setSubject1] = useState('?subject');
    const [predicate1, setPredicate1] = useState('?predicate');
    const [object1, setObject1] = useState('?object');
    const [subject2, setSubject2] = useState('?subject');
    const [predicate2, setPredicate2] = useState('?predicate');
    const [object2, setObject2] = useState('?object');
    const [limit, setLimit] = useState('20'); // Default limit to 20
    const [queryResults, setQueryResults] = useState([]);
    const [sparqlQuery, setSparqlQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Add loading state
    const sources = 'http://localhost:1000/Atlas/Atlas_8_floor.ttl'; // Example source, change as needed

    const handleSubmit = (event) => {
        event.preventDefault();
        const query = `${prefix} SELECT ${subject1} ${predicate1} ${object1} WHERE { ${subject2} ${predicate2} ${object2} . } LIMIT ${limit}`;
        setSparqlQuery(query);
        console.log('Generated SPARQL Query:', query);
        setIsLoading(true); // Set loading state to true when the query is submitted
    };

    return (
        <Box m="1.5rem 2.5rem" display="flex" flexDirection="column">
            {/* Header */}
            <Box flex="1" ml={4}>
            <Header
              title="Search Page"
              subtitle="This page provides a search function to search for specific data within the data space or element space."
            />
          </Box>
            {/* Form for SPARQL query */}
            <Box mb={4}>
                <Typography variant="h6" gutterBottom>
                    Create your SPARQL Query
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Box display="flex" flexDirection="column" gap={2}>
                        <Typography variant="h6" gutterBottom>
                            PREFIXES
                        </Typography>
                        <TextField
                            label="Prefixes"
                            variant="outlined"
                            value={prefix}
                            onChange={(e) => setPrefix(e.target.value)}
                            required
                        />
                        <Typography variant="h6" gutterBottom>
                            SELECT
                        </Typography>
                        <Box display="flex" gap={2}>
                            <TextField
                                label="Subject"
                                variant="outlined"
                                value={subject1}
                                onChange={(e) => setSubject1(e.target.value)}
                                required
                                fullWidth
                            />
                            <TextField
                                label="Predicate"
                                variant="outlined"
                                value={predicate1}
                                onChange={(e) => setPredicate1(e.target.value)}
                                required
                                fullWidth
                            />
                            <TextField
                                label="Object"
                                variant="outlined"
                                value={object1}
                                onChange={(e) => setObject1(e.target.value)}
                                required
                                fullWidth
                            />
                        </Box>
                        <Typography variant="h6" gutterBottom>
                            WHERE {'{'}
                        </Typography>
                        <Box display="flex" gap={2}>
                            <TextField
                                label="Subject"
                                variant="outlined"
                                value={subject2}
                                onChange={(e) => setSubject2(e.target.value)}
                                required
                                fullWidth
                            />
                            <TextField
                                label="Predicate"
                                variant="outlined"
                                value={predicate2}
                                onChange={(e) => setPredicate2(e.target.value)}
                                required
                                fullWidth
                            />
                            <TextField
                                label="Object"
                                variant="outlined"
                                value={object2}
                                onChange={(e) => setObject2(e.target.value)}
                                required
                                fullWidth
                            />
                        </Box>
                        <Typography variant="body1" gutterBottom>
                        {'}'} LIMIT
                        </Typography>
                        <TextField
                            label="Limit"
                            variant="outlined"
                            value={limit}
                            onChange={(e) => setLimit(e.target.value)}
                            required
                        />
                        <Button type="submit" variant="contained" color="primary">
                            Generate SPARQL Query
                        </Button>
                    </Box>
                </form>
            </Box>

            {/* ComunicaComponent2 to execute the query */}
            {sparqlQuery && (
                <ComunicaComponent2
                    sources={sources}
                    setQueryResults={(results) => {
                        setQueryResults(results);
                        setIsLoading(false); // Set loading state to false when the query results are set
                    }}
                    sparqlQuery={sparqlQuery}
                />
            )}

            {/* Displaying the query results */}
            {isLoading ? (
                <Box display="flex" justifyContent="center" mt={4}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    {queryResults.length > 0 ? (
                        <Box mt={4}>
                            <Typography variant="h6" gutterBottom>
                                Query Results
                            </Typography>
                            <List>
                                {queryResults.map((result, index) => (
                                    <ListItem key={index}>
                                        <ListItemText primary={result} />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    ) : (
                        sparqlQuery && (
                            <Box mt={4}>
                                <Typography variant="h6" gutterBottom>
                                    No results found.
                                </Typography>
                            </Box>
                        )
                    )}
                </>
            )}
        </Box>
    );
};

export default SearchFunction
