'use client'

import { motion } from 'framer-motion'

const SECTIONS = [
  { id: 'org-profile',   label: 'Organisation' },
  { id: 'init-profile',  label: 'Initiative' },
  { id: 'leadership',    label: 'Leadership' },
  { id: 'clarity',       label: 'Clarity' },
  { id: 'people',        label: 'People' },
  { id: 'capability',    label: 'Capability' },
  { id: 'communication', label: 'Communication' },
  { id: 'momentum',      label: 'Momentum' },
  { id: 'sustainability',label: 'Sustainability' },
]

interface SectionProgressProps {
  currentSection: string
  completedSections: string[]
}

export function SectionProgress({ currentSection, completedSections }: SectionProgressProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E5E3DF] px-6 py-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-start justify-between gap-1">
          {SECTIONS.map((section) => {
            const isCompleted = completedSections.includes(section.id)
            const isCurrent   = currentSection === section.id
            return (
              <div key={section.id} className="flex flex-col items-center gap-1.5 flex-1">
                <div className="relative flex items-center justify-center">
                  {isCurrent ? (
                    <motion.div
                      className="w-2.5 h-2.5 rounded-full bg-[#2AB8A0]"
                      animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  ) : (
                    <div className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                      isCompleted ? 'bg-[#2AB8A0]' : 'bg-[#E5E3DF]'
                    }`} />
                  )}
                </div>
                <span className={`text-[9px] font-medium tracking-wide text-center leading-tight transition-colors duration-300 ${
                  isCurrent   ? 'text-[#2AB8A0]'  :
                  isCompleted ? 'text-[#636366]'  :
                                'text-[#C7C5C1]'
                }`}>
                  {section.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
