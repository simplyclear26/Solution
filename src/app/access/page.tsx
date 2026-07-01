'use client'

import { Suspense } from 'react'
import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

function AccessInner() {
  const params = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const sessionId = params.get('session_id')

  useEffect(() => {
    if (!sessionId) { setStatus('error'); return }
    setStatus('success')
  }, [sessionId])

  if (status === 'loading') return (<div className="min-h-screen flex items-center justify-center bg-white"><div className="text-center"><div className="flex justify-center gap-2 mb-6">{[0,1,2].map(i => <div key={i} className="w-2 h-2 rounded-full bg-[#2AB8A0] animate-pulse" style={{ animationDelay: `${i*0.2}s` }} />)}</div><p className="text-[#636366] font-light">Confirming your purchase...</p></div></div>)

  if (status === 'error') return (<div className="min-h-screen flex items-center justify-center bg-white px-6"><div className="text-center max-w-md"><h1 className="font-serif text-2xl text-[#1C1C1E] mb-4">Something went wrong</h1><p className="text-[#636366] font-light mb-8">If you completed payment, please email us at <a href="mailto:clarify@simplyclear.work" className="text-[#2AB8A0]">clarify@simplyclear.work</a> and we will get your access link to you right away.</p><button onClick={() => router.push('/')} className="text-sm text-[#636366] border border-[#E5E3DF] px-6 py-3 rounded-lg">Return to home</button></div></div>)

  return (<div className="min-h-screen flex items-center justify-center bg-white px-6"><motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-lg"><div className="w-16 h-16 rounded-full bg-[#E8F8F5] flex items-center justify-center mx-auto mb-8"><svg className="w-8 h-8 text-[#2AB8A0]" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div><h1 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] text-[#1C1C1E] mb-4">Payment confirmed. Check your email.</h1><p className="text-[#636366] font-light text-lg leading-relaxed mb-6">Your unique assessment link is on its way to your inbox. Click it to begin — or save it and come back when you are ready.</p><div className="bg-[#FAF8F4] border border-[#E5E3DF] rounded-xl p-6 text-left mb-8"><p className="text-xs font-medium tracking-widest uppercase text-[#8E8E93] mb-3">What happens next</p><ul className="space-y-3">{['Your assessment link arrives by email within the next few minutes','Click the link to begin — you can pause and resume any time for 90 days','Once complete, someone from Simply Clear will be in touch within 24 hours','We will arrange your included 60-minute debrief call at a time that suits you'].map((item, i) => (<li key={i} className="flex items-start gap-3 text-sm text-[#3A3A3C] font-light"><span className="w-5 h-5 rounded-full bg-[#2AB8A0] text-white text-xs flex items-center justify-center shrink-0 mt-0.5">{i+1}</span>{item}</li>))}</ul></div><p className="text-sm text-[#8E8E93] font-light">No email after 10 minutes? Check your spam or email <a href="mailto:clarify@simplyclear.work" className="text-[#2AB8A0]">clarify@simplyclear.work</a></p></motion.div></div>)
}

export default function AccessPage() {
  return (<Suspense fallback={<div className="min-h-screen bg-white" />}><AccessInner /></Suspense>)
}
