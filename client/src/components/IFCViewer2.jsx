import React, { useEffect } from 'react';
import * as BUI from "@thatopen/ui";
import * as OBC from "@thatopen/components";
import * as OBF from "@thatopen/components-front";
import * as CUI from "@thatopen/ui-obc";
import Stats from "stats.js";

const IFCViewer2 = ({ selectedFilepaths }) => {
  useEffect(() => {
    let world;
    let stats;
    let propertiesTable;
    let updatePropertiesTable;

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

          // Process model relations
          const indexer = components.get(OBC.IfcRelationsIndexer);
          await indexer.process(model);
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
      BUI.Manager.init();

      const panelHTML = `
        <bim-panel active label="IFC Loader Tutorial" class="options-menu" style="position: absolute; top: 10px; right: 10px; z-index: 10001; background: white; border: 1px solid #ccc; padding: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
          <bim-panel-section collapsed label="Controls">
            <bim-panel-section style="padding-top: 12px;">
              <bim-button label="Load IFC" onclick="window.loadIfc();"></bim-button>
              <bim-button label="Export fragments" onclick="window.exportFragments();"></bim-button>
              <bim-button label="Dispose fragments" onclick="window.disposeFragments();"></bim-button>
            </bim-panel-section>
          </bim-panel-section>
          <bim-panel-section collapsed label="Element Data">
            <bim-button class="expand-table-button" label="Expand"></bim-button>
            <bim-button class="copy-tsv-button" label="Copy as TSV"></bim-button>
            <bim-text-input class="search-property-input" placeholder="Search Property" debounce="250"></bim-text-input>
            ${propertiesTable}
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

      // Displaying element properties on click
      [propertiesTable, updatePropertiesTable] = CUI.tables.elementProperties({
        components,
        fragmentIdMap: {},
      });

      propertiesTable.preserveStructureOnFilter = true;
      propertiesTable.indentationInText = false;

      const highlighter = components.get(OBF.Highlighter);
      highlighter.setup({ world });

      highlighter.events.select.onHighlight.add((fragmentIdMap) => {
        console.log("Highlight event triggered, fragmentIdMap:", fragmentIdMap);
        updatePropertiesTable({ fragmentIdMap });
      });
 
      highlighter.events.select.onClear.add(() => {
        console.log("Clear event triggered");
        updatePropertiesTable({ fragmentIdMap: {} });
      });

      // Setting up event handlers for properties panel buttons and input
      const expandTableButton = panelContainer.querySelector('.expand-table-button');
      expandTableButton.onclick = () => {
        propertiesTable.expanded = !propertiesTable.expanded;
        expandTableButton.label = propertiesTable.expanded ? "Collapse" : "Expand";
        console.log("Expand table button clicked, expanded:", propertiesTable.expanded);
      };

      const copyTsvButton = panelContainer.querySelector('.copy-tsv-button');
      copyTsvButton.onclick = async () => {
        await navigator.clipboard.writeText(propertiesTable.tsv);
        console.log("TSV copied to clipboard");
      };

      const searchPropertyInput = panelContainer.querySelector('.search-property-input');
      searchPropertyInput.oninput = (e) => {
        propertiesTable.queryString = e.target.value !== "" ? e.target.value : null;
        console.log("Search input changed, queryString:", propertiesTable.queryString);
      };

      // Append properties table to the container
      const propertiesTableContainer = panelContainer.querySelector('.properties-table-container');
      propertiesTableContainer.appendChild(propertiesTable.dom);
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

  return <div id="container" style={{ width: '80%', height: '80%', position: 'relative' }} />;
};

export default IFCViewer2;
