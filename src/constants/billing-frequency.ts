export interface IBillingFrequency {
  value: string;
  label: string;
  priceSuffix: string;
  divideBy?: number;
}

export const BillingFrequency: IBillingFrequency[] = [
  { value: 'month', label: 'Monthly', priceSuffix: 'per month' },
  { value: 'year', label: 'Annual', priceSuffix: 'per month, billed annually', divideBy: 12 },
];
