'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface PaybackGaugeProps {
  paybackPeriod: number;
}

export function PaybackGauge({ paybackPeriod }: PaybackGaugeProps) {
  // Create gauge data - max 24 months for visual purposes
  const maxPeriod = 24;
  const clampedPeriod = Math.min(paybackPeriod, maxPeriod);
  
  const data = [
    { name: 'Payback', value: clampedPeriod },
    { name: 'Remaining', value: maxPeriod - clampedPeriod },
  ];

  const getColor = (period: number) => {
    if (period <= 6) return '#22c55e'; // Green - Excellent
    if (period <= 12) return '#3b82f6'; // Blue - Good
    if (period <= 18) return '#f59e0b'; // Yellow - Warning
    return '#ef4444'; // Red - Poor
  };

  const color = getColor(paybackPeriod);

  return (
    <div className="h-64 relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            startAngle={90}
            endAngle={-270}
            innerRadius={60}
            outerRadius={90}
            dataKey="value"
          >
            <Cell fill={color} />
            <Cell fill="#f3f4f6" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      
      {/* Center Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold" style={{ color }}>
            {paybackPeriod.toFixed(1)}
          </div>
          <div className="text-sm text-gray-600">months</div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="mt-4 text-center space-y-1">
        <p className="text-sm text-gray-600">
          Time to recover customer acquisition cost
        </p>
        <div className="text-xs text-gray-500">
          <span className="inline-block w-3 h-3 bg-green-500 rounded mr-1"></span>
          ≤6mo: Excellent
          <span className="inline-block w-3 h-3 bg-blue-500 rounded mr-1 ml-2"></span>
          ≤12mo: Good
          <span className="inline-block w-3 h-3 bg-yellow-500 rounded mr-1 ml-2"></span>
          ≤18mo: Fair
        </div>
      </div>
    </div>
  );
}