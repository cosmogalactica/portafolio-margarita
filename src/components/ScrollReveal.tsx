import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // Retardo en ms
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: 'sm' | 'md' | 'lg' | 'none';
  duration?: number; // Duración en ms
  threshold?: number;
  once?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 'md',
  duration = 700,
  threshold = 0.12,
  once = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Si el navegador no soporta IntersectionObserver, mostrar directamente
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once && domRef.current) {
              observer.unobserve(domRef.current);
            }
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const currentElem = domRef.current;
    if (currentElem) {
      observer.observe(currentElem);
    }

    return () => {
      if (currentElem) {
        observer.unobserve(currentElem);
      }
    };
  }, [threshold, once]);

  // Cálculo de distancias según Tailwind
  const getTransformClasses = () => {
    if (!isVisible) {
      if (direction === 'none' || distance === 'none') {
        return 'opacity-0';
      }

      switch (direction) {
        case 'up':
          return distance === 'sm'
            ? 'opacity-0 translate-y-4'
            : distance === 'lg'
            ? 'opacity-0 translate-y-12'
            : 'opacity-0 translate-y-8';
        case 'down':
          return distance === 'sm'
            ? 'opacity-0 -translate-y-4'
            : distance === 'lg'
            ? 'opacity-0 -translate-y-12'
            : 'opacity-0 -translate-y-8';
        case 'left':
          return 'opacity-0 translate-x-8';
        case 'right':
          return 'opacity-0 -translate-x-8';
        default:
          return 'opacity-0 translate-y-8';
      }
    }

    return 'opacity-100 translate-y-0 translate-x-0';
  };

  return (
    <div
      ref={domRef}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
      className={`transition-all ease-out motion-safe:transform will-change-[opacity,transform] ${getTransformClasses()} ${className}`}
    >
      {children}
    </div>
  );
};
