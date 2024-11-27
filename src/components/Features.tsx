import React, { useEffect, useRef } from 'react';
import { Bot, Clock, Globe, Brain, HandMetal, MessageSquare, Settings } from 'lucide-react';

const features = [
  {
    icon: <Globe className="text-green-500" size={32} />,
    title: "Multi-Language",
    description: "Seamlessly respond to customers in their preferred language, breaking down communication barriers automatically"
  },
  {
    icon: <Clock className="text-green-500" size={32} />,
    title: "24/7 Availability",
    description: "Never miss a customer query, even after business hours"
  },
  {
    icon: <Bot className="text-green-500" size={32} />,
    title: "Smart AI Responses",
    description: "Advanced, context-aware capabilities that understand and address customer needs"
  },
  {
    icon: <Settings className="text-green-500" size={32} />,
    title: "Custom AI Training",
    description: "Tailor the AI to match your business knowledge and tone, ensuring it speaks your language and understands your customers"
  },
  {
    icon: <MessageSquare className="text-green-500" size={32} />,
    title: "Live Chat Dashboard",
    description: "Easily monitor and manage all conversations in real-time with AI-backed insights and tools for better control"
  },
  {
    icon: <HandMetal className="text-green-500" size={32} />,
    title: "Human Takeover",
    description: "Jump into any chat seamlessly when a personal touch or human intervention is needed—stay connected when it matters most"
  }
];

export default function Features() {
  const featuresRef = useRef<HTMLDivElement>(null);

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

    const featureElements = document.querySelectorAll('.feature-card');
    featureElements.forEach((element) => observer.observe(element));

    return () => {
      featureElements.forEach((element) => observer.unobserve(element));
    };
  }, []);

  return (
    <section id="features" className="bg-gray-800/50 py-20 scroll-mt-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">AI-Powered Features with Human Control</h2>
          <p className="text-gray-400 text-lg">
            Perfect blend of artificial intelligence and human expertise. Stay in control while leveraging advanced AI capabilities.
          </p>
        </div>
        <div ref={featuresRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card bg-gray-800 p-6 rounded-lg hover:bg-gray-750 transition-all hover:-translate-y-1 group flex flex-col h-full"
              style={{
                opacity: '0',
                transform: 'translateY(40px)',
                transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                transitionDelay: `${index * 150}ms`
              }}
            >
              <div className="mb-4 transform group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 flex-grow">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}