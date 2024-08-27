import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';

const ElementTable = ({ elements }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleRowClickElement = (elementDataSpaceID) => {
    navigate(`/elementdataspace/${elementDataSpaceID}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><Typography variant="h6">Element ID</Typography></TableCell>
            <TableCell><Typography variant="h6">Element Data Space ID</Typography></TableCell>
            <TableCell><Typography variant="h6">Element Name</Typography></TableCell>
            <TableCell><Typography variant="h6">Element Location</Typography></TableCell>
            <TableCell><Typography variant="h6">Element Owner(s)</Typography></TableCell>
            <TableCell><Typography variant="h6">Part of Building</Typography></TableCell>
            <TableCell><Typography variant="h6">Created At</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(elements) && elements.map((element) => (
            <TableRow key={element.elementID}>
              <TableCell>{element.elementID}</TableCell>
              <TableCell
                onClick={() => handleRowClickElement(element.elementDataSpaceID)}
                style={{ cursor: 'pointer', color: theme.palette.secondary.main }}
              >
                {element.elementDataSpaceID}
              </TableCell>
              <TableCell>{element.elementName}</TableCell>
              <TableCell>{element.elementLocation}</TableCell>
              <TableCell>
                {element.elementOwner && element.elementOwner.length > 0 ? (
                  element.elementOwner.map((owner, index) => (
                    <Typography key={index} variant="body2">
                      {owner.personID} {/* Extract and display the personID */}
                    </Typography>
                  ))
                ) : (
                  <Typography variant="body2">No Owners</Typography>
                )}
              </TableCell>
              <TableCell>
                {element.isPartOfBuilding && element.isPartOfBuilding.length > 0 ? (
                  element.isPartOfBuilding.map((isPartOfBuilding, index) => (
                    <Typography key={index} variant="body2">
                      {isPartOfBuilding.buildingID}
                    </Typography>
                  ))
                ) : (
                  <Typography variant="body2">No related building</Typography>
                )}
              </TableCell>
              <TableCell>{new Date(element.createdAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ElementTable;
