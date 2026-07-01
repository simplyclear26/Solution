'use client'

import { motion } from 'framer-motion'
import { CheckoutButton } from './CheckoutButton'

interface LandingProps {
  onBegin?: () => void // kept for local testing without payment
}

const DELIVERABLES = [
  {
    number: '01',
    title: 'Full diagnostic narrative',
    desc: 'A scored assessment across seven dimensions of transformation health, with specific evidence-based findings for each.',
    value: '$1,500',
  },
  {
    number: '02',
    title: 'Transformation risk register',
    desc: 'Every significant risk identified, ranked by impact, with a specific mitigation action and named owner for each.',
    value: '$2,000',
  },
  {
    number: '03',
    title: '90-day action plan',
    desc: 'A sequenced, prioritised set of actions for the first 90 days. Not generic advice. Built from your specific answers.',
    value: '$3,000',
  },
  {
    number: '04',
    title: 'Stakeholder communication guide',
    desc: 'The right messages for each audience, through the right channels, at the right frequency. Ready to use.',
    value: '$1,500',
  },
  {
    number: '05',
    title: 'Executive briefing document',
    desc: 'A two-page summary your board or leadership team can read in five minutes. Scores, risks, priorities, next step.',
    value: '$500',
  },
]

export function Landing({ onBegin }: LandingProps) {
  return (
    <div className="min-h-screen">

      {/* Nav */}
      <nav className="px-6 py-5 flex items-center justify-between border-b border-[#E5E3DF] max-w-6xl mx-auto">
        <span className="font-serif italic text-[#1C1C1E]">Simply Clear</span>
        <a href="https://www.simplyclear.work" target="_blank" rel="noopener noreferrer"
          className="text-sm text-[#636366] hover:text-[#1C1C1E] transition-colors">
          simplyclear.work
        </a>
      </nav>

      {/* Hero */}
      <section className="px-6 py-24 text-center max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-[#E8F8F5] text-[#1A7A6A] text-[11px] font-medium tracking-widest uppercase px-4 py-1.5 rounded-full mb-8 border border-[#2AB8A0]/20">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2AB8A0] animate-[pulseDot_2s_ease-in-out_infinite]" />
          Simply Clear Solution™
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="font-serif text-[clamp(2.4rem,5vw,4.2rem)] leading-[1.08] tracking-tight text-[#1C1C1E] mb-6">
          A comprehensive transformation diagnostic. Five deliverables. One honest report.
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-[#636366] text-xl font-light max-w-2xl mx-auto mb-4 leading-relaxed">
          Not a template. Not a generated report. A personal advisory document built from your specific answers about your specific change.
        </motion.p>

        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="text-[#8E8E93] text-base font-light max-w-xl mx-auto mb-12 leading-relaxed">
          The five deliverables in this report would cost $8,500 or more from a consultant. We have built the diagnostic infrastructure that produces them in 30 minutes.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <CheckoutButton />
          <div className="text-center">
            <p className="text-2xl font-serif text-[#1C1C1E]">$997</p>
            <p className="text-xs text-[#8E8E93] mt-0.5">includes a 60-minute debrief call</p>
          </div>
        </motion.div>
      </section>

      {/* Deliverables */}
      <section className="px-6 py-16 bg-[#FAF8F4] border-y border-[#E5E3DF]">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-center mb-12">
            <p className="text-xs font-medium tracking-widest uppercase text-[#8E8E93] mb-3">What you receive</p>
            <h2 className="font-serif text-[clamp(1.8rem,3vw,2.8rem)] text-[#1C1C1E] tracking-tight">Five deliverables. Real value.</h2>
          </motion.div>

          <div className="space-y-4">
            {DELIVERABLES.map((d, i) => (
              <motion.div key={d.number}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.3 }}
                className="flex items-start gap-6 bg-white border border-[#E5E3DF] rounded-xl p-6">
                <span className="font-serif text-[#8E8E93] text-sm shrink-0 mt-0.5">{d.number}</span>
                <div className="flex-1">
                  <h3 className="font-medium text-[#1C1C1E] mb-1">{d.title}</h3>
                  <p className="text-sm text-[#636366] font-light leading-relaxed">{d.desc}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-[#8E8E93] font-light">Consultant equivalent</p>
                  <p className="font-serif text-[#1C1C1E] text-lg">{d.value}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="mt-6 flex justify-between items-center px-6 py-4 bg-[#1C1C1E] text-white rounded-xl">
            <span className="font-medium">Total consultant equivalent value</span>
            <span className="font-serif text-2xl">$8,500+</span>
          </motion.div>
        </div>
      </section>

      {/* Who this is for */}
      <section className="px-6 py-20 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-medium tracking-widest uppercase text-[#8E8E93] mb-3">Who this is for</p>
          <h2 className="font-serif text-[clamp(1.8rem,3vw,2.6rem)] text-[#1C1C1E] tracking-tight">Senior leaders with a change to get right.</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { title: 'Already in delivery', desc: 'Something is not landing and you need to understand why — quickly and honestly.' },
            { title: 'About to commit', desc: 'You want to know what you are walking into before the money is spent and the clock starts.' },
            { title: 'Responsible for governance', desc: 'You need an independent, evidence-based view of transformation health for your board or leadership team.' },
          ].map((item, i) => (
            <motion.div key={item.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.2 }}
              className="border border-[#E5E3DF] rounded-xl p-6">
              <h3 className="font-medium text-[#1C1C1E] mb-2">{item.title}</h3>
              <p className="text-sm text-[#636366] font-light leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-16 bg-[#FAF8F4] border-y border-[#E5E3DF]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-medium tracking-widest uppercase text-[#8E8E93] mb-3">How it works</p>
          <h2 className="font-serif text-[clamp(1.8rem,3vw,2.6rem)] text-[#1C1C1E] tracking-tight mb-12">Four steps. About 30 minutes.</h2>

          <div className="space-y-6 text-left">
            {[
              { step: '1', title: 'Answer honestly', desc: 'Work through seven diagnostic modules covering every dimension of transformation health. The questions are specific. The more honest your answers, the more useful your report.' },
              { step: '2', title: 'Receive your report', desc: 'Your report is generated immediately and includes all five deliverables. You can view it on screen and download it as a PDF.' },
              { step: '3', title: 'Hear from us within 24 hours', desc: 'A Simply Clear practitioner will review your results and send you a personal note within 24 hours. No automated emails.' },
              { step: '4', title: 'Book your debrief', desc: 'Your purchase includes a 60-minute Google Meet debrief call to work through the findings and agree on priorities. This call is where the real clarity happens.' },
            ].map((item) => (
              <div key={item.step} className="flex gap-5 bg-white border border-[#E5E3DF] rounded-xl p-6">
                <span className="font-serif text-2xl text-[#8E8E93] shrink-0 w-6 text-center">{item.step}</span>
                <div>
                  <h3 className="font-medium text-[#1C1C1E] mb-1">{item.title}</h3>
                  <p className="text-sm text-[#636366] font-light leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 text-center">
        <h2 className="font-serif text-[clamp(1.8rem,3vw,2.8rem)] text-[#1C1C1E] tracking-tight mb-4">
          Ready to get a clear picture?
        </h2>
        <p className="text-[#636366] font-light max-w-md mx-auto mb-10 leading-relaxed">
          30 minutes of honest answers. Five deliverables. A 60-minute debrief. One clear path forward.
        </p>
        <CheckoutButton
          label="Begin the assessment — $997"
          className="group inline-flex items-center gap-3 bg-[#2AB8A0] text-white font-medium px-10 py-4 rounded-lg hover:bg-[#1A7A6A] transition-all duration-200 hover:-translate-y-px text-base"
        />
        <p className="text-xs text-[#8E8E93] mt-4">Includes a 60-minute debrief call with a Simply Clear practitioner</p>

        <p className="mt-16 text-[#8E8E93] text-sm">
          <span className="font-serif italic">Simply Clear</span>
          <span className="ml-2 text-xs font-medium tracking-widest uppercase">Adelaide, Australia</span>
        </p>
      </section>

    </div>
  )
}
