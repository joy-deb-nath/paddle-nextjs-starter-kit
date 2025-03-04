import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <>
      <div className="flex justify-center w-full px-4 pt-24 pb-10">
        <div className="relative inline-flex items-center px-6 py-3 space-x-4 rounded-full bg-gradient-to-r from-[#1A1527] to-[#1A1527] border border-gray-800 border-glow-animation">
          <span className="text-sm font-medium">
            New: Get <span className="text-white">50%</span> off for a limited time!
          </span>
          <Link
            href="/pricing"
            className="inline-flex items-center text-sm font-medium text-indigo-400 hover:text-indigo-300"
          >
            Learn more
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
      <section className="container mx-auto px-4 pb-8 text-center">
        <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
          Your Complete SaaS Solution
          <br />
          For Modern Business Needs
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-gray-400">
          Scale your business with our powerful SaaS platform. Streamlined workflows, advanced analytics, and
          exceptional support.{' '}
          <Link href="/pricing" className="text-indigo-400 hover:text-indigo-300">
            Get started with our pricing plans!
          </Link>
        </p>
      </section>

      {/* Add the CSS for the border glow animation */}
      <style jsx>{`
        .border-glow-animation {
          position: relative;
        }

        .border-glow-animation::before {
          content: '';
          position: absolute;
          top: -1px;
          left: -1px;
          width: calc(100% + 2px);
          height: calc(100% + 2px);
          border-radius: 9999px;
          border: 1px solid transparent;
          background: linear-gradient(
              90deg,
              transparent,
              transparent,
              transparent,
              transparent,
              transparent,
              #4f46e5,
              #8b5cf6,
              #ec4899,
              transparent,
              transparent,
              transparent,
              transparent
            )
            border-box;
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          background-size: 300% 100%;
          animation: borderGlow 4s linear infinite;
          pointer-events: none;
        }

        @keyframes borderGlow {
          0% {
            background-position: 100% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </>
  );
}
