import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Button, Typography } from '@mui/material';
import { useTheme } from "@mui/material";

const DataSpaceTable = ({ files, selectedFilepaths, handleFileClick, handleCheckboxChange }) => {
  const theme = useTheme();

  if (files.length === 0) {
    return <Typography mt="2rem">Unfortunately, there are no files related to this dataspace yet.</Typography>;
  }

  const handleDownload = (filePath) => {
    const downloadUrl = `http://127.0.0.1:1002/server/${filePath}`;
    window.open(downloadUrl, '_blank');
  };

  return (
    <TableContainer component={Paper} sx={{ marginTop: "2rem" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Visualize IFC</TableCell>
            <TableCell>File ID</TableCell>
            <TableCell>File Name</TableCell>
            <TableCell>File Description</TableCell>
            <TableCell>File is Owned by</TableCell>
            <TableCell>Related To Project</TableCell>
            <TableCell>Related To Team</TableCell>
            <TableCell>Status of Sharing</TableCell>
            <TableCell>Uploaded At</TableCell>
            <TableCell>View in new tab</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {files.map((file) => (
            <TableRow key={file._id}>
              <TableCell>
                {file.filePath.endsWith('.ifc') && (
                  <Checkbox
                    checked={selectedFilepaths.includes(file.filePath)}
                    onChange={(event) => handleCheckboxChange(event, file.filePath)}
                  />
                )}
              </TableCell>
              <TableCell onClick={() => handleFileClick(file.fileID)} style={{ cursor: 'pointer', color: theme.palette.secondary.main }}>
                {file.fileID}
              </TableCell>
              <TableCell>{file.fileName}</TableCell>
              <TableCell>{file.fileDescription}</TableCell>
              <TableCell>{file.fileOwner}</TableCell>
              <TableCell>{file.relatedToProject}</TableCell>
              <TableCell>{file.relatedToTeam}</TableCell>
              <TableCell>{file.status}</TableCell>
              <TableCell>{new Date(file.createdAt).toLocaleString()}</TableCell>
              <TableCell>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => handleDownload(file.filePath)}
                >
                  VIEW
                </Button>
              </TableCell> {/* New cell for the download button */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataSpaceTable;
