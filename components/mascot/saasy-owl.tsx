'use client';

import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

interface SaasyOwlProps {
  status: 'excellent' | 'good' | 'warning' | 'poor';
}

export function SaasyOwl({ status }: SaasyOwlProps) {
  const [animationData, setAnimationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // For now, we'll create a simple animated placeholder
  // In a real implementation, you would load the actual Lottie files
  useEffect(() => {
    // Simulate loading animation data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [status]);

  const getOwlEmoji = () => {
    switch (status) {
      case 'excellent': return '🦉✨';
      case 'good': return '🦉👍';
      case 'warning': return '🦉⚠️';
      case 'poor': return '🦉💭';
      default: return '🦉';
    }
  };

  const getOwlMessage = () => {
    switch (status) {
      case 'excellent': return 'Absolutely brilliant!';
      case 'good': return 'Looking good!';
      case 'warning': return 'Needs attention';
      case 'poor': return 'Let&apos;s improve this';
      default: return 'Ready to help!';
    }
  };

  if (isLoading) {
    return (
      <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center animate-pulse">
        <span className="text-2xl">🦉</span>
      </div>
    );
  }

  // Placeholder animated owl - in production, this would use actual Lottie animations
  return (
    <div className="relative">
      <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center animate-bounce">
        <span className="text-3xl">{getOwlEmoji()}</span>
      </div>
      
      {/* Status indicator */}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
        <div className="bg-white px-3 py-1 rounded-full shadow-md border">
          <span className="text-xs font-medium">{getOwlMessage()}</span>
        </div>
      </div>
    </div>
  );
}

// Animation utility for future Lottie integration
export function OwlAnimation({ animationType }: { animationType: string }) {
  // This would load specific Lottie animations based on type
  // For now, returning a placeholder
  return (
    <div className="w-32 h-32 mx-auto">
      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
        <span className="text-4xl">🦉</span>
      </div>
    </div>
  );
}