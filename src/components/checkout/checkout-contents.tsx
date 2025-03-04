'use client';

import { PriceSection } from '@/components/checkout/price-section';
import { CheckoutFormGradients } from '@/components/gradients/checkout-form-gradients';
import { type Environments, initializePaddle, type Paddle } from '@paddle/paddle-js';
import type { CheckoutEventsData } from '@paddle/paddle-js/types/checkout/events';
import throttle from 'lodash.throttle';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { PricingTier } from '@/constants/pricing-tier';

interface PathParams {
  priceId: string;
  [key: string]: string | string[];
}

interface Props {
  userEmail?: string;
}

export function CheckoutContents({ userEmail }: Props) {
  const router = useRouter();
  const { priceId } = useParams<PathParams>();
  const [quantity, setQuantity] = useState<number>(1);
  const [paddle, setPaddle] = useState<Paddle | null>(null);
  const [checkoutData, setCheckoutData] = useState<CheckoutEventsData | null>(null);

  // Validate if the price ID exists in our pricing tiers
  const isPriceIdValid = useCallback(() => {
    return PricingTier.some((tier) => Object.values(tier.priceId).includes(priceId as string));
  }, [priceId]);

  const handleCheckoutEvents = (event: CheckoutEventsData) => {
    setCheckoutData(event);
  };

  const updateItems = useCallback(
    throttle((paddle: Paddle, priceId: string, quantity: number) => {
      paddle.Checkout.updateItems([{ priceId, quantity }]);
    }, 1000),
    [],
  );

  useEffect(() => {
    // Redirect to home if price ID is invalid
    if (!isPriceIdValid()) {
      router.push('/');
      return;
    }

    if (!paddle?.Initialized && process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN && process.env.NEXT_PUBLIC_PADDLE_ENV) {
      initializePaddle({
        token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
        environment: process.env.NEXT_PUBLIC_PADDLE_ENV as Environments,
        eventCallback: (event) => {
          if (event.data && event.name) {
            handleCheckoutEvents(event.data);
          }
        },
        checkout: {
          settings: {
            variant: 'one-page',
            displayMode: 'inline',
            theme: 'dark',
            allowLogout: !userEmail,
            frameTarget: 'paddle-checkout-frame',
            frameInitialHeight: 450,
            frameStyle: 'width: 100%; background-color: transparent; border: none',
            successUrl: '/checkout/success',
          },
        },
      }).then(async (paddle) => {
        if (paddle && priceId) {
          setPaddle(paddle);
          try {
            await paddle.Checkout.open({
              ...(userEmail && { customer: { email: userEmail } }),
              items: [{ priceId: priceId as string, quantity: 1 }],
            });
          } catch (error) {
            console.error('Paddle checkout error:', error);
            router.push('/');
          }
        }
      });
    }
  }, [paddle?.Initialized, priceId, userEmail, isPriceIdValid, router]);

  useEffect(() => {
    if (paddle && priceId && paddle.Initialized) {
      updateItems(paddle, priceId as string, quantity);
    }
  }, [paddle, priceId, quantity, updateItems]);

  if (!isPriceIdValid()) {
    return null;
  }

  return (
    <div
      className={
        'rounded-lg md:bg-background/80 md:backdrop-blur-[24px] md:p-10 md:pl-16 md:pt-16 md:min-h-[400px] flex flex-col justify-between relative'
      }
    >
      <CheckoutFormGradients />
      <div className={'flex flex-col md:flex-row gap-8 md:gap-16'}>
        <div className={'w-full md:w-[400px]'}>
          <PriceSection checkoutData={checkoutData} quantity={quantity} handleQuantityChange={setQuantity} />
        </div>
        <div className={'min-w-[375px] lg:min-w-[535px]'}>
          <div className={'text-base leading-[20px] font-semibold mb-8'}>Payment details</div>
          <div className={'paddle-checkout-frame'} />
        </div>
      </div>
    </div>
  );
}
