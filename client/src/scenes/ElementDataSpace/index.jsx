import React, { useEffect } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Header from 'components/Header';
import { setElements } from '../../state';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ElementTable from 'components/ElementInformation';

const ElementDataSpace = () => {
  const dispatch = useDispatch();
  const elements = useSelector((state) => state.elements || []);
  const { personID } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);

  useEffect(() => {
    const fetchElements = async () => {
      try {
        const response = await axios.get('http://localhost:5001/elements', {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setElements(Array.isArray(response.data) ? response.data : []));
      } catch (error) {
        console.error('Failed to fetch elements:', error);
      }
    };

    fetchElements();
  }, [dispatch, token]);

  const filteredElements = Array.isArray(elements) 
    ? elements.filter(element => element.hasOwner === personID) 
    : [];

  const handleNewElementClick = () => {
    navigate('/newelement');
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Element Data Spaces" subtitle="This space shows all the element data spaces that are accessible to you. Click on the element data space ID to access the element data space." />
        <Button variant="contained" color="primary" onClick={handleNewElementClick}>
          Create New Element
        </Button>
      </Box>
      <Box mt={3}>
        {elements.length === 0 ? (
          <CircularProgress />
        ) : filteredElements.length === 0 ? (
          <Typography variant="h6">You unfortunately do not own any elements (yet).</Typography>
        ) : (
          <ElementTable elements={filteredElements} />
        )}
      </Box>
    </Box>
  );
};

export default ElementDataSpace;
