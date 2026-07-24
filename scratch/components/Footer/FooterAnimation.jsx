import React from 'react';
import { motion } from 'framer-motion';

export default function FooterAnimation({ children }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1], // easeInOut cubic
            staggerChildren: 0.1
          }
        }
      }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}
export { FooterAnimation };
