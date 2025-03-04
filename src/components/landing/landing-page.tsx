'use client';

import { createClient } from '@/utils/supabase/client';
import { useUserInfo } from '@/hooks/useUserInfo';
import '../../styles/home-page.css';
import { LocalizationBanner } from '@/components/home/header/localization-banner';
import Header from '@/components/home/header/header';
import { HomePageBackground } from '@/components/gradients/home-page-background';
import { Footer } from '@/components/home/footer/footer';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function LandingPage() {
  const supabase = createClient();
  const { user } = useUserInfo(supabase);

  return (
    <>
      <LocalizationBanner country="US" onCountryChange={() => {}} />
      <div>
        <HomePageBackground />
        <Header user={user} />

        <main className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              Your SaaS Solution
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Streamline your workflow, collaborate seamlessly, and scale your business with our powerful SaaS platform.
              Built with cutting-edge technology to deliver exceptional performance.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button asChild size="lg">
                <Link href="/signup">Get started</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/pricing" className="flex items-center">
                  View pricing <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="mt-32 grid grid-cols-1 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
            {[
              {
                title: 'Feature One',
                description: 'Powerful tools to streamline your workflow and boost productivity.',
                icon: '✨',
              },
              {
                title: 'Feature Two',
                description: 'Real-time collaboration for teams of any size.',
                icon: '🔄',
              },
              {
                title: 'Feature Three',
                description: 'Enterprise-grade security to protect your valuable data.',
                icon: '🛡️',
              },
            ].map((feature, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900 text-2xl">
                  {feature.icon}
                </div>
                <h3 className="mt-6 text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
