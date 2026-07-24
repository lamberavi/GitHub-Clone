// Dynamic CSS Spotlight Position Computations
export function getSpotlightStyle(x, y, opacity = 1, size = 300, color = "rgba(88, 166, 255, 0.08)") {
  return {
    width: `${size}px`,
    height: `${size}px`,
    background: `radial-gradient(circle, ${color} 0%, transparent 75%)`,
    left: `${x - size / 2}px`,
    top: `${y - size / 2}px`,
    opacity: opacity
  };
}
