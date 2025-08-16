'use client';

import { useMetricsStore } from '@/lib/store/metrics-store';
import { WelcomeScreen } from './welcome-screen';
import { PathSelection } from './path-selection';
import { DataInputFlow } from './data-input-flow';
import { ScenarioSelection } from './scenario-selection';

export function OnboardingFlow() {
  const { onboardingStep, selectedPath } = useMetricsStore();

  switch (onboardingStep) {
    case 0:
      return <WelcomeScreen />;
    case 1:
      return <PathSelection />;
    case 2:
      if (selectedPath === 'own-data') {
        return <DataInputFlow />;
      } else if (selectedPath === 'scenarios') {
        return <ScenarioSelection />;
      }
      // Fallback to path selection if no path selected
      return <PathSelection />;
    default:
      return <WelcomeScreen />;
  }
}