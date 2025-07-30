'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export const DebugGlowBackground = () => {
  const [mousePos, setMousePos] = useState({ x: 400, y: 300 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsHovered(true);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      {/* Static glow - always visible for debugging */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(circle 600px at center, rgba(147, 51, 234, 0.3) 0%, rgba(147, 51, 234, 0.1) 40%, transparent 70%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />
      
      {/* Interactive layer */}
      <div
        ref={containerRef}
        className="absolute inset-0"
        style={{ zIndex: 2 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
      >
        {/* Mouse following glow */}
        <div
          className="absolute transition-opacity duration-300"
          style={{
            left: mousePos.x - 300,
            top: mousePos.y - 300,
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.4) 0%, rgba(147, 51, 234, 0.2) 30%, transparent 70%)',
            opacity: isHovered ? 1 : 0,
            pointerEvents: 'none',
          }}
        />
        
        {/* Debug dot to show mouse position */}
        {isHovered && (
          <div
            className="absolute w-2 h-2 bg-red-500 rounded-full z-50"
            style={{
              left: mousePos.x - 4,
              top: mousePos.y - 4,
              pointerEvents: 'none',
            }}
          />
        )}
      </div>
    </>
  );
};
