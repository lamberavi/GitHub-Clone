// Viewport Scroll Reveal Variants
export const scrollRevealParent = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.85,
      ease: [0.215, 0.61, 0.355, 1] // easeOutCubic
    }
  }
};
