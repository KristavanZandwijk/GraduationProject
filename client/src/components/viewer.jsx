import React, { useEffect } from 'react';
import { Color } from 'three';
import { IfcViewerAPI } from 'web-ifc-viewer';

function Viewer() {
  useEffect(() => {
    const container = document.getElementById('viewer-container');
    const viewer = new IfcViewerAPI({ container, backgroundColor: new Color(0xffffff) });

    async function loadIfc(url) {
      await viewer.IFC.setWasmPath('./src/components/Ifcviewer');
      const model = await viewer.IFC.loadIfcUrl(url);
      viewer.shadowDropper.renderShadow(model.modelID);
    }

    loadIfc('http://localhost:1000/Home/7m900_tue_hello_beam.ifc');

    // Clean up function
    return () => {
      // Perform any cleanup here if necessary
    };
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div id="viewer-container" style={{ width: '100%', height: '500px' }}>
      {/* Viewer content will be rendered here */}
    </div>
  );
}

export default Viewer;
