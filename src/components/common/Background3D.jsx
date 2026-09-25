import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import './Background3D.css';

// ==========================================================================
// HIGH-FIDELITY 2D CANVAS 3D ENGINE FALLBACK
// Guaranteed to render on 100% of devices even if WebGL is disabled or restricted
// ==========================================================================
function runCanvas2DFallback(container) {
  const canvas = document.createElement('canvas');
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.display = 'block';
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  let animationId;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let width = (canvas.width = window.innerWidth * dpr);
  let height = (canvas.height = window.innerHeight * dpr);

  const handleResize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.width = window.innerWidth * dpr;
    height = canvas.height = window.innerHeight * dpr;
  };
  window.addEventListener('resize', handleResize);

  let mouseX = 0, mouseY = 0, targetMouseX = 0, targetMouseY = 0;
  const handleMouseMove = (e) => {
    targetMouseX = (e.clientX - window.innerWidth / 2) * 0.4;
    targetMouseY = (e.clientY - window.innerHeight / 2) * 0.4;
  };
  window.addEventListener('mousemove', handleMouseMove, { passive: true });

  let scrollY = window.scrollY;
  const handleScroll = () => { scrollY = window.scrollY; };
  window.addEventListener('scroll', handleScroll, { passive: true });

  // 1. Grid geometry definition (undulating cyber wave)
  const cols = 36;
  const rows = 36;
  const gridSpacing = 42;
  const halfGridW = (cols * gridSpacing) / 2;
  const halfGridD = (rows * gridSpacing) / 2;

  // 2. Icosahedron (12 vertices, 30 edges)
  const phi = (1 + Math.sqrt(5)) / 2;
  const icoRawVerts = [
    [-1,  phi, 0], [ 1,  phi, 0], [-1, -phi, 0], [ 1, -phi, 0],
    [ 0, -1,  phi], [ 0,  1,  phi], [ 0, -1, -phi], [ 0,  1, -phi],
    [ phi, 0, -1], [ phi, 0,  1], [-phi, 0, -1], [-phi, 0,  1]
  ];
  const icoRadius = 75;
  const icoVerts = icoRawVerts.map(v => {
    const len = Math.hypot(v[0], v[1], v[2]);
    return [(v[0] / len) * icoRadius, (v[1] / len) * icoRadius, (v[2] / len) * icoRadius];
  });
  const icoEdges = [];
  for (let i = 0; i < icoVerts.length; i++) {
    for (let j = i + 1; j < icoVerts.length; j++) {
      const d = Math.hypot(icoVerts[i][0] - icoVerts[j][0], icoVerts[i][1] - icoVerts[j][1], icoVerts[i][2] - icoVerts[j][2]);
      if (d < icoRadius * 1.25) icoEdges.push([i, j]);
    }
  }

  // 3. Torus knot parametric curve
  const knotSegments = 80;
  const knotPoints = [];
  const p = 2, q = 3;
  const knotScale = 30;
  for (let i = 0; i < knotSegments; i++) {
    const u = (i / knotSegments) * Math.PI * 2;
    const r = (2 + Math.cos(q * u)) * knotScale;
    knotPoints.push([
      r * Math.cos(p * u),
      Math.sin(q * u) * knotScale * 1.8,
      r * Math.sin(p * u)
    ]);
  }

  // 4. Octahedron (6 vertices, 12 edges)
  const octRadius = 55;
  const octVerts = [
    [octRadius, 0, 0], [-octRadius, 0, 0],
    [0, octRadius, 0], [0, -octRadius, 0],
    [0, 0, octRadius], [0, 0, -octRadius]
  ];
  const octEdges = [
    [0,2], [0,3], [0,4], [0,5],
    [1,2], [1,3], [1,4], [1,5],
    [2,4], [4,3], [3,5], [5,2]
  ];

  // 5. Dodecahedron (20 vertices, 30 edges)
  const dodRadius = 60;
  const dodRawVerts = [];
  const invPhi = 1 / phi;
  for (let sx of [-1, 1]) {
    for (let sy of [-1, 1]) {
      for (let sz of [-1, 1]) {
        dodRawVerts.push([sx, sy, sz]);
      }
    }
  }
  for (let sy of [-1, 1]) for (let sz of [-1, 1]) dodRawVerts.push([0, sy * invPhi, sz * phi]);
  for (let sx of [-1, 1]) for (let sy of [-1, 1]) dodRawVerts.push([sx * invPhi, sy * phi, 0]);
  for (let sx of [-1, 1]) for (let sz of [-1, 1]) dodRawVerts.push([sx * phi, 0, sz * invPhi]);
  const dodVerts = dodRawVerts.map(v => {
    const len = Math.hypot(v[0], v[1], v[2]);
    return [(v[0] / len) * dodRadius, (v[1] / len) * dodRadius, (v[2] / len) * dodRadius];
  });
  const dodEdges = [];
  for (let i = 0; i < dodVerts.length; i++) {
    for (let j = i + 1; j < dodVerts.length; j++) {
      const d = Math.hypot(dodVerts[i][0] - dodVerts[j][0], dodVerts[i][1] - dodVerts[j][1], dodVerts[i][2] - dodVerts[j][2]);
      if (d < dodRadius * 0.85) dodEdges.push([i, j]);
    }
  }

  // 6. Deep Space Particles
  const particleCount = 260;
  const particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: (Math.random() - 0.5) * 1800,
      y: (Math.random() - 0.5) * 1400,
      z: -Math.random() * 1200 + 50,
      color: Math.random() > 0.6 ? '#00b4d8' : Math.random() > 0.3 ? '#0080ca' : '#ffffff',
      size: (Math.random() * 2.2 + 1.2) * dpr
    });
  }

  // 3D projection
  const fov = 650;
  const project = (x, y, z, camX, camY, camZ) => {
    const relX = x - camX;
    const relY = y - camY;
    const relZ = camZ - z;
    if (relZ <= 10) return null;
    const scale = (fov / relZ) * dpr;
    return {
      x: width / 2 + relX * scale,
      y: height / 2 - relY * scale,
      scale
    };
  };

  const rotateY = (x, z, angle) => [
    x * Math.cos(angle) + z * Math.sin(angle),
    -x * Math.sin(angle) + z * Math.cos(angle)
  ];
  const rotateX = (y, z, angle) => [
    y * Math.cos(angle) - z * Math.sin(angle),
    y * Math.sin(angle) + z * Math.cos(angle)
  ];
  const rotateZ = (x, y, angle) => [
    x * Math.cos(angle) - y * Math.sin(angle),
    x * Math.sin(angle) + y * Math.cos(angle)
  ];

  const startTime = performance.now();

  const animate = () => {
    animationId = requestAnimationFrame(animate);
    const elapsed = (performance.now() - startTime) * 0.001;

    ctx.clearRect(0, 0, width, height);

    mouseX += (targetMouseX - mouseX) * 0.04;
    mouseY += (targetMouseY - mouseY) * 0.04;

    const scrollOffset = scrollY * 0.15;
    const camX = mouseX * 0.45;
    const camY = 120 - mouseY * 0.45 - (scrollOffset % 300);
    const camZ = 480;

    // 1. Draw Starfield
    for (let i = 0; i < particleCount; i++) {
      const p = particles[i];
      const pY = p.y + Math.sin(elapsed * 0.2 + i) * 6;
      const proj = project(p.x, pY, p.z, camX, camY, camZ);
      if (proj && proj.x >= 0 && proj.x <= width && proj.y >= 0 && proj.y <= height) {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.min(0.9, Math.max(0.18, proj.scale * 0.6));
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, p.size * (proj.scale / dpr), 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // 2. Draw Undulating Cyber Wave Grid
    ctx.strokeStyle = 'rgba(0, 180, 216, 0.26)';
    ctx.lineWidth = 1 * dpr;
    ctx.globalAlpha = 1;

    const gridProj = [];
    for (let r = 0; r < rows; r++) {
      gridProj[r] = [];
      const z = -halfGridD + r * gridSpacing - 200;
      for (let c = 0; c < cols; c++) {
        const x = -halfGridW + c * gridSpacing;
        const dist = Math.sqrt(x * x + z * z);
        const y = -180 + Math.sin(dist * 0.012 - elapsed * 1.6) * 22 + Math.cos(x * 0.015 + elapsed * 1.1) * 14;
        gridProj[r][c] = project(x, y, z, camX, camY, camZ);
      }
    }

    ctx.beginPath();
    for (let r = 0; r < rows; r++) {
      let started = false;
      for (let c = 0; c < cols; c++) {
        const pt = gridProj[r][c];
        if (pt) {
          if (!started) { ctx.moveTo(pt.x, pt.y); started = true; }
          else { ctx.lineTo(pt.x, pt.y); }
        } else { started = false; }
      }
    }
    for (let c = 0; c < cols; c++) {
      let started = false;
      for (let r = 0; r < rows; r++) {
        const pt = gridProj[r][c];
        if (pt) {
          if (!started) { ctx.moveTo(pt.x, pt.y); started = true; }
          else { ctx.lineTo(pt.x, pt.y); }
        } else { started = false; }
      }
    }
    ctx.stroke();

    // Helper for polyhedra
    const drawPoly = (verts, edges, posX, posY, posZ, rx, ry, rz, strokeColor) => {
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 1.2 * dpr;
      const projVerts = verts.map(([vx, vy, vz]) => {
        let [x1, z1] = rotateY(vx, vz, ry);
        let [y2, z2] = rotateX(vy, z1, rx);
        let [x3, y3] = rotateZ(x1, y2, rz || 0);
        return project(posX + x3, posY + y3, posZ + z2, camX, camY, camZ);
      });

      ctx.beginPath();
      for (const [i, j] of edges) {
        const p1 = projVerts[i];
        const p2 = projVerts[j];
        if (p1 && p2) {
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
        }
      }
      ctx.stroke();
    };

    // 3. Icosahedron (Top Right)
    drawPoly(
      icoVerts, icoEdges,
      380, 160 + Math.sin(elapsed * 0.8) * 18, -180,
      elapsed * 0.25, elapsed * 0.35, 0,
      'rgba(0, 180, 216, 0.48)'
    );

    // 4. Torus Knot (Mid Left)
    const knotProj = knotPoints.map(([kx, ky, kz]) => {
      let [x1, z1] = rotateY(kx, kz, elapsed * 0.2);
      let [y2, z2] = rotateX(ky, z1, elapsed * 0.3);
      return project(-390 + x1, 80 + Math.cos(elapsed * 0.7) * 15 + y2, -220 + z2, camX, camY, camZ);
    });
    ctx.strokeStyle = 'rgba(0, 128, 202, 0.44)';
    ctx.lineWidth = 1.2 * dpr;
    ctx.beginPath();
    let kStarted = false;
    for (const pt of knotProj) {
      if (pt) {
        if (!kStarted) { ctx.moveTo(pt.x, pt.y); kStarted = true; }
        else { ctx.lineTo(pt.x, pt.y); }
      }
    }
    if (knotProj[0]) ctx.lineTo(knotProj[0].x, knotProj[0].y);
    ctx.stroke();

    // 5. Octahedron (Center Far Depth)
    drawPoly(
      octVerts, octEdges,
      120, -60 + Math.sin(elapsed * 1.1) * 12, -350,
      elapsed * 0.2, elapsed * 0.4, 0,
      'rgba(245, 158, 11, 0.42)'
    );

    // 6. Dodecahedron (Bottom Right)
    drawPoly(
      dodVerts, dodEdges,
      320, -140 + Math.cos(elapsed * 0.9) * 14, -150,
      elapsed * 0.2, elapsed * 0.3, 0,
      'rgba(0, 180, 216, 0.42)'
    );
  };

  animate();

  return () => {
    cancelAnimationFrame(animationId);
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('scroll', handleScroll);
    if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
  };
}

export default function Background3D() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    // Deep executive tech fog for depth attenuation
    scene.fog = new THREE.FogExp2(0x040816, 0.00085);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      2500
    );
    camera.position.set(0, 120, 480);

    // 2. WebGL Renderer with Resilient Fallback Settings
    let renderer = null;
    const canvasMount = document.createElement('canvas');
    canvasMount.style.width = '100%';
    canvasMount.style.height = '100%';
    canvasMount.style.display = 'block';

    const tryRendererOptions = [
      { canvas: canvasMount, antialias: true, alpha: true, powerPreference: 'default', failIfMajorPerformanceCaveat: false },
      { canvas: canvasMount, antialias: false, alpha: true, powerPreference: 'default', failIfMajorPerformanceCaveat: false },
      { antialias: false, alpha: true, failIfMajorPerformanceCaveat: false }
    ];

    for (const opts of tryRendererOptions) {
      try {
        renderer = new THREE.WebGLRenderer(opts);
        if (renderer) break;
      } catch (e) {
        // Continue to fallback option
      }
    }

    if (!renderer) {
      console.warn('Three.js WebGLRenderer could not be initialized; activating high-fidelity 2D Canvas fallback.');
      return runCanvas2DFallback(container);
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x040816, 1);
    if (!renderer.domElement.parentNode) {
      container.appendChild(renderer.domElement);
    }

    // 3. Dynamic Undulating 3D Cyber Wave Mesh (Topological Grid)
    const gridWidth = 1400;
    const gridDepth = 1400;
    const gridSegX = 64;
    const gridSegY = 64;
    const planeGeo = new THREE.PlaneGeometry(gridWidth, gridDepth, gridSegX, gridSegY);
    planeGeo.rotateX(-Math.PI / 2);

    // Store base positions for dynamic vertex wave calculations
    const posAttribute = planeGeo.attributes.position;
    const basePositions = posAttribute.array.slice();

    const planeMat = new THREE.MeshBasicMaterial({
      color: 0x00b4d8,
      wireframe: true,
      transparent: true,
      opacity: 0.24
    });
    const waveMesh = new THREE.Mesh(planeGeo, planeMat);
    waveMesh.position.set(0, -180, -200);
    scene.add(waveMesh);

    // 4. Floating 3D Wireframe Polyhedra
    const shapesGroup = new THREE.Group();
    scene.add(shapesGroup);

    // Material with subtle glow for floating geometry
    const cyanWireMat = new THREE.MeshBasicMaterial({
      color: 0x00b4d8,
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });

    const blueWireMat = new THREE.MeshBasicMaterial({
      color: 0x0080ca,
      wireframe: true,
      transparent: true,
      opacity: 0.42
    });

    const goldWireMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      wireframe: true,
      transparent: true,
      opacity: 0.38
    });

    // Shape 1: 3D Icosahedron (Top Right)
    const icosahedronGeo = new THREE.IcosahedronGeometry(75, 1);
    const icosahedron = new THREE.Mesh(icosahedronGeo, cyanWireMat);
    icosahedron.position.set(380, 160, -180);
    shapesGroup.add(icosahedron);

    // Shape 2: 3D Torus Knot (Mid Left)
    const knotGeo = new THREE.TorusKnotGeometry(48, 14, 80, 16);
    const torusKnot = new THREE.Mesh(knotGeo, blueWireMat);
    torusKnot.position.set(-390, 80, -220);
    shapesGroup.add(torusKnot);

    // Shape 3: 3D Octahedron (Far Center Depth)
    const octaGeo = new THREE.OctahedronGeometry(55, 0);
    const octahedron = new THREE.Mesh(octaGeo, goldWireMat);
    octahedron.position.set(120, -60, -350);
    shapesGroup.add(octahedron);

    // Shape 4: 3D Dodecahedron (Bottom Right)
    const dodecaGeo = new THREE.DodecahedronGeometry(60, 0);
    const dodecahedron = new THREE.Mesh(dodecaGeo, cyanWireMat);
    dodecahedron.position.set(320, -140, -150);
    shapesGroup.add(dodecahedron);

    // 5. Deep Space 3D Particle Constellation with Circular Sprite
    const particleCount = 650;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(0x00b4d8); // Electric Cyan
    const c2 = new THREE.Color(0x00629b); // IEEE Blue
    const c3 = new THREE.Color(0xffffff); // Star White

    // Generate circular glow sprite texture to prevent square point artifacts
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 32;
    pCanvas.height = 32;
    const pCtx = pCanvas.getContext('2d');
    const pGrad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
    pGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    pGrad.addColorStop(0.35, 'rgba(255, 255, 255, 0.8)');
    pGrad.addColorStop(0.7, 'rgba(255, 255, 255, 0.25)');
    pGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    pCtx.fillStyle = pGrad;
    pCtx.fillRect(0, 0, 32, 32);
    const particleTexture = new THREE.CanvasTexture(pCanvas);

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      particlePositions[idx] = (Math.random() - 0.5) * 2000;
      particlePositions[idx + 1] = (Math.random() - 0.5) * 1600;
      // Clamp Z so particles stay in background (-1400 to 100) and never clip directly in front of camera at Z=480
      particlePositions[idx + 2] = -Math.random() * 1400 + 100;

      const pickColor = Math.random() > 0.6 ? c1 : Math.random() > 0.3 ? c2 : c3;
      particleColors[idx] = pickColor.r;
      particleColors[idx + 1] = pickColor.g;
      particleColors[idx + 2] = pickColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 4.5,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
      sizeAttenuation: true
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 6. Interactive Mouse & Scroll Parallax Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX - window.innerWidth / 2) * 0.4;
      targetMouseY = (e.clientY - window.innerHeight / 2) * 0.4;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Scroll parallax tracking
    let scrollY = window.scrollY;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // 7. Responsive Viewport Resize Handler
    const handleResize = () => {
      if (!renderer || !camera) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // 8. High-Performance Render Animation Loop
    let animationFrameId;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Smooth mouse damping
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      // Dynamic Camera Position with Scroll & Mouse Parallax
      const scrollOffset = scrollY * 0.15;
      camera.position.x = mouseX * 0.45;
      camera.position.y = 120 - mouseY * 0.45 - (scrollOffset % 300);
      camera.lookAt(0, -scrollOffset * 0.2, 0);

      // Rotate Floating 3D Polyhedra
      icosahedron.rotation.x = elapsedTime * 0.25;
      icosahedron.rotation.y = elapsedTime * 0.35;
      icosahedron.position.y = 160 + Math.sin(elapsedTime * 0.8) * 18;

      torusKnot.rotation.x = elapsedTime * 0.3;
      torusKnot.rotation.z = elapsedTime * 0.2;
      torusKnot.position.y = 80 + Math.cos(elapsedTime * 0.7) * 15;

      octahedron.rotation.y = elapsedTime * 0.4;
      octahedron.rotation.z = elapsedTime * 0.2;
      octahedron.position.y = -60 + Math.sin(elapsedTime * 1.1) * 12;

      dodecahedron.rotation.x = elapsedTime * 0.2;
      dodecahedron.rotation.y = elapsedTime * 0.3;
      dodecahedron.position.y = -140 + Math.cos(elapsedTime * 0.9) * 14;

      // Rotate Background Starfield slowly
      particles.rotation.y = elapsedTime * 0.03;
      particles.rotation.x = Math.sin(elapsedTime * 0.02) * 0.05;

      // Animate 3D Undulating Cyber Wave Grid
      const positions = planeGeo.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        const baseX = basePositions[i];
        const baseZ = basePositions[i + 2];
        // Mathematical wave interference with time
        const distance = Math.sqrt(baseX * baseX + baseZ * baseZ);
        positions[i + 1] =
          Math.sin(distance * 0.012 - elapsedTime * 1.6) * 22 +
          Math.cos(baseX * 0.015 + elapsedTime * 1.1) * 14;
      }
      planeGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // 9. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      if (renderer) {
        if (renderer.domElement && renderer.domElement.parentNode) {
          renderer.domElement.parentNode.removeChild(renderer.domElement);
        }
        if (typeof renderer.forceContextLoss === 'function') {
          renderer.forceContextLoss();
        }
        renderer.dispose();
      }
      if (particleTexture) particleTexture.dispose();
      if (planeGeo) planeGeo.dispose();
      if (planeMat) planeMat.dispose();
      if (particleGeo) particleGeo.dispose();
      if (particleMat) particleMat.dispose();
      if (icosahedronGeo) icosahedronGeo.dispose();
      if (knotGeo) knotGeo.dispose();
      if (octaGeo) octaGeo.dispose();
      if (dodecaGeo) dodecaGeo.dispose();
      if (cyanWireMat) cyanWireMat.dispose();
      if (blueWireMat) blueWireMat.dispose();
      if (goldWireMat) goldWireMat.dispose();
    };
  }, []);

  return (
    <div className="background-3d-root">
      {/* Three.js WebGL Canvas Mount Container */}
      <div ref={containerRef} className="background-3d-canvas-container" />

      {/* Radiant Deep-Space Ambient Atmospheric Glow Orbs */}
      <div className="bg-glow-orb bg-orb-top-left" />
      <div className="bg-glow-orb bg-orb-mid-right" />
      <div className="bg-glow-orb bg-orb-bottom-center" />

      {/* Cyber Grid Perspective Vignette */}
      <div className="bg-cyber-grid" />
    </div>
  );
}
