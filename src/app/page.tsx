'use client'

import { useState, useEffect, Suspense } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import type { AppView, AllAnswers, OrgProfile, InitiativeProfile, SolutionReport } from '@/lib/types'
import { Landing } from '@/components/Landing'
import { IntegrityGate } from '@/components/IntegrityGate'
import { ProfileSection } from '@/components/assessment/ProfileSection'
import { ModuleSection } from '@/components/assessment/ModuleSection'
import { Generating } from '@/components/Generating'
import { Report } from '@/components/report/Report'
import { generateReport } from '@/lib/scoring'
import { ALL_MODULES, ORG_STEPS, INITIATIVE_STEPS } from '@/lib/steps'
import { saveProgress, loadProgress, clearProgress } from '@/lib/storage'

const EMPTY_ORG: OrgProfile = { org_name: '', org_sector: '', org_size: '', org_union: '', org_structure: '', org_digital: '' }
const EMPTY_INIT: InitiativeProfile = { init_name: '', init_type: '', init_stage: '', init_driver: '', init_commissioned: '', init_timeline: '', init_priority: '' }

function HomeInner() {
  const searchParams = useSearchParams()
  const tokenFromUrl = searchParams.get('token') ?? ''
  const startFromUrl = searchParams.get('start')
  const resumeFromUrl = searchParams.get('resume')

  const [view, setView] = useState<AppView>('landing')
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0)
  const [org, setOrg] = useState<OrgProfile>(EMPTY_ORG)
  const [initiative, setInitiative] = useState<InitiativeProfile>(EMPTY_INIT)
  const [moduleAnswers, setModuleAnswers] = useState<Record<string, Record<string, string>>>({})
  const [completedSections, setCompletedSections] = useState<string[]>([])
  const [report, setReport] = useState<SolutionReport | null>(null)

  useEffect(() => {
    if (tokenFromUrl && startFromUrl) {
      if (resumeFromUrl) {
        const saved = loadProgress(tokenFromUrl)
        if (saved && saved.view !== 'landing' && saved.view !== 'generating' && saved.view !== 'report') {
          setView(saved.view as AppView)
          setCurrentModuleIndex(saved.currentModuleIndex)
          setOrg(saved.org as unknown as OrgProfile)
          setInitiative(saved.initiative as unknown as InitiativeProfile)
          setModuleAnswers(saved.moduleAnswers)
          // Rebuild completed sections from saved state
          const completed: string[] = []
          if (saved.org && Object.keys(saved.org).length > 0) completed.push('org-profile')
          if (saved.initiative && Object.keys(saved.initiative).length > 0) completed.push('init-profile')
          ALL_MODULES.slice(0, saved.currentModuleIndex).forEach(m => completed.push(m.id))
          setCompletedSections(completed)
          return
        }
      }
      setView('org-profile')
    }
  }, [tokenFromUrl, startFromUrl, resumeFromUrl])

  useEffect(() => {
    if (!tokenFromUrl) return
    if (view === 'landing' || view === 'generating' || view === 'report') return
    saveProgress({
      token: tokenFromUrl,
      view,
      currentModuleIndex,
      org: org as unknown as Record<string, string>,
      initiative: initiative as unknown as Record<string, string>,
      moduleAnswers,
    })
  }, [view, currentModuleIndex, org, initiative, moduleAnswers, tokenFromUrl])

  // Current section ID for the progress dots
  const currentSection = view === 'assessment' && ALL_MODULES[currentModuleIndex]
    ? ALL_MODULES[currentModuleIndex].id
    : view

  function handleModuleComplete(moduleId: string, answers: Record<string, string>) {
    const updated = { ...moduleAnswers, [moduleId]: answers }
    setModuleAnswers(updated)
    setCompletedSections(prev => [...prev.filter(s => s !== moduleId), moduleId])

    if (currentModuleIndex < ALL_MODULES.length - 1) {
      setCurrentModuleIndex(i => i + 1)
    } else {
      setView('generating')
      clearProgress()
      setTimeout(() => {
        const allAnswers: AllAnswers = {
          org, initiative,
          leadership: updated.leadership ?? {},
          clarity: updated.clarity ?? {},
          people: updated.people ?? {},
          capability: updated.capability ?? {},
          communication: updated.communication ?? {},
          momentum: updated.momentum ?? {},
          sustainability: updated.sustainability ?? {},
        }
        setReport(generateReport(allAnswers))
        setView('report')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 3000)
    }
  }

  function handleRestart() {
    clearProgress()
    setOrg(EMPTY_ORG)
    setInitiative(EMPTY_INIT)
    setModuleAnswers({})
    setCurrentModuleIndex(0)
    setCompletedSections([])
    setReport(null)
    setView('landing')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentModule = ALL_MODULES[currentModuleIndex]
  const totalSections = 2 + ALL_MODULES.length
  const overallProgress = Math.round(((currentModuleIndex + 2) / totalSections) * 100)

  return (
    <main className="min-h-screen bg-white">
      <AnimatePresence mode="wait">
        {view === 'landing' && (
          <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <Landing />
          </motion.div>
        )}
        {view === 'integrity' && (
          <motion.div key="integrity" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <IntegrityGate onReady={() => setView('org-profile')} />
          </motion.div>
        )}
        {view === 'org-profile' && (
          <motion.div key="org-profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <ProfileSection
              title="Tell us about your organisation"
              subtitle="This information shapes the language and recommendations throughout your report."
              steps={ORG_STEPS}
              sectionNumber={1}
              totalSections={totalSections}
              initialAnswers={org as unknown as Record<string, string>}
              currentSection="org-profile"
              completedSections={completedSections}
              onComplete={(answers) => {
                setOrg(answers as unknown as OrgProfile)
                setCompletedSections(prev => [...prev.filter(s => s !== 'org-profile'), 'org-profile'])
                setView('init-profile')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            />
          </motion.div>
        )}
        {view === 'init-profile' && (
          <motion.div key="init-profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <ProfileSection
              title="Tell us about this initiative"
              subtitle="The more specific you are, the more useful your report will be."
              steps={INITIATIVE_STEPS}
              sectionNumber={2}
              totalSections={totalSections}
              initialAnswers={initiative as unknown as Record<string, string>}
              currentSection="init-profile"
              completedSections={completedSections}
              onComplete={(answers) => {
                setInitiative(answers as unknown as InitiativeProfile)
                setCompletedSections(prev => [...prev.filter(s => s !== 'init-profile'), 'init-profile'])
                setView('assessment')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            />
          </motion.div>
        )}
        {view === 'assessment' && currentModule && (
          <motion.div key={`module-${currentModuleIndex}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <ModuleSection
              module={currentModule}
              moduleIndex={currentModuleIndex}
              totalModules={ALL_MODULES.length}
              sectionNumber={currentModuleIndex + 3}
              totalSections={totalSections}
              overallProgress={overallProgress}
              existingAnswers={moduleAnswers[currentModule.id] ?? {}}
              currentSection={currentModule.id}
              completedSections={completedSections}
              onComplete={(answers) => handleModuleComplete(currentModule.id, answers)}
              onBack={() => { currentModuleIndex > 0 ? setCurrentModuleIndex(i => i - 1) : setView('init-profile') }}
            />
          </motion.div>
        )}
        {view === 'generating' && (
          <motion.div key="generating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <Generating orgName={org.org_name} initName={initiative.init_name} />
          </motion.div>
        )}
        {view === 'report' && report && (
          <motion.div key="report" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <Report report={report} onRestart={handleRestart} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <HomeInner />
    </Suspense>
  )
}
