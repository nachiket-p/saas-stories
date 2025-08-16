'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

interface ChurnActivationChartProps {
  churnRate: number;
  activationRate: number;
}

export function ChurnActivationChart({ churnRate, activationRate }: ChurnActivationChartProps) {
  const data = [
    {
      name: 'Activated Users',
      value: activationRate,
      color: '#22c55e',
    },
    {
      name: 'Not Activated',
      value: 100 - activationRate,
      color: '#e5e7eb',
    },
  ];

  const churnData = [
    {
      name: 'Retained',
      value: 100 - churnRate,
      color: '#3b82f6',
    },
    {
      name: 'Churned',
      value: churnRate,
      color: '#ef4444',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Activation Rate */}
      <div className="text-center">
        <h5 className="font-medium mb-4 text-gray-700">Activation Rate</h5>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                dataKey="value"
                startAngle={90}
                endAngle={450}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2">
          <p className="text-lg font-semibold text-green-600">{activationRate}%</p>
          <p className="text-xs text-gray-500">
            Target: 70%+ activation rate
          </p>
        </div>
      </div>

      {/* Churn Rate */}
      <div className="text-center">
        <h5 className="font-medium mb-4 text-gray-700">Monthly Retention</h5>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={churnData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                dataKey="value"
                startAngle={90}
                endAngle={450}
              >
                {churnData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2">
          <p className="text-lg font-semibold text-blue-600">{(100 - churnRate).toFixed(1)}%</p>
          <p className="text-xs text-gray-500">
            Churn: {churnRate}% | Target: &lt;5% monthly churn
          </p>
        </div>
      </div>
    </div>
  );
}