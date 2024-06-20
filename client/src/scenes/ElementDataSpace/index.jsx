// client/src/scenes/ElementDataSpace/index.js
import React, { useEffect } from 'react';
import { Box, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Header from 'components/Header';
import { setElements } from '../../state';
import axios from 'axios';

const ElementDataSpace = () => {
  const dispatch = useDispatch();
  const elements = useSelector((state) => state.elements);
  const { personID } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    const fetchElements = async () => {
      try {
        const response = await axios.get('http://localhost:5001/elements', {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setElements({ elements: response.data }));
      } catch (error) {
        console.error("Failed to fetch elements", error);
      }
    };

    fetchElements();
  }, [dispatch, token]);

  const filteredElements = elements.filter(element => element.hasOwner === personID);

  return (
    <Box m="1.5rem 2.5rem">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Element Data Space" subtitle="This space shows all the elements that are owned by you." />
      </Box>
      <Box mt={3}>
        {!elements.length ? (
          <CircularProgress />
        ) : !filteredElements.length ? (
          <Typography variant="h6">You unfortunately do not own any elements (yet).</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><Typography variant="h6">Element ID</Typography></TableCell>
                  <TableCell><Typography variant="h6">Element Data Space ID</Typography></TableCell>
                  <TableCell><Typography variant="h6">Owner ID</Typography></TableCell>
                  <TableCell><Typography variant="h6">Element Name</Typography></TableCell>
                  <TableCell><Typography variant="h6">Element Location</Typography></TableCell>
                  <TableCell><Typography variant="h6">Created At</Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredElements.map((element) => (
                  <TableRow key={element.elementID}>
                    <TableCell>{element.elementID}</TableCell>
                    <TableCell>{element.elementDataSpaceID}</TableCell>
                    <TableCell>{element.hasOwner}</TableCell>
                    <TableCell>{element.elementName}</TableCell>
                    <TableCell>{element.elementLocation}</TableCell>
                    <TableCell>{new Date(element.createdAt).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
};

export default ElementDataSpace;
