import React, { useEffect, useRef } from 'react';

const businesses = [
  { icon: '🏠', text: 'Property' },
  { icon: '🏨', text: 'Hotels' },
  { icon: '🛍️', text: 'Retail' },
  { icon: '🍽️', text: 'Food' },
  { icon: '🎓', text: 'Study' },
  { icon: '💆‍♀️', text: 'Beauty' },
  { icon: '🏥', text: 'Health' },
  { icon: '🚗', text: 'Auto' },
  { icon: '✈️', text: 'Travel' },
  { icon: '👗', text: 'Fashion' },
  { icon: '🏢', text: 'Service' },
  { icon: '📦', text: 'Cargo' },
];

export default function BusinessTypes() {
  const businessesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) scale(1)';
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
      }
    );

    const businessElements = document.querySelectorAll('.business-card');
    businessElements.forEach((element) => observer.observe(element));

    return () => {
      businessElements.forEach((element) => observer.unobserve(element));
    };
  }, []);

  return (
    <section className="py-20 bg-dark-lighter/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Perfect for businesses like:</h2>
          <div ref={businessesRef} className="grid grid-cols-4 gap-2 md:gap-4">
            {businesses.map((business, index) => (
              <div
                key={index}
                className="business-card p-2 md:p-4 bg-dark-card rounded-lg hover:bg-dark-lighter transition-all hover:scale-105 hover:shadow-glow cursor-pointer flex flex-col items-center"
                style={{
                  opacity: '0',
                  transform: 'translateY(30px) scale(0.95)',
                  transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDelay: `${index * 50}ms`
                }}
              >
                <span className="text-2xl md:text-3xl mb-1">{business.icon}</span>
                <p className="text-sm md:text-xl">{business.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}