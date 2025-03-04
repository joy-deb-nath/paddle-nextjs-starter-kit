export interface Tier {
  name: string;
  id: 'basic' | 'standard' | 'plus' | 'agency';
  icon: string;
  description: string;
  features: string[];
  featured: boolean;
  priceId: Record<string, string>;
}

export const PricingTier: Tier[] = [
  {
    name: 'Basic',
    id: 'basic',
    icon: '/assets/icons/price-tiers/free-icon.svg',
    description: '30,000 Words per month for individuals who want to get started.',
    features: ['30,000 Words', 'Basic editing tools', 'Export to PNG and SVG'],
    featured: false,
    priceId: { month: 'pri_01jn3x7d4htzmm4tqrhbkq1ax4', year: 'pri_01jn4dsm64v0t5ss17rj6n7ke6' },
  },
  {
    name: 'Standard',
    id: 'standard',
    icon: '/assets/icons/price-tiers/basic-icon.svg',
    description: '100,000 Words per month for teams who need more flexibility.',
    features: ['100,000 Words', 'Integrations', 'Advanced editing tools', 'Everything in Basic'],
    featured: false,
    priceId: { month: 'pri_01jn3xabvx5kegdn2bd8dtpw16', year: 'pri_01jn4dv84nqhm4ezkmfgq7ngkg' },
  },
  {
    name: 'Plus',
    id: 'plus',
    icon: '/assets/icons/price-tiers/pro-icon.svg',
    description: '200,000 Words per month for extensive collaboration and customization.',
    features: [
      '200,000 Words',
      'Advanced version control',
      'Assets library',
      'Guest accounts',
      'Everything in Standard',
    ],
    featured: true,
    priceId: { month: 'pri_01jn3xgns7x7w2dk5k35n27yfw', year: 'pri_01jn4dxxz4kkbyxkvraa69wzj5' },
  },
  {
    name: 'Agency',
    id: 'agency',
    icon: '/assets/icons/price-tiers/agency-icon.svg',
    description: '500,000 Words per month for large teams and agencies.',
    features: [
      '500,000 Words',
      'Single sign on (SSO)',
      'Priority support',
      'Custom integrations',
      'Everything in Plus',
    ],
    featured: false,
    priceId: { month: 'pri_01jn3xmehaga2btk2wwvvx9je3', year: 'pri_01jn4dz4hxcjgsvvqdpx37gkgc' },
  },
];
