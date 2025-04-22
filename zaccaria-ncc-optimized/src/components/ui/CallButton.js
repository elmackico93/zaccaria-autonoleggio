'use client'

import { trackPhoneClick } from '@/lib/animations';

export default function CallButton({ 
  variant = 'default',
  text = 'Chiama Ora',
  location = 'unknown',
  className = ''
}) {
  // Map variants to CSS classes
  const variantClasses = {
    default: 'call-button',
    navbar: 'call-button call-button-navbar',
    hero: 'call-button call-button-hero',
    fixed: 'call-button call-button-fixed'
  };

  const buttonClass = `${variantClasses[variant] || variantClasses.default} ${className}`;

  return (
    <a 
      href="tel:+39123456789" 
      className={buttonClass}
      onClick={() => trackPhoneClick(location)}
    >
      <i className="fas fa-phone mr-2"></i>
      <span>{text}</span>
    </a>
  );
}
