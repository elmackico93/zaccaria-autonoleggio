// Animations are initialized in the client only
export function initAnimations(gsap, ScrollTrigger) {
  if (typeof window === 'undefined' || !gsap || !ScrollTrigger) return;
  
  // Navigation Scroll Effect with IntersectionObserver for better performance
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const navObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.boundingClientRect.y < 0) {
          navbar.classList.add('nav-scrolled');
        } else {
          navbar.classList.remove('nav-scrolled');
        }
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5] }
    );
    
    const heroSection = document.querySelector('.hero-metal');
    if (heroSection) {
      navObserver.observe(heroSection);
    }
  }

  // Hero Text Animation with safety checks
  const textRevealElements = document.querySelectorAll(".text-reveal-content");
  if (textRevealElements.length > 0) {
    gsap.to(textRevealElements, {
      y: 0,
      opacity: 1,
      stagger: 0.3,
      duration: 1.2,
      delay: 0.5,
      ease: "power4.out"
    });
  }

  // Parallax Effect with optimized performance
  const parallaxElements = document.querySelectorAll('.parallax-element');
  if (parallaxElements.length) {
    parallaxElements.forEach(element => {
      const container = element.closest('.parallax-container');
      if (!container) return;
      
      const depth = element.getAttribute('data-depth') || 0.2;
      const movement = element.offsetHeight * depth;
      
      gsap.fromTo(element,
        { y: -movement / 2 },
        {
          y: movement / 2,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            scrub: true,
            start: "top bottom",
            end: "bottom top"
          }
        }
      );
    });
  }

  // Counter Animation with optimized performance
  const counters = [
    { id: 'counter1', value: 15 },
    { id: 'counter2', value: 5000 },
    { id: 'counter3', value: 20000 }
  ];
  
  counters.forEach(({ id, value }) => {
    const element = document.getElementById(id);
    if (!element) return;
    
    ScrollTrigger.create({
      trigger: element,
      start: 'top 80%',
      onEnter: () => {
        gsap.to({
          val: 0,
          roundProps: "val"
        }, {
          val: value,
          duration: 1.5,
          ease: "power2.out",
          onUpdate: function() {
            element.textContent = Math.round(this.targets()[0].val);
          }
        });
      },
      once: true
    });
  });

  // Mobile Menu - Using event delegation for better performance
  const setupMobileMenu = () => {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMobileMenu = document.getElementById('closeMobileMenu');
    
    if (!mobileMenuBtn || !mobileMenu || !closeMobileMenu) return;
    
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('hidden');
      gsap.from('#mobileMenu > div > div:last-child > *', {
        y: 30,
        opacity: 0,
        stagger: 0.08,
        duration: 0.4,
        ease: 'power2.out'
      });
    });
    
    closeMobileMenu.addEventListener('click', () => {
      gsap.to(mobileMenu, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => {
          mobileMenu.classList.add('hidden');
          gsap.set(mobileMenu, { opacity: 1 });
        }
      });
    });
    
    // Event delegation for better performance
    mobileMenu.addEventListener('click', (e) => {
      if (e.target.tagName === 'A' || e.target.closest('a')) {
        gsap.to(mobileMenu, {
          opacity: 0,
          duration: 0.2,
          onComplete: () => {
            mobileMenu.classList.add('hidden');
            gsap.set(mobileMenu, { opacity: 1 });
          }
        });
      }
    });
  };
  
  setupMobileMenu();

  // Smooth Scroll with native browser APIs for better performance
  const setupSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetElement = document.querySelector(this.getAttribute('href'));
        if (!targetElement) return;
        
        const navbarHeight = document.getElementById('navbar')?.offsetHeight || 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      });
    });
  };
  
  setupSmoothScroll();
}

// Analytics tracking function
export function trackPhoneClick(location) {
  if (typeof window !== 'undefined' && typeof window.dataLayer !== 'undefined') {
    window.dataLayer.push({
      'event': 'phone_click',
      'location': location,
      'timestamp': new Date().toISOString()
    });
  }
  console.log('Phone clicked from:', location);
}
