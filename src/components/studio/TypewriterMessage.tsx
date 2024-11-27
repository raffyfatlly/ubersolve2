import React, { useState, useEffect } from 'react';

interface TypewriterMessageProps {
  content: string;
  onComplete?: () => void;
  className?: string;
}

export default function TypewriterMessage({ content, onComplete, className }: TypewriterMessageProps) {
  const [displayedContent, setDisplayedContent] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < content.length) {
      const timeout = setTimeout(() => {
        setDisplayedContent(prev => prev + content[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 10); // Faster typing speed (was 20ms)

      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, content, onComplete]);

  return (
    <p className={`whitespace-pre-wrap ${className}`}>
      {displayedContent}
      {currentIndex < content.length && (
        <span className="text-gray-400">...</span>
      )}
    </p>
  );
}