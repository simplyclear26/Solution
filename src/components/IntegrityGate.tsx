'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface IntegrityGateProps {
  onReady: () => void
  customerName?: string
}

export function IntegrityGate({ onReady, customerName }: IntegrityGateProps) {
  const firstName = customerName?.split(' ')[0] ?? 'there'
  const [showPopup, setShowPopup] = useState(false)

  function closeTab() {
    window.close()
    // Fallback if window.close() is blocked
    setTimeout(() => {
      document.body.innerHTML = '<div style="font-family:system-ui;padding:40px;color:#636366;text-align:center"><p>You can close this tab now. Your link is in your inbox whenever you\'re ready.</p></div>'
    }, 300)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16 bg-white">

      {/* Come back later popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ background: 'rgba(28,28,30,0.6)', backdropFilter: 'blur(4px)' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              className="bg-white rounded-2xl max-w-sm w-full p-8 shadow-2xl"
            >
              <h3 className="font-serif text-xl text-[#1C1C1E] mb-3">No problem at all.</h3>
              <p className="text-sm text-[#636366] font-light leading-relaxed mb-6">
                Your access link is saved in the email we sent you when you purchased. Close this tab whenever you're ready — it'll be waiting right there.
              </p>
              <div className="flex flex-col gap-3">
                <button
                  onClick={closeTab}
                  className="w-full bg-[#1C1C1E] text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-[#3A3A3C] transition-all"
                >
                  Got it, close this tab
                </button>
                <button
                  onClick={() => setShowPopup(false)}
                  className="w-full text-sm text-[#636366] border border-[#E5E3DF] px-6 py-3 rounded-lg hover:border-[#636366] hover:text-[#1C1C1E] transition-all"
                >
                  Actually, let's start now
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-2xl w-full">

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-12">
          <span className="font-serif italic text-[#8E8E93]">Simply Clear</span>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>

          <h1 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] text-[#1C1C1E] leading-tight tracking-tight mb-8">
            Hi {firstName} — welcome to your Simply Clear Solution.
          </h1>

          <div className="space-y-5 text-[#3A3A3C] font-light leading-relaxed text-base">
            <p>
              Thank you for purchasing. What you're about to do will give you a clear, honest picture of where your transformation actually stands — across leadership, people, communication, delivery, and sustainability.
            </p>
            <p>
              The assessment takes around 30 minutes and produces five deliverables: a full diagnostic narrative, a risk register, a 90-day action plan, a stakeholder communication guide, and an executive briefing document.
            </p>
            <p>
              It works best when you know your change well — the real state of it, not just the official version. If it helps, sit down with your transformation lead, project sponsor, or a key team member. The more honest and specific your answers, the more useful your report.
            </p>
            <p>
              When you're done, someone from Simply Clear will be in touch within 24 hours to arrange your included 60-minute debrief call.
            </p>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <button
              onClick={onReady}
              className="group flex-1 inline-flex items-center justify-center gap-2 bg-[#1C1C1E] text-white font-medium px-8 py-4 rounded-lg hover:bg-[#3A3A3C] transition-all duration-200 text-sm"
            >
              I'm ready, let's go
              <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <button
              onClick={() => setShowPopup(true)}
              className="flex-1 text-sm text-[#636366] border border-[#E5E3DF] px-8 py-4 rounded-lg hover:border-[#636366] hover:text-[#1C1C1E] transition-all duration-150"
            >
              Come back to it later
            </button>
          </div>

        </motion.div>
      </div>
    </div>
  )
}
