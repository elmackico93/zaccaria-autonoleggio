'use client';

import { useEffect, useRef } from 'react';

export default function MenuItemTilt({ 
  children, 
  className = '', 
  maxTilt = 10, 
  scale = 1.02, 
  speed = 400,
  glareOpacity = 0.2
}) {
  const elementRef = useRef(null);
  const glareRef = useRef(null);
  
  useEffect(() => {
    const element = elementRef.current;
    const glare = glareRef.current;
    
    if (!element) return;
    
    let updateCall = null;
    let transitionTimeout = null;
    
    const getValues = (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      return {
        tiltX: ((y - centerY) / centerY) * maxTilt * -1,
        tiltY: ((x - centerX) / centerX) * maxTilt,
        glareX: x / rect.width * 100,
        glareY: y / rect.height * 100
      };
    };
    
    const updateTransform = (e) => {
      const values = getValues(e);
      
      element.style.transform = `
        perspective(1000px) 
        rotateX(${values.tiltX}deg) 
        rotateY(${values.tiltY}deg) 
        scale3d(${scale}, ${scale}, ${scale})
      `;
      
      if (glare) {
        glare.style.background = `radial-gradient(
          circle at ${values.glareX}% ${values.glareY}%, 
          rgba(255, 255, 255, ${glareOpacity}), 
          transparent
        )`;
        glare.style.opacity = '1';
      }
    };
    
    const resetTransform = () => {
      element.style.transform = `
        perspective(1000px)
        rotateX(0deg)
        rotateY(0deg)
        scale3d(1, 1, 1)
      `;
      
      if (glare) {
        glare.style.opacity = '0';
      }
    };
    
    const onMouseEnter = (e) => {
      clearTimeout(transitionTimeout);
      element.style.transition = `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`;
      
      transitionTimeout = setTimeout(() => {
        element.style.transition = '';
      }, speed);
      
      updateTransform(e);
    };
    
    const onMouseMove = (e) => {
      if (updateCall !== null) {
        cancelAnimationFrame(updateCall);
      }
      
      updateCall = requestAnimationFrame(() => {
        updateTransform(e);
        updateCall = null;
      });
    };
    
    const onMouseLeave = () => {
      element.style.transition = `transform ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`;
      resetTransform();
      
      if (updateCall !== null) {
        cancelAnimationFrame(updateCall);
        updateCall = null;
      }
    };
    
    // Add events
    element.addEventListener('mouseenter', onMouseEnter);
    element.addEventListener('mousemove', onMouseMove);
    element.addEventListener('mouseleave', onMouseLeave);
    
    return () => {
      element.removeEventListener('mouseenter', onMouseEnter);
      element.removeEventListener('mousemove', onMouseMove);
      element.removeEventListener('mouseleave', onMouseLeave);
      
      if (updateCall !== null) {
        cancelAnimationFrame(updateCall);
      }
    };
  }, [maxTilt, scale, speed, glareOpacity]);
  
  return (
    <div 
      ref={elementRef}
      className={`relative transform-gpu ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
      <div 
        ref={glareRef}
        className="absolute inset-0 pointer-events-none opacity-0 transition-opacity"
        style={{ transformStyle: 'preserve-3d', transform: 'translateZ(1px)' }}
        aria-hidden="true"
      />
    </div>
  );
}
