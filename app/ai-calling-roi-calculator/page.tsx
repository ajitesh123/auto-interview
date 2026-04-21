import React from 'react'
import Calculator from '@/components/Calculator'
import AppLayout from '@/components/AppLayout'

export const metadata = {
  title: 'AI Calling ROI Calculator | Tough Tongue AI',
  description:
    'Calculate your savings, costs, and conversions using Tough Tongue AI compared to other voice agent platforms.',
}

export default function CalculatorPage() {
  return (
    <AppLayout>
      <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              Voice AI ROI Calculator
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-500">
              See exactly how much you can save and how many more leads you can generate by
              switching to Tough Tongue AI.
            </p>
          </div>

          <div className="mt-10">
            <Calculator />
          </div>

          {/* Schedule Demo CTA */}
          <div className="relative mx-auto mt-16 max-w-4xl overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-xl sm:p-12">
            <h2 className="relative z-10 mb-4 text-3xl font-extrabold tracking-tight text-black sm:text-4xl">
              Want to know more about AI Calling?
            </h2>
            <p className="relative z-10 mx-auto mb-8 text-lg text-gray-600 sm:text-xl">
              Schedule a quick demo with us for free and see how our platform can supercharge your
              sales team.
            </p>
            <a
              href="https://cal.com/ajitesh/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-replicate-hero relative z-10 inline-flex items-center justify-center rounded-full px-10 py-5 text-lg font-bold text-white shadow-lg shadow-pink-500/30 transition-transform hover:scale-105 hover:opacity-95"
            >
              Schedule Your Free Demo
            </a>

            {/* Decorative background circle */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-pink-50 opacity-50 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-orange-50 opacity-50 blur-3xl" />
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
