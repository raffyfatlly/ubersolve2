import React, { useEffect, useRef } from 'react';
import { Sparkles, Bot, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: <Bot className="text-green-500" size={24} />,
    title: "No-Code Builder",
    description: "Build your AI chatbot with simple, intuitive interface"
  },
  {
    icon: <Sparkles className="text-green-500" size={24} />,
    title: "Bot Training",
    description: "Drag & drop your business documents"
  },
  {
    icon: <ArrowRight className="text-green-500" size={24} />,
    title: "Instant Deploy",
    description: "Deploy your live bot to any platform"
  }
];

export default function AnnouncementSection({ onShowAuthModal }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
      }
    );

    // Observe main content elements
    [labelRef, titleRef, descriptionRef, previewRef].forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    // Observe feature cards
    const featureElements = document.querySelectorAll('.studio-feature');
    featureElements.forEach((element) => observer.observe(element));

    return () => {
      [labelRef, titleRef, descriptionRef, previewRef].forEach(ref => {
        if (ref.current) observer.unobserve(ref.current);
      });
      featureElements.forEach((element) => observer.unobserve(element));
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* New Label */}
          <div 
            ref={labelRef}
            className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2 mb-6"
            style={{
              opacity: '0',
              transform: 'translateY(20px)',
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <Sparkles className="text-green-500" size={16} />
            <span className="text-green-500 text-sm font-semibold">Coming Soon</span>
          </div>

          {/* Main Content */}
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{
              opacity: '0',
              transform: 'translateY(30px)',
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: '150ms'
            }}
          >
            Introducing{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-400">
              AI Studio
            </span>
          </h2>
          
          <p 
            ref={descriptionRef}
            className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto"
            style={{
              opacity: '0',
              transform: 'translateY(30px)',
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: '300ms'
            }}
          >
            Build your own AI chatbot in minutes, no coding required. Drag, drop, and deploy your custom AI assistant instantly.
          </p>

          {/* Feature Grid */}
          <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="studio-feature bg-dark-lighter/50 backdrop-blur-sm p-6 rounded-lg border border-gray-800/50 hover:border-green-500/30 transition-all"
                style={{
                  opacity: '0',
                  transform: 'translateY(40px)',
                  transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDelay: `${450 + index * 150}ms`
                }}
              >
                <div className="bg-green-500/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  {feature.icon}
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Preview Link */}
          <button 
            ref={previewRef}
            onClick={onShowAuthModal}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white group relative"
            style={{
              opacity: '0',
              transform: 'translateY(20px)',
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: '900ms'
            }}
          >
            <span className="relative">
              Preview AI Studio
              <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-green-500/0 via-green-500/50 to-green-500/0 group-hover:via-green-500 transition-all"></span>
            </span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}