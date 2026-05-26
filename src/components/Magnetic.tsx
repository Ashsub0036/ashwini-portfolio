import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface MagneticProps {
  children: React.ReactElement;
  strength?: number; // Higher values mean more absolute pull tracking
}

/**
 * A luxury performance-optimized magnetic tracking wrapper.
 * Smoothens tracking movement using a calibrated physical mass and spring behavior.
 */
export function Magnetic({ children, strength = 0.28 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Core motion values for raw tracking offsets
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Calibrated physical spring physics for premium luxury lag and snap-back
  const springConfig = { damping: 22, stiffness: 180, mass: 0.55 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    
    // Get absolute center coordinate of the boundary box of our component
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    // Apply the tracking strength pull formula
    x.set(distanceX * strength);
    y.set(distanceY * strength);
  };

  const handleMouseLeave = () => {
    // Elegant gravity snap back to native resting state
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block relative"
    >
      {children}
    </motion.div>
  );
}
