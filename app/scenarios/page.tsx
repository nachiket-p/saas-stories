'use client';

import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SCENARIOS } from '@/lib/calculations/scenarios';
import { analyzeMetrics } from '@/lib/calculations/metrics';
import { useMetricsStore } from '@/lib/store/metrics-store';
import { FadeInUp, AnimatedCard } from '@/components/animations/animated-card';
import { ArrowLeft, TrendingUp, DollarSign, Users, Target } from 'lucide-react';

export default function ScenariosPage() {
  const { setScenario } = useMetricsStore();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'excellent': return <Badge className="bg-green-100 text-green-800">Excellent</Badge>;
      case 'good': return <Badge className="bg-blue-100 text-blue-800">Good</Badge>;
      case 'warning': return <Badge className="bg-yellow-100 text-yellow-800">Needs Work</Badge>;
      case 'poor': return <Badge className="bg-red-100 text-red-800">Critical</Badge>;
      default: return null;
    }
  };

  const handleSelectScenario = (scenario: typeof SCENARIOS[0]) => {
    setScenario(scenario);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <FadeInUp>
        <div className="max-w-6xl mx-auto mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
              Explore SaaS Scenarios 📊
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Learn from different SaaS business models. Each scenario represents a real-world
              situation with unique challenges and opportunities.
            </p>
          </div>
        </div>
      </FadeInUp>

      {/* Scenarios Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {SCENARIOS.map((scenario, index) => {
          const analysis = analyzeMetrics(scenario.metrics);
          const { metrics, status } = analysis;

          return (
            <FadeInUp key={scenario.id} delay={index * 0.1}>
              <AnimatedCard>
                <Card className="p-6 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{scenario.emoji}</span>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {scenario.name}
                        </h3>
                        <p className="text-sm text-gray-600">{scenario.description}</p>
                      </div>
                    </div>
                    {getStatusBadge(status)}
                  </div>

                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {scenario.story}
                  </p>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <div>
                        <p className="text-sm text-gray-600">LTV:CAC</p>
                        <p className="font-semibold">{metrics.ltvCacRatio.toFixed(1)}:1</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-600">Payback</p>
                        <p className="font-semibold">{metrics.paybackPeriod.toFixed(1)}mo</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-purple-600" />
                      <div>
                        <p className="text-sm text-gray-600">Churn</p>
                        <p className="font-semibold">{metrics.monthlyChurnRate}%</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-orange-600" />
                      <div>
                        <p className="text-sm text-gray-600">Activation</p>
                        <p className="font-semibold">{metrics.activationRate}%</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Link href="/" className="flex-1">
                      <Button 
                        className="w-full" 
                        onClick={() => handleSelectScenario(scenario)}
                      >
                        Explore Scenario
                      </Button>
                    </Link>
                  </div>
                </Card>
              </AnimatedCard>
            </FadeInUp>
          );
        })}
      </div>

      {/* Educational Section */}
      <FadeInUp delay={0.5}>
        <div className="max-w-6xl mx-auto mt-12">
          <Card className="p-8 bg-gradient-to-r from-primary/5 to-secondary/5">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                💡 What You&apos;ll Learn
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Different Business Models</h3>
                  <p className="text-sm text-gray-600">
                    See how bootstrap vs funded, B2B vs B2C, and different pricing strategies affect metrics
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Real-world Trade-offs</h3>
                  <p className="text-sm text-gray-600">
                    Understand the relationship between growth, profitability, and sustainability
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Optimization Strategies</h3>
                  <p className="text-sm text-gray-600">
                    Learn specific tactics for improving CAC, LTV, retention, and activation
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </FadeInUp>
    </div>
  );
}