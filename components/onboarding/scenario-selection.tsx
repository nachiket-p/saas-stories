'use client';

import { useState } from 'react';
import { useMetricsStore } from '@/lib/store/metrics-store';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { OnboardingLayout } from './onboarding-layout';
import { SCENARIOS, Scenario } from '@/lib/calculations/scenarios';
import { MetricCard } from '@/components/charts/metric-card';
import { analyzeMetrics } from '@/lib/calculations/metrics';
import { 
  TrendingUp, 
  ArrowRight, 
  DollarSign,
  Users,
  Calendar,
  Target,
  CheckCircle2
} from 'lucide-react';
import { FadeInUp, AnimatedCard } from '@/components/animations/animated-card';

export function ScenarioSelection() {
  const { setCurrentScenario, updateInput, completeOnboarding, setOnboardingStep } = useMetricsStore();
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);

  const handleBack = () => {
    setOnboardingStep(1);
  };

  const handleScenarioSelect = (scenario: Scenario) => {
    setSelectedScenario(scenario);
  };

  const handleComplete = () => {
    if (selectedScenario) {
      setCurrentScenario(selectedScenario.id);
      updateInput(selectedScenario.metrics);
      completeOnboarding();
    }
  };

  const getScenarioPreview = (scenario: Scenario) => {
    const analysis = analyzeMetrics(scenario.metrics);
    return analysis;
  };

  return (
    <OnboardingLayout
      step={2}
      totalSteps={3}
      title="Choose Your Learning Journey"
      subtitle="Select a SaaS founder's story to explore their metrics"
      showBackButton={true}
      onBack={handleBack}
    >
      <div className="space-y-8">
        {/* Scenario Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {SCENARIOS.map((scenario, index) => {
            const analysis = getScenarioPreview(scenario);
            const isSelected = selectedScenario?.id === scenario.id;
            
            return (
              <FadeInUp key={scenario.id} delay={index * 0.1}>
                <AnimatedCard>
                  <Card 
                    className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                      isSelected 
                        ? 'ring-2 ring-primary border-primary shadow-lg' 
                        : 'hover:border-primary/30'
                    }`}
                    onClick={() => handleScenarioSelect(scenario)}
                  >
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-3xl">{scenario.emoji}</div>
                          <div>
                            <h3 className="font-bold text-lg text-gray-900">
                              {scenario.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {scenario.description}
                            </p>
                          </div>
                        </div>
                        {isSelected && (
                          <CheckCircle2 className="w-6 h-6 text-primary" />
                        )}
                      </div>

                      {/* Story */}
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {scenario.story}
                      </p>

                      {/* Quick Metrics */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <DollarSign className="w-4 h-4 mx-auto text-green-600 mb-1" />
                          <div className="text-xs text-gray-500">CAC</div>
                          <div className="font-semibold text-sm">
                            ${analysis.metrics.cac.toFixed(0)}
                          </div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <TrendingUp className="w-4 h-4 mx-auto text-blue-600 mb-1" />
                          <div className="text-xs text-gray-500">LTV</div>
                          <div className="font-semibold text-sm">
                            ${analysis.metrics.ltv.toFixed(0)}
                          </div>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <Target className="w-4 h-4 mx-auto text-purple-600 mb-1" />
                          <div className="text-xs text-gray-500">Ratio</div>
                          <div className="font-semibold text-sm">
                            {analysis.metrics.ltvCacRatio.toFixed(1)}:1
                          </div>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className="flex justify-center">
                        <Badge className={`${
                          analysis.status === 'excellent' ? 'bg-green-100 text-green-800' :
                          analysis.status === 'good' ? 'bg-blue-100 text-blue-800' :
                          analysis.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {analysis.status === 'excellent' ? '🚀 Excellent Metrics' :
                           analysis.status === 'good' ? '✅ Good Performance' :
                           analysis.status === 'warning' ? '⚠️ Needs Attention' :
                           '🔧 Room for Improvement'}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                </AnimatedCard>
              </FadeInUp>
            );
          })}
        </div>

        {/* Selected Scenario Details */}
        {selectedScenario && (
          <FadeInUp delay={0.5}>
            <Card className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{selectedScenario.emoji}</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      Ready to explore {selectedScenario.name}&apos;s journey?
                    </h3>
                    <p className="text-gray-600">
                      You&apos;ll dive deep into their metrics, challenges, and success strategies
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <Users className="w-6 h-6 mx-auto text-blue-600 mb-2" />
                    <div className="text-sm text-gray-500">Customers/Month</div>
                    <div className="font-semibold">{selectedScenario.metrics.customersAcquired}</div>
                  </div>
                  <div className="text-center">
                    <DollarSign className="w-6 h-6 mx-auto text-green-600 mb-2" />
                    <div className="text-sm text-gray-500">Revenue/Customer</div>
                    <div className="font-semibold">${selectedScenario.metrics.monthlyRevenue}</div>
                  </div>
                  <div className="text-center">
                    <Calendar className="w-6 h-6 mx-auto text-orange-600 mb-2" />
                    <div className="text-sm text-gray-500">Avg Lifetime</div>
                    <div className="font-semibold">{selectedScenario.metrics.customerLifetimeMonths}mo</div>
                  </div>
                  <div className="text-center">
                    <TrendingUp className="w-6 h-6 mx-auto text-purple-600 mb-2" />
                    <div className="text-sm text-gray-500">Churn Rate</div>
                    <div className="font-semibold">{selectedScenario.metrics.churnRate}%</div>
                  </div>
                </div>

                <div className="text-center">
                  <Button
                    onClick={handleComplete}
                    size="lg"
                    className="gap-2 px-8"
                  >
                    Start Exploring {selectedScenario.name}&apos;s Story
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </FadeInUp>
        )}

        {/* Instructions */}
        {!selectedScenario && (
          <FadeInUp delay={0.6}>
            <div className="text-center">
              <p className="text-gray-600 text-sm">
                👆 Click on any founder above to see their detailed metrics and story
              </p>
            </div>
          </FadeInUp>
        )}
      </div>
    </OnboardingLayout>
  );
}