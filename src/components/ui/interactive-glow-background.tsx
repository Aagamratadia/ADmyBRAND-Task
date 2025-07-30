'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface InteractiveGlowBackgroundProps {
  /**
   * The intensity of the glow effect (0-1)
   * @default 0.4
   */
  intensity?: number;
  /**
   * The size of the glow circle in pixels
   * @default 800
   */
  glowSize?: number;
  /**
   * Custom color for the glow (CSS color value)
   * @default '#9333ea' (purple-600)
   */
  glowColor?: string;
  /**
   * Spring configuration for smoother mouse following
   * @default { stiffness: 120, damping: 25, mass: 0.2 }
   */
  springConfig?: {
    stiffness?: number;
    damping?: number;
    mass?: number;
  };
  /**
   * Additional CSS classes for the container
   */
  className?: string;
  /**
   * Mouse position from parent component
   */
  mousePosition?: { x: number; y: number };
  /**
   * Hover state from parent component
   */
  isHovered?: boolean;
}

const InteractiveGlowBackground = ({
  intensity = 0.4,
  glowSize = 800,
  glowColor = '#9333ea',
  springConfig = {
    stiffness: 120,
    damping: 25,
    mass: 0.2,
  },
  className = '',
  mousePosition = { x: 0, y: 0 },
  isHovered = false,
}: InteractiveGlowBackgroundProps) => {
  // Motion values for smooth mouse following
  const mouseX = useMotionValue(mousePosition.x);
  const mouseY = useMotionValue(mousePosition.y);

  // Spring animations for buttery smooth following
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Update motion values when mouse position changes
  useEffect(() => {
    mouseX.set(mousePosition.x);
    mouseY.set(mousePosition.y);
  }, [mousePosition.x, mousePosition.y, mouseX, mouseY]);

  // Convert hex color to RGB for gradient
  const hexToRgb = (hex: string): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return '147, 51, 234'; // fallback to purple-600
    
    return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
  };

  const rgbColor = hexToRgb(glowColor);

  return (
    <motion.div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      style={{ zIndex: 1 }}
    >
      {/* Static subtle background glow - always visible */}
      <motion.div 
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2 }}
        style={{
          background: `radial-gradient(ellipse 60% 50% at center, rgba(${rgbColor}, ${intensity * 0.4}) 0%, rgba(${rgbColor}, ${intensity * 0.2}) 40%, transparent 70%)`,
        }}
      />
      
      {/* Interactive mouse-following glow */}
      <motion.div
        className="absolute"
        animate={{ 
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.85
        }}
        transition={{ 
          opacity: { duration: 0.45, ease: "easeOut" },
          scale: { duration: 0.6, ease: "easeOut" }
        }}
        style={{
          left: useTransform(springX, (x) => x - glowSize/2),
          top: useTransform(springY, (y) => y - glowSize/2),
          width: glowSize,
          height: glowSize,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(${rgbColor}, ${intensity}) 0%, rgba(${rgbColor}, ${intensity * 0.6}) 25%, rgba(${rgbColor}, ${intensity * 0.3}) 50%, transparent 70%)`,
          filter: 'blur(4px) saturate(1.2)',
          willChange: 'transform, opacity',
        }}
      />
      
      {/* Ambient glow layer for extra depth */}
      <motion.div
        className="absolute"
        animate={{ 
          opacity: isHovered ? 0.5 : 0,
          scale: isHovered ? 1.2 : 0.95
        }}
        transition={{ 
          opacity: { duration: 0.7, ease: "easeOut" },
          scale: { duration: 0.8, ease: "easeOut" }
        }}
        style={{
          left: useTransform(springX, (x) => x - glowSize * 0.75),
          top: useTransform(springY, (y) => y - glowSize * 0.75),
          width: glowSize * 1.5,
          height: glowSize * 1.5,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(${rgbColor}, ${intensity * 0.24}) 0%, rgba(${rgbColor}, ${intensity * 0.08}) 30%, transparent 60%)`,
          filter: 'blur(12px) saturate(1.2)',
          willChange: 'transform, opacity',
        }}
      />
    </motion.div>
  );
};

export { InteractiveGlowBackground };
export type { InteractiveGlowBackgroundProps };
