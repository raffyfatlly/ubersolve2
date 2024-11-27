import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string | React.ReactNode;
  delay?: number;
  onComplete?: () => void;
  isVisible?: boolean;
}

export default function TypewriterText({ text, delay = 30, onComplete, isVisible = true }: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    if (typeof text === 'string') {
      if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
          const char = text[currentIndex];
          setDisplayedText(prev => prev + char);
          setCurrentIndex(prev => prev + 1);
        }, delay);
        return () => clearTimeout(timeout);
      } else if (!isComplete) {
        setIsComplete(true);
        onComplete?.();
      }
    }
  }, [currentIndex, delay, text, isComplete, onComplete, isVisible]);

  // Reset when visibility changes
  useEffect(() => {
    if (!isVisible) {
      setDisplayedText('');
      setCurrentIndex(0);
      setIsComplete(false);
    }
  }, [isVisible]);

  // If text is a React node, render it directly
  if (typeof text !== 'string') {
    return <>{text}</>;
  }

  return <span className="transition-all duration-75">{displayedText}</span>;
}