'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import type { SolutionReport, ModuleScore, RiskItem, ActionItem, CommunicationGuideItem } from '@/lib/types'
import { LeadCapture } from './LeadCapture'
import { ExecutiveBriefing } from './ExecutiveBriefing'

interface ReportProps {
  report: SolutionReport
  onRestart: () => void
}

function scoreColor(score: number): string {
  if (score >= 70) return '#2AB8A0'
  if (score >= 50) return '#F0A500'
  if (score >= 30) return '#E07B39'
  return '#C94040'
}

function ratingBg(rating: string): string {
  if (rating === 'Strong')   return 'bg-[#E8F8F5] text-[#1A7A6A]'
  if (rating === 'Adequate') return 'bg-[#FEF8E7] text-[#A06E00]'
  if (rating === 'At risk')  return 'bg-[#FEF0E7] text-[#A04010]'
  return 'bg-[#FEEBEB] text-[#9B2020]'
}

function impactBg(level: string): string {
  if (level === 'Low')      return 'text-[#2AB8A0]'
  if (level === 'Moderate') return 'text-[#F0A500]'
  if (level === 'High')     return 'text-[#E07B39]'
  return 'text-[#C94040]'
}

const TABS = [
  { id: 'summary',   label: 'Summary' },
  { id: 'scores',    label: 'Diagnostic scores' },
  { id: 'gaps',      label: 'Knowledge gaps' },
  { id: 'risks',     label: 'Risk register' },
  { id: 'plan',      label: '90-day plan' },
  { id: 'comms',     label: 'Communication guide' },
  { id: 'next',      label: 'What comes next' },
]

export function Report({ report, onRestart }: ReportProps) {
  const [activeTab, setActiveTab] = useState('summary')
  const [submitted, setSubmitted] = useState(false)

  const {
    org, initiative, moduleScores, overallScore, overallRating,
    simplyClearPhase, executiveSummary, rootCauses, actionPlan,
    communicationGuide, strategicRecommendation, totalUnsureCount,
  } = report

  return (
    <div className="min-h-screen bg-white">

      {/* Report header */}
      <div className="bg-[#1C1C1E] text-white px-6 py-10">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-medium tracking-widest uppercase text-white/40 mb-2">Simply Clear Solution™</p>
          <h1 className="font-serif text-[clamp(1.6rem,3vw,2.4rem)] mb-1">
            {initiative.init_name || 'Transformation assessment'}
          </h1>
          <p className="text-white/60 text-sm font-light">
            {org.org_name || 'Your organisation'} &nbsp;·&nbsp; {new Date(report.completedAt).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>

          {/* Overall score */}
          <div className="mt-8 flex flex-wrap gap-6 items-center">
            <div>
              <p className="text-xs text-white/40 mb-1">Overall transformation health</p>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-5xl" style={{ color: scoreColor(overallScore) }}>{overallScore}</span>
                <span className="text-white/40 font-serif text-xl">/100</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-white/40 mb-1">Overall rating</p>
              <span className={`inline-flex items-center gap-2 text-sm font-medium px-3 py-1 rounded-full ${ratingBg(overallRating)}`}>
                {overallRating}
              </span>
            </div>
            <div>
              <p className="text-xs text-white/40 mb-1">Simply Clear Framework phase</p>
              <p className="text-sm text-white/80 max-w-xs font-light leading-snug">{simplyClearPhase}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="border-b border-[#E5E3DF] sticky top-0 bg-white z-10">
        <div className="max-w-5xl mx-auto px-6 overflow-x-auto">
          <div className="flex gap-0">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={[
                  'text-sm font-medium py-4 px-4 border-b-2 transition-all duration-150 whitespace-nowrap',
                  activeTab === tab.id
                    ? 'border-[#2AB8A0] text-[#1C1C1E]'
                    : 'border-transparent text-[#8E8E93] hover:text-[#636366]',
                ].join(' ')}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* ── Summary ── */}
        {activeTab === 'summary' && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="font-serif text-2xl text-[#1C1C1E] mb-6">Executive summary</h2>
            <p className="text-[#3A3A3C] leading-relaxed font-light max-w-3xl mb-8">{executiveSummary}</p>

            {totalUnsureCount >= 4 && (
              <div className="bg-[#FEF8E7] border border-[#F0A500]/30 rounded-xl p-6 mb-8 max-w-3xl">
                <p className="text-sm font-medium text-[#A06E00] mb-2">A note on knowledge gaps</p>
                <p className="text-sm text-[#3A3A3C] font-light leading-relaxed">
                  {totalUnsureCount} questions across this assessment could not be answered confidently.
                  That level of uncertainty is itself a finding. Going into a significant change without a clear picture of these fundamentals carries real risk.
                  The 90-day action plan includes specific steps for resolving the most important knowledge gaps.
                </p>
              </div>
            )}

            {/* Score overview */}
            <h3 className="font-medium text-[#1C1C1E] mb-4">At a glance</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              {moduleScores.map(m => (
                <div key={m.id} className="border border-[#E5E3DF] rounded-xl p-5">
                  <p className="text-xs font-medium tracking-widest uppercase text-[#8E8E93] mb-3">{m.label}</p>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="font-serif text-3xl" style={{ color: m.color }}>{m.score}</span>
                    <span className="text-[#8E8E93] font-serif">/100</span>
                  </div>
                  <div className="h-1 bg-[#E5E3DF] rounded-full overflow-hidden mb-3">
                    <div className="h-full rounded-full" style={{ width: `${m.score}%`, backgroundColor: m.color }} />
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${ratingBg(m.rating)}`}>{m.rating}</span>
                </div>
              ))}
            </div>

            {/* Top risks preview */}
            <h3 className="font-medium text-[#1C1C1E] mb-4">Top risks identified</h3>
            <div className="space-y-3 mb-4">
              {rootCauses.slice(0, 3).map((risk, i) => (
                <div key={i} className="flex items-start gap-4 border border-[#E5E3DF] rounded-xl p-5">
                  <span className="font-serif text-[#8E8E93] text-sm shrink-0 mt-0.5">0{i + 1}</span>
                  <div>
                    <p className="font-medium text-[#1C1C1E] text-sm mb-1">{risk.title}</p>
                    <p className="text-xs text-[#636366] font-light leading-relaxed">{risk.description}</p>
                  </div>
                  <span className={`shrink-0 text-xs font-medium ${impactBg(risk.impact)}`}>{risk.impact} impact</span>
                </div>
              ))}
            </div>
            <button onClick={() => setActiveTab('risks')} className="text-sm text-[#2AB8A0] hover:underline">
              View full risk register
            </button>

            {/* Executive briefing download */}
            <div className="mt-10 border-t border-[#E5E3DF] pt-10">
              <h3 className="font-medium text-[#1C1C1E] mb-2">Executive briefing</h3>
              <p className="text-sm text-[#636366] font-light mb-6 max-w-xl">
                A two-page summary you can share with your board or leadership team. Scores, top risks, immediate priorities, and the recommended next step.
              </p>
              <ExecutiveBriefing report={report} />
            </div>
          </motion.div>
        )}

        {/* ── Diagnostic scores ── */}
        {activeTab === 'scores' && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="font-serif text-2xl text-[#1C1C1E] mb-2">Diagnostic scores</h2>
            <p className="text-sm text-[#636366] font-light mb-8">Detailed findings for each of the seven dimensions assessed.</p>

            <div className="space-y-6">
              {moduleScores.map((m, i) => (
                <motion.div key={m.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="border border-[#E5E3DF] rounded-xl overflow-hidden">
                  {/* Module header */}
                  <div className="flex items-center justify-between px-6 py-5 border-b border-[#E5E3DF]">
                    <div>
                      <p className="font-medium text-[#1C1C1E]">{m.label}</p>
                      {m.unsureCount > 0 && (
                        <p className="text-xs text-[#8E8E93] mt-0.5">{m.unsureCount} question{m.unsureCount > 1 ? 's' : ''} answered "not sure"</p>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <span className="font-serif text-3xl" style={{ color: m.color }}>{m.score}</span>
                        <span className="text-[#8E8E93] font-serif text-sm">/100</span>
                      </div>
                      <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${ratingBg(m.rating)}`}>{m.rating}</span>
                    </div>
                  </div>
                  {/* Score bar */}
                  <div className="px-6 py-3 border-b border-[#E5E3DF]">
                    <div className="h-1.5 bg-[#E5E3DF] rounded-full overflow-hidden">
                      <motion.div className="h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${m.score}%` }}
                        transition={{ duration: 0.8, delay: i * 0.06 + 0.3, ease: [0.23, 1, 0.32, 1] }}
                        style={{ backgroundColor: m.color }}
                      />
                    </div>
                  </div>
                  {/* Key findings */}
                  {m.keyFindings.length > 0 && (
                    <div className="px-6 py-5">
                      <p className="text-xs font-medium tracking-widest uppercase text-[#8E8E93] mb-3">Key findings</p>
                      <ul className="space-y-2">
                        {m.keyFindings.map((f, j) => (
                          <li key={j} className="flex items-start gap-3 text-sm text-[#3A3A3C] font-light leading-relaxed">
                            <span className="w-1 h-1 rounded-full bg-[#8E8E93] mt-2 shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Knowledge gaps ── */}
        {activeTab === 'gaps' && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="font-serif text-2xl text-[#1C1C1E] mb-2">What we could not assess</h2>
            <p className="text-sm text-[#636366] font-light mb-8 max-w-2xl">
              Every question answered "not sure" represents a gap in your organisation's visibility of this change.
              These gaps are not neutral — they are risk signals. A leader who cannot answer these questions
              is operating without information that is critical to making good decisions.
            </p>

            {totalUnsureCount === 0 ? (
              <div className="bg-[#E8F8F5] border border-[#2AB8A0]/20 rounded-xl p-8 text-center">
                <div className="w-10 h-10 rounded-full bg-[#2AB8A0] flex items-center justify-center mx-auto mb-4">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="font-medium text-[#1C1C1E] mb-2">No knowledge gaps identified</h3>
                <p className="text-sm text-[#636366] font-light">
                  You answered every question with confidence. That is a meaningful indicator of leadership visibility and situational awareness.
                </p>
              </div>
            ) : (
              <>
                <div className="bg-[#FEF8E7] border border-[#F0A500]/30 rounded-xl p-6 mb-8">
                  <p className="text-sm font-medium text-[#A06E00] mb-2">
                    {totalUnsureCount} question{totalUnsureCount > 1 ? 's' : ''} could not be answered with confidence
                  </p>
                  <p className="text-sm text-[#3A3A3C] font-light leading-relaxed">
                    Each gap below represents something important that is currently unknown or unclear.
                    Resolving these gaps — before they become visible problems — is one of the highest-return
                    investments available to you right now.
                  </p>
                </div>

                <div className="space-y-4">
                  {moduleScores.filter(m => m.unsureCount > 0).map((m, i) => (
                    <motion.div key={m.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="border border-[#E5E3DF] rounded-xl overflow-hidden">
                      <div className="px-6 py-4 border-b border-[#E5E3DF] bg-[#FAF8F4] flex items-center justify-between">
                        <p className="font-medium text-[#1C1C1E] text-sm">{m.label}</p>
                        <span className="text-xs bg-[#FEF8E7] text-[#A06E00] px-2.5 py-1 rounded-full font-medium">
                          {m.unsureCount} gap{m.unsureCount > 1 ? 's' : ''}
                        </span>
                      </div>
                      <div className="px-6 py-5">
                        <p className="text-sm text-[#3A3A3C] font-light leading-relaxed mb-4">
                          {m.id === 'leadership' && 'Not knowing the state of your leadership coalition is serious. Leadership visibility is the primary driver of adoption — and the primary cause of failure. These gaps need to be resolved through direct conversation with the people involved.'}
                          {m.id === 'clarity' && 'Not knowing whether your change narrative is clear or your success measures are defined means you are likely proceeding on assumption. These are the foundations everything else builds on.'}
                          {m.id === 'people' && 'Not knowing how this change affects your people — or who is most at risk — means your support planning is incomplete. The people most likely to struggle are the ones least likely to say so.'}
                          {m.id === 'capability' && 'Not knowing whether you have the right change capability or feedback mechanisms in place is a significant blind spot. These are the delivery infrastructure questions that determine whether the change lands.'}
                          {m.id === 'communication' && 'Not knowing whether your communication is landing — or how your people are receiving it — means you are communicating without feedback. The gap between what is sent and what is received is where most communication fails.'}
                          {m.id === 'momentum' && 'Not knowing whether this change is making progress or whether the new way is working means you do not have the early warning signals you need. By the time problems become visible, they are usually already serious.'}
                          {m.id === 'sustainability' && 'Not knowing whether new behaviours are holding or whether accountability for embedding has been assigned means the sustainability of this change is at risk. This is the most commonly neglected phase.'}
                        </p>
                        <div className="bg-[#F5F4F1] rounded-lg px-4 py-3">
                          <p className="text-xs font-medium text-[#636366] mb-1">Suggested action</p>
                          <p className="text-sm text-[#3A3A3C] font-light">
                            {m.id === 'leadership' && 'Schedule direct conversations with each member of your senior leadership team. Ask them directly — not through a survey — how they see their role in this change and what is holding them back from being more visible.'}
                            {m.id === 'clarity' && 'Run a simple test — ask three people outside the project team to explain the change and what success looks like. Their answers will tell you more than any internal review.'}
                            {m.id === 'people' && 'Commission a rapid people impact assessment — even a two-hour workshop with HR and frontline managers will surface the groups and concerns that are not visible from the project level.'}
                            {m.id === 'capability' && 'Map your current change resources and feedback mechanisms in a single page. Name who is responsible for each. The gaps will be immediately obvious.'}
                            {m.id === 'communication' && 'Run a simple communication audit — ask ten people across different levels and locations what they have heard about this change and what they think it means for them. The variation in answers will be instructive.'}
                            {m.id === 'momentum' && 'Establish a fortnightly progress check — not a project status report, but a genuine conversation with frontline managers about what is working, what is not, and what people are saying.'}
                            {m.id === 'sustainability' && 'Name the person who will own this change after the project team moves on. Schedule a 90-day post-go-live review now, before the pressure of delivery makes it feel unnecessary.'}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        )}

        {/* ── Risk register ── */}
        {activeTab === 'risks' && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="font-serif text-2xl text-[#1C1C1E] mb-2">Transformation risk register</h2>
            <p className="text-sm text-[#636366] font-light mb-8 max-w-2xl">
              The risks below are ranked by impact and drawn directly from your assessment responses. Each includes a specific mitigation action and a recommended owner.
            </p>

            <div className="space-y-5">
              {rootCauses.map((risk, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="border border-[#E5E3DF] rounded-xl overflow-hidden">
                  <div className="px-6 py-5 border-b border-[#E5E3DF] flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <span className="font-serif text-[#8E8E93] text-sm shrink-0 mt-0.5">0{i + 1}</span>
                      <h3 className="font-medium text-[#1C1C1E]">{risk.title}</h3>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full bg-[#FEF0E7] ${impactBg(risk.impact)}`}>
                        {risk.impact} impact
                      </span>
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#F5F4F1] text-[#636366]">
                        {risk.likelihood} likelihood
                      </span>
                    </div>
                  </div>
                  <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-xs font-medium tracking-widest uppercase text-[#8E8E93] mb-2">What this means</p>
                      <p className="text-sm text-[#3A3A3C] font-light leading-relaxed">{risk.description}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium tracking-widest uppercase text-[#8E8E93] mb-2">Mitigation action</p>
                      <p className="text-sm text-[#3A3A3C] font-light leading-relaxed mb-3">{risk.mitigation}</p>
                      <p className="text-xs text-[#8E8E93]">Recommended owner: <span className="font-medium text-[#636366]">{risk.owner}</span></p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── 90-day plan ── */}
        {activeTab === 'plan' && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="font-serif text-2xl text-[#1C1C1E] mb-2">90-day action plan</h2>
            <p className="text-sm text-[#636366] font-light mb-8 max-w-2xl">
              A sequenced set of actions for the next 90 days, built from your assessment responses. Each action includes a specific success measure so you know when it is done.
            </p>

            {/* Group by week */}
            {['Weeks 1 to 2', 'Weeks 3 to 6', 'Weeks 7 to 12'].map(week => {
              const weekActions = actionPlan.filter(a => a.week === week)
              if (weekActions.length === 0) return null
              return (
                <div key={week} className="mb-10">
                  <div className="flex items-center gap-3 mb-4">
                    <p className="text-xs font-medium tracking-widest uppercase text-[#2AB8A0]">{week}</p>
                    <div className="flex-1 h-px bg-[#E5E3DF]" />
                  </div>
                  <div className="space-y-4">
                    {weekActions.map((action, i) => (
                      <div key={i} className="border border-[#E5E3DF] rounded-xl p-6">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <h3 className="font-medium text-[#1C1C1E]">{action.action}</h3>
                          <span className="text-xs bg-[#F5F4F1] text-[#636366] px-2.5 py-1 rounded-full shrink-0">{action.owner}</span>
                        </div>
                        <p className="text-sm text-[#636366] font-light leading-relaxed mb-3">{action.why}</p>
                        <div className="border-t border-[#E5E3DF] pt-3 mt-3">
                          <p className="text-xs text-[#8E8E93]">
                            Success measure: <span className="text-[#636366] font-light">{action.successMeasure}</span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </motion.div>
        )}

        {/* ── Communication guide ── */}
        {activeTab === 'comms' && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="font-serif text-2xl text-[#1C1C1E] mb-2">Stakeholder communication guide</h2>
            <p className="text-sm text-[#636366] font-light mb-8 max-w-2xl">
              The right messages for each audience, through the right channels, at the right frequency. Built from your organisation profile and initiative context.
            </p>

            <div className="space-y-5">
              {communicationGuide.map((item, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="border border-[#E5E3DF] rounded-xl overflow-hidden">
                  <div className="px-6 py-4 border-b border-[#E5E3DF] bg-[#FAF8F4]">
                    <p className="font-medium text-[#1C1C1E] text-sm">{item.audience}</p>
                  </div>
                  <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <p className="text-xs font-medium tracking-widest uppercase text-[#8E8E93] mb-2">Key message</p>
                      <p className="text-sm text-[#3A3A3C] font-light leading-relaxed">{item.keyMessage}</p>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-medium tracking-widest uppercase text-[#8E8E93] mb-1">Channel</p>
                        <p className="text-sm text-[#3A3A3C] font-light">{item.channel}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium tracking-widest uppercase text-[#8E8E93] mb-1">Frequency</p>
                        <p className="text-sm text-[#3A3A3C] font-light">{item.frequency}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium tracking-widest uppercase text-[#8E8E93] mb-1">Owner</p>
                        <p className="text-sm text-[#3A3A3C] font-light">{item.owner}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── What comes next ── */}
        {activeTab === 'next' && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="font-serif text-2xl text-[#1C1C1E] mb-8">What comes next</h2>

            {/* Service recommendation */}
            <div className="border border-[#2AB8A0]/30 rounded-2xl overflow-hidden mb-10">
              <div className="bg-[#1C1C1E] px-8 py-6">
                <p className="text-xs font-medium tracking-widest uppercase text-white/40 mb-1">Simply Clear recommendation</p>
                <h3 className="font-serif text-2xl text-white">{strategicRecommendation.service}</h3>
                <p className="text-white/40 text-sm mt-1">{strategicRecommendation.timeframe}</p>
              </div>
              <div className="bg-[#FAF8F4] px-8 py-6">
                <p className="text-sm text-[#3A3A3C] leading-relaxed font-light mb-6">{strategicRecommendation.rationale}</p>
                <a href={strategicRecommendation.url} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#2AB8A0] text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-[#1A7A6A] transition-all duration-200">
                  Learn more about {strategicRecommendation.service}
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Debrief call */}
            <div className="border border-[#E5E3DF] rounded-2xl p-8 mb-10">
              <p className="text-xs font-medium tracking-widest uppercase text-[#8E8E93] mb-3">Your included debrief call</p>
              <h3 className="font-serif text-xl text-[#1C1C1E] mb-3">60 minutes with a Simply Clear practitioner</h3>
              <p className="text-sm text-[#636366] font-light leading-relaxed max-w-2xl">
                Your purchase includes a 60-minute Google Meet debrief call. We will review your report together, work through the findings that matter most, and agree on the priorities for the next 90 days.
                A Simply Clear team member will be in touch within 24 hours to arrange a time.
              </p>
            </div>

            {/* Lead capture */}
            {!submitted && (
              <LeadCapture
                diagnostic="Simply Clear Solution™"
                score={`${report.overallScore}/100`}
                rating={report.overallRating}
                recommendedService={strategicRecommendation.service}
                orgName={org.org_name}
                initName={initiative.init_name}
                onSubmitted={() => setSubmitted(true)}
              />
            )}

            {submitted && (
              <div className="bg-[#E8F8F5] border border-[#2AB8A0]/20 rounded-2xl p-8 text-center">
                <div className="w-12 h-12 rounded-full bg-[#2AB8A0] flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="font-serif text-xl text-[#1C1C1E] mb-2">We will be in touch within 24 hours.</h3>
                <p className="text-sm text-[#636366] font-light">Someone from Simply Clear will review your report and reach out to arrange your debrief call.</p>
              </div>
            )}
          </motion.div>
        )}

      </div>

      {/* Footer */}
      <div className="border-t border-[#E5E3DF] px-6 py-8 text-center">
        <p className="text-[#8E8E93] text-sm">
          <span className="font-serif italic">Simply Clear</span>
          <span className="ml-2 text-xs font-medium tracking-widest uppercase">Adelaide, Australia</span>
        </p>
      </div>
    </div>
  )
}
