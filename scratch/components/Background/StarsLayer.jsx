import React, { useRef, useEffect } from 'react';

export default function StarsLayer() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let stars = [];

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      const count = Math.min(Math.floor(canvas.width / 15), 65);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.1 + 0.3,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          alpha: Math.random() * 0.4 + 0.05,
          direction: Math.random() > 0.5 ? 1 : -1
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach((s) => {
        // Twinkling light logic
        s.alpha += s.twinkleSpeed * s.direction;
        if (s.alpha >= 0.55) {
          s.alpha = 0.55;
          s.direction = -1;
        } else if (s.alpha <= 0.04) {
          s.alpha = 0.04;
          s.direction = 1;
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-5 mix-blend-screen" />;
}
export { StarsLayer };
