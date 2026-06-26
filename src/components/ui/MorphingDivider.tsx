import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function MorphingDivider() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Curve intensity based on scroll. Peaking at the center of the scroll range.
  const curveY = useTransform(scrollYProgress, [0, 0.5, 1], [0, 100, 0]);
  
  return (
    <div ref={containerRef} className="relative w-full h-[100px] overflow-visible pointer-events-none -mt-10 mb-10 z-10">
      <motion.svg 
        className="absolute top-0 left-0 w-full h-[200px]"
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
      >
        <motion.path 
          fill="none" 
          stroke="rgba(255, 255, 255, 0.15)" 
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          d={useTransform(curveY, y => `M 0 50 Q 50 ${50 + y} 100 50`)}
        />
        
        {/* Inner glow line for liquid glass feel */}
        <motion.path 
          fill="none" 
          stroke="rgba(255, 255, 255, 0.05)" 
          strokeWidth="4"
          vectorEffect="non-scaling-stroke"
          style={{ filter: 'blur(2px)' }}
          d={useTransform(curveY, y => `M 0 50 Q 50 ${50 + y} 100 50`)}
        />
      </motion.svg>
    </div>
  );
}
