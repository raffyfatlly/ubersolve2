import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Bot, RefreshCw } from 'lucide-react';
import { createChatCompletion } from '../../lib/openai';
import TypewriterMessage from './TypewriterMessage';
import toast from 'react-hot-toast';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
  isTyping?: boolean;
}

interface ChatInterfaceProps {
  systemPrompt: string;
  model: string;
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  onResetChat: () => void;
}

export default function ChatInterface({ 
  systemPrompt, 
  model,
  messages,
  setMessages,
  onResetChat
}: ChatInterfaceProps) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user' as const, content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const chatMessages = [
        { role: 'system' as const, content: systemPrompt },
        ...messages,
        userMessage
      ];

      const response = await createChatCompletion(chatMessages, model);
      
      if (response) {
        setMessages(prev => [...prev, { 
          role: 'assistant',
          content: response.content || 'Sorry, I could not generate a response.',
          isTyping: true
        }]);
      }
    } catch (error: any) {
      toast.error('Failed to get response from AI');
      console.error('Chat error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTypewriterComplete = (index: number) => {
    setMessages(prev => prev.map((msg, i) => 
      i === index ? { ...msg, isTyping: false } : msg
    ));
  };

  return (
    <div className="flex flex-col h-[calc(100vh-16rem)] md:h-[600px]">
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bot className="text-green-500" size={24} />
          <div>
            <h2 className="font-semibold">Chat Preview</h2>
            <p className="text-sm text-gray-400">Test your AI assistant's responses</p>
          </div>
        </div>
        <button
          onClick={onResetChat}
          className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          title="Reset chat"
        >
          <RefreshCw size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-4">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
              <Bot className="text-green-500" size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Start a conversation</h3>
            <p className="text-gray-400 max-w-md">
              Test your AI assistant's responses to different queries and scenarios.
              Try asking about anything you'd like to test.
            </p>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-green-500/10 text-white'
                    : 'bg-gray-800 text-gray-100'
                }`}
              >
                {message.role === 'assistant' && message.isTyping ? (
                  <TypewriterMessage 
                    content={message.content}
                    onComplete={() => handleTypewriterComplete(index)}
                  />
                ) : (
                  <p className="whitespace-pre-wrap">{message.content}</p>
                )}
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-800 p-3 rounded-lg text-gray-400">
              <span className="inline-flex gap-1">
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800">
        <div className="flex gap-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-green-500 transition-colors"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="p-2 bg-green-500 hover:bg-green-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
}