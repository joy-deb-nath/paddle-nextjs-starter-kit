export function Features() {
  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
        Why Choose Our SaaS
        <br />
        Platform
      </h2>
      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl bg-[#1A1527] p-8">
          <div className="mb-6 text-4xl font-bold text-indigo-500">100%</div>
          <h3 className="mb-4 text-xl font-bold">Reliable & Secure Platform</h3>
          <p className="text-gray-400">
            Our platform provides enterprise-grade security with 99.9% uptime guarantee. Your data is always safe,
            secure, and accessible when you need it.
          </p>
        </div>
        <div className="rounded-xl bg-[#1A1527] p-8">
          <div className="mb-6">
            <div className="h-8 w-48 rounded bg-indigo-600/20" />
            <div className="mt-2 h-4 w-32 rounded bg-indigo-600/20" />
          </div>
          <h3 className="mb-4 text-xl font-bold">Advanced Analytics</h3>
          <p className="text-gray-400">
            Gain valuable insights with our comprehensive analytics suite. Make data-driven decisions that drive growth
            and optimize your business processes.
          </p>
        </div>
        <div className="rounded-xl bg-[#1A1527] p-8">
          <div className="mb-6 text-indigo-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <h3 className="mb-4 text-xl font-bold">Seamless Integration</h3>
          <p className="text-gray-400">
            Connect with your favorite tools and services through our extensive API and pre-built integrations. No
            coding required to expand your workflow.
          </p>
        </div>
      </div>
    </section>
  );
}
