import React from 'react';
import { Bot, X } from 'lucide-react';

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  message?: string;
}

export default function ComingSoonModal({ isOpen, onClose, message }: ComingSoonModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative max-w-lg w-full">
        {/* Glow Effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur opacity-20" />
        
        {/* Modal Content */}
        <div className="relative bg-[#0F1117] rounded-2xl shadow-2xl">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 hover:bg-gray-800/50 rounded-full transition-colors"
          >
            <X size={20} />
          </button>

          {/* Content */}
          <div className="p-8 text-center">
            {/* Icon */}
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bot className="text-green-500" size={40} />
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold mb-4">
              Coming Soon!
            </h3>

            {/* Description */}
            <p className="text-gray-400 mb-8">
              {message || "We're crafting something extraordinary – a no-code platform where you can build, train, and deploy AI chatbots in minutes. Preview our studio interface and be among the first to experience the future of conversational AI."}
            </p>

            {/* Button */}
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors text-sm group relative inline-block"
            >
              <span className="relative">
                Continue to Preview
                <span className="absolute -bottom-0.5 left-0 w-full h-px bg-gradient-to-r from-gray-400/0 via-gray-400/50 to-gray-400/0 group-hover:via-white transition-all"></span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}