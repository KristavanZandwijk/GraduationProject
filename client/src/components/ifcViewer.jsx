/*
import React, { useEffect, useRef } from 'react';
import { IfcAPI } from 'web-ifc/web-ifc-api.js';

const IfcViewer = () => {
  const canvasRef = useRef();

  useEffect(() => {
    const loadIfcModel = async () => {
      // Initialize the API
      const ifcApi = new IfcAPI();
      await ifcApi.Init();
      
      // Fetch the IFC data from your backend or local file
      const response = await fetch('http://localhost:1000/Atlas/atlasfloor.ifc');
      const ifcData = new Uint8Array(await response.arrayBuffer());

      // Open the model
      const modelID = ifcApi.OpenModel(ifcData);
      
      // Now you can use the modelID to interact with the IFC model
      console.log(`Model ID: ${modelID}`);
      
      // Perform operations like fetching geometry or properties

      // Don't forget to close the model when done
      ifcApi.CloseModel(modelID);
    };

    loadIfcModel();
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};

export default IfcViewer;
*/
