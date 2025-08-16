import { create } from 'zustand';
import { MetricsInput, MetricsAnalysis, analyzeMetrics, DEFAULT_METRICS } from '../calculations/metrics';
import { Scenario } from '../calculations/scenarios';

interface MetricsStore {
  // Current metrics data
  input: MetricsInput;
  analysis: MetricsAnalysis | null;
  
  // Current scenario
  selectedScenario: Scenario | null;
  
  // UI state
  isAnimating: boolean;
  showTips: boolean;
  currentAnimation: string | null;
  
  // Onboarding state
  hasCompletedOnboarding: boolean;
  onboardingStep: number;
  selectedPath: 'own-data' | 'scenarios' | null;
  isFirstVisit: boolean;
  
  // Actions
  updateInput: (input: Partial<MetricsInput>) => void;
  setScenario: (scenario: Scenario | null) => void;
  recalculate: () => void;
  setAnimating: (animating: boolean) => void;
  setShowTips: (show: boolean) => void;
  setCurrentAnimation: (animation: string | null) => void;
  reset: () => void;
  
  // Onboarding actions
  setOnboardingStep: (step: number) => void;
  setSelectedPath: (path: 'own-data' | 'scenarios' | null) => void;
  completeOnboarding: () => void;
  skipOnboarding: () => void;
  resetOnboarding: () => void;
}

// Check if user has completed onboarding before
const getInitialOnboardingState = () => {
  if (typeof window !== 'undefined') {
    const completed = localStorage.getItem('saas-metrics-onboarding-completed');
    return completed === 'true';
  }
  return false;
};

export const useMetricsStore = create<MetricsStore>((set, get) => ({
  // Initial state
  input: DEFAULT_METRICS,
  analysis: analyzeMetrics(DEFAULT_METRICS),
  selectedScenario: null,
  isAnimating: false,
  showTips: false,
  currentAnimation: null,
  
  // Onboarding initial state
  hasCompletedOnboarding: getInitialOnboardingState(),
  onboardingStep: 0,
  selectedPath: null,
  isFirstVisit: true,

  // Actions
  updateInput: (newInput) => {
    const currentInput = get().input;
    const updatedInput = { ...currentInput, ...newInput };
    const analysis = analyzeMetrics(updatedInput);
    
    set({
      input: updatedInput,
      analysis,
      selectedScenario: null, // Clear scenario when manually editing
    });
  },

  setScenario: (scenario) => {
    if (scenario) {
      const analysis = analyzeMetrics(scenario.metrics);
      set({
        selectedScenario: scenario,
        input: scenario.metrics,
        analysis,
      });
    } else {
      set({
        selectedScenario: null,
      });
    }
  },

  recalculate: () => {
    const input = get().input;
    const analysis = analyzeMetrics(input);
    set({ analysis });
  },

  setAnimating: (animating) => {
    set({ isAnimating: animating });
  },

  setShowTips: (show) => {
    set({ showTips: show });
  },

  setCurrentAnimation: (animation) => {
    set({ currentAnimation: animation });
  },

  reset: () => {
    const analysis = analyzeMetrics(DEFAULT_METRICS);
    set({
      input: DEFAULT_METRICS,
      analysis,
      selectedScenario: null,
      isAnimating: false,
      showTips: false,
      currentAnimation: null,
    });
  },

  // Onboarding actions
  setOnboardingStep: (step) => {
    set({ onboardingStep: step });
  },

  setSelectedPath: (path) => {
    set({ selectedPath: path });
  },

  completeOnboarding: () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('saas-metrics-onboarding-completed', 'true');
    }
    set({
      hasCompletedOnboarding: true,
      onboardingStep: 0,
      selectedPath: null,
      isFirstVisit: false,
    });
  },

  skipOnboarding: () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('saas-metrics-onboarding-completed', 'true');
    }
    set({
      hasCompletedOnboarding: true,
      onboardingStep: 0,
      selectedPath: null,
      isFirstVisit: false,
    });
  },

  resetOnboarding: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('saas-metrics-onboarding-completed');
    }
    set({
      hasCompletedOnboarding: false,
      onboardingStep: 0,
      selectedPath: null,
      isFirstVisit: true,
    });
  },
}));