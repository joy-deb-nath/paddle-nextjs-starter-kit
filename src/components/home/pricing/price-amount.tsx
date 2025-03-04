import { Tier } from '@/constants/pricing-tier';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { IBillingFrequency } from '@/constants/billing-frequency';

interface Props {
  loading: boolean;
  tier: Tier;
  priceMap: Record<string, string>;
  value: string;
  priceSuffix: string;
  frequency: IBillingFrequency;
}

export function PriceAmount({ loading, priceMap, priceSuffix, tier, value, frequency }: Props) {
  const formatPrice = (priceString: string) => {
    const numericPrice = parseFloat(priceString.replace(/[^0-9.]/g, ''));
    const adjustedPrice = frequency.divideBy ? numericPrice / frequency.divideBy : numericPrice;
    const currencySymbol = priceString.replace(/[\d,.\s]/g, '');
    return `${currencySymbol}${adjustedPrice.toFixed(2)}`.replace(/\.00$/, '');
  };

  return (
    <div className="mt-6 flex flex-col px-8">
      {loading ? (
        <Skeleton className="h-[96px] w-full bg-border" />
      ) : (
        <>
          <div className={cn('text-[80px] leading-[96px] tracking-[-1.6px] font-medium')}>
            {formatPrice(priceMap[tier.priceId[value]])}
          </div>
          <div className={cn('font-medium leading-[12px] text-[12px]')}>{priceSuffix}</div>
        </>
      )}
    </div>
  );
}
