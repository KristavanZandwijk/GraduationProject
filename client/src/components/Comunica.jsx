import React, { useState, useEffect } from 'react';
import { QueryEngine } from '@comunica/query-sparql';

const ComunicaComponent1 = ({ sources, setQueryResults }) => { // Updated props to include 'sources'
    useEffect(() =>  {
        const myEngine = new QueryEngine();

        const executeQuery = async () => {
            try {
                const bindingsStream = await myEngine.queryBindings(`
                PREFIX bot:  <https://w3id.org/bot#>

                SELECT ?elementLabel ?elementGuid
                WHERE {
                  ?element rdf:type bot:Element ;
                           rdfs:label ?elementLabel ;
                           bot:hasGuid ?elementGuid .
                }
                
                LIMIT 50
                `, {
                    sources: [sources], // Updated sources to use the prop value
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
    }, [sources, setQueryResults]); // Added 'sources' to the dependencies array

    return null;
};

export default ComunicaComponent1;
