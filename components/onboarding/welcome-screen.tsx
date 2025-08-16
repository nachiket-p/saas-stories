'use client';

import { useMetricsStore } from '@/lib/store/metrics-store';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { OnboardingLayout } from './onboarding-layout';
import { OwlAnimation } from '@/components/mascot/saasy-owl';
import { TrendingUp, DollarSign, Clock, Users, ArrowRight, Sparkles } from 'lucide-react';
import { ScaleIn, FadeInUp } from '@/components/animations/animated-card';

export function WelcomeScreen() {
  const { setOnboardingStep } = useMetricsStore();

  const handleGetStarted = () => {
    setOnboardingStep(1);
  };

  const metrics = [
    {
      icon: DollarSign,
      title: 'CAC & LTV',
      description: 'Customer acquisition cost vs lifetime value',
      color: 'text-green-600',
    },
    {
      icon: TrendingUp,
      title: 'LTV:CAC Ratio',
      description: 'The golden metric for SaaS success',
      color: 'text-blue-600',
    },
    {
      icon: Clock,
      title: 'Payback Period',
      description: 'Time to recover acquisition costs',
      color: 'text-orange-600',
    },
    {
      icon: Users,
      title: 'Churn & Activation',
      description: 'Retention and engagement metrics',
      color: 'text-purple-600',
    },
  ];

  const benefits = [
    'Turn confusing metrics into clear insights',
    'Learn from real SaaS business scenarios',
    'Get actionable recommendations',
    'Export professional reports',
  ];

  return (
    <OnboardingLayout
      step={0}
      totalSteps={3}
      title="Welcome to Your SaaS Metrics Journey! 🚀"
      subtitle="Transform confusing numbers into actionable insights with your friendly guide"
      showBackButton={false}
      showSkipButton={true}
    >
      <div className="space-y-12">
        {/* Hero Section with Owl */}
        <FadeInUp delay={0.1}>
          <div className="text-center">
            <ScaleIn delay={0.3}>
              <OwlAnimation animationType="welcome" />
            </ScaleIn>
            <div className="mt-6">
              <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
                <Sparkles className="w-3 h-3 mr-1" />
                Meet SaaSy the Owl
              </Badge>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
                Hello there! I&apos;m SaaSy, your personal metrics guide. I&apos;ll help you understand 
                your SaaS business metrics in a fun, easy-to-understand way. No more confusing 
                spreadsheets or overwhelming dashboards!
              </p>
            </div>
          </div>
        </FadeInUp>

        {/* What You'll Learn */}
        <FadeInUp delay={0.4}>
          <div>
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
              What You&apos;ll Master
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {metrics.map((metric, index) => (
                <FadeInUp key={metric.title} delay={0.5 + index * 0.1}>
                  <Card className="p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg bg-gray-50 ${metric.color}`}>
                        <metric.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">{metric.title}</h3>
                        <p className="text-gray-600 text-sm">{metric.description}</p>
                      </div>
                    </div>
                  </Card>
                </FadeInUp>
              ))}
            </div>
          </div>
        </FadeInUp>

        {/* Benefits */}
        <FadeInUp delay={0.8}>
          <Card className="p-8 bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <h3 className="text-xl font-semibold text-center text-gray-900 mb-6">
              Why SaaS Founders Love This Tool
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <FadeInUp key={benefit} delay={0.9 + index * 0.1}>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-green-600"></div>
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                </FadeInUp>
              ))}
            </div>
          </Card>
        </FadeInUp>

        {/* CTA */}
        <FadeInUp delay={1.2}>
          <div className="text-center">
            <Button
              onClick={handleGetStarted}
              size="lg"
              className="gap-3 px-8 py-6 text-lg font-semibold"
            >
              Let&apos;s Get Started
              <ArrowRight className="w-5 h-5" />
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              Takes less than 3 minutes • No signup required
            </p>
          </div>
        </FadeInUp>
      </div>
    </OnboardingLayout>
  );
}