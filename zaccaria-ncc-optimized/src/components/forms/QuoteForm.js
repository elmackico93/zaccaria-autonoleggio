'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Form di Preventivo Avanzato
 * - Multi-step per migliorare la conversione
 * - Feedback in tempo reale
 * - Integrazione analytics
 * - Design ottimizzato mobile e desktop
 */
export default function QuoteForm({ services = 'all', className = '' }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    people: '2',
    pickup: '',
    destination: '',
    message: '',
    marketing: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const pathname = usePathname();
  
  // Lista servizi disponibili
  const availableServices = services === 'all' 
    ? [
        { id: 'transfer', label: 'Transfer Aeroportuale' },
        { id: 'tour', label: 'Tour Guidato' },
        { id: 'rental', label: 'Autonoleggio' },
        { id: 'other', label: 'Altro' }
      ]
    : services;
  
  // Pre-seleziona il servizio in base al pathname
  useEffect(() => {
    let preSelectedService = '';
    
    if (pathname.includes('transfer-aeroporto')) {
      preSelectedService = 'transfer';
    } else if (pathname.includes('tour')) {
      preSelectedService = 'tour';
    } else if (pathname.includes('rental')) {
      preSelectedService = 'rental';
    }
    
    if (preSelectedService) {
      setFormData(prev => ({ ...prev, service: preSelectedService }));
    }
  }, [pathname]);
  
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
    
    // Rimuovi errore quando l'utente inizia a correggere
    if (errors[id]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };
  
  const validateStep = (stepNumber) => {
    const newErrors = {};
    
    if (stepNumber === 1) {
      if (!formData.name.trim()) newErrors.name = 'Nome richiesto';
      if (!formData.email.trim()) {
        newErrors.email = 'Email richiesta';
      } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        newErrors.email = 'Email non valida';
      }
      if (!formData.phone.trim()) newErrors.phone = 'Telefono richiesto';
    }
    
    if (stepNumber === 2) {
      if (!formData.service) newErrors.service = 'Seleziona un servizio';
      if (!formData.date) newErrors.date = 'Data richiesta';
      if (!formData.people) newErrors.people = 'Numero persone richiesto';
    }
    
    if (stepNumber === 3) {
      if (!formData.pickup.trim()) newErrors.pickup = 'Luogo di partenza richiesto';
      if (!formData.destination.trim()) newErrors.destination = 'Destinazione richiesta';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const nextStep = () => {
    if (validateStep(step)) {
      // Traccia il completamento dello step per analytics
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          'event': 'quote_form_step',
          'form_step': step,
          'page': pathname
        });
      }
      
      setStep(prev => prev + 1);
    }
  };
  
  const prevStep = () => {
    setStep(prev => prev - 1);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(step)) return;
    
    setIsSubmitting(true);
    
    try {
      // In un'implementazione reale, qui invieresti i dati a un'API
      // await fetch('/api/quote', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });
      
      // Simuliamo un delay per mostrare lo stato di caricamento
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Traccia la conversione per analytics
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          'event': 'quote_form_submitted',
          'form_service': formData.service,
          'page': pathname
        });
      }
      
      setIsSubmitted(true);
      
      // Reset form dopo invio
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          date: '',
          people: '2',
          pickup: '',
          destination: '',
          message: '',
          marketing: false
        });
        setStep(1);
        setIsSubmitted(false);
      }, 5000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: 'Errore durante l\'invio. Riprova.' });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Rendering condizionale in base allo step
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">1. Informazioni personali</h3>
              
              <div className="space-y-4">
                <div className="relative">
                  <input 
                    type="text" 
                    id="name" 
                    placeholder=" " 
                    className={`metal-input ${errors.name ? 'border-red-500' : ''}`}
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <label htmlFor="name" className="floating-label">Nome e Cognome*</label>
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                
                <div className="relative">
                  <input 
                    type="email" 
                    id="email" 
                    placeholder=" " 
                    className={`metal-input ${errors.email ? 'border-red-500' : ''}`}
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <label htmlFor="email" className="floating-label">Email*</label>
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                
                <div className="relative">
                  <input 
                    type="tel" 
                    id="phone" 
                    placeholder=" " 
                    className={`metal-input ${errors.phone ? 'border-red-500' : ''}`}
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  <label htmlFor="phone" className="floating-label">Telefono*</label>
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button 
                type="button" 
                onClick={nextStep}
                className="metal-button"
              >
                Continua <span className="ml-2">→</span>
              </button>
            </div>
          </>
        );
        
      case 2:
        return (
          <>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">2. Dettagli del servizio</h3>
              
              <div className="space-y-4">
                <div className="relative">
                  <select 
                    id="service" 
                    className={`metal-input ${errors.service ? 'border-red-500' : ''}`}
                    value={formData.service}
                    onChange={handleChange}
                  >
                    <option value="">Seleziona un servizio*</option>
                    {availableServices.map(service => (
                      <option key={service.id} value={service.id}>{service.label}</option>
                    ))}
                  </select>
                  {errors.service && <p className="text-red-500 text-sm mt-1">{errors.service}</p>}
                </div>
                
                <div className="relative">
                  <input 
                    type="date" 
                    id="date" 
                    className={`metal-input ${errors.date ? 'border-red-500' : ''}`}
                    value={formData.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                  />
                  <label htmlFor="date" className="floating-label">Data del servizio*</label>
                  {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
                </div>
                
                <div className="relative">
                  <select 
                    id="people" 
                    className={`metal-input ${errors.people ? 'border-red-500' : ''}`}
                    value={formData.people}
                    onChange={handleChange}
                  >
                    <option value="1">1 persona</option>
                    <option value="2">2 persone</option>
                    <option value="3">3 persone</option>
                    <option value="4">4 persone</option>
                    <option value="5">5 persone</option>
                    <option value="6">6 persone</option>
                    <option value="7">7 persone</option>
                    <option value="8+">8+ persone</option>
                  </select>
                  <label htmlFor="people" className="floating-label">Numero di persone*</label>
                  {errors.people && <p className="text-red-500 text-sm mt-1">{errors.people}</p>}
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <button 
                type="button" 
                onClick={prevStep}
                className="metal-button-outline"
              >
                <span className="mr-2">←</span> Indietro
              </button>
              
              <button 
                type="button" 
                onClick={nextStep}
                className="metal-button"
              >
                Continua <span className="ml-2">→</span>
              </button>
            </div>
          </>
        );
        
      case 3:
        return (
          <>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">3. Dettagli viaggio</h3>
              
              <div className="space-y-4">
                <div className="relative">
                  <input 
                    type="text" 
                    id="pickup" 
                    placeholder=" " 
                    className={`metal-input ${errors.pickup ? 'border-red-500' : ''}`}
                    value={formData.pickup}
                    onChange={handleChange}
                  />
                  <label htmlFor="pickup" className="floating-label">Luogo di partenza*</label>
                  {errors.pickup && <p className="text-red-500 text-sm mt-1">{errors.pickup}</p>}
                </div>
                
                <div className="relative">
                  <input 
                    type="text" 
                    id="destination" 
                    placeholder=" " 
                    className={`metal-input ${errors.destination ? 'border-red-500' : ''}`}
                    value={formData.destination}
                    onChange={handleChange}
                  />
                  <label htmlFor="destination" className="floating-label">Destinazione*</label>
                  {errors.destination && <p className="text-red-500 text-sm mt-1">{errors.destination}</p>}
                </div>
                
                <div className="relative">
                  <textarea 
                    id="message" 
                    placeholder=" " 
                    rows="3" 
                    className="metal-input"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                  <label htmlFor="message" className="floating-label">Note aggiuntive</label>
                </div>
                
                <div className="flex items-start mt-4">
                  <input 
                    type="checkbox" 
                    id="marketing" 
                    className="mt-1"
                    checked={formData.marketing}
                    onChange={handleChange}
                  />
                  <label htmlFor="marketing" className="ml-2 text-sm text-silver">
                    Acconsento a ricevere comunicazioni marketing via email e SMS riguardanti promozioni e novità.
                  </label>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <button 
                type="button" 
                onClick={prevStep}
                className="metal-button-outline"
              >
                <span className="mr-2">←</span> Indietro
              </button>
              
              <button 
                type="submit" 
                className="metal-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Invio in corso...' : 'Richiedi Preventivo'}
              </button>
            </div>
          </>
        );
        
      default:
        return null;
    }
  };
  
  if (isSubmitted) {
    return (
      <div className={`bg-charcoal p-8 rounded-lg border border-silver-metallic ${className}`}>
        <div className="text-center">
          <svg className="w-16 h-16 mx-auto mb-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          
          <h3 className="text-2xl font-bold mb-4 chrome-text-enhanced">Richiesta Inviata!</h3>
          <p className="text-silver-metallic mb-6">
            Grazie per averci contattato. Ti risponderemo al più presto con un preventivo personalizzato.
          </p>
          <p className="text-silver-metallic">
            Ti abbiamo inviato una conferma via email all'indirizzo: <span className="text-white">{formData.email}</span>
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`bg-charcoal p-8 rounded-lg border border-silver-metallic ${className}`}>
      <h2 className="text-2xl font-bold mb-6 chrome-text-enhanced">Richiedi un Preventivo</h2>
      
      {/* Indicatore progress step */}
      <div className="flex mb-8">
        {[1, 2, 3].map((stepNumber) => (
          <div key={stepNumber} className="flex-1">
            <div 
              className={`h-1 ${
                stepNumber <= step ? 'bg-silver-metallic' : 'bg-dark-silver'
              } transition-all duration-300 ${
                stepNumber === 1 ? 'rounded-l' : stepNumber === 3 ? 'rounded-r' : ''
              }`}
            ></div>
            <div className="text-xs text-center mt-2 text-silver">
              {stepNumber === 1 ? 'Dati' : stepNumber === 2 ? 'Servizio' : 'Viaggio'}
            </div>
          </div>
        ))}
      </div>
      
      {errors.submit && (
        <div className="mb-6 p-4 bg-red-900/50 border border-red-500 rounded-md">
          <p className="text-red-500">{errors.submit}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        {renderStepContent()}
      </form>
    </div>
  );
}
