'use client';

import { useEffect, useRef } from 'react';
import styles from '@/styles/CarLightEffect.module.css';

/**
 * CarLightEffect - Adds a premium light effect that traces along car contours
 * 
 * @param {Object} props - Component props
 * @param {string} props.targetSelector - CSS selector for the element containing the car image
 * @param {boolean} props.enabled - Whether the effect is enabled
 * @returns {null} - This component doesn't render anything visible
 */
export default function CarLightEffect({ targetSelector = '.hero-section', enabled = true }) {
  const effectsRef = useRef([]);
  
  useEffect(() => {
    if (!enabled) return;
    
    // Find the target element
    const targetElement = document.querySelector(targetSelector);
    if (!targetElement) {
      console.warn(`CarLightEffect: Target element "${targetSelector}" not found`);
      return;
    }
    
    // Add position relative if needed
    if (getComputedStyle(targetElement).position === 'static') {
      targetElement.style.position = 'relative';
    }
    
    // Add overflow hidden if needed
    if (getComputedStyle(targetElement).overflow !== 'hidden') {
      targetElement.style.overflow = 'hidden';
    }
    
    // Create the container element for the light effects
    const container = document.createElement('div');
    container.className = styles.carContainer;
    container.style.position = 'absolute';
    container.style.inset = '0';
    container.style.zIndex = '2';
    container.style.pointerEvents = 'none';
    targetElement.appendChild(container);
    
    // Create main contour light
    const lightElement = document.createElement('div');
    lightElement.className = styles.lightEffect;
    container.appendChild(lightElement);
    effectsRef.current.push(lightElement);
    
    // Create secondary headlight effect
    const lightElement2 = document.createElement('div');
    lightElement2.className = styles.lightEffect2;
    container.appendChild(lightElement2);
    effectsRef.current.push(lightElement2);
    
    // Create IntersectionObserver to pause/resume animations when not visible
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Resume animations
          effectsRef.current.forEach((el) => {
            el.style.animationPlayState = 'running';
          });
        } else {
          // Pause animations
          effectsRef.current.forEach((el) => {
            el.style.animationPlayState = 'paused';
          });
        }
      },
      { threshold: 0.1 }
    );
    
    observer.observe(targetElement);
    
    // Cleanup function
    return () => {
      observer.disconnect();
      if (container && container.parentNode) {
        container.parentNode.removeChild(container);
      }
    };
  }, [targetSelector, enabled]);
  
  // This component doesn't render anything visible
  return null;
}
