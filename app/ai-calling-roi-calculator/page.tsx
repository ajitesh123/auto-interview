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
        </div>
      </div>
    </AppLayout>
  )
}
