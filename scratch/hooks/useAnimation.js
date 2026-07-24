import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import gsap from 'gsap';

export function useAnimateOnScroll({ 
  type = 'slide-up', 
  delay = 0, 
  duration = 0.6, 
  threshold = 0.1, 
  triggerOnce = true 
} = {}) {
  const { ref, inView, entry } = useInView({
    threshold,
    triggerOnce,
  });

  useEffect(() => {
    if (inView && entry?.target) {
      const element = entry.target;
      
      const config = {
        opacity: 1,
        delay,
        duration,
        ease: 'power3.out',
      };

      if (type === 'slide-up') {
        gsap.fromTo(element, { y: 30, opacity: 0 }, { y: 0, ...config });
      } else if (type === 'fade-in') {
        gsap.fromTo(element, { opacity: 0 }, { ...config });
      } else if (type === 'scale-up') {
        gsap.fromTo(element, { scale: 0.95, opacity: 0 }, { scale: 1, ...config });
      } else if (type === 'slide-right') {
        gsap.fromTo(element, { x: -30, opacity: 0 }, { x: 0, ...config });
      } else if (type === 'slide-left') {
        gsap.fromTo(element, { x: 30, opacity: 0 }, { x: 0, ...config });
      }
    }
  }, [inView, entry, type, delay, duration]);

  return ref;
}
