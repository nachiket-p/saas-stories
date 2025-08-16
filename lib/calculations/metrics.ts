export interface MetricsInput {
  monthlyRevenue: number;
  customerLifetimeMonths: number;
  marketingSpend: number;
  customersAcquired: number;
  churnRate: number;
  activationRate: number;
}

export interface MetricsOutput {
  cac: number;
  ltv: number;
  ltvCacRatio: number;
  paybackPeriod: number;
  monthlyChurnRate: number;
  activationRate: number;
}

export interface MetricsAnalysis {
  metrics: MetricsOutput;
  status: 'excellent' | 'good' | 'warning' | 'poor';
  feedback: string;
  recommendations: string[];
}

export function calculateMetrics(input: MetricsInput): MetricsOutput {
  const cac = input.customersAcquired > 0 ? input.marketingSpend / input.customersAcquired : 0;
  const ltv = input.monthlyRevenue * input.customerLifetimeMonths;
  const ltvCacRatio = cac > 0 ? ltv / cac : 0;
  const paybackPeriod = input.monthlyRevenue > 0 ? cac / input.monthlyRevenue : 0;

  return {
    cac,
    ltv,
    ltvCacRatio,
    paybackPeriod,
    monthlyChurnRate: input.churnRate,
    activationRate: input.activationRate,
  };
}

export function analyzeMetrics(input: MetricsInput): MetricsAnalysis {
  const metrics = calculateMetrics(input);
  let status: MetricsAnalysis['status'] = 'poor';
  let feedback = '';
  const recommendations: string[] = [];

  // Analyze LTV:CAC ratio
  if (metrics.ltvCacRatio >= 3) {
    if (metrics.ltvCacRatio >= 5) {
      status = 'excellent';
      feedback = "🎉 Outstanding! Your LTV:CAC ratio shows a very healthy and profitable business model.";
    } else {
      status = 'good';
      feedback = "✅ Great job! Your LTV:CAC ratio indicates a solid, profitable business.";
    }
  } else if (metrics.ltvCacRatio >= 1) {
    status = 'warning';
    feedback = "⚠️ Your LTV:CAC ratio needs improvement. You're making money, but efficiency could be better.";
  } else {
    status = 'poor';
    feedback = "🚨 Critical! Your customer acquisition cost exceeds lifetime value. This needs immediate attention.";
  }

  // Generate recommendations
  if (metrics.ltvCacRatio < 3) {
    if (metrics.cac > metrics.ltv * 0.33) {
      recommendations.push("Reduce customer acquisition costs by optimizing your marketing channels");
    }
    if (input.customerLifetimeMonths < 12) {
      recommendations.push("Focus on retention strategies to increase customer lifetime");
    }
    if (input.monthlyRevenue < 50) {
      recommendations.push("Consider upselling or increasing pricing to boost monthly revenue per customer");
    }
  }

  if (input.churnRate > 5) {
    recommendations.push("High churn rate detected - implement customer success programs");
  }

  if (input.activationRate < 70) {
    recommendations.push("Improve onboarding to increase activation rate");
  }

  if (metrics.paybackPeriod > 12) {
    recommendations.push("Payback period is too long - focus on faster revenue generation or lower CAC");
  }

  return {
    metrics,
    status,
    feedback,
    recommendations,
  };
}

export const DEFAULT_METRICS: MetricsInput = {
  monthlyRevenue: 25,
  customerLifetimeMonths: 12,
  marketingSpend: 1000,
  customersAcquired: 10,
  churnRate: 5,
  activationRate: 65,
};