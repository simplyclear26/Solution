'use client'

import { Suspense } from 'react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { IntegrityGate } from '@/components/IntegrityGate'

function StartInner() {
  const params = useSearchParams()
  const token = params.get('token')
  const [status, setStatus] = useState<'validating' | 'valid' | 'invalid' | 'expired'>('validating')
  const [customerName, setCustomerName] = useState('')

  useEffect(() => {
    if (!token) { setStatus('invalid'); return }
    fetch(`/api/validate-token?token=${token}`).then(res => res.json()).then(data => {
      if (data.valid) { sessionStorage.setItem('scs_access_token', token); setCustomerName(data.name ?? ''); setStatus('valid') }
      else setStatus(data.error?.includes('expired') ? 'expired' : 'invalid')
    }).catch(() => setStatus('invalid'))
  }, [token])

  if (status === 'validating') return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="flex justify-center gap-2 mb-6">
          {[0,1,2].map(i => <div key={i} className="w-2 h-2 rounded-full bg-[#2AB8A0] animate-pulse" style={{ animationDelay: `${i*0.2}s` }} />)}
        </div>
        <p className="text-[#636366] font-light text-sm">Verifying your access...</p>
      </div>
    </div>
  )

  if (status === 'invalid') return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-md">
        <h1 className="font-serif text-2xl text-[#1C1C1E] mb-4">This link is not valid</h1>
        <p className="text-[#636366] font-light leading-relaxed mb-8">Please check your email for the correct link or contact us at <a href="mailto:clarify@simplyclear.work" className="text-[#2AB8A0]">clarify@simplyclear.work</a></p>
        <a href="/" className="text-sm text-[#636366] border border-[#E5E3DF] px-6 py-3 rounded-lg inline-block">Return to home</a>
      </motion.div>
    </div>
  )

  if (status === 'expired') return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-md">
        <h1 className="font-serif text-2xl text-[#1C1C1E] mb-4">This link has expired</h1>
        <p className="text-[#636366] font-light leading-relaxed mb-8">Your 90-day access period has ended. Contact us at <a href="mailto:clarify@simplyclear.work" className="text-[#2AB8A0]">clarify@simplyclear.work</a></p>
        <a href="/" className="text-sm text-[#636366] border border-[#E5E3DF] px-6 py-3 rounded-lg inline-block">Return to home</a>
      </motion.div>
    </div>
  )

  return (
    <IntegrityGate
      customerName={customerName}
      onReady={() => { window.location.href = `/?token=${token}&start=true` }}
    />
  )
}

export default function StartPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <StartInner />
    </Suspense>
  )
}
