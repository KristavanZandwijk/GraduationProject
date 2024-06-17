import React, { useState, useEffect } from 'react';
import { QueryEngine } from '@comunica/query-sparql';

const ComunicaComponent2 = ({ sources, setQueryResults, sparqlQuery }) => {
    useEffect(() => {
        const myEngine = new QueryEngine();

        const executeQuery = async () => {
            try {
                const bindingsStream = await myEngine.queryBindings(sparqlQuery, {
                    sources: [sources],
                });

                const results = [];
                bindingsStream.on('data', (binding) => {
                    results.push(binding.toString());
                });

                bindingsStream.on('end', () => {
                    console.log('Query completed successfully.');
                    setQueryResults(results);
                });

                bindingsStream.on('error', (error) => {
                    console.error('Error executing query:', error);
                });
            } catch (error) {
                console.error('Error executing query:', error);
            }
        };

        executeQuery();
    }, [sources, setQueryResults, sparqlQuery]); // Include 'query' in the dependencies array

    return null;
};

export default ComunicaComponent2;
