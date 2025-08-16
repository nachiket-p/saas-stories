'use client';

import { useMetricsStore } from '@/lib/store/metrics-store';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { SaasyOwl } from './saasy-owl';

export function GuidancePanel() {
  const { analysis, showTips, setShowTips } = useMetricsStore();

  if (!analysis) {
    return (
      <div className="flex items-center justify-center h-32">
        <p className="text-gray-500">Loading guidance...</p>
      </div>
    );
  }

  const { status, feedback, recommendations } = analysis;

  const getStatusIcon = () => {
    switch (status) {
      case 'excellent': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'good': return <TrendingUp className="w-5 h-5 text-blue-600" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'poor': return <AlertTriangle className="w-5 h-5 text-red-600" />;
      default: return <Lightbulb className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case 'excellent':
        return "Hoot hoot! 🦉 Your metrics are soaring! You've built a fantastic, sustainable SaaS business.";
      case 'good':
        return "Well done! 🦉 Your metrics show a healthy business with room for optimization.";
      case 'warning':
        return "Hmm, I see some areas for improvement! 🦉 Let's work together to optimize your metrics.";
      case 'poor':
        return "Don't worry, every SaaS starts somewhere! 🦉 I have some important recommendations for you.";
      default:
        return "Hello! I'm SaaSy the Owl, your metrics guide! 🦉";
    }
  };

  return (
    <div className="space-y-6">
      {/* Mascot Section */}
      <div className="text-center">
        <SaasyOwl status={status} />
        <h3 className="text-lg font-semibold text-gray-900 mt-4 mb-2">
          SaaSy the Owl
        </h3>
        <p className="text-sm text-gray-600 italic">
          Your friendly metrics guide
        </p>
      </div>

      {/* Status Message */}
      <Alert className="border-primary/20 bg-primary/5">
        {getStatusIcon()}
        <AlertDescription className="text-sm leading-relaxed">
          {getStatusMessage()}
        </AlertDescription>
      </Alert>

      {/* Tips Toggle */}
      <div className="text-center">
        <Button 
          variant="outline" 
          onClick={() => setShowTips(!showTips)}
          className="gap-2"
        >
          <Lightbulb className="w-4 h-4" />
          {showTips ? 'Hide Tips' : 'Show Tips & Recommendations'}
        </Button>
      </div>

      {/* Recommendations */}
      {showTips && (
        <div className="space-y-3">
          <h4 className="font-medium text-gray-800 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-yellow-500" />
            SaaSy&apos;s Recommendations
          </h4>
          
          {recommendations.length > 0 ? (
            <div className="space-y-2">
              {recommendations.map((rec, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Badge variant="secondary" className="mt-0.5 text-xs">
                    {index + 1}
                  </Badge>
                  <p className="text-sm text-gray-700">{rec}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <Badge variant="secondary" className="mt-0.5 text-xs">
                  🎉
                </Badge>
                <p className="text-sm text-gray-700">
                  Your metrics look great! Keep monitoring these key areas for continued success.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Metrics Education */}
      <div className="space-y-4 pt-4 border-t">
        <h4 className="font-medium text-gray-800">📚 Quick Reference</h4>
        <div className="space-y-3 text-sm">
          <div>
            <p className="font-medium text-gray-700">LTV:CAC Ratio</p>
            <p className="text-gray-600">Lifetime Value ÷ Customer Acquisition Cost</p>
            <div className="flex gap-1 mt-1">
              <Badge variant="secondary" className="text-xs">3:1+ = Good</Badge>
              <Badge variant="secondary" className="text-xs">5:1+ = Great</Badge>
            </div>
          </div>
          
          <div>
            <p className="font-medium text-gray-700">Payback Period</p>
            <p className="text-gray-600">Time to recover acquisition cost</p>
            <div className="flex gap-1 mt-1">
              <Badge variant="secondary" className="text-xs">&lt;12mo = Good</Badge>
              <Badge variant="secondary" className="text-xs">&lt;6mo = Excellent</Badge>
            </div>
          </div>
          
          <div>
            <p className="font-medium text-gray-700">Churn Rate</p>
            <p className="text-gray-600">Monthly customer loss percentage</p>
            <div className="flex gap-1 mt-1">
              <Badge variant="secondary" className="text-xs">&lt;5% = Good</Badge>
              <Badge variant="secondary" className="text-xs">&lt;2% = Excellent</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}