'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';

interface LtvCacChartProps {
  ltv: number;
  cac: number;
}

export function LtvCacChart({ ltv, cac }: LtvCacChartProps) {
  const data = [
    {
      name: 'CAC',
      value: cac,
      color: '#ef4444',
    },
    {
      name: 'LTV',
      value: ltv,
      color: '#22c55e',
    },
  ];

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            className="text-sm"
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            className="text-sm"
            tickFormatter={(value) => `$${value}`}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Ratio: <span className="font-semibold">{(ltv / cac).toFixed(1)}:1</span>
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Target: 3:1 or higher for healthy SaaS
        </p>
      </div>
    </div>
  );
}