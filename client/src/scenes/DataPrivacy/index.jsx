import React from 'react';
import { Box } from '@mui/material';
import Header from 'components/Header';
import { useState } from 'react';

const DataPrivacy = () => {
  const [ifcFile, setIfcFile] = useState(null);
    const [ttlFileName, setTtlFileName] = useState('');

    const handleIfcFileChange = (e) => {
        setIfcFile(e.target.files[0]);
    };

    const handleTtlFileNameChange = (e) => {
        setTtlFileName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('ifcFile', ifcFile);
        formData.append('ttlFileName', ttlFileName);

        const response = await fetch('http://localhost:5001/api/convert', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const result = await response.json();
            alert(`Conversion successful: ${result.ttlFilePath}`);
        } else {
            alert('Conversion failed in frontend');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>IFC File:</label>
                <input type="file" onChange={handleIfcFileChange} required />
            </div>
            <div>
                <label>TTL File Name:</label>
                <input type="text" value={ttlFileName} onChange={handleTtlFileNameChange} required />
            </div>
            <button type="submit">Convert</button>
        </form>
    );
};

export default DataPrivacy;
