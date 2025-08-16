'use client';

import { useMetricsStore } from '@/lib/store/metrics-store';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LtvCacChart } from './ltv-cac-chart';
import { PaybackGauge } from './payback-gauge';
import { ChurnActivationChart } from './churn-activation-chart';
import { MetricCard } from './metric-card';

export function VisualizationPanel() {
  const { analysis } = useMetricsStore();

  if (!analysis) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading metrics...</p>
      </div>
    );
  }

  const { metrics, status, feedback } = analysis;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800 border-green-200';
      case 'good': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'poor': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Status Badge and Feedback */}
      <div className="text-center space-y-4">
        <Badge className={`${getStatusColor(status)} px-4 py-2 text-sm font-medium`}>
          {status.toUpperCase()}
        </Badge>
        <p className="text-lg text-gray-700 leading-relaxed">
          {feedback}
        </p>
      </div>

      {/* Key Metrics Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          title="CAC"
          value={`$${metrics.cac.toFixed(0)}`}
          subtitle="Customer Acquisition Cost"
          color={metrics.cac > 100 ? 'red' : metrics.cac > 50 ? 'yellow' : 'green'}
        />
        <MetricCard
          title="LTV"
          value={`$${metrics.ltv.toFixed(0)}`}
          subtitle="Customer Lifetime Value"
          color={metrics.ltv > 500 ? 'green' : metrics.ltv > 200 ? 'yellow' : 'red'}
        />
        <MetricCard
          title="LTV:CAC"
          value={`${metrics.ltvCacRatio.toFixed(1)}:1`}
          subtitle="The Golden Ratio"
          color={metrics.ltvCacRatio >= 3 ? 'green' : metrics.ltvCacRatio >= 1 ? 'yellow' : 'red'}
        />
        <MetricCard
          title="Payback"
          value={`${metrics.paybackPeriod.toFixed(1)}mo`}
          subtitle="Months to Break Even"
          color={metrics.paybackPeriod <= 12 ? 'green' : metrics.paybackPeriod <= 24 ? 'yellow' : 'red'}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LTV vs CAC Bar Chart */}
        <Card className="p-4">
          <h4 className="font-semibold mb-4 text-center">LTV vs CAC Comparison</h4>
          <LtvCacChart ltv={metrics.ltv} cac={metrics.cac} />
        </Card>

        {/* Payback Period Gauge */}
        <Card className="p-4 pb-8">
          <h4 className="font-semibold mb-4 text-center">Payback Period</h4>
          <PaybackGauge paybackPeriod={metrics.paybackPeriod} />
        </Card>
      </div>

      {/* Churn vs Activation */}
      <Card className="p-6 mt-8">
        <h4 className="font-semibold mb-6 text-center">Engagement Health</h4>
        <ChurnActivationChart 
          churnRate={metrics.monthlyChurnRate} 
          activationRate={metrics.activationRate} 
        />
      </Card>
    </div>
  );
}