import React, { useRef, useState } from 'react';
import './Tilt3D.css';

export default function Tilt3D({
  children,
  className = '',
  maxTilt = 12,
  perspective = 1000,
  scale = 1.02,
  glare = true,
  onClick
}) {
  const cardRef = useRef(null);
  const [style, setStyle] = useState({});
  const [glareStyle, setGlareStyle] = useState({});
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;

    // Invert X for natural tilt
    const rotateY = xPct * maxTilt * 2;
    const rotateX = -yPct * maxTilt * 2;

    cardRef.current.style.setProperty('--mouse-x', `${((xPct + 0.5) * 100).toFixed(1)}%`);
    cardRef.current.style.setProperty('--mouse-y', `${((yPct + 0.5) * 100).toFixed(1)}%`);

    setStyle({
      transform: `perspective(${perspective}px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`,
      transition: 'transform 0.1s ease-out'
    });

    if (glare) {
      setGlareStyle({
        opacity: 0.7,
        background: `radial-gradient(circle at ${(xPct + 0.5) * 100}% ${(yPct + 0.5) * 100}%, rgba(255, 255, 255, 0.22) 0%, rgba(0, 180, 216, 0.08) 40%, transparent 80%)`
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setStyle({
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
    });
    if (glare) {
      setGlareStyle({
        opacity: 0,
        transition: 'opacity 0.5s ease-out'
      });
    }
  };

  return (
    <div
      ref={cardRef}
      className={`tilt-3d-root ${className} ${isHovered ? 'tilt-active' : ''}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div className="tilt-3d-inner">
        {children}
        {glare && <div className="tilt-3d-glare" style={glareStyle} aria-hidden="true" />}
      </div>
    </div>
  );
}
