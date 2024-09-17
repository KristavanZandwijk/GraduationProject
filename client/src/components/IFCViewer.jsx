import React, { useEffect } from 'react';
import * as WEBIFC from "web-ifc";
import * as BUI from "@thatopen/ui";
import Stats from "stats.js";
import * as OBC from "@thatopen/components";
import { Manager } from '@thatopen/ui';

const IFCViewer = ({ selectedFilepaths }) => {
  useEffect(() => {
    let world;
    let stats;

    const init = async () => {
      const container = document.getElementById('container');
      if (!container) {
        console.error('Container not found');
        return;
      }

      // Setting up the world
      const components = new OBC.Components();
      const worlds = components.get(OBC.Worlds);
      world = worlds.create();

      world.scene = new OBC.SimpleScene(components);
      world.renderer = new OBC.SimpleRenderer(components, container);
      world.camera = new OBC.SimpleCamera(components);

      components.init();

      // Scene settings (position camera & lights)
      world.camera.controls.setLookAt(12, 6, 8, 0, 0, -10);
      world.scene.setup();

      // Importing grid
      const grids = components.get(OBC.Grids);
      grids.create(world);

      // Background setting
      world.scene.three.background = null;

      // Getting IFC and Fragments
      const fragments = components.get(OBC.FragmentsManager);
      const fragmentIfcLoader = components.get(OBC.IfcLoader);

      // Calibrating the converter
      await fragmentIfcLoader.setup();

      // Configuration to origin
      fragmentIfcLoader.settings.webIfc.COORDINATE_TO_ORIGIN = true;

      // Loading the IFC files
      const loadIfc = async (filepaths) => {
        for (const filepath of filepaths) {
          const file = await fetch(filepath);
          const data = await file.arrayBuffer();
          const buffer = new Uint8Array(data);
          const model = await fragmentIfcLoader.load(buffer);
          model.name = filepath.split('/').pop();
          world.scene.three.add(model);
        }
      };

      // Load IFC files if filepaths are provided
      if (selectedFilepaths && selectedFilepaths.length > 0) {
        loadIfc(selectedFilepaths.map(filepath => `http://localhost:1002/server/${filepath}`));
      }

      // Saving IFC file
      function download(file) {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(file);
        link.download = file.name;
        document.body.appendChild(link);
        link.click();
        link.remove();
      }

      const exportFragments = () => {
        if (!fragments.groups.size) {
          return;
        }
        const group = Array.from(fragments.groups.values())[0];
        const data = fragments.export(group);
        download(new File([new Blob([data])], 'small.frag'));

        const properties = group.getLocalProperties();
        if (properties) {
          download(new File([JSON.stringify(properties)], 'small.json'));
        }
      };

      const indexer = components.get(OBC.IfcRelationsIndexer);

      // Cleaning the memory
      const disposeFragments = () => {
        fragments.dispose();
      };

      // Measuring performance
      stats = new Stats();
      stats.showPanel(0);
      container.appendChild(stats.dom);
      stats.dom.style.position = 'absolute';
      stats.dom.style.top = '0px';
      stats.dom.style.left = '0px';
      stats.dom.style.zIndex = '10000';
      world.renderer.onBeforeUpdate.add(() => stats.begin());
      world.renderer.onAfterUpdate.add(() => stats.end());

      const animate = () => {
        stats.begin();
        world.renderer.update();
        stats.end();
        requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);

      // Adding the User-interface
      Manager.init();

      const panelHTML = `
        <bim-panel active label="IFC Loader Tutorial" class="options-menu" style="position: absolute; top: 10px; right: 10px; z-index: 10001; background: white; border: 1px solid #ccc; padding: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
          <bim-panel-section collapsed label="Controls">
            <bim-panel-section style="padding-top: 12px;">
              <bim-button label="Load IFC" onclick="window.loadIfc();"></bim-button>
              <bim-button label="Export fragments" onclick="window.exportFragments();"></bim-button>
              <bim-button label="Dispose fragments" onclick="window.disposeFragments();"></bim-button>
            </bim-panel-section>
          </bim-panel-section>
        </bim-panel> 
      `;

      const buttonHTML = `
        <bim-button class="phone-menu-toggler" icon="solar:settings-bold" style="position: absolute; top: 10px; right: 10px; z-index: 10002;" onclick="
          const panel = document.querySelector('.options-menu');
          if (panel.classList.contains('options-menu-visible')) {
            panel.classList.remove('options-menu-visible');
          } else {
            panel.classList.add('options-menu-visible');
          }
        "></bim-button>
      `;

      const panelContainer = document.createElement('div');
      panelContainer.innerHTML = panelHTML;
      container.appendChild(panelContainer);

      const buttonContainer = document.createElement('div');
      buttonContainer.innerHTML = buttonHTML;
      container.appendChild(buttonContainer);

      // Exposing functions to window object
      window.loadIfc = () => loadIfc(selectedFilepaths.map(filepath => `http://localhost:1002/server/${filepath}`));
      window.exportFragments = exportFragments;
      window.disposeFragments = disposeFragments;
    };

    init().catch(console.error);

    return () => {
      if (world?.renderer) world.renderer.dispose();
      if (world?.scene) world.scene.dispose();
      if (world?.camera) world.camera.dispose();
      if (stats?.dom) stats.dom.remove();

      const panelContainer = document.querySelector('.options-menu');
      if (panelContainer) panelContainer.remove();
      const buttonContainer = document.querySelector('.phone-menu-toggler');
      if (buttonContainer) buttonContainer.remove();
    };
  }, [selectedFilepaths]);

  return <div id="container" style={{ width: '80%', height: '100vh', position: 'relative' }} />;
};

export default IFCViewer;
