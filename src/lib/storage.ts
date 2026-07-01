// Progress saving — persists assessment state to localStorage
// so users can close the browser and resume where they left off

const STORAGE_KEY = 'scs_progress'

export interface SavedProgress {
  view: string
  currentModuleIndex: number
  org: Record<string, string>
  initiative: Record<string, string>
  moduleAnswers: Record<string, Record<string, string>>
  savedAt: string
}

export function saveProgress(data: Omit<SavedProgress, 'savedAt'>) {
  try {
    const payload: SavedProgress = { ...data, savedAt: new Date().toISOString() }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  } catch {
    // localStorage not available — fail silently
  }
}

export function loadProgress(): SavedProgress | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw) as SavedProgress

    // Expire progress after 7 days
    const savedAt = new Date(data.savedAt)
    const now = new Date()
    const diffDays = (now.getTime() - savedAt.getTime()) / (1000 * 60 * 60 * 24)
    if (diffDays > 7) { clearProgress(); return null }

    return data
  } catch {
    return null
  }
}

export function clearProgress() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {}
}

export function hasProgress(): boolean {
  return loadProgress() !== null
}
