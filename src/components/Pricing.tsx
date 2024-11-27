import React from 'react';
import { Check } from 'lucide-react';

const plans = [
  {
    name: "Basic Plan",
    price: "99",
    currency: "RM",
    popular: true,
    features: [
      "1 WhatsApp Business API Account",
      "Up to 500 Customers",
      "Chat Dashboard",
      "Connect to Existing Whatsapp Number",
      "Manual intervention capability",
      "Priority support",
      {text: "Free consultation", bold: true},
      {text: "Free setup", bold: true},
      {text: "Free 14 days trial", bold: true}
    ]
  },
  {
    name: "Custom Plan",
    price: "Upgrade +",
    features: [
      "Multiple WhatsApp API Accounts",
      "Unlimited conversations",
      "Advanced business automation",
      "Audio and image processing enabled",
      "Integration to other platform",
      "Custom integrations",
      "24/7 premium support"
    ]
  }
];

export default function Pricing({ onShowContactForm }) {
  return (
    <section id="pricing" className="py-20 scroll-mt-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold">Flexible Pricing Plans</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`bg-gray-800 rounded-lg p-8 hover:bg-gray-750 transition-all relative ${
                plan.popular ? 'ring-2 ring-green-500 transform hover:-translate-y-1' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
              <div className="flex items-baseline mb-6">
                {plan.price === "Upgrade +" ? (
                  <span className="text-4xl font-bold">Upgrade +</span>
                ) : (
                  <>
                    <span className="text-2xl font-bold">{plan.currency}</span>
                    <span className="text-4xl font-bold ml-1">{plan.price}</span>
                    <span className="text-gray-400 ml-2">/month</span>
                  </>
                )}
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center gap-2">
                    <Check size={20} className="text-green-500" />
                    <span className={typeof feature === 'object' && feature.bold ? 'font-bold text-green-500' : ''}>
                      {typeof feature === 'object' ? feature.text : feature}
                    </span>
                  </li>
                ))}
              </ul>
              {plan.name === "Basic Plan" ? (
                <button 
                  onClick={onShowContactForm}
                  className="block w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg transition-all font-semibold text-center"
                >
                  Get Started
                </button>
              ) : (
                <a 
                  href="https://wa.link/f0ui3h" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg transition-all font-semibold text-center"
                >
                  Contact Us
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}