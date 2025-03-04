'use client';

import { createClient } from '@/utils/supabase/client';
import { useUserInfo } from '@/hooks/useUserInfo';
import { HomePageBackground } from '@/components/gradients/home-page-background';
import { Hero } from '@/components/landing/hero/hero';
import { Features } from '@/components/landing/features/features';
import Header from '@/components/home/header/header';
import { CustomFooter } from '@/components/landing/footer/custom-footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import '../../styles/home-page.css';
import { ArrowRight } from 'lucide-react';
import { TextProcessor } from '@/components/text-processor/text-processor';

export function LandingPage() {
  const supabase = createClient();
  const { user } = useUserInfo(supabase);

  return (
    <>
      <div>
        <HomePageBackground />
        <Header user={user} />

        {/* Hero Section */}
        <Hero />

        {/* Features Section */}
        <Features />

        {/* Text Processor Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl mb-8">AI Text Processor</h2>
            <p className="text-center mt-4 mb-10 text-lg leading-8 text-gray-400 max-w-3xl mx-auto">
              Our advanced text processing tool helps humanize AI-generated content and bypass AI detectors. Perfect for
              content creators, students, and professionals looking to improve their writing.
            </p>
            <TextProcessor />
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16 text-center">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to get started?</h2>
            <p className="mt-6 text-lg leading-8 text-gray-400">
              Join thousands of businesses that trust our platform. Start your journey with a 14-day free trial, no
              credit card required.
            </p>
            <div className="mt-10 flex items-center justify-center gap-6">
              <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700">
                <Link href="/signup">Start Free Trial</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">What Our Customers Say</h2>
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                quote:
                  'This platform completely transformed how we manage our business processes. The ROI has been incredible.',
                author: 'Sarah Johnson',
                title: 'CEO, TechStart Inc.',
              },
              {
                quote:
                  "The analytics features alone are worth the investment. We've gained insights we never thought possible.",
                author: 'Michael Chen',
                title: 'CTO, Data Dynamics',
              },
              {
                quote: 'Customer support is phenomenal. Any questions we had were answered quickly and thoroughly.',
                author: 'Amanda Rodriguez',
                title: 'Operations Manager, Global Solutions',
              },
            ].map((testimonial, index) => (
              <div key={index} className="rounded-lg bg-[#1A1527] p-6">
                <div className="mb-4 text-2xl text-indigo-300">"</div>
                <p className="italic mb-6 text-gray-300">{testimonial.quote}</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-gray-400">{testimonial.title}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <CustomFooter />
      </div>
    </>
  );
}
