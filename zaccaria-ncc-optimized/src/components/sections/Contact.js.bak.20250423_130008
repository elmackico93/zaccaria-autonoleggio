'use client'

import { useState } from 'react';
import { trackPhoneClick } from '@/lib/animations';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission - would be replaced with actual API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      
      // Reset success message after a delay
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-32 bg-charcoal section-fade-in">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-8 mb-20">
          <div className="md:col-span-3">
            <h2 className="text-sm font-bold tracking-widest mb-4 uppercase chrome-text-enhanced">Contatti</h2>
            <div className="w-12 h-[1px] bg-silver-metallic"></div>
          </div>
          <div className="md:col-span-9">
            <p className="text-3xl md:text-4xl font-light leading-tight max-w-3xl">
              Siamo a tua disposizione per qualsiasi richiesta. 
              Contattaci per un preventivo personalizzato.
            </p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <div className="space-y-12">
              <div className="flex items-start hover-effect p-4 transition-all">
                <div className="w-12 h-12 flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div className="ml-6">
                  <h3 className="text-lg font-semibold mb-2">Telefono</h3>
                  <a 
                    href="tel:+393313467527" 
                    className="text-2xl font-light hover:text-silver transition-colors group flex items-center"
                    onClick={() => trackPhoneClick('contact')}
                  >
                    <span>+39 331 346 7527</span>
                    <svg className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </a>
                </div>
              </div>
              
              <div className="flex items-start hover-effect p-4 transition-all">
                <div className="w-12 h-12 flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div className="ml-6">
                  <h3 className="text-lg font-semibold mb-2">Email</h3>
                  <a href="mailto:info@zaccariaautonoleggio.it" className="text-lg hover:text-silver transition-colors group flex items-center">
                    <span>info@zaccariaautonoleggio.it</span>
                    <svg className="w-4 h-4 ml-2 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </a>
                </div>
              </div>
              
              <div className="flex items-start hover-effect p-4 transition-all">
                <div className="w-12 h-12 flex-shrink-0">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div className="ml-6">
                  <h3 className="text-lg font-semibold mb-2">Indirizzo</h3>
                  <p className="text-lg">Via Armando Diaz, 91, 72017 Ostuni (BR)</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <form id="contactForm" className="space-y-6" onSubmit={handleSubmit}>
              <div className="relative">
                <input 
                  type="text" 
                  id="name" 
                  placeholder=" " 
                  required
                  className="metal-input"
                  value={formData.name}
                  onChange={handleChange}
                />
                <label htmlFor="name" className="floating-label">Nome e Cognome</label>
              </div>
              
              <div className="relative">
                <input 
                  type="email" 
                  id="email" 
                  placeholder=" " 
                  required
                  className="metal-input"
                  value={formData.email}
                  onChange={handleChange}
                />
                <label htmlFor="email" className="floating-label">Email</label>
              </div>
              
              <div className="relative">
                <input 
                  type="tel" 
                  id="phone" 
                  placeholder=" " 
                  required
                  className="metal-input"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <label htmlFor="phone" className="floating-label">Telefono</label>
              </div>
              
              <div className="relative">
                <textarea 
                  id="message" 
                  placeholder=" " 
                  rows="4" 
                  required
                  className="metal-input"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
                <label htmlFor="message" className="floating-label">Messaggio</label>
              </div>
              
              <button 
                type="submit" 
                className="call-button call-button-navbar w-full flex justify-center items-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span>Invio in corso...</span>
                ) : isSubmitted ? (
                  <>
                    <i className="fas fa-check mr-2"></i>
                    <span>Messaggio Inviato!</span>
                  </>
                ) : (
                  <span>Invia Messaggio</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
