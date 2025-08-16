'use client';

import Link from 'next/link';
import { useMetricsStore } from '@/lib/store/metrics-store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InputPanel } from '../forms/input-panel';
import { VisualizationPanel } from '../charts/visualization-panel';
import { GuidancePanel } from '../mascot/guidance-panel';
import { ExportSection } from './export-section';
import { FadeInUp, SlideInLeft, SlideInRight, AnimatedCard } from '../animations/animated-card';
import { BookOpen } from 'lucide-react';

export function MetricsDashboard() {
  const { analysis, selectedScenario } = useMetricsStore();

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <FadeInUp>
        <div className="max-w-7xl mx-auto mb-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
              Your SaaS Business Quest Begins! 🚀
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
              Calculate, understand, and optimize your SaaS metrics in a fun, interactive way.
              Meet SaaSy the Owl - your metrics guide!
            </p>
            <Link href="/scenarios">
              <Button variant="outline" className="gap-2">
                <BookOpen className="w-4 h-4" />
                Explore Scenarios
              </Button>
            </Link>
          </div>
        </div>
      </FadeInUp>

      {/* Three Panel Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Panel - Input Summary */}
        <div className="lg:col-span-3">
          <SlideInLeft delay={0.2}>
            <AnimatedCard>
              <Card className="p-6 h-fit sticky top-4">
                <InputPanel />
              </Card>
            </AnimatedCard>
          </SlideInLeft>
        </div>

        {/* Center Panel - Visual Results */}
        <div className="lg:col-span-6">
          <FadeInUp delay={0.3}>
            <AnimatedCard>
              <Card className="p-6">
                <VisualizationPanel />
              </Card>
            </AnimatedCard>
          </FadeInUp>
        </div>

        {/* Right Panel - Guidance */}
        <div className="lg:col-span-3">
          <SlideInRight delay={0.4}>
            <AnimatedCard>
              <Card className="p-6 h-fit sticky top-4">
                <GuidancePanel />
              </Card>
            </AnimatedCard>
          </SlideInRight>
        </div>
      </div>

      {/* Export Section */}
      <div className="max-w-7xl mx-auto mt-6">
        <ExportSection />
      </div>

      {/* Scenario Status */}
      {selectedScenario && (
        <div className="max-w-7xl mx-auto mt-6">
          <Card className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{selectedScenario.emoji}</span>
              <div>
                <p className="font-semibold text-primary">
                  Currently exploring: {selectedScenario.name}
                </p>
                <p className="text-sm text-gray-600">{selectedScenario.story}</p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}