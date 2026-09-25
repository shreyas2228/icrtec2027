import React, { useRef, useEffect } from 'react';
import './Hero3DCanvas.css';

export default function Hero3DCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.offsetWidth || 500);
    let height = (canvas.height = canvas.parentElement.offsetHeight || 500);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth || 500;
      height = canvas.height = canvas.parentElement.offsetHeight || 500;
    };

    window.addEventListener('resize', handleResize);

    // 3D Sphere Points
    const numPoints = 85;
    const radius = Math.min(width, height) * 0.38;
    const points = [];

    for (let i = 0; i < numPoints; i++) {
      const phi = Math.acos(-1 + (2 * i) / numPoints);
      const theta = Math.sqrt(numPoints * Math.PI) * phi;
      points.push({
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi),
        baseX: radius * Math.cos(theta) * Math.sin(phi),
        baseY: radius * Math.sin(theta) * Math.sin(phi),
        baseZ: radius * Math.cos(phi),
        pulse: Math.random() * Math.PI * 2
      });
    }

    // Outer Orbit Ring Points
    const ringPoints = [];
    const ringRadius = radius * 1.35;
    const numRingPoints = 32;
    for (let i = 0; i < numRingPoints; i++) {
      const angle = (i / numRingPoints) * Math.PI * 2;
      ringPoints.push({
        x: ringRadius * Math.cos(angle),
        y: (Math.random() - 0.5) * 20,
        z: ringRadius * Math.sin(angle)
      });
    }

    let rotX = 0.3;
    let rotY = 0;
    let targetRotX = 0.3;
    let targetRotY = 0;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left - width / 2;
      const mouseY = e.clientY - rect.top - height / 2;
      targetRotY = (mouseX / (width / 2)) * 0.8;
      targetRotX = -(mouseY / (height / 2)) * 0.8;
    };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener('mousemove', handleMouseMove);
    }

    const fov = 420;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse rotation easing
      rotX += (targetRotX - rotX) * 0.05;
      rotY += (targetRotY - rotY) * 0.05;

      // Constant gentle auto rotation
      const currentRotY = rotY + Date.now() * 0.0006;
      const currentRotX = rotX + Math.sin(Date.now() * 0.0008) * 0.15;

      const cosX = Math.cos(currentRotX);
      const sinX = Math.sin(currentRotX);
      const cosY = Math.cos(currentRotY);
      const sinY = Math.sin(currentRotY);

      // Project 3D to 2D
      const projectedPoints = points.map((p) => {
        // Rotate around Y
        let x1 = p.x * cosY + p.z * sinY;
        let z1 = -p.x * sinY + p.z * cosY;

        // Rotate around X
        let y2 = p.y * cosX - z1 * sinX;
        let z2 = p.y * sinX + z1 * cosX;

        // Perspective scale
        const scale = fov / (fov + z2 + radius * 1.5);
        const x2d = x1 * scale + width / 2;
        const y2d = y2 * scale + height / 2;

        return {
          x2d,
          y2d,
          scale,
          z: z2,
          pulse: p.pulse
        };
      });

      // Project Ring Points with tilt
      const ringTilt = 0.65;
      const cosTilt = Math.cos(ringTilt);
      const sinTilt = Math.sin(ringTilt);

      const projectedRing = ringPoints.map((p) => {
        // Apply ring tilt
        let rx = p.x;
        let ry = p.y * cosTilt - p.z * sinTilt;
        let rz = p.y * sinTilt + p.z * cosTilt;

        // Rotate with world
        let x1 = rx * cosY + rz * sinY;
        let z1 = -rx * sinY + rz * cosY;
        let y2 = ry * cosX - z1 * sinX;
        let z2 = ry * sinX + z1 * cosX;

        const scale = fov / (fov + z2 + radius * 1.5);
        return {
          x2d: x1 * scale + width / 2,
          y2d: y2 * scale + height / 2,
          z: z2,
          scale
        };
      });

      // Draw Orbit Ring Lines
      ctx.beginPath();
      for (let i = 0; i < projectedRing.length; i++) {
        const pt = projectedRing[i];
        const nextPt = projectedRing[(i + 1) % projectedRing.length];
        const alpha = Math.max(0.1, (pt.z + radius) / (radius * 2)) * 0.4;
        ctx.strokeStyle = `rgba(0, 180, 216, ${alpha})`;
        ctx.lineWidth = pt.scale * 1.2;
        ctx.moveTo(pt.x2d, pt.y2d);
        ctx.lineTo(nextPt.x2d, nextPt.y2d);
      }
      ctx.stroke();

      // Connect near points with glowing 3D constellation lines
      const maxDistance = 75;
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const p1 = points[i];
          const p2 = points[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dz = p1.z - p2.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < maxDistance) {
            const proj1 = projectedPoints[i];
            const proj2 = projectedPoints[j];
            const avgZ = (proj1.z + proj2.z) / 2;
            const depthFactor = (avgZ + radius) / (radius * 2);
            const lineAlpha = (1 - dist / maxDistance) * Math.max(0.08, depthFactor) * 0.45;

            ctx.beginPath();
            ctx.moveTo(proj1.x2d, proj1.y2d);
            ctx.lineTo(proj2.x2d, proj2.y2d);
            ctx.strokeStyle = `rgba(0, 180, 216, ${lineAlpha})`;
            ctx.lineWidth = Math.max(0.5, proj1.scale * 1.2);
            ctx.stroke();
          }
        }
      }

      // Draw 3D nodes (depth sorted or layered)
      projectedPoints.forEach((pt) => {
        const depthFactor = Math.max(0.15, (pt.z + radius) / (radius * 2));
        const pointSize = Math.max(1.8, pt.scale * 4.2 * depthFactor);
        const glowSize = pointSize * 2.8;

        // Front glowing nodes get radial gradient
        if (depthFactor > 0.6) {
          const grad = ctx.createRadialGradient(
            pt.x2d, pt.y2d, 0,
            pt.x2d, pt.y2d, glowSize
          );
          grad.addColorStop(0, `rgba(0, 180, 216, ${depthFactor * 0.9})`);
          grad.addColorStop(0.5, `rgba(0, 98, 155, ${depthFactor * 0.5})`);
          grad.addColorStop(1, 'rgba(0, 180, 216, 0)');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(pt.x2d, pt.y2d, glowSize, 0, Math.PI * 2);
          ctx.fill();
        }

        // Core dot
        ctx.fillStyle = depthFactor > 0.5 ? '#ffffff' : `rgba(0, 180, 216, ${depthFactor})`;
        ctx.beginPath();
        ctx.arc(pt.x2d, pt.y2d, pointSize, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <div className="hero-3d-canvas-wrapper">
      <canvas ref={canvasRef} className="hero-3d-canvas" />
    </div>
  );
}
