'use client';

import { useState } from 'react';
import { useMetricsStore } from '@/lib/store/metrics-store';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { OnboardingLayout } from './onboarding-layout';
import { MetricCard } from '@/components/charts/metric-card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  DollarSign, 
  Users, 
  Calendar, 
  TrendingUp,
  ArrowRight,
  Lightbulb,
  CheckCircle 
} from 'lucide-react';
import { FadeInUp, AnimatedCard } from '@/components/animations/animated-card';
import { MetricsInput, analyzeMetrics } from '@/lib/calculations/metrics';

export function DataInputFlow() {
  const { updateInput, completeOnboarding, setOnboardingStep } = useMetricsStore();
  
  const [formData, setFormData] = useState<MetricsInput>({
    monthlyRevenue: 25,
    customerLifetimeMonths: 12,
    marketingSpend: 1000,
    customersAcquired: 10,
    churnRate: 5,
    activationRate: 65,
  });

  const [currentStep, setCurrentStep] = useState(0);

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      setOnboardingStep(1);
    }
  };

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    updateInput(formData);
    completeOnboarding();
  };

  const updateFormData = (field: keyof MetricsInput, value: number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Calculate preview metrics
  const previewAnalysis = analyzeMetrics(formData);
  const { metrics, status } = previewAnalysis;

  const steps = [
    {
      title: 'Revenue & Customers',
      icon: DollarSign,
      fields: [
        {
          key: 'monthlyRevenue' as keyof MetricsInput,
          label: 'Monthly Revenue per Customer',
          description: 'How much does each customer pay you monthly?',
          placeholder: '25',
          prefix: '$',
        },
        {
          key: 'customerLifetimeMonths' as keyof MetricsInput,
          label: 'Average Customer Lifetime',
          description: 'How many months do customers typically stay?',
          placeholder: '12',
          suffix: 'months',
        },
      ],
    },
    {
      title: 'Acquisition Costs',
      icon: Users,
      fields: [
        {
          key: 'marketingSpend' as keyof MetricsInput,
          label: 'Monthly Marketing Spend',
          description: 'Total amount spent on customer acquisition',
          placeholder: '1000',
          prefix: '$',
        },
        {
          key: 'customersAcquired' as keyof MetricsInput,
          label: 'New Customers per Month',
          description: 'How many new customers do you acquire monthly?',
          placeholder: '10',
          suffix: 'customers',
        },
      ],
    },
    {
      title: 'Engagement Metrics',
      icon: TrendingUp,
      fields: [
        {
          key: 'churnRate' as keyof MetricsInput,
          label: 'Monthly Churn Rate',
          description: 'What percentage of customers cancel each month?',
          placeholder: '5',
          suffix: '%',
        },
        {
          key: 'activationRate' as keyof MetricsInput,
          label: 'Activation Rate',
          description: 'What percentage of signups become active users?',
          placeholder: '65',
          suffix: '%',
        },
      ],
    },
  ];

  const currentStepData = steps[currentStep];

  return (
    <OnboardingLayout
      step={2}
      totalSteps={3}
      title="Tell Us About Your SaaS"
      subtitle="Help us understand your business metrics"
      showBackButton={true}
      onBack={handleBack}
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Step Progress */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {steps.map((step, index) => (
            <div 
              key={step.title}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                index === currentStep 
                  ? 'bg-primary text-white' 
                  : index < currentStep
                  ? 'bg-green-100 text-green-800'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              {index < currentStep ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <step.icon className="w-4 h-4" />
              )}
              <span className="text-sm font-medium">{step.title}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <FadeInUp>
            <Card className="p-6">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <currentStepData.icon className="w-5 h-5 text-primary" />
                  {currentStepData.title}
                </h3>
                <p className="text-gray-600 mt-2">
                  Step {currentStep + 1} of {steps.length}
                </p>
              </div>

              <div className="space-y-6">
                {currentStepData.fields.map((field) => (
                  <div key={field.key} className="space-y-2">
                    <Label htmlFor={field.key}>
                      {field.label}
                    </Label>
                    <div className="relative">
                      {field.prefix && (
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                          {field.prefix}
                        </span>
                      )}
                      <Input
                        id={field.key}
                        type="number"
                        value={formData[field.key]}
                        onChange={(e) => updateFormData(field.key, Number(e.target.value))}
                        placeholder={field.placeholder}
                        className={`${field.prefix ? 'pl-8' : ''} ${field.suffix ? 'pr-20' : ''}`}
                      />
                      {field.suffix && (
                        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                          {field.suffix}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{field.description}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 mt-8">
                {currentStep > 0 && (
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="flex-1"
                  >
                    Previous
                  </Button>
                )}
                <Button
                  onClick={handleNext}
                  className="flex-1 gap-2"
                >
                  {currentStep === 2 ? 'Complete Setup' : 'Next Step'}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </FadeInUp>

          {/* Live Preview */}
          <FadeInUp delay={0.2}>
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Live Preview
                </h3>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <MetricCard
                    title="CAC"
                    value={`$${metrics.cac.toFixed(0)}`}
                    subtitle="Acquisition Cost"
                    color={metrics.cac > 100 ? 'red' : metrics.cac > 50 ? 'yellow' : 'green'}
                  />
                  <MetricCard
                    title="LTV"
                    value={`$${metrics.ltv.toFixed(0)}`}
                    subtitle="Lifetime Value"
                    color={metrics.ltv > 500 ? 'green' : metrics.ltv > 200 ? 'yellow' : 'red'}
                  />
                </div>

                <div className="text-center">
                  <Badge className={`${
                    status === 'excellent' ? 'bg-green-100 text-green-800' :
                    status === 'good' ? 'bg-blue-100 text-blue-800' :
                    status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    LTV:CAC Ratio: {metrics.ltvCacRatio.toFixed(1)}:1
                  </Badge>
                </div>
              </Card>

              <Alert>
                <Lightbulb className="w-4 h-4" />
                <AlertDescription>
                  <strong>Pro tip:</strong> Your metrics will update in real-time as you input data. 
                  Don&apos;t worry about being perfect - you can always adjust later!
                </AlertDescription>
              </Alert>
            </div>
          </FadeInUp>
        </div>
      </div>
    </OnboardingLayout>
  );
}