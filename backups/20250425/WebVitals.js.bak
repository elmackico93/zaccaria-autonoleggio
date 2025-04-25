'use client';

import { useEffect } from 'react';

/**
 * Simplified Web Vitals component that doesn't require the web-vitals package
 * This is a fallback in case you don't want to install the web-vitals package
 */
export function WebVitals({ 
  endpoint = '/api/vitals', 
  reportFunction = null,
  debug = false
}) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Function to report a web vital
    const reportWebVital = async (metric) => {
      // If a custom function is provided, use it
      if (typeof reportFunction === 'function') {
        reportFunction(metric);
        return;
      }
      
      // Log metrics in debug mode
      if (debug) {
        console.log(`Metric:`, metric);
      }
      
      try {
        // Use sendBeacon if available for more reliable delivery
        if (navigator.sendBeacon) {
          const blob = new Blob(
            [JSON.stringify(metric)], 
            { type: 'application/json' }
          );
          navigator.sendBeacon(endpoint, blob);
        } else {
          // Fallback to fetch with keepalive
          await fetch(endpoint, {
            body: JSON.stringify(metric),
            method: 'POST',
            keepalive: true,
            headers: { 'Content-Type': 'application/json' }
          });
        }
      } catch (error) {
        console.error('Error reporting web vital:', error);
      }
    };
    
    // Simplified performance measurement
    // This uses the Performance API instead of web-vitals
    const measurePerformance = () => {
      try {
        // Get basic performance metrics using the Performance API
        const navigationTiming = performance.getEntriesByType('navigation')[0];
        const paintTiming = performance.getEntriesByType('paint');
        
        if (navigationTiming) {
          // Time to First Byte
          reportWebVital({
            name: 'TTFB',
            value: navigationTiming.responseStart,
            rating: navigationTiming.responseStart < 100 ? 'good' : 
                    navigationTiming.responseStart < 200 ? 'needs-improvement' : 'poor'
          });
          
          // DOM Content Loaded
          reportWebVital({
            name: 'DCL',
            value: navigationTiming.domContentLoadedEventEnd - navigationTiming.domContentLoadedEventStart,
            rating: 'informative'
          });
          
          // Load Time
          reportWebVital({
            name: 'Load',
            value: navigationTiming.loadEventEnd - navigationTiming.startTime,
            rating: 'informative'
          });
        }
        
        // First Paint and First Contentful Paint
        paintTiming.forEach(entry => {
          reportWebVital({
            name: entry.name === 'first-paint' ? 'FP' : 'FCP',
            value: entry.startTime,
            rating: entry.startTime < 1000 ? 'good' : 
                    entry.startTime < 2500 ? 'needs-improvement' : 'poor'
          });
        });
        
        // Observe layout shifts for CLS approximation
        let clsValue = 0;
        let clsEntries = [];
        
        // Create a PerformanceObserver to track layout shifts
        const clsObserver = new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            // Only count layout shifts without recent user input
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
              clsEntries.push(entry);
            }
          }
          
          // Report CLS after gathering some data
          if (clsEntries.length > 5) {
            reportWebVital({
              name: 'CLS',
              value: clsValue,
              rating: clsValue < 0.1 ? 'good' : 
                      clsValue < 0.25 ? 'needs-improvement' : 'poor'
            });
          }
        });
        
        // Start observing layout shifts
        clsObserver.observe({ type: 'layout-shift', buffered: true });
      } catch (error) {
        console.error('Error measuring performance:', error);
      }
    };
    
    // Run performance measurement after load
    if (document.readyState === 'complete') {
      measurePerformance();
    } else {
      window.addEventListener('load', measurePerformance);
      return () => window.removeEventListener('load', measurePerformance);
    }
  }, [endpoint, reportFunction, debug]);
  
  // This component doesn't render anything
  return null;
}
