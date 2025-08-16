'use client';

import { Card } from '@/components/ui/card';

interface MetricCardProps {
  title: string;
  value: string;
  subtitle: string;
  color: 'green' | 'yellow' | 'red' | 'blue';
}

export function MetricCard({ title, value, subtitle, color }: MetricCardProps) {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'green': return 'border-green-200 bg-green-50 text-green-800';
      case 'yellow': return 'border-yellow-200 bg-yellow-50 text-yellow-800';
      case 'red': return 'border-red-200 bg-red-50 text-red-800';
      case 'blue': return 'border-blue-200 bg-blue-50 text-blue-800';
      default: return 'border-gray-200 bg-gray-50 text-gray-800';
    }
  };

  return (
    <Card className={`p-4 text-center ${getColorClasses(color)}`}>
      <div className="space-y-1">
        <p className="text-sm font-medium opacity-80">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-xs opacity-70">{subtitle}</p>
      </div>
    </Card>
  );
}