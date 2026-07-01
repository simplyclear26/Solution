import type {
  AllAnswers, SolutionReport, ModuleScore,
  RiskItem, ActionItem, CommunicationGuideItem,
  OrgProfile, InitiativeProfile,
} from './types'

// ─── Score helpers ────────────────────────────────────────────────────────

function avg(answers: Record<string, string>, ids: string[]): number {
  const vals = ids.map(id => parseInt(answers[id] ?? '2', 10)).filter(v => !isNaN(v))
  if (vals.length === 0) return 2
  return vals.reduce((a, b) => a + b, 0) / vals.length
}

function toScore(raw: number, max: number = 4): number {
  return Math.round((raw / max) * 100)
}

function scoreColor(score: number): string {
  if (score >= 70) return '#2AB8A0'
  if (score >= 50) return '#F0A500'
  if (score >= 30) return '#E07B39'
  return '#C94040'
}

function scoreRating(score: number): 'Strong' | 'Adequate' | 'At risk' | 'Critical' {
  if (score >= 70) return 'Strong'
  if (score >= 50) return 'Adequate'
  if (score >= 30) return 'At risk'
  return 'Critical'
}

function countUnsure(answers: Record<string, string>): number {
  return Object.values(answers).filter(v => v === '0').length
}

function get(answers: Record<string, string>, id: string): number {
  return parseInt(answers[id] ?? '2', 10)
}

// ─── Module scorers ───────────────────────────────────────────────────────

function scoreLeadership(a: Record<string, string>): ModuleScore {
  const raw = avg(a, ['lead_sponsor_quality','lead_coalition','lead_resistance','lead_decisions','lead_modelling','lead_managers'])
  const score = toScore(raw)
  const unsureCount = countUnsure(a)

  const findings: string[] = []
  if (get(a,'lead_sponsor_quality') <= 2) findings.push('The primary sponsor is not actively leading this change — they are at best nominally involved.')
  if (get(a,'lead_coalition') <= 2)       findings.push('The change is being carried by one person. There is no meaningful senior coalition behind it.')
  if (get(a,'lead_resistance') <= 2)      findings.push('There is senior resistance — open or private — that is creating mixed messages and eroding confidence.')
  if (get(a,'lead_decisions') <= 2)       findings.push('Decision-making is slow or stalling. The programme is frequently waiting for answers that are not coming.')
  if (get(a,'lead_modelling') <= 2)       findings.push('Leaders are not visibly working in the new way. They are asking others to change while they operate as before.')
  if (get(a,'lead_managers') <= 2)        findings.push('Managers are not equipped or willing to lead this change locally. The message is dying at the manager layer.')
  if (unsureCount >= 2)                   findings.push(`${unsureCount} leadership questions could not be answered confidently — a visibility gap that is itself a risk.`)

  return { id: 'leadership', label: 'Leadership and sponsorship', score, rating: scoreRating(score), color: scoreColor(score), unsureCount, keyFindings: findings.slice(0, 3) }
}

function scoreClarity(a: Record<string, string>): ModuleScore {
  const raw = avg(a, ['clar_why','clar_endstate','clar_success','clar_losses','clar_narrative'])
  const score = toScore(raw)
  const unsureCount = countUnsure(a)

  const findings: string[] = []
  if (get(a,'clar_why') <= 2)       findings.push('People cannot clearly articulate why this change is happening. Without a compelling "why", change becomes an imposition.')
  if (get(a,'clar_endstate') <= 2)  findings.push('The end state is unclear or vague. People cannot head toward a destination they cannot picture.')
  if (get(a,'clar_success') <= 2)   findings.push('Success has not been defined beyond the project going live. Adoption is not being measured.')
  if (get(a,'clar_losses') <= 2)    findings.push('The losses involved in this change have not been honestly acknowledged. This creates hidden resentment.')
  if (get(a,'clar_narrative') <= 2) findings.push('The change narrative is too complex to repeat simply. If it needs a slide deck, it is not clear enough.')

  return { id: 'clarity', label: 'Strategic clarity', score, rating: scoreRating(score), color: scoreColor(score), unsureCount, keyFindings: findings.slice(0, 3) }
}

function scorePeople(a: Record<string, string>): ModuleScore {
  // People impact: some questions are inverted (higher impact = lower score)
  const impactDepth = get(a,'ppl_impact_depth')
  const jobsRisk    = get(a,'ppl_jobs_risk')
  const capacity    = get(a,'ppl_capacity')
  const fatigue     = get(a,'ppl_fatigue')
  const vulnerable  = get(a,'ppl_vulnerable')  // this one: higher = better (identified)
  const union       = get(a,'ppl_union_engagement')

  // Invert risk factors so higher raw = better score
  const rawInverted = ((5 - impactDepth) + (5 - jobsRisk) + (5 - capacity) + (5 - fatigue) + vulnerable + union) / 6
  const score = toScore(rawInverted)
  const unsureCount = countUnsure(a)

  const findings: string[] = []
  if (impactDepth >= 3)              findings.push('This change significantly or fundamentally alters what people do in their jobs each day — a level of disruption that requires serious support.')
  if (get(a,'ppl_vulnerable') <= 2) findings.push('Vulnerable or high-impact groups have not been properly identified or planned for.')
  if (jobsRisk >= 3)                 findings.push('Roles are at risk as a result of this change. Without honest, early communication, fear and speculation will fill the gap.')
  if (capacity >= 3)                 findings.push('People are being asked to maintain full workloads while learning and adapting to the new way. This double burden is a primary driver of change failure.')
  if (fatigue >= 3)                  findings.push('Significant change fatigue is present in the workforce. People are exhausted, and this change is landing on depleted capacity.')
  if (get(a,'ppl_union_engagement') <= 2 && a['org_union'] !== 'non_union') findings.push('Union engagement is cautious or opposed. This requires deliberate, early consultation — not reactive communication.')

  return { id: 'people', label: 'People and workforce impact', score, rating: scoreRating(score), color: scoreColor(score), unsureCount, keyFindings: findings.slice(0, 3) }
}

function scoreCapability(a: Record<string, string>): ModuleScore {
  const raw = avg(a, ['cap_dedicated_resource','cap_methodology','cap_training','cap_measurement','cap_feedback'])
  const score = toScore(raw)
  const unsureCount = countUnsure(a)

  const findings: string[] = []
  if (get(a,'cap_dedicated_resource') <= 2) findings.push('There is no dedicated change management resource. The project team is expected to carry the change — a common and costly assumption.')
  if (get(a,'cap_methodology') <= 2)        findings.push('There is no consistent approach to managing change in this organisation. Every initiative starts from scratch.')
  if (get(a,'cap_training') <= 2)           findings.push('Training and capability building is inadequate or not yet designed. People will not be ready to work the new way.')
  if (get(a,'cap_measurement') <= 2)        findings.push('Adoption is not being measured. The organisation will not know whether this change has actually worked.')
  if (get(a,'cap_feedback') <= 2)           findings.push('There is no real feedback mechanism. Problems will only surface when they are already serious.')

  return { id: 'capability', label: 'Change capability', score, rating: scoreRating(score), color: scoreColor(score), unsureCount, keyFindings: findings.slice(0, 3) }
}

function scoreCommunication(a: Record<string, string>): ModuleScore {
  const raw = avg(a, ['comm_message','comm_channels','comm_dialogue','comm_cadence','comm_timing'])
  const score = toScore(raw)
  const unsureCount = countUnsure(a)

  const findings: string[] = []
  if (get(a,'comm_message') <= 2)   findings.push('People cannot accurately explain what is changing or why. The core message is not landing.')
  if (get(a,'comm_channels') <= 2)  findings.push('Communication is not reaching everyone. Some groups — typically frontline workers — are being missed entirely.')
  if (get(a,'comm_dialogue') <= 2)  findings.push('There is no genuine two-way dialogue. People cannot ask questions and get real answers.')
  if (get(a,'comm_cadence') <= 2)   findings.push('Communication is too infrequent. People are filling the gap with speculation and rumour.')
  if (get(a,'comm_timing') <= 2)    findings.push('People are often finding out about changes too late to prepare. This is destroying trust.')

  return { id: 'communication', label: 'Communication and engagement', score, rating: scoreRating(score), color: scoreColor(score), unsureCount, keyFindings: findings.slice(0, 3) }
}

function scoreMomentum(a: Record<string, string>): ModuleScore {
  const progressScore = get(a,'mom_progress')
  const easierScore   = get(a,'mom_easier')
  const winsScore     = get(a,'mom_wins')
  const adaptScore    = get(a,'mom_adaptive')
  const portfolioInv  = 5 - get(a,'mom_portfolio') // invert — less competition = better

  const raw = (progressScore + easierScore + winsScore + adaptScore + portfolioInv) / 5
  const score = toScore(raw)
  const unsureCount = countUnsure(a)

  const findings: string[] = []
  if (progressScore <= 2)                    findings.push('The change lacks visible momentum. People cannot see progress, which kills engagement and confidence.')
  if (easierScore <= 2)                      findings.push('The new way of working is actually harder than the old way right now. People will revert to what works.')
  if (winsScore <= 2)                        findings.push('Early wins are not being shared. The organisation is not building the collective confidence that comes from visible success.')
  if (adaptScore <= 2)                       findings.push('The approach is not adapting to what is being learned. A rigid plan in a complex change is a liability.')
  if (get(a,'mom_portfolio') >= 3)           findings.push('This change is competing with multiple other significant initiatives. Portfolio overload is a real and present risk.')

  return { id: 'momentum', label: 'Momentum and delivery health', score, rating: scoreRating(score), color: scoreColor(score), unsureCount, keyFindings: findings.slice(0, 3) }
}

function scoreSustainability(a: Record<string, string>): ModuleScore {
  const raw = avg(a, ['sus_behaviours','sus_team_habits','sus_story','sus_learning','sus_accountability'])
  const score = toScore(raw)
  const unsureCount = countUnsure(a)

  const findings: string[] = []
  if (get(a,'sus_behaviours') <= 2)     findings.push('New behaviours are not holding. Old habits are returning, which indicates the change did not embed deeply enough.')
  if (get(a,'sus_team_habits') <= 2)    findings.push('Teams have not built their own habits around the new way. Without self-sustaining practices, the change will fade.')
  if (get(a,'sus_story') <= 2)          findings.push('The new way is still described as "the change" rather than "how we do things". Identity shift has not happened yet.')
  if (get(a,'sus_learning') <= 2)       findings.push('The organisation is not capturing what it is learning. The same mistakes will be made again on the next change.')
  if (get(a,'sus_accountability') <= 2) findings.push('Nobody is accountable for sustaining this change after the project ends. When the project team moves on, the change will drift.')

  return { id: 'sustainability', label: 'Sustainability and embedding', score, rating: scoreRating(score), color: scoreColor(score), unsureCount, keyFindings: findings.slice(0, 3) }
}

// ─── Simply Clear Framework phase ─────────────────────────────────────────

function determinePhase(stage: string, overallScore: number): string {
  if (stage === 'planning' || stage === 'early') {
    return overallScore >= 60
      ? 'Clarify Meaning — this organisation is in the preparation phase and has strong foundations to build on.'
      : 'Clarify Meaning — this organisation needs significant preparation work before moving into full delivery.'
  }
  if (stage === 'mid') {
    return overallScore >= 60
      ? 'Simplify Systems — this organisation is mid-delivery with reasonable conditions for success.'
      : 'Support Human Transition — the technical delivery is underway but the human side needs urgent attention.'
  }
  if (stage === 'post_golive') {
    return overallScore >= 60
      ? 'Embed and Reflect — the change is live and the focus should shift to embedding and learning.'
      : 'Support Human Transition — go-live has happened but genuine adoption has not yet followed.'
  }
  if (stage === 'stalled') {
    return 'Clarify Meaning — a stalled change needs to return to fundamentals before it can move forward again.'
  }
  return 'Clarify Meaning — the starting point before commitment is ensuring the foundations are right.'
}

// ─── Risk register builder ────────────────────────────────────────────────

function buildRiskRegister(
  modules: ModuleScore[],
  answers: AllAnswers,
  org: OrgProfile,
  initiative: InitiativeProfile
): RiskItem[] {
  const risks: RiskItem[] = []

  const lead = answers.leadership
  const clar = answers.clarity
  const ppl  = answers.people
  const cap  = answers.capability
  const comm = answers.communication
  const mom  = answers.momentum
  const sus  = answers.sustainability

  // Leadership risks
  if (get(lead,'lead_sponsor_quality') <= 2) {
    risks.push({
      title: 'Inadequate sponsorship',
      description: 'The primary sponsor is not actively leading this change. Without visible, sustained leadership commitment, the workforce will not commit either.',
      likelihood: get(lead,'lead_sponsor_quality') === 1 ? 'High' : 'Moderate',
      impact: 'Severe',
      mitigation: 'Schedule a direct conversation with the sponsor about the specific behaviours required — visibility, decision-making, communication, and resistance management. Frame it as the difference between this succeeding and failing.',
      owner: 'CEO or executive team',
      priority: 9,
    })
  }

  if (get(lead,'lead_resistance') <= 2) {
    risks.push({
      title: 'Senior leadership resistance',
      description: 'There is open or private resistance from one or more senior leaders. Mixed messages at the top are one of the most corrosive forces in a change programme.',
      likelihood: 'High',
      impact: 'High',
      mitigation: 'Identify the resistant leaders specifically and understand their concerns directly. Address the substance of their objections — dismissing resistance rarely resolves it.',
      owner: 'Primary sponsor',
      priority: 8,
    })
  }

  // Clarity risks
  if (get(clar,'clar_why') <= 2) {
    risks.push({
      title: 'Unclear change rationale',
      description: 'People cannot articulate why this change is happening. In the absence of a clear and compelling reason, people create their own — and their version is rarely positive.',
      likelihood: 'High',
      impact: 'High',
      mitigation: 'Develop a simple, honest change narrative — in plain language, not corporate speak. Test it by asking three people outside the project team to explain it back to you.',
      owner: 'Change lead and communications team',
      priority: 7,
    })
  }

  if (get(clar,'clar_success') <= 2) {
    risks.push({
      title: 'Undefined success measures',
      description: 'Success has not been defined beyond go-live. Without clear adoption measures, the organisation will not know whether this change actually worked.',
      likelihood: 'High',
      impact: 'Moderate',
      mitigation: 'Define three to five specific, observable measures of adoption — behaviours you would see if the change has landed. Agree these with the sponsor and build them into reporting.',
      owner: 'Programme director and sponsor',
      priority: 6,
    })
  }

  // People risks
  if (get(ppl,'ppl_capacity') >= 3) {
    risks.push({
      title: 'Workforce capacity overload',
      description: 'People are being asked to maintain full workloads while learning and adapting to the new way. This double burden is a primary driver of change failure and burnout.',
      likelihood: 'High',
      impact: 'High',
      mitigation: 'Identify which non-essential work can be paused or reduced during the transition period. Even a 10–15% reduction in load during go-live windows significantly improves outcomes.',
      owner: 'Line managers and HR',
      priority: 8,
    })
  }

  if (get(ppl,'ppl_jobs_risk') >= 3) {
    risks.push({
      title: 'Job security uncertainty',
      description: 'Roles are at risk as a result of this change. Where job security is uncertain and not being communicated clearly, fear and speculation dominate and adoption collapses.',
      likelihood: 'High',
      impact: 'Severe',
      mitigation: 'Communicate clearly and early about what is known, what is not yet known, and when people will know more. Silence is always interpreted as bad news.',
      owner: 'HR and senior leadership',
      priority: 9,
    })
  }

  if (get(ppl,'ppl_fatigue') >= 3) {
    risks.push({
      title: 'Change fatigue',
      description: 'The workforce is carrying significant fatigue from previous changes. This change is landing on depleted capacity and eroded trust.',
      likelihood: 'High',
      impact: 'High',
      mitigation: 'Acknowledge the fatigue explicitly and publicly. Explain what is stopping as well as what is starting. Give people permission to ask hard questions. Fatigue named is fatigue halved.',
      owner: 'Senior leadership and change lead',
      priority: 7,
    })
  }

  // Capability risks
  if (get(cap,'cap_dedicated_resource') <= 2) {
    risks.push({
      title: 'No dedicated change capability',
      description: 'There is no dedicated change management resource. The project team is expected to carry the human side of this change — a role they are typically not trained or resourced to perform.',
      likelihood: 'High',
      impact: 'High',
      mitigation: 'Assign at least one experienced change practitioner to this initiative whose primary role is the people side of the change — not the technical delivery.',
      owner: 'Programme director',
      priority: 7,
    })
  }

  // Communication risks
  if (get(comm,'comm_message') <= 2) {
    risks.push({
      title: 'Message not landing',
      description: 'The core change message is not reaching people clearly or consistently. Rumour and informal networks are filling the gap.',
      likelihood: 'High',
      impact: 'Moderate',
      mitigation: 'Simplify the core message until it fits in two sentences. Equip managers with the same language. Repeat it consistently across every channel.',
      owner: 'Communications team and change lead',
      priority: 6,
    })
  }

  // Momentum risks
  if (get(mom,'mom_portfolio') >= 3) {
    risks.push({
      title: 'Portfolio overload',
      description: 'This initiative is competing with multiple other significant changes for leadership attention, workforce capacity, and resources. Portfolio overload is a quiet killer of individual change programmes.',
      likelihood: 'High',
      impact: 'High',
      mitigation: 'Conduct a portfolio review. Map all active initiatives against workforce capacity. Make deliberate decisions about what to stop, slow, or continue before something fails by default.',
      owner: 'Executive team',
      priority: 8,
    })
  }

  // Sustainability risks
  if (get(sus,'sus_accountability') <= 2) {
    risks.push({
      title: 'No post-project accountability',
      description: 'There is no clear accountability for sustaining this change after the project team moves on. When responsibility disappears, so does the change.',
      likelihood: 'High',
      impact: 'High',
      mitigation: 'Assign a named owner for embedding this change — with specific accountability, a 90-day review rhythm, and authority to act when things slip.',
      owner: 'Programme director and sponsor',
      priority: 7,
    })
  }

  // Sort by priority and return top 5
  return risks.sort((a, b) => b.priority - a.priority).slice(0, 5)
}

// ─── 90-day action plan builder ───────────────────────────────────────────

function build90DayPlan(
  modules: ModuleScore[],
  answers: AllAnswers,
  initiative: InitiativeProfile
): ActionItem[] {
  const actions: ActionItem[] = []
  const lead = answers.leadership
  const clar = answers.clarity
  const ppl  = answers.people
  const cap  = answers.capability
  const comm = answers.communication
  const mom  = answers.momentum
  const sus  = answers.sustainability

  // Weeks 1–2: Most urgent
  if (get(lead,'lead_sponsor_quality') <= 2) {
    actions.push({
      week: 'Weeks 1 to 2',
      action: 'Sponsor activation conversation',
      why: 'The primary sponsor is not actively leading this change. This is the highest-leverage intervention available.',
      owner: 'CEO or executive sponsor',
      successMeasure: 'Sponsor has committed to a weekly visible action for the next 8 weeks',
      module: 'leadership',
    })
  }

  if (get(clar,'clar_why') <= 2) {
    actions.push({
      week: 'Weeks 1 to 2',
      action: 'Develop and test a plain-language change narrative',
      why: 'People cannot explain why this change is happening. A clear, honest "why" is the foundation everything else builds on.',
      owner: 'Change lead with sponsor input',
      successMeasure: 'Three people outside the project team can explain the change in two minutes without prompting',
      module: 'clarity',
    })
  }

  if (get(cap,'cap_dedicated_resource') <= 2) {
    actions.push({
      week: 'Weeks 1 to 2',
      action: 'Assign dedicated change management resource',
      why: 'The project team cannot carry the human side of this change. Dedicated capability needs to be in place before anything else will work.',
      owner: 'Programme director',
      successMeasure: 'At least one experienced change practitioner is assigned with a clear mandate',
      module: 'capability',
    })
  }

  // Weeks 3–6: Foundation work
  if (get(ppl,'ppl_vulnerable') <= 2) {
    actions.push({
      week: 'Weeks 3 to 6',
      action: 'Complete a people impact and vulnerability assessment',
      why: 'The groups most at risk from this change have not been identified or planned for. This work needs to happen before go-live.',
      owner: 'HR and change lead',
      successMeasure: 'Impact map complete with named support plans for each high-risk group',
      module: 'people',
    })
  }

  if (get(comm,'comm_channels') <= 2) {
    actions.push({
      week: 'Weeks 3 to 6',
      action: 'Audit and expand communication channels',
      why: 'Current channels are not reaching all affected groups. A channel audit will identify the gaps and what to use instead.',
      owner: 'Communications team',
      successMeasure: 'Every affected group has an identified primary channel and a named communication owner',
      module: 'communication',
    })
  }

  if (get(lead,'lead_managers') <= 2) {
    actions.push({
      week: 'Weeks 3 to 6',
      action: 'Run manager briefing and preparation sessions',
      why: 'Managers are the most trusted communication channel for most employees. If they cannot answer questions, the change stops at their layer.',
      owner: 'Change lead and HR',
      successMeasure: 'All people managers have attended a briefing and have a simple FAQ and talking points',
      module: 'leadership',
    })
  }

  if (get(clar,'clar_success') <= 2) {
    actions.push({
      week: 'Weeks 3 to 6',
      action: 'Define and agree adoption measures',
      why: 'Success needs to be defined beyond go-live. Without adoption measures, the organisation will not know if this change actually worked.',
      owner: 'Programme director and sponsor',
      successMeasure: 'Three to five observable adoption measures agreed and built into programme reporting',
      module: 'capability',
    })
  }

  // Weeks 7–12: Embedding and momentum
  if (get(cap,'cap_feedback') <= 2) {
    actions.push({
      week: 'Weeks 7 to 12',
      action: 'Establish a structured feedback and early warning mechanism',
      why: 'Without a feedback loop, problems only surface when they are already serious. An early warning system gives the team room to respond.',
      owner: 'Change lead',
      successMeasure: 'Fortnightly feedback pulse in place, with a named person responsible for responding within 48 hours',
      module: 'capability',
    })
  }

  if (get(mom,'mom_wins') <= 2) {
    actions.push({
      week: 'Weeks 7 to 12',
      action: 'Build a wins communication rhythm',
      why: 'Early wins are not being shared. A simple, consistent rhythm of celebrating progress builds collective confidence.',
      owner: 'Change lead and communications team',
      successMeasure: 'At least one win communicated to the full organisation per fortnight for the next 8 weeks',
      module: 'momentum',
    })
  }

  if (get(sus,'sus_accountability') <= 2) {
    actions.push({
      week: 'Weeks 7 to 12',
      action: 'Assign and brief a post-project embedding owner',
      why: 'When the project team moves on, the change needs someone with specific accountability for sustaining it.',
      owner: 'Programme director',
      successMeasure: 'Named embedding owner in place with a 90-day post-go-live review rhythm and clear mandate',
      module: 'sustainability',
    })
  }

  if (get(ppl,'ppl_fatigue') >= 3) {
    actions.push({
      week: 'Weeks 7 to 12',
      action: 'Senior leadership fatigue acknowledgement',
      why: 'Change fatigue is present and significant. A public, honest acknowledgement from leadership about what is stopping, what is continuing, and why will do more than any communication campaign.',
      owner: 'Primary sponsor',
      successMeasure: 'All-staff communication from sponsor that names the fatigue and commits to specific relief actions',
      module: 'people',
    })
  }

  return actions
}

// ─── Communication guide builder ──────────────────────────────────────────

function buildCommunicationGuide(
  org: OrgProfile,
  initiative: InitiativeProfile,
  answers: AllAnswers
): CommunicationGuideItem[] {
  const guide: CommunicationGuideItem[] = []
  const isUnion = org.org_union === 'unionised' || org.org_union === 'partial'
  const isFrontline = org.org_structure === 'hierarchical'

  guide.push({
    audience: 'Executive leadership team',
    keyMessage: `${initiative.init_name || 'This initiative'} is a strategic priority for ${org.org_name || 'our organisation'}. Each leader has a specific role in making it succeed — not just endorsing it, but visibly leading it within their own area.`,
    channel: 'Executive briefing, one-on-one conversations with sponsor',
    frequency: 'Weekly during delivery, fortnightly during embedding',
    owner: 'Primary sponsor',
  })

  guide.push({
    audience: 'People managers and team leaders',
    keyMessage: 'Here is what is changing, why it is happening, what it means for your team specifically, and what questions you are likely to get. Here is what to say.',
    channel: 'Manager briefing sessions, written FAQ, direct line manager from above',
    frequency: 'Before each major milestone, plus standing fortnightly update',
    owner: 'Change lead and HR',
  })

  guide.push({
    audience: 'All staff',
    keyMessage: `${initiative.init_name || 'This change'} is happening because ${initiative.init_driver === 'regulatory' ? 'we are required to by regulation, and here is what that means for you' : initiative.init_driver === 'crisis' ? 'something needs to change and we are being honest about that' : 'we believe it will make things better for our people and our customers'}. Here is what changes for you, when, and where to go with questions.`,
    channel: org.org_structure === 'agile' ? 'Team channels, all-hands, internal platforms' : 'All-staff email, team meetings, intranet',
    frequency: 'At launch, then fortnightly minimum throughout delivery',
    owner: 'Communications team and change lead',
  })

  if (isUnion) {
    guide.push({
      audience: 'Union representatives',
      keyMessage: 'We are consulting with you as a priority, not as an afterthought. Here is what we know, what we do not know yet, and how we will keep you informed as decisions are made.',
      channel: 'Formal consultation meetings, direct briefings before all-staff communications',
      frequency: 'Before each major decision point, minimum monthly',
      owner: 'HR director and primary sponsor',
    })
  }

  guide.push({
    audience: 'High-impact or vulnerable groups',
    keyMessage: 'We know this change affects your role significantly. Here is the specific support available to you, who to talk to, and what happens next for people in your position.',
    channel: 'Small group sessions, direct manager conversations, dedicated support contact',
    frequency: 'At key milestones and on request',
    owner: 'HR and change lead',
  })

  guide.push({
    audience: 'Customers and external stakeholders',
    keyMessage: `${org.org_name || 'Our organisation'} is changing how we operate. Here is what that means for your experience with us and when any changes will take effect.`,
    channel: 'Customer communications, account managers, website',
    frequency: 'At go-live and at significant milestones affecting service',
    owner: 'Customer/stakeholder lead',
  })

  return guide
}

// ─── Service recommendation ───────────────────────────────────────────────

function recommendService(
  overallScore: number,
  modules: ModuleScore[],
  initiative: InitiativeProfile,
  org: OrgProfile
): { service: string; rationale: string; timeframe: string; url: string } {
  const worstModule = [...modules].sort((a, b) => a.score - b.score)[0]
  const isSmall = org.org_size === 'micro' || org.org_size === 'small'
  const isStalled = initiative.init_stage === 'stalled'
  const isPlanning = initiative.init_stage === 'planning'

  if (overallScore < 30 || isStalled) {
    return {
      service: 'Diagnose',
      rationale: 'The findings across this assessment point to deep-rooted issues that need proper diagnosis before any plan will be effective. The Diagnose engagement will surface the root causes and give you a clear, honest picture of what needs to change first.',
      timeframe: '4 to 5 weeks',
      url: 'https://www.simplyclear.work/how-we-work',
    }
  }

  if (isPlanning && overallScore < 60) {
    return {
      service: 'Signal Review',
      rationale: 'Before you invest further in this initiative, a Signal Review will give you an honest read on the conditions, surface the risks that are already present, and help you decide how to proceed with confidence.',
      timeframe: '2 weeks',
      url: 'https://www.simplyclear.work/how-we-work',
    }
  }

  if (isSmall) {
    return {
      service: 'Simply Clear Essentials',
      rationale: 'For an organisation of your size, Essentials provides senior thinking, a structured framework, and a facilitated 90-day action plan without the overhead of a larger engagement.',
      timeframe: '6 weeks',
      url: 'https://www.simplyclear.work/how-we-work',
    }
  }

  if (overallScore < 50) {
    return {
      service: 'Do',
      rationale: `The scale and complexity of the challenges identified — particularly in ${worstModule.label} — requires sustained senior support throughout delivery, not just a plan. The Do engagement provides that.`,
      timeframe: '3 to 6 months',
      url: 'https://www.simplyclear.work/how-we-work',
    }
  }

  return {
    service: 'Plan',
    rationale: 'The foundations are present but the path forward needs to be built deliberately. A Plan engagement will give you a practical, sequenced roadmap for communication, engagement, and delivery.',
    timeframe: '5 to 6 weeks',
    url: 'https://www.simplyclear.work/how-we-work',
  }
}

// ─── Executive summary builder ────────────────────────────────────────────

function buildExecutiveSummary(
  overallScore: number,
  modules: ModuleScore[],
  org: OrgProfile,
  initiative: InitiativeProfile,
  totalUnsure: number
): string {
  const orgName = org.org_name || 'your organisation'
  const initName = initiative.init_name || 'this initiative'
  const worstModule = [...modules].sort((a, b) => a.score - b.score)[0]
  const bestModule  = [...modules].sort((a, b) => b.score - a.score)[0]

  const rating = overallScore >= 70 ? 'strong'
    : overallScore >= 50 ? 'adequate'
    : overallScore >= 30 ? 'challenging'
    : 'seriously at risk'

  let summary = `This assessment covers ${initName} at ${orgName}. `

  summary += `Across seven dimensions of transformation health, the overall picture is ${rating}. `

  if (bestModule.score >= 65) {
    summary += `The strongest area is ${bestModule.label.toLowerCase()}, which provides a foundation to build from. `
  }

  summary += `The area most requiring attention is ${worstModule.label.toLowerCase()}, which scored ${worstModule.score} out of 100. `

  if (totalUnsure >= 5) {
    summary += `It is worth noting that ${totalUnsure} questions across this assessment could not be answered confidently. That level of uncertainty is itself a finding — going into a significant change without a clear picture of these fundamentals carries real risk. `
  }

  summary += `The risk register and 90-day action plan that follow are built directly from the specific evidence in your responses. They are not generic recommendations. They reflect what this assessment revealed about this change, in this organisation, at this moment.`

  return summary
}

// ─── Main report generator ────────────────────────────────────────────────

export function generateReport(answers: AllAnswers): SolutionReport {
  const { org, initiative } = answers

  // Score all seven modules
  const moduleScores: ModuleScore[] = [
    scoreLeadership(answers.leadership),
    scoreClarity(answers.clarity),
    scorePeople(answers.people),
    scoreCapability(answers.capability),
    scoreCommunication(answers.communication),
    scoreMomentum(answers.momentum),
    scoreSustainability(answers.sustainability),
  ]

  // Overall score — weighted: leadership and clarity carry most weight
  const weights = [0.20, 0.18, 0.16, 0.14, 0.14, 0.10, 0.08]
  const overallScore = Math.round(
    moduleScores.reduce((sum, m, i) => sum + m.score * weights[i], 0)
  )

  const overallRating = scoreRating(overallScore)
  const totalUnsureCount = moduleScores.reduce((sum, m) => sum + m.unsureCount, 0)

  const simplyClearPhase = determinePhase(initiative.init_stage, overallScore)
  const rootCauses = buildRiskRegister(moduleScores, answers, org, initiative)
  const actionPlan = build90DayPlan(moduleScores, answers, initiative)
  const communicationGuide = buildCommunicationGuide(org, initiative, answers)
  const strategicRecommendation = recommendService(overallScore, moduleScores, initiative, org)
  const executiveSummary = buildExecutiveSummary(overallScore, moduleScores, org, initiative, totalUnsureCount)

  return {
    completedAt: new Date().toISOString(),
    org,
    initiative,
    moduleScores,
    overallScore,
    overallRating,
    simplyClearPhase,
    executiveSummary,
    rootCauses,
    actionPlan,
    communicationGuide,
    strategicRecommendation,
    totalUnsureCount,
  }
}
