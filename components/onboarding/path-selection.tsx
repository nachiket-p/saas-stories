'use client';

import { useMetricsStore } from '@/lib/store/metrics-store';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { OnboardingLayout } from './onboarding-layout';
import { 
  TrendingUp, 
  Users, 
  Rocket, 
  Target, 
  ArrowRight, 
  BarChart3,
  BookOpen,
  Lightbulb 
} from 'lucide-react';
import { FadeInUp, AnimatedCard } from '@/components/animations/animated-card';

export function PathSelection() {
  const { setOnboardingStep, setSelectedPath } = useMetricsStore();

  const handlePathSelection = (path: 'own-data' | 'scenarios') => {
    setSelectedPath(path);
    setOnboardingStep(2);
  };

  const handleBack = () => {
    setOnboardingStep(0);
  };

  return (
    <OnboardingLayout
      step={1}
      totalSteps={3}
      title="Choose Your Learning Path"
      subtitle="How would you like to explore SaaS metrics?"
      showBackButton={true}
      onBack={handleBack}
    >
      <div className="space-y-8">
        {/* Path Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Own Data Path */}
          <FadeInUp delay={0.2}>
            <AnimatedCard>
              <Card className="p-8 h-full cursor-pointer group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/30">
                <div className="text-center space-y-6">
                  <div className="relative">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <BarChart3 className="w-10 h-10 text-primary" />
                    </div>
                    <Badge className="absolute -top-2 -right-2 bg-green-100 text-green-800">
                      🎯 Personalized
                    </Badge>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      Use My Own Data
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Perfect for founders with an existing SaaS business. 
                      Input your real metrics and get personalized insights.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Target className="w-4 h-4 text-primary" />
                      <span>Get specific recommendations for your business</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <span>See exactly where you stand vs benchmarks</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Lightbulb className="w-4 h-4 text-primary" />
                      <span>Export a professional analysis report</span>
                    </div>
                  </div>

                  <Button 
                    onClick={() => handlePathSelection('own-data')}
                    size="lg"
                    className="w-full gap-2 group-hover:gap-3 transition-all"
                  >
                    Analyze My Business
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            </AnimatedCard>
          </FadeInUp>

          {/* Scenarios Path */}
          <FadeInUp delay={0.4}>
            <AnimatedCard>
              <Card className="p-8 h-full cursor-pointer group hover:shadow-lg transition-all duration-300 border-2 hover:border-secondary/30">
                <div className="text-center space-y-6">
                  <div className="relative">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <BookOpen className="w-10 h-10 text-secondary" />
                    </div>
                    <Badge className="absolute -top-2 -right-2 bg-blue-100 text-blue-800">
                      🚀 Educational
                    </Badge>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      Explore Scenarios
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Learn from 4 different SaaS founders&apos; journeys. 
                      Perfect for beginners or anyone wanting to learn.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Users className="w-4 h-4 text-secondary" />
                      <span>Learn from 4 different business models</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Rocket className="w-4 h-4 text-secondary" />
                      <span>Understand real-world challenges & solutions</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <TrendingUp className="w-4 h-4 text-secondary" />
                      <span>See what good and bad metrics look like</span>
                    </div>
                  </div>

                  <Button 
                    onClick={() => handlePathSelection('scenarios')}
                    variant="outline"
                    size="lg"
                    className="w-full gap-2 group-hover:gap-3 transition-all border-secondary/50 hover:border-secondary hover:bg-secondary hover:text-white"
                  >
                    Explore Stories
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            </AnimatedCard>
          </FadeInUp>
        </div>

        {/* Comparison */}
        <FadeInUp delay={0.6}>
          <Card className="p-6 bg-gray-50 max-w-3xl mx-auto">
            <h4 className="font-semibold text-gray-900 text-center mb-4">
              Not sure which path to choose?
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <h5 className="font-medium text-gray-800 mb-2">Choose &quot;Own Data&quot; if:</h5>
                <ul className="space-y-1 text-gray-600">
                  <li>• You have an existing SaaS business</li>
                  <li>• You know your current metrics</li>
                  <li>• You want specific recommendations</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-gray-800 mb-2">Choose &quot;Scenarios&quot; if:</h5>
                <ul className="space-y-1 text-gray-600">
                  <li>• You&apos;re planning to start a SaaS</li>
                  <li>• You want to learn about metrics first</li>
                  <li>• You enjoy learning through stories</li>
                </ul>
              </div>
            </div>
          </Card>
        </FadeInUp>
      </div>
    </OnboardingLayout>
  );
}