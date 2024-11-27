import React, { useState, useEffect, useRef } from 'react';
import TypewriterText from './TypewriterText';

interface Message {
  user: string;
  bot: string | React.ReactNode;
}

interface ChatExampleProps {
  messages: Message[];
  onComplete?: () => void;
}

export default function ChatExample({ messages, onComplete }: ChatExampleProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [displayedMessages, setDisplayedMessages] = useState<Array<{ type: 'user' | 'bot', content: string | React.ReactNode }>>([]);
  const [isInView, setIsInView] = useState(false);
  const [showTypingIndicator, setShowTypingIndicator] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const animationTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting && displayedMessages.length === 0) {
          startConversation();
        }
      },
      {
        threshold: 0.3,
        rootMargin: '50px 0px'
      }
    );

    if (chatContainerRef.current) {
      observer.observe(chatContainerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  const startConversation = () => {
    setCurrentIndex(0);
    setIsTyping(true);
    setDisplayedMessages([{ type: 'user', content: messages[0].user }]);
  };

  useEffect(() => {
    setDisplayedMessages([]);
    setCurrentIndex(0);
    setIsTyping(false);
    setShowTypingIndicator(false);
    
    if (isInView) {
      animationTimeoutRef.current = setTimeout(startConversation, 1000);
    }
  }, [messages]);

  const scrollToLatestMessage = () => {
    if (!chatContainerRef.current || !isInView) return;

    const container = chatContainerRef.current;
    const lastMessage = container.lastElementChild;
    
    if (lastMessage) {
      const containerHeight = container.clientHeight;
      const lastMessageTop = lastMessage.getBoundingClientRect().top;
      const containerTop = container.getBoundingClientRect().top;
      const relativePosition = lastMessageTop - containerTop;
      
      if (relativePosition > containerHeight * 0.7) {
        container.scrollTo({
          top: container.scrollTop + (relativePosition - containerHeight * 0.4),
          behavior: 'smooth'
        });
      }
    }
  };

  useEffect(() => {
    if (isInView) {
      const scrollTimeout = setTimeout(scrollToLatestMessage, 100);
      return () => clearTimeout(scrollTimeout);
    }
  }, [displayedMessages, isInView]);

  const handleTypingComplete = () => {
    if (!isInView) return;
    
    setIsTyping(false);
    setShowTypingIndicator(true);
    
    // Add delay before showing bot response
    animationTimeoutRef.current = setTimeout(() => {
      setShowTypingIndicator(false);
      setDisplayedMessages(prev => [...prev, { type: 'bot', content: messages[currentIndex].bot }]);
      
      if (currentIndex < messages.length - 1) {
        animationTimeoutRef.current = setTimeout(() => {
          setCurrentIndex(prev => prev + 1);
          setIsTyping(true);
          setDisplayedMessages(prev => [...prev, { type: 'user', content: messages[currentIndex + 1].user }]);
        }, 4000);
      } else {
        onComplete?.();
      }
    }, 1500); // Delay before bot response appears
  };

  const TypingIndicator = () => (
    <div className="bg-green-500/10 backdrop-blur-sm p-2.5 md:p-3 rounded-lg max-w-[85%] sm:max-w-[75%] ml-auto">
      <span className="inline-flex gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-typing-dot1"></span>
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-typing-dot2"></span>
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-typing-dot3"></span>
      </span>
    </div>
  );

  return (
    <div 
      ref={chatContainerRef}
      className="space-y-3 md:space-y-4 max-h-[400px] overflow-y-auto px-2 md:px-3 py-2 md:py-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
    >
      {displayedMessages.map((msg, idx) => (
        <div
          key={idx}
          className={`${
            msg.type === 'user' 
              ? 'bg-gray-700/50 max-w-[85%] sm:max-w-[75%]' 
              : 'bg-green-500/10 max-w-[85%] sm:max-w-[75%] ml-auto'
          } backdrop-blur-sm p-2.5 md:p-3 rounded-lg transition-all duration-300 text-[15px] md:text-base leading-relaxed animate-fadeIn`}
        >
          {idx === displayedMessages.length - 1 && isTyping && msg.type === 'user' ? (
            <TypewriterText 
              text={msg.content as string}
              delay={70}
              onComplete={handleTypingComplete}
              isVisible={isInView}
            />
          ) : (
            <div className="whitespace-pre-line">{msg.content}</div>
          )}
        </div>
      ))}
      
      {showTypingIndicator && <TypingIndicator />}
    </div>
  );
}