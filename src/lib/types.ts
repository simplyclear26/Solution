// ─── App state ────────────────────────────────────────────────────────────

export type AppView =
  | 'landing'       // Sales / hero page
  | 'integrity'     // "Is this right for you?" gate
  | 'checkout'      // Stripe payment
  | 'org-profile'   // Organisation profile (not scored)
  | 'init-profile'  // Initiative profile (not scored)
  | 'assessment'    // Seven diagnostic modules
  | 'generating'    // Loading / generating report
  | 'report'        // Full results and deliverables

// ─── Profile types ────────────────────────────────────────────────────────

export interface OrgProfile {
  org_name: string
  org_sector: 'private' | 'public' | 'nfp' | 'government' | ''
  org_size: 'micro' | 'small' | 'medium' | 'large' | 'xlarge' | ''
  org_union: 'non_union' | 'partial' | 'unionised' | 'unsure' | ''
  org_structure: 'hierarchical' | 'matrix' | 'agile' | 'mixed' | ''
  org_digital: 'low' | 'moderate' | 'high' | 'advanced' | ''
}

export interface InitiativeProfile {
  init_name: string
  init_type: 'technology' | 'process' | 'op_model' | 'culture' | 'compliance' | 'merger' | 'ai' | 'other' | ''
  init_stage: 'planning' | 'early' | 'mid' | 'post_golive' | 'stalled' | ''
  init_driver: 'strategic' | 'competitive' | 'regulatory' | 'cost' | 'crisis' | 'growth' | ''
  init_commissioned: 'board' | 'ceo' | 'exec_team' | 'external' | 'unsure' | ''
  init_timeline: 'short' | 'medium' | 'long' | 'ongoing' | 'unsure' | ''
  init_priority: 'top' | 'high' | 'moderate' | 'low' | ''
}

// ─── Assessment answers ───────────────────────────────────────────────────

export type ModuleAnswers = Record<string, string>

export interface AllAnswers {
  org: OrgProfile
  initiative: InitiativeProfile
  leadership: ModuleAnswers
  clarity: ModuleAnswers
  people: ModuleAnswers
  capability: ModuleAnswers
  communication: ModuleAnswers
  momentum: ModuleAnswers
  sustainability: ModuleAnswers
}

// ─── Scoring ──────────────────────────────────────────────────────────────

export interface ModuleScore {
  id: string
  label: string
  score: number          // 0–100
  rating: 'Strong' | 'Adequate' | 'At risk' | 'Critical'
  color: string
  unsureCount: number
  keyFindings: string[]  // 2–3 specific evidence-based findings
}

export interface RiskItem {
  title: string
  description: string
  likelihood: 'Low' | 'Moderate' | 'High' | 'Severe'
  impact: 'Low' | 'Moderate' | 'High' | 'Severe'
  mitigation: string
  owner: string          // Who should own this risk
  priority: number       // 1–10, for ranking
}

export interface ActionItem {
  week: string           // e.g. "Weeks 1–2", "Weeks 3–6"
  action: string
  why: string
  owner: string
  successMeasure: string
  module: string         // Which diagnostic module this came from
}

export interface CommunicationGuideItem {
  audience: string
  keyMessage: string
  channel: string
  frequency: string
  owner: string
}

export interface SolutionReport {
  // Metadata
  completedAt: string
  org: OrgProfile
  initiative: InitiativeProfile

  // Scores
  moduleScores: ModuleScore[]
  overallScore: number
  overallRating: 'Strong' | 'Adequate' | 'At risk' | 'Critical'
  simplyClearPhase: string   // Which phase of the Simply Clear Framework

  // Five deliverables
  executiveSummary: string   // 3–4 paragraph narrative
  rootCauses: RiskItem[]     // Top 3–5 risks ranked by impact
  actionPlan: ActionItem[]   // 90-day sequenced actions
  communicationGuide: CommunicationGuideItem[]
  strategicRecommendation: {
    service: string
    rationale: string
    timeframe: string
    url: string
  }

  // Unsure count — surfaces knowledge gaps
  totalUnsureCount: number
}

// ─── Step definition ──────────────────────────────────────────────────────

export interface SegOption {
  val: string
  label: string
  sub?: string
}

export interface AssessmentStep {
  id: string
  question: string
  hint: string
  type: 'seg' | 'text'
  cols?: 2 | 4
  options?: SegOption[]
  module?: string
}
