'use client';

import { useMetricsStore } from '@/lib/store/metrics-store';
import { MetricsDashboard } from '@/components/layout/metrics-dashboard';
import { OnboardingFlow } from '@/components/onboarding/onboarding-flow';

export default function Home() {
  const { hasCompletedOnboarding } = useMetricsStore();

  if (!hasCompletedOnboarding) {
    return <OnboardingFlow />;
  }

  return <MetricsDashboard />;
}
