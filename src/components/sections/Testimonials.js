import Image from 'next/image';

// Server Component
export default function Testimonials() {
  return (
    <section className="py-32 bg-black relative section-fade-in">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-16">
            Cosa dicono i nostri clienti<span className="chrome-text-enhanced">.</span>
          </h2>
          <div className="relative">
            <div className="absolute top-0 left-0 text-8xl font-serif text-silver-metallic opacity-20 -translate-y-8 -translate-x-8">"</div>
            <div className="testimonial-slider">
              <div className="testimonial-item">
                <p className="text-2xl md:text-3xl font-light mb-8 leading-relaxed">
                  Un servizio eccezionale in ogni dettaglio. La professionalità e la puntualità 
                  sono la loro firma distintiva. Non potrei immaginare un servizio migliore.
                </p>
                <div className="flex items-center justify-center">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image 
                      src="/images/client-1.jpg"
                      alt="Client"
                      fill
                      className="object-cover rounded-full"
                      loading="lazy"
                      sizes="48px"
                    />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">Marco Rossi</div>
                    <div className="text-sm text-silver-metallic">CEO, Tech Solutions</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
