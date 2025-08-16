import { MetricsInput } from './metrics';

export interface Scenario {
  id: string;
  name: string;
  description: string;
  character: string;
  emoji: string;
  metrics: MetricsInput;
  story: string;
}

export const SCENARIOS: Scenario[] = [
  {
    id: 'producthunt-pete',
    name: 'ProductHunt Pete',
    character: 'ProductHunt Pete',
    emoji: '🚀',
    description: 'Just launched SaaS with a few beta users',
    story: 'Pete just launched his SaaS on ProductHunt and is burning through his marketing budget to get those first users. High CAC, low retention - the classic startup struggle!',
    metrics: {
      monthlyRevenue: 20,
      customerLifetimeMonths: 4,
      marketingSpend: 2000,
      customersAcquired: 10,
      churnRate: 15,
      activationRate: 45,
    },
  },
  {
    id: 'indie-anna',
    name: 'Indie Anna',
    character: 'Indie Anna',
    emoji: '🎯',
    description: 'Bootstrapped SaaS with loyal user base',
    story: 'Anna built her SaaS the lean way - word of mouth, content marketing, and genuine customer relationships. Lower CAC, higher retention. The bootstrap dream!',
    metrics: {
      monthlyRevenue: 15,
      customerLifetimeMonths: 18,
      marketingSpend: 400,
      customersAcquired: 10,
      churnRate: 3,
      activationRate: 85,
    },
  },
  {
    id: 'vc-vikram',
    name: 'VC Vikram',
    character: 'VC Vikram',
    emoji: '💰',
    description: 'Funded startup with aggressive spending',
    story: 'Vikram raised a Series A and is scaling fast. High CAC from paid acquisition, but also charging premium prices. The growth-at-all-costs approach!',
    metrics: {
      monthlyRevenue: 60,
      customerLifetimeMonths: 10,
      marketingSpend: 3500,
      customersAcquired: 10,
      churnRate: 8,
      activationRate: 70,
    },
  },
  {
    id: 'churn-buster-bella',
    name: 'Churn Buster Bella',
    character: 'Churn Buster Bella',
    emoji: '🛡️',
    description: 'Retention-focused, mature SaaS',
    story: 'Bella has been in the game for years. She&apos;s obsessed with customer success and retention. Lower CAC through referrals, amazing lifetime value. The sustainable growth master!',
    metrics: {
      monthlyRevenue: 30,
      customerLifetimeMonths: 36,
      marketingSpend: 1000,
      customersAcquired: 10,
      churnRate: 1.5,
      activationRate: 95,
    },
  },
];

export function getScenarioById(id: string): Scenario | undefined {
  return SCENARIOS.find(scenario => scenario.id === id);
}