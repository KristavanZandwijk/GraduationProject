import React, { useEffect } from 'react';
    import * as THREE from 'three';
    import * as BUI from '@thatopen/ui';
    import * as OBC from '@thatopen/components';
    import Stats from 'stats.js';

const IfcViewer = () => {
      useEffect(() => {
        const container = document.getElementById('container');
        const components = new OBC.Components();
        const worlds = components.get(OBC.Worlds);
        const world = worlds.create();
    
        world.scene = new OBC.SimpleScene(components);
        world.renderer = new OBC.SimpleRenderer(components, container);
        world.camera = new OBC.SimpleCamera(components);
    
        components.init();
    
        world.scene.three.background = null;
    
        const material = new THREE.MeshLambertMaterial({ color: '#C71900' });
        const geometry = new THREE.IcosahedronGeometry();
        const cube = new THREE.Mesh(geometry, material);
        world.scene.three.add(cube);
        world.scene.setup();
        world.camera.controls.setLookAt(3, 3, 3, 0, 0, 0);
    
        // Adding the grid
        const grids = components.get(OBC.Grids);
        const grid = grids.create(world);
        console.log(grid);
    
        // Measuring performance
        const stats = new Stats();
        stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
        container.appendChild(stats.dom);
        stats.dom.style.position = 'absolute';
        stats.dom.style.top = '0px';
        stats.dom.style.right = '0px';
        stats.dom.style.zIndex = '10000';
    
        const animate = () => {
          stats.begin();
          // monitored code begins
    
          // world.renderer.update is typically where the scene rendering occurs
          world.renderer.update();
    
          // monitored code ends
          stats.end();
    
          requestAnimationFrame(animate);
        };
    
        requestAnimationFrame(animate);
    
        return () => {
          // Clean up resources if necessary
          world.renderer.dispose();
          world.scene.dispose();
          world.camera.dispose();
          container.removeChild(stats.dom);
        };
      }, []);
    
      return <div id="container" style={{ width: '80%', height: '80%', position: 'relative' }} />;
    };
    
export default IfcViewer