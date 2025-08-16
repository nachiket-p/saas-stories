'use client';

import { ReactNode } from 'react';
import { useMetricsStore } from '@/lib/store/metrics-store';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { X, ArrowLeft } from 'lucide-react';
import { FadeInUp } from '@/components/animations/animated-card';

interface OnboardingLayoutProps {
  children: ReactNode;
  step: number;
  totalSteps: number;
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  showSkipButton?: boolean;
  onBack?: () => void;
}

export function OnboardingLayout({
  children,
  step,
  totalSteps,
  title,
  subtitle,
  showBackButton = false,
  showSkipButton = true,
  onBack,
}: OnboardingLayoutProps) {
  const { skipOnboarding, setOnboardingStep } = useMetricsStore();

  const progressPercentage = (step / totalSteps) * 100;

  const handleSkip = () => {
    skipOnboarding();
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      setOnboardingStep(Math.max(0, step - 1));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {showBackButton && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBack}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
              )}
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🦉</span>
                  <span className="font-semibold text-gray-900">SaaS Metrics Playground</span>
                </div>
              </div>
            </div>
            
            {showSkipButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSkip}
                className="gap-2 text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
                Skip
              </Button>
            )}
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Step {step} of {totalSteps}</span>
              <span>{Math.round(progressPercentage)}% complete</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <FadeInUp>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        </FadeInUp>

        <FadeInUp delay={0.2}>
          {children}
        </FadeInUp>
      </div>

      {/* Footer */}
      <div className="border-t bg-gray-50/50">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <span>🦉</span>
            <span>Guided by SaaSy the Owl</span>
            <span>•</span>
            <span>Your friendly metrics companion</span>
          </div>
        </div>
      </div>
    </div>
  );
}