'use client'

import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface CheckoutButtonProps {
  label?: string
  className?: string
}

export function CheckoutButton({ label = 'Begin the assessment — $997', className }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleCheckout() {
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      })

      const data = await res.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        setError('Something went wrong. Please try again.')
        setLoading(false)
      }
    } catch {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div>
      <button
        onClick={handleCheckout}
        disabled={loading}
        className={className ?? 'group inline-flex items-center gap-3 bg-[#1C1C1E] text-white font-medium px-10 py-4 rounded-lg hover:bg-[#3A3A3C] transition-all duration-200 hover:-translate-y-px text-base disabled:opacity-60 disabled:cursor-not-allowed'}
      >
        {loading ? (
          <>
            <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            Redirecting to payment...
          </>
        ) : (
          <>
            {label}
            {!loading && (
              <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </>
        )}
      </button>
      {error && <p className="text-xs text-[#C94040] mt-2">{error}</p>}
    </div>
  )
}
