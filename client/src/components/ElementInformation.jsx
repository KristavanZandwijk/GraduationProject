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
            <TableCell><Typography variant="h6">Owner ID</Typography></TableCell>
            <TableCell><Typography variant="h6">Element Name</Typography></TableCell>
            <TableCell><Typography variant="h6">Element Location</Typography></TableCell>
            <TableCell><Typography variant="h6">Is part of building</Typography></TableCell>
            <TableCell><Typography variant="h6">Created At</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {elements.map((element) => (
            <TableRow key={element.elementID}>
              <TableCell>{element.elementID}</TableCell>
              <TableCell onClick={() => handleRowClickElement(element.elementDataSpaceID)} style={{ cursor: 'pointer', color: theme.palette.secondary.main }}>
                {element.elementDataSpaceID}
              </TableCell>
              <TableCell>{element.hasOwner}</TableCell>
              <TableCell>{element.elementName}</TableCell>
              <TableCell>{element.elementLocation}</TableCell>
              <TableCell>
                {element.isPartOfBuilding.map(building => (
                  <Typography
                    key={building.buildingID}
                    onClick={() => navigate(`/buildingdataspace/${building.buildingID}`)}
                    style={{ cursor: 'pointer', color: theme.palette.secondary.main }}
                    variant="body2"
                  >
                    {building.buildingID}
                  </Typography>
                ))}
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
