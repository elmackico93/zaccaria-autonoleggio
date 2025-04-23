'use client';

/**
 * Helper functions for working with the View Transitions API
 * This allows for smooth transitions between pages and sections
 */

/**
 * Start a view transition with a callback function
 * @param {Function} callback - Function to execute during the transition
 * @returns {Promise} - Promise that resolves when the transition is complete
 */
export function startViewTransition(callback) {
  // Check if the View Transitions API is supported
  if (!document.startViewTransition) {
    // Just execute the callback if not supported
    callback();
    return Promise.resolve();
  }
  
  // Start the transition
  return document.startViewTransition(callback).finished;
}

/**
 * Navigate to a new URL with a smooth transition
 * @param {string} url - URL to navigate to
 * @param {Object} options - Options for the transition
 * @returns {Promise} - Promise that resolves when the transition is complete
 */
export function transitionToUrl(url, options = {}) {
  return startViewTransition(() => {
    // Push the new URL to history
    window.history.pushState(null, '', url);
    
    // Execute any additional callback if provided
    if (options.callback) {
      options.callback();
    }
  });
}

/**
 * Creates a transition between different sections of a page
 * @param {string} sectionId - ID of the section to transition to
 * @param {Object} options - Options for the transition
 * @returns {Promise} - Promise that resolves when the transition is complete
 */
export function transitionToSection(sectionId, options = {}) {
  const targetElement = document.getElementById(sectionId);
  if (!targetElement) return Promise.resolve();
  
  return startViewTransition(() => {
    // Scroll to the section
    const navbarHeight = document.getElementById('navbar')?.offsetHeight || 0;
    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
    
    window.scrollTo({
      top: targetPosition,
      behavior: options.smooth !== false ? 'smooth' : 'auto'
    });
    
    // Update URL if needed
    if (options.updateUrl !== false) {
      window.history.replaceState(null, '', `/${sectionId}`);
    }
    
    // Execute any additional callback if provided
    if (options.callback) {
      options.callback();
    }
  });
}

/**
 * Hook that registers a DOM element for use with View Transitions
 * @param {string} name - Transition name for the element
 * @returns {Function} - Function to assign to the ref of the element
 */
export function useViewTransitionName(name) {
  return (element) => {
    if (element && 'startViewTransition' in document) {
      element.style.viewTransitionName = name;
    }
  };
}

/**
 * Adds necessary CSS for view transitions
 * This function needs to be called once when the app initializes
 */
export function initViewTransitions() {
  if (typeof document === 'undefined') return;
  
  // Add CSS for view transitions if supported
  if ('startViewTransition' in document) {
    // Check if the style element already exists
    if (!document.getElementById('view-transitions-style')) {
      const style = document.createElement('style');
      style.id = 'view-transitions-style';
      style.textContent = `
        ::view-transition-group(*) {
          animation-duration: 0.5s;
        }
        
        ::view-transition-old(*) {
          animation: 180ms cubic-bezier(0.4, 0, 0.2, 1) both fade-out;
        }
        
        ::view-transition-new(*) {
          animation: 250ms cubic-bezier(0.4, 0, 0.2, 1) both fade-in;
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fade-out {
          from { opacity: 1; }
          to { opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
  }
}