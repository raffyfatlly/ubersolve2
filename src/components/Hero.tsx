import React, { useState, useEffect } from 'react';
import { ArrowRight, Bot, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import ChatExample from './ChatExample';

const chatExamples = [
  {
    title: "AI Assistant",
    subtitle: "Powered by GPT-4",
    messages: [
      {
        user: "I'm interested to transform my WhatsApp with AI. How many languages can it handle?",
        bot: "Hello! 👋 Thanks for your interest! Our AI is powered by GPT-4.0, which means it can understand and respond in virtually any language worldwide! 🌍\n\nMost commonly used languages include:\n• English 🇬🇧\n• Bahasa Malaysia 🇲🇾\n• Mandarin 🇨🇳\n• Tamil 🇮🇳\n\nAnd many more! The AI automatically detects and responds in your customer's preferred language. ✨"
      },
      {
        user: "How does the AI learn about my specific business information?",
        bot: "Great question! 🎯 We train the AI with your business data, so it becomes your perfect virtual team member! It learns everything about:\n\n• Your products and services 📦\n• Business policies and procedures 📋\n• Common customer questions ❓\n• Your brand's unique communication style 🎨"
      },
      {
        user: "Can it handle multiple conversations at once?",
        bot: "Absolutely! 💪 Our AI can handle unlimited concurrent conversations, meaning it can:\n\n• Chat with multiple customers simultaneously 👥\n• Maintain context for each conversation 🧠\n• Provide consistent responses 24/7 ⏰\n• Scale with your business growth 📈"
      },
      {
        user: "What happens if the AI can't answer a question?",
        bot: "No worries! We've got that covered! 🛡️\n\n• The AI recognizes when it needs human support 🤝\n• Seamlessly transfers to your team when needed 🔄\n• Keeps customers informed during handover ℹ️\n• Learns from these interactions for future improvement 📚\n\nYour team stays in control while the AI handles routine queries! 🎯"
      }
    ]
  },
  {
    title: "Property Rental",
    subtitle: "Villa Booking Assistant",
    messages: [
      {
        user: "Hi, is your Penang villa pet-friendly?",
        bot: "Hi! 🐾 Yes, our Penang villa is pet-friendly! Let us know in advance if you're bringing your furry friend, so we can prepare everything for your stay."
      },
      {
        user: "What's the rate for 2 nights this weekend?",
        bot: "💰 Rate: RM 850 per night\n📅 Total for 2 nights: RM 1,700\n\nWould you like to book?"
      },
      {
        user: "Yes, but what amenities are included?",
        bot: "Perfect! Here's what's included in your stay:\n\n• Private infinity pool 🏊‍♂️\n• Fully equipped kitchen 🍳\n• BBQ facilities 🍖\n• Free Wi-Fi 📶\n• Smart TV with Netflix 📺\n• Daily housekeeping 🧹\n• Welcome basket 🧺\n\nShall I proceed with the booking for you?"
      },
      {
        user: "Do you have any special offers for longer stays?",
        bot: "Yes, we have great long-stay discounts! 🌟\n\n• 5-7 nights: 10% off 💎\n• 8-14 nights: 15% off 💎💎\n• 15+ nights: 20% off 💎💎💎\n\nPlus, you'll get complimentary airport transfers for stays over 7 nights! 🚗✨"
      }
    ]
  },
  {
    title: "Museum Guide",
    subtitle: "Interactive Museum Assistant",
    messages: [
      {
        user: "What are today's exhibition hours?",
        bot: "Welcome! 🏛️ Our exhibition hours today are:\n\n🕐 10:00 AM - 6:00 PM\n\nLast entry is at 5:00 PM. Would you like to know about our current exhibitions?"
      },
      {
        user: "Yes, what's the main exhibition now?",
        bot: "Currently featuring: \"Ancient Civilizations: Lost & Found\" 🗿\n\nHighlights include:\n• Egyptian artifacts (Level 1)\n• Mesopotamian treasures (Level 2)\n• Interactive archaeology zone\n\nGuided tours start every hour. Would you like to book a tour?"
      },
      {
        user: "How much are the guided tours?",
        bot: "Our guided tour prices are: 🎫\n\n• Adult: RM 25\n• Student: RM 15\n• Senior: RM 15\n• Children under 12: Free\n\nEach tour lasts 90 minutes and includes:\n• Expert guide 👩‍🏫\n• Interactive activities 🔍\n• Special exhibit access ⭐\n• Souvenir guidebook 📖"
      },
      {
        user: "Do you have any special exhibitions coming up?",
        bot: "Yes! We're excited to announce our upcoming exhibitions! 🎉\n\n• Next Month: \"Renaissance Masters\" 🎨\n• Coming Soon: \"Space: The Final Frontier\" 🚀\n• Holiday Special: \"Winter Wonderland\" ❄️\n\nJoin our newsletter for early access and special previews! ✨"
      }
    ]
  }
];

export default function Hero() {
  const [currentExample, setCurrentExample] = useState(0);
  const [currentPlatform, setCurrentPlatform] = useState(0);
  const platforms = ['Whatsapp', 'Website', 'Facebook', 'Instagram', 'Telegram'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlatform((prev) => (prev + 1) % platforms.length);
    }, 2000); // Changed from 3000 to 2000 for faster animation
    return () => clearInterval(interval);
  }, []);

  const scrollToCTA = () => {
    const ctaSection = document.getElementById('cta-section');
    if (ctaSection) {
      ctaSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const nextExample = () => {
    setCurrentExample((prev) => (prev + 1) % chatExamples.length);
  };

  const prevExample = () => {
    setCurrentExample((prev) => (prev - 1 + chatExamples.length) % chatExamples.length);
  };

  return (
    <header className="relative min-h-screen flex items-center">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] bg-green-500/10 rounded-full blur-3xl -top-48 -left-24 animate-pulse"></div>
        <div className="absolute w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-3xl top-96 -right-24 animate-pulse delay-1000"></div>
        <div className="absolute w-[60px] h-[60px] bg-green-500/20 rounded-full blur-xl top-32 left-1/4"></div>
        <div className="absolute w-[30px] h-[30px] bg-emerald-500/20 rounded-full blur-lg bottom-32 right-1/3"></div>
        
        {/* Subtle Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]" 
          style={{
            backgroundImage: `linear-gradient(#22C55E 1px, transparent 1px), linear-gradient(to right, #22C55E 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 space-y-6">
            <div className="inline-block">
              <span className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-full border border-green-500/20 backdrop-blur-sm text-green-500 hover:border-green-500/30 transition-colors">
                by Ubersolve
              </span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl font-bold leading-tight text-white">
              Upgrade your{' '}
              <span className="relative inline-block">
                <span key={platforms[currentPlatform]} className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-400 animate-slide-up">
                  {platforms[currentPlatform]}
                </span>
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-green-500/0 via-green-500/50 to-green-500/0"></div>
              </span>
              {' '}with AI Chatbot
            </h1>
            
            <p className="text-xl text-gray-400 max-w-xl">
              Connect with all your customers anytime — on every channel.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={scrollToCTA}
                className="group relative px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl font-semibold text-white shadow-xl shadow-green-500/20 hover:shadow-green-500/10 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="flex items-center justify-center gap-2">
                  Let's Build Your Chatbot
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </span>
              </button>
              
              <a 
                href="https://wa.link/5puj88" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group px-8 py-4 bg-dark-lighter/50 hover:bg-dark-lighter rounded-xl font-semibold border border-gray-800 hover:border-green-500/30 transition-all duration-300 text-center flex items-center justify-center gap-2"
              >
                <span>AirBnB Bot Demo</span>
                <MessageCircle className="group-hover:scale-110 transition-transform" size={20} />
              </a>
            </div>
          </div>

          <div className="lg:w-1/2 w-full min-w-[300px] sm:min-w-[400px]" id="about">
            <div className="relative">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-green-500/50 to-emerald-500/50 rounded-2xl blur opacity-20"></div>
              <div className="relative bg-gray-800/90 backdrop-blur-sm p-6 rounded-xl shadow-2xl">
                <div className="flex items-center justify-between border-b border-gray-700/50 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500/10 rounded-lg">
                      <Bot className="text-green-500" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold">{chatExamples[currentExample].title}</h3>
                      <p className="text-sm text-gray-400">{chatExamples[currentExample].subtitle}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={prevExample}
                      className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                      aria-label="Previous example"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button 
                      onClick={nextExample}
                      className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                      aria-label="Next example"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                  <ChatExample messages={chatExamples[currentExample].messages} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}