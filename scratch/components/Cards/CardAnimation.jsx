import React from 'react';
import { motion } from 'framer-motion';

export default function CardAnimation({ children }) {
  return (
    <motion.div
      animate={{
        y: [0, -3, 0, 3, 0],
        x: [0, 2, 0, -2, 0]
      }}
      transition={{
        duration: 8,
        ease: "easeInOut",
        repeat: Infinity
      }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}
export { CardAnimation };
