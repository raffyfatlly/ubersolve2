import React from 'react';
import { Bot } from 'lucide-react';

export default function OGImage() {
  return (
    <div className="w-[1200px] h-[630px] bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-16">
      {/* Glow Effects */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-green-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-emerald-500/20 rounded-full blur-3xl" />
      
      <div className="relative flex items-center gap-16">
        {/* Logo Section */}
        <div className="flex items-center gap-6">
          <div className="w-32 h-32 bg-green-500/10 rounded-2xl flex items-center justify-center border border-green-500/20">
            <Bot className="w-20 h-20 text-green-500" />
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl font-bold text-white">agentif</span>
            <span className="text-2xl font-bold text-green-500">.co</span>
          </div>
          
          <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
            Upgrade Your WhatsApp with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-400">
              AI Chatbot
            </span>
          </h1>
          
          <p className="text-2xl text-gray-400">
            Transform customer interactions with AI-powered responses in any language, 24/7
          </p>
        </div>
      </div>
    </div>
  );
}