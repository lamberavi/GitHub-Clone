import React from 'react';
import { motion } from 'framer-motion';

export default function SectionReveal({ children, delay = 0, duration = 0.75 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: duration, 
        delay: delay, 
        ease: [0.16, 1, 0.3, 1] 
      }}
    >
      {children}
    </motion.div>
  );
}
export { SectionReveal };
