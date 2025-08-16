'use client';

import { useMetricsStore } from '@/lib/store/metrics-store';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SCENARIOS } from '@/lib/calculations/scenarios';
import { ChevronDown, RefreshCw } from 'lucide-react';

export function InputPanel() {
  const { input, selectedScenario, updateInput, setScenario, reset } = useMetricsStore();

  const formatCurrency = (value: number) => `$${value.toLocaleString()}`;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Metrics Input</h3>
        <Button variant="outline" size="sm" onClick={reset}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>

      {/* Scenario Selector */}
      <div className="space-y-2">
        <Label>Quick Scenarios</Label>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {selectedScenario ? (
                <span className="flex items-center gap-2">
                  <span>{selectedScenario.emoji}</span>
                  {selectedScenario.name}
                </span>
              ) : (
                'Choose a scenario'
              )}
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full">
            <DropdownMenuItem onClick={() => setScenario(null)}>
              Custom Input
            </DropdownMenuItem>
            {SCENARIOS.map((scenario) => (
              <DropdownMenuItem
                key={scenario.id}
                onClick={() => setScenario(scenario)}
              >
                <span className="flex items-center gap-2">
                  <span>{scenario.emoji}</span>
                  {scenario.name}
                </span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        {selectedScenario && (
          <Badge variant="secondary" className="text-xs">
            {selectedScenario.description}
          </Badge>
        )}
      </div>

      {/* Revenue Inputs */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-800 border-b pb-2">💰 Revenue</h4>
        
        <div className="space-y-2">
          <Label htmlFor="monthlyRevenue">
            How much does a happy customer pay you every month?
          </Label>
          <Input
            id="monthlyRevenue"
            type="number"
            value={input.monthlyRevenue}
            onChange={(e) => updateInput({ monthlyRevenue: Number(e.target.value) })}
            placeholder="25"
          />
          <p className="text-xs text-gray-500">Monthly Revenue Per Customer (ARPU)</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="customerLifetime">
            How long do they usually stay before flying off?
          </Label>
          <Input
            id="customerLifetime"
            type="number"
            value={input.customerLifetimeMonths}
            onChange={(e) => updateInput({ customerLifetimeMonths: Number(e.target.value) })}
            placeholder="12"
          />
          <p className="text-xs text-gray-500">Customer Lifetime (months)</p>
        </div>
      </div>

      {/* Acquisition Inputs */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-800 border-b pb-2">🎯 Acquisition</h4>
        
        <div className="space-y-2">
          <Label htmlFor="marketingSpend">
            How much gold (money) do you spend to recruit customers?
          </Label>
          <Input
            id="marketingSpend"
            type="number"
            value={input.marketingSpend}
            onChange={(e) => updateInput({ marketingSpend: Number(e.target.value) })}
            placeholder="1000"
          />
          <p className="text-xs text-gray-500">Total Marketing Spend</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="customersAcquired">
            How many new customers did you recruit?
          </Label>
          <Input
            id="customersAcquired"
            type="number"
            value={input.customersAcquired}
            onChange={(e) => updateInput({ customersAcquired: Number(e.target.value) })}
            placeholder="10"
          />
          <p className="text-xs text-gray-500">New Customers Acquired</p>
        </div>
      </div>

      {/* Engagement Inputs */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-800 border-b pb-2">📈 Engagement</h4>
        
        <div className="space-y-2">
          <Label htmlFor="churnRate">
            What % of customers leave each month?
          </Label>
          <Input
            id="churnRate"
            type="number"
            step="0.1"
            value={input.churnRate}
            onChange={(e) => updateInput({ churnRate: Number(e.target.value) })}
            placeholder="5"
          />
          <p className="text-xs text-gray-500">Monthly Churn Rate (%)</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="activationRate">
            What % of signups become active users?
          </Label>
          <Input
            id="activationRate"
            type="number"
            value={input.activationRate}
            onChange={(e) => updateInput({ activationRate: Number(e.target.value) })}
            placeholder="65"
          />
          <p className="text-xs text-gray-500">Activation Rate (%)</p>
        </div>
      </div>
    </div>
  );
}