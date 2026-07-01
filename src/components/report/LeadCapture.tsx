'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const WEBHOOK_URL = process.env.NEXT_PUBLIC_WEBHOOK_URL ?? ''

interface LeadCaptureProps {
  diagnostic: string
  score: string
  rating: string
  recommendedService: string
  orgName?: string
  initName?: string
  onSubmitted: () => void
}

export function LeadCapture({ diagnostic, score, rating, recommendedService, orgName, initName, onSubmitted }: LeadCaptureProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [organisation, setOrganisation] = useState(orgName ?? '')
  const [notes, setNotes] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle')

  async function handleSubmit() {
    if (!name || !email || !organisation) return
    setStatus('submitting')

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, email, organisation, notes,
          diagnostic,
          score,
          rating,
          recommendedService,
          initiative: initName,
          source: 'Simply Clear Solution™',
        }),
      })
      onSubmitted()
    } catch {
      setStatus('error')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="border border-[#E5E3DF] rounded-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="bg-[#1C1C1E] px-8 py-6">
        <p className="text-xs font-medium tracking-widest uppercase text-white/40 mb-1">
          Confirm your details
        </p>
        <h3 className="font-serif text-xl text-white leading-snug">
          We will send you a personal note within 24 hours and arrange your debrief call.
        </h3>
      </div>

      {/* Form */}
      <div className="p-8 bg-[#FAF8F4]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-medium text-[#636366] mb-1.5 tracking-wide">Your name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)}
              placeholder="First and last name"
              className="w-full px-4 py-3 text-sm border border-[#E5E3DF] rounded-lg bg-white focus:outline-none focus:border-[#2AB8A0] transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-medium text-[#636366] mb-1.5 tracking-wide">Work email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="you@organisation.com"
              className="w-full px-4 py-3 text-sm border border-[#E5E3DF] rounded-lg bg-white focus:outline-none focus:border-[#2AB8A0] transition-colors" />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-xs font-medium text-[#636366] mb-1.5 tracking-wide">Organisation</label>
          <input type="text" value={organisation} onChange={e => setOrganisation(e.target.value)}
            placeholder="Your organisation"
            className="w-full px-4 py-3 text-sm border border-[#E5E3DF] rounded-lg bg-white focus:outline-none focus:border-[#2AB8A0] transition-colors" />
        </div>
        <div className="mb-6">
          <label className="block text-xs font-medium text-[#636366] mb-1.5 tracking-wide">
            Anything you want us to know before the debrief? <span className="text-[#8E8E93] font-normal">(optional)</span>
          </label>
          <textarea value={notes} onChange={e => setNotes(e.target.value)}
            placeholder="Context about your situation, what is keeping you up at night, or what you most want to work through..."
            rows={3}
            className="w-full px-4 py-3 text-sm border border-[#E5E3DF] rounded-lg bg-white focus:outline-none focus:border-[#2AB8A0] transition-colors resize-none" />
        </div>
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs text-[#8E8E93] font-light leading-relaxed max-w-xs">
            No automated emails. No sales sequence. Just a personal response from someone at Simply Clear.
          </p>
          <button onClick={handleSubmit}
            disabled={!name || !email || !organisation || status === 'submitting'}
            className="shrink-0 inline-flex items-center gap-2 bg-[#2AB8A0] text-white text-sm font-medium px-7 py-3 rounded-lg hover:bg-[#1A7A6A] transition-all duration-150 disabled:bg-[#E5E3DF] disabled:text-[#8E8E93] disabled:cursor-not-allowed">
            {status === 'submitting' ? 'Sending...' : 'Confirm and send'}
          </button>
        </div>
        {status === 'error' && (
          <p className="text-xs text-[#C94040] mt-3">
            Something went wrong. Please email us directly at clarify@simplyclear.work
          </p>
        )}
      </div>
    </motion.div>
  )
}
