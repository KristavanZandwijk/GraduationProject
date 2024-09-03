import React, { useEffect, useRef, useState } from 'react';
import * as WEBIFC from 'web-ifc';
import * as BUI from '@thatopen/ui';
import * as OBC from '@thatopen/components';
import * as OBF from '@thatopen/components-front';
import * as CUI from '@thatopen/ui-obc';

const IFCViewer3 = () => {
  const viewportRef = useRef(null);
  const [attributesTable, setAttributesTable] = useState(null);

  useEffect(() => {
    let world;

    const init = async () => {
      const container = document.getElementById('container');
      if (!container) {
        console.error('Container not found');
        return;
      }

      BUI.Manager.init();

      //Load a model
      const components = new OBC.Components();
      const worlds = components.get(OBC.Worlds);
      world = worlds.create();

      const sceneComponent = new OBC.SimpleScene(components);
      sceneComponent.setup();
      world.scene = sceneComponent;

      const rendererComponent = new OBC.SimpleRenderer(components, viewportRef.current);
      world.renderer = rendererComponent;

      const cameraComponent = new OBC.SimpleCamera(components);
      world.camera = cameraComponent;

      components.init();

      cameraComponent.controls.setLookAt(10, 5.5, 5, -4, -1, -6.5);
      world.scene.setup();

      viewportRef.current.addEventListener('resize', () => {
        rendererComponent.resize();
        cameraComponent.updateAspect();
      });

      const grids = components.get(OBC.Grids);
      grids.create(world);

      world.scene.three.background = null;

      //calculate the relations index of the model

      const ifcLoader = components.get(OBC.IfcLoader);
      await ifcLoader.setup();
      const file = await fetch('https://thatopen.github.io/engine_ui-components/resources/small.ifc');
      const buffer = await file.arrayBuffer();
      const typedArray = new Uint8Array(buffer);
      const model = await ifcLoader.load(typedArray);
      world.scene.three.add(model);

      //Preconfiguring the table
      const indexer = components.get(OBC.IfcRelationsIndexer);
      await indexer.process(model);

      const baseStyle = { padding: '0.25rem', borderRadius: '0.25rem' };

      //create the table using the predefine functional component
      const tableDefinition = {
        Entity: (entity) => {
          let style = {};
          if (entity === OBC.IfcCategoryMap[WEBIFC.IFCPROPERTYSET]) {
            style = { ...baseStyle, backgroundColor: 'purple', color: 'white' };
          }
          if (String(entity).includes('IFCWALL')) {
            style = { ...baseStyle, backgroundColor: 'green', color: 'white' };
          }
          return <bim-label style={style}>{entity}</bim-label>;
        },
        PredefinedType: (type) => {
          const colors = ['#1c8d83', '#3c1c8d', '#386c19', '#837c24'];
          const randomIndex = Math.floor(Math.random() * colors.length);
          const backgroundColor = colors[randomIndex];
          const style = { ...baseStyle, backgroundColor, color: 'white' };
          return <bim-label style={style}>{type}</bim-label>;
        },
        NominalValue: (value) => {
          let style = {};
          if (typeof value === 'boolean' && value === false) {
            style = { ...baseStyle, backgroundColor: '#b13535', color: 'white' };
          }
          if (typeof value === 'boolean' && value === true) {
            style = { ...baseStyle, backgroundColor: '#18882c', color: 'white' };
          }
          return <bim-label style={style}>{value}</bim-label>;
        },
      };

      //Updating table when user makes new selection
      const attributesTable = CUI.tables.entityAttributes({
        components,
        fragmentIdMap: {},
        tableDefinition,
        attributesToInclude: () => {
          const attributes = [
            'Name',
            'ContainedInStructure',
            'HasProperties',
            'HasPropertySets',
            (name) => name.includes('Value'),
            (name) => name.startsWith('Material'),
            (name) => name.startsWith('Relating'),
            (name) => {
              const ignore = ['IsGroupedBy', 'IsDecomposedBy'];
              return name.startsWith('Is') && !ignore.includes(name);
            },
          ];
          return attributes;
        },
      });

      attributesTable.expanded = true;
      attributesTable.indentationInText = true;
      attributesTable.preserveStructureOnFilter = true;

      setAttributesTable(attributesTable);

      // Creating a panel to append the table
      const highlighter = components.get(OBF.Highlighter);
      highlighter.setup({ world });

      highlighter.events.select.onHighlight.add((fragmentIdMap) => {
        setAttributesTable({ fragmentIdMap });
      });

      highlighter.events.select.onClear.add(() =>
        setAttributesTable({ fragmentIdMap: {} }),
      );

      //Create BIM rid elements

      const onSearchInput = (e) => {
        const input = e.target;
        attributesTable.queryString = input.value;
      };

      const onPreserveStructureChange = (e) => {
        const checkbox = e.target
        attributesTable.preserveStructureOnFilter = checkbox.checked;
      };

      const onExportJSON = () => {
        attributesTable.downloadData('entities-attributes');
      };

      const onCopyTSV = async () => {
        await navigator.clipboard.writeText(attributesTable.tsv);
        alert('Table data copied as TSV in clipboard! Try to paste it in a spreadsheet app.');
      };

      const onAttributesChange = (e) => {
        const dropdownValue = e.target.value;
        setAttributesTable((prevTable) => ({
          ...prevTable,
          attributesToInclude: () => {
            const attributes = [
              ...dropdownValue,
              (name) => name.includes('Value'),
              (name) => name.startsWith('Material'),
              (name) => name.startsWith('Relating'),
              (name) => {
                const ignore = ['IsGroupedBy', 'IsDecomposedBy'];
                return name.startsWith('Is') && !ignore.includes(name);
              },
            ];
            return attributes;
          },
        }));
      };

      const BIMPanelContainer = document.createElement('div');
      BIMPanelContainer.innerHTML = `
        <bim-panel>
          <bim-panel-section label="Entity Attributes" fixed>
            <div style="display: flex; gap: 0.5rem; justify-content: space-between;">
              <div style="display: flex; gap: 0.5rem;">
                <bim-text-input onInput=${onSearchInput} type="search" placeholder="Search" debounce="250"></bim-text-input>
                <bim-checkbox onChange=${onPreserveStructureChange} label="Preserve Structure" inverted checked></bim-checkbox>
              </div>
              <div style="display: flex; gap: 0.5rem;">
                <bim-dropdown onChange=${onAttributesChange} multiple>
                  <bim-option label="Name" checked></bim-option>
                  <bim-option label="ContainedInStructure" checked></bim-option>
                  <bim-option label="ForLayerSet"></bim-option>
                  <bim-option label="LayerThickness"></bim-option>
                  <bim-option label="HasProperties" checked></bim-option>
                  <bim-option label="HasAssociations"></bim-option>
                  <bim-option label="HasAssignments"></bim-option>
                  <bim-option label="HasPropertySets" checked></bim-option>
                  <bim-option label="PredefinedType"></bim-option>
                  <bim-option label="Quantities"></bim-option>
                  <bim-option label="ReferencedSource"></bim-option>
                  <bim-option label="Identification"></bim-option>
                  <bim-option label="Prefix"></bim-option>
                  <bim-option label="LongName"></bim-option>
                </bim-dropdown>
                <bim-button onClick=${onCopyTSV} icon="solar:copy-bold" tooltip-title="Copy TSV" tooltip-text="Copy the table contents as tab separated text values, so you can copy them into a spreadsheet."></bim-button>
                <bim-button onClick=${onExportJSON} icon="ph:export-fill" tooltip-title="Export JSON" tooltip-text="Download the table contents as a JSON file."></bim-button>
              </div>
            </div>
            ${attributesTable}
          </bim-panel-section>
        </bim-panel>
      `;
      container.appendChild(BIMPanelContainer);
    };

    init();

    return () => {
      if (world?.renderer) world.renderer.dispose();
      if (world?.scene) world.scene.dispose();
      if (world?.camera) world.camera.dispose();

      const BIMPanelContainer = document.querySelector('.phone-menu-toggler');
      if (BIMPanelContainer) BIMPanelContainer.remove();
    };
  }, []);

  return (
    <div id="container" style={{ width: '100%', height: '80vh', position: 'relative' }}>
      <div ref={viewportRef} style={{ width: '100%', height: '80%' }}></div>
    </div>
  );
};

export default IFCViewer3;