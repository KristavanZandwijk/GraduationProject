import React, { useEffect } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Header from 'components/Header';
import { setElements } from '../../state';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ElementTable from 'components/ElementInformation';
import RoleBasedButton from 'components/RoleBasedButton';

const ElementDataSpace = () => {
  const dispatch = useDispatch();
  const elements = useSelector((state) => state.elements || []);
  const { personID } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);


    const fetchElements = async () => {
      try {
        const response = await axios.get('http://localhost:5001/elements', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = Array.isArray(response.data) ? response.data : [];
        dispatch(setElements(data));
      } catch (error) {
        console.error('Failed to fetch elements:', error);
      }
    };
  
    useEffect(() => {
    fetchElements();
  }, [dispatch, token]);
  
  return (
    <Box m="1.5rem 2.5rem">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Element Data Spaces" subtitle="This space shows all the element data spaces that are accessible to you. Click on the element data space ID to access the element data space." />
      </Box>

      <Box display="flex" justifyContent="flex-end" mb={2}>
        <RoleBasedButton
          roles={['admin', 'team leader', 'project leader', 'element owner']}
          buttonText="Create New Element"
          navigateTo="/elementdataspace/newelement"
        />
      </Box>
      <Box mt={3}>
        {Array.isArray(elements) && elements.length === 0 ? (
          <Typography variant="h6">There are unfortunately no elements to show (yet).</Typography>
        ) : (
          <ElementTable elements={elements} fetchElements={fetchElements} /> 
        )}
      </Box>
    </Box>
  );
};


export default ElementDataSpace;
