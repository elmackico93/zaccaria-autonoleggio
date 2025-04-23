'use client';

import { useEffect, useRef } from 'react';

export default function MenuParticleEffect({ isActive = false }) {
  const containerRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    
    // Clean up any existing particles
    particlesRef.current.forEach(particle => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    });
    
    particlesRef.current = [];
    
    // Create new particles
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random size between 3px and 7px
      const size = Math.random() * 4 + 3;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random starting position
      const x = Math.random() * containerRect.width;
      const y = Math.random() * containerRect.height;
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      
      // Random translation
      const tx = (Math.random() - 0.5) * 200;
      const ty = (Math.random() - 0.5) * 200;
      particle.style.setProperty('--tx', `${tx}px`);
      particle.style.setProperty('--ty', `${ty}px`);
      
      // Random animation duration
      const duration = Math.random() * 3 + 2;
      particle.style.animation = `particle-float ${duration}s infinite`;
      
      // Random delay
      const delay = Math.random() * 5;
      particle.style.animationDelay = `${delay}s`;
      
      // Random opacity
      const opacity = Math.random() * 0.2 + 0.1;
      particle.style.opacity = opacity;
      
      // Add to container
      container.appendChild(particle);
      particlesRef.current.push(particle);
    }
    
    // Cleanup function
    return () => {
      particlesRef.current.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive]);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
