import React from 'react';
import { motion } from 'framer-motion';

export default function FloatingObject({ children, speed = 6, delay = 0, className = "" }) {
  return (
    <motion.div
      animate={{
        y: [0, -18, 0],
        rotate: [0, 4, -4, 0]
      }}
      transition={{
        duration: speed,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
export { FloatingObject };
