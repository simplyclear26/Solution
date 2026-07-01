import type { AssessmentStep } from './types'

// ─── Organisation profile ─────────────────────────────────────────────────

export const ORG_STEPS: AssessmentStep[] = [
  {
    id: 'org_name',
    question: 'What is the name of your organisation?',
    hint: 'This will appear throughout your report.',
    type: 'text',
    module: 'org',
  },
  {
    id: 'org_sector',
    question: 'Which sector best describes your organisation?',
    hint: '',
    type: 'seg', cols: 2, module: 'org',
    options: [
      { val: 'private',    label: 'Private sector',        sub: 'Commercial, for-profit' },
      { val: 'public',     label: 'Public sector',         sub: 'Government agency or department' },
      { val: 'nfp',        label: 'Not-for-profit',        sub: 'Charity, association, or social enterprise' },
      { val: 'government', label: 'Government enterprise', sub: 'GBE, statutory authority, or similar' },
    ],
  },
  {
    id: 'org_size',
    question: 'How many people work in your organisation?',
    hint: '',
    type: 'seg', cols: 2, module: 'org',
    options: [
      { val: 'micro',  label: 'Fewer than 50',    sub: 'Small team or start-up' },
      { val: 'small',  label: '50 to 250',         sub: 'Small organisation' },
      { val: 'medium', label: '250 to 1,000',      sub: 'Mid-sized organisation' },
      { val: 'large',  label: '1,000 to 5,000',    sub: 'Large organisation' },
      { val: 'xlarge', label: 'More than 5,000',   sub: 'Enterprise or major institution' },
    ],
  },
  {
    id: 'org_union',
    question: 'What is the union status of your workforce?',
    hint: 'This shapes how change needs to be communicated and negotiated.',
    type: 'seg', cols: 2, module: 'org',
    options: [
      { val: 'non_union',  label: 'Non-unionised',       sub: 'No union representation' },
      { val: 'partial',    label: 'Partially unionised', sub: 'Some roles or sites covered' },
      { val: 'unionised',  label: 'Fully unionised',     sub: 'Most or all workforce covered' },
      { val: 'unsure',     label: 'Not sure',            sub: 'I do not have a clear picture' },
    ],
  },
  {
    id: 'org_structure',
    question: 'How would you describe the way your organisation is structured?',
    hint: 'This affects how decisions are made and how change travels through the organisation.',
    type: 'seg', cols: 2, module: 'org',
    options: [
      { val: 'hierarchical', label: 'Hierarchical',           sub: 'Clear chain of command, centralised decisions' },
      { val: 'matrix',       label: 'Matrix',                 sub: 'People report to more than one leader' },
      { val: 'agile',        label: 'Agile or product-based', sub: 'Cross-functional teams, distributed authority' },
      { val: 'mixed',        label: 'A mix',                  sub: 'Different parts work differently' },
    ],
  },
  {
    id: 'org_digital',
    question: 'How would you honestly rate your organisation\'s digital maturity?',
    hint: 'Think about how confidently your people use digital tools, not just what technology you have.',
    type: 'seg', cols: 2, module: 'org',
    options: [
      { val: 'low',      label: 'Early stages',       sub: 'Manual processes, limited digital adoption' },
      { val: 'moderate', label: 'Developing',         sub: 'Some digital tools but inconsistently used' },
      { val: 'high',     label: 'Digitally capable',  sub: 'Comfortable with technology across most roles' },
      { val: 'advanced', label: 'Digitally advanced', sub: 'Technology is central to how we work' },
    ],
  },
]

// ─── Initiative profile ───────────────────────────────────────────────────

export const INITIATIVE_STEPS: AssessmentStep[] = [
  {
    id: 'init_name',
    question: 'Give this initiative a name — what do you call it internally?',
    hint: 'Even a working title helps. This will appear throughout your report.',
    type: 'text', module: 'initiative',
  },
  {
    id: 'init_type',
    question: 'What type of change is this?',
    hint: 'Choose the one that best captures the primary nature of the change.',
    type: 'seg', cols: 2, module: 'initiative',
    options: [
      { val: 'technology', label: 'Technology transformation', sub: 'New systems, platforms, or digital ways of working' },
      { val: 'process',    label: 'Process redesign',          sub: 'Changing how work gets done' },
      { val: 'op_model',   label: 'Operating model change',   sub: 'Restructuring, new ways of organising' },
      { val: 'culture',    label: 'Culture change',            sub: 'Shifting values, behaviours, or mindsets' },
      { val: 'compliance', label: 'Compliance or regulatory',  sub: 'Driven by legislation, regulation, or audit' },
      { val: 'merger',     label: 'Merger or acquisition',     sub: 'Integrating organisations or teams' },
      { val: 'ai',         label: 'AI transformation',         sub: 'Introducing artificial intelligence into workflows' },
      { val: 'other',      label: 'Something else',            sub: 'A combination or something not listed' },
    ],
  },
  {
    id: 'init_stage',
    question: 'Where is this initiative right now?',
    hint: '',
    type: 'seg', cols: 2, module: 'initiative',
    options: [
      { val: 'planning',    label: 'Still planning',        sub: 'Not yet in delivery' },
      { val: 'early',       label: 'Early delivery',        sub: 'Just started, first 3 months' },
      { val: 'mid',         label: 'Mid-delivery',          sub: 'Well underway, past the start' },
      { val: 'post_golive', label: 'Post go-live',          sub: 'Live but embedding the change' },
      { val: 'stalled',     label: 'Stalled or recovering', sub: 'Hit problems and trying to recover' },
    ],
  },
  {
    id: 'init_driver',
    question: 'What is primarily driving this change?',
    hint: 'Be honest. The real driver shapes everything about how this needs to be managed.',
    type: 'seg', cols: 2, module: 'initiative',
    options: [
      { val: 'strategic',   label: 'Strategic choice',     sub: 'We chose to do this to get ahead' },
      { val: 'competitive', label: 'Competitive pressure', sub: 'We need to keep up or catch up' },
      { val: 'regulatory',  label: 'Regulatory or legal',  sub: 'We have to do this' },
      { val: 'cost',        label: 'Cost reduction',       sub: 'We need to do more with less' },
      { val: 'crisis',      label: 'Crisis or failure',    sub: 'Something went wrong and we need to fix it' },
      { val: 'growth',      label: 'Growth or scale',      sub: 'We are expanding and need to change how we operate' },
    ],
  },
  {
    id: 'init_commissioned',
    question: 'Who commissioned this change?',
    hint: '',
    type: 'seg', cols: 2, module: 'initiative',
    options: [
      { val: 'board',     label: 'The board',          sub: 'Board directive or resolution' },
      { val: 'ceo',       label: 'The CEO or MD',      sub: 'Executive decision' },
      { val: 'exec_team', label: 'The executive team', sub: 'Collective leadership decision' },
      { val: 'external',  label: 'External mandate',   sub: 'Government, regulator, or funder' },
      { val: 'unsure',    label: 'Not entirely clear', sub: 'The origin is ambiguous' },
    ],
  },
  {
    id: 'init_timeline',
    question: 'What is the planned timeline for this initiative?',
    hint: '',
    type: 'seg', cols: 2, module: 'initiative',
    options: [
      { val: 'short',   label: 'Less than 6 months',    sub: 'Very compressed' },
      { val: 'medium',  label: '6 to 12 months',        sub: 'A full year or less' },
      { val: 'long',    label: '12 to 24 months',       sub: 'A multi-year programme' },
      { val: 'ongoing', label: 'Ongoing or open-ended', sub: 'No fixed end date' },
      { val: 'unsure',  label: 'Not yet defined',       sub: 'The timeline is still being worked out' },
    ],
  },
  {
    id: 'init_priority',
    question: 'How is this initiative prioritised relative to other work in your organisation right now?',
    hint: '',
    type: 'seg', cols: 2, module: 'initiative',
    options: [
      { val: 'top',      label: 'The top priority',   sub: 'Everything else comes second' },
      { val: 'high',     label: 'High priority',      sub: 'One of the two or three most important things' },
      { val: 'moderate', label: 'Moderate priority',  sub: 'Important but competing with other things' },
      { val: 'low',      label: 'Low priority',       sub: 'Often deprioritised in favour of other work' },
    ],
  },
]

// ─── Module 1 — Leadership & sponsorship ──────────────────────────────────

export const LEADERSHIP_STEPS: AssessmentStep[] = [
  {
    id: 'lead_sponsor_quality',
    question: 'Who is the primary sponsor of this change, and how actively are they leading it?',
    hint: 'A sponsor leads from the front. They are visible, vocal, and making decisions — not just the person whose name is on the project.',
    type: 'seg', cols: 2, module: 'leadership',
    options: [
      { val: '4', label: 'Actively leading',      sub: 'Visible, vocal, making decisions, clearing blockers' },
      { val: '3', label: 'Broadly supportive',    sub: 'Engaged but not driving it personally' },
      { val: '2', label: 'Nominally involved',    sub: 'Name on the project but largely absent' },
      { val: '1', label: 'Effectively absent',    sub: 'Little to no visible involvement' },
      { val: '0', label: 'Not sure',              sub: 'Hard to assess from where I sit' },
    ],
  },
  {
    id: 'lead_coalition',
    question: 'Beyond the primary sponsor, how many senior leaders are visibly and actively backing this change?',
    hint: 'Active backing means they talk about it, model it, and make decisions that support it.',
    type: 'seg', cols: 2, module: 'leadership',
    options: [
      { val: '4', label: 'A strong coalition',    sub: 'Three or more senior leaders visibly behind it' },
      { val: '3', label: 'Some support',          sub: 'One or two others are actively involved' },
      { val: '2', label: 'Isolated support',      sub: 'Largely one person carrying it' },
      { val: '1', label: 'No coalition',          sub: 'The sponsor is effectively alone' },
      { val: '0', label: 'Not sure',              sub: 'I cannot assess the coalition clearly' },
    ],
  },
  {
    id: 'lead_resistance',
    question: 'Is there senior leadership resistance to this change — openly or privately?',
    hint: 'Private resistance is often more damaging than open resistance. Mixed messages from the top destroy confidence fast.',
    type: 'seg', cols: 2, module: 'leadership',
    options: [
      { val: '4', label: 'No resistance',          sub: 'Leadership is unified and aligned' },
      { val: '3', label: 'Minor resistance',       sub: 'Mostly aligned, some reservations' },
      { val: '2', label: 'Moderate resistance',    sub: 'Some leaders privately or quietly opposed' },
      { val: '1', label: 'Significant resistance', sub: 'Active opposition from one or more senior leaders' },
      { val: '0', label: 'Not sure',               sub: 'Hard to know what leaders really think' },
    ],
  },
  {
    id: 'lead_decisions',
    question: 'When this change needs a decision, does it get one — promptly and clearly?',
    hint: 'Decision delays are one of the most common and most underestimated causes of change failure.',
    type: 'seg', cols: 2, module: 'leadership',
    options: [
      { val: '4', label: 'Fast and clear',             sub: 'Leaders are available and decisive' },
      { val: '3', label: 'Mostly timely',              sub: 'Occasional delays but generally responsive' },
      { val: '2', label: 'Often delayed',              sub: 'Decisions frequently take too long' },
      { val: '1', label: 'Decisions stall regularly',  sub: 'Programme is regularly blocked waiting for answers' },
      { val: '0', label: 'Not sure',                   sub: 'I do not have visibility of this' },
    ],
  },
  {
    id: 'lead_modelling',
    question: 'Are senior leaders visibly working in the new way themselves — or just asking others to?',
    hint: 'People watch what leaders do, not what they say. If leaders are still working the old way, everyone notices.',
    type: 'seg', cols: 2, module: 'leadership',
    options: [
      { val: '4', label: 'Yes, visibly and consistently', sub: 'Leaders are living the change themselves' },
      { val: '3', label: 'Mostly',                        sub: 'Generally modelling it, with some exceptions' },
      { val: '2', label: 'Inconsistently',                sub: 'Some are, some are not' },
      { val: '1', label: 'No',                            sub: 'Leaders are still working the old way' },
      { val: '0', label: 'Not applicable yet',            sub: 'The change has not reached that stage' },
    ],
  },
  {
    id: 'lead_managers',
    question: 'Are the managers and team leaders who need to lead this change locally equipped and willing to do it?',
    hint: 'The change lives or dies at the manager layer. If managers do not know what to say or do, the message stops there.',
    type: 'seg', cols: 2, module: 'leadership',
    options: [
      { val: '4', label: 'Well equipped and willing',    sub: 'Prepared, briefed, and engaged' },
      { val: '3', label: 'Mostly',                       sub: 'Generally capable, with some gaps' },
      { val: '2', label: 'Partially',                    sub: 'Some managers on board, others not' },
      { val: '1', label: 'Not equipped or not willing',  sub: 'Managers are unprepared or resistant' },
      { val: '0', label: 'Not sure',                     sub: 'I do not have a clear picture of this' },
    ],
  },
]

// ─── Module 2 — Strategic clarity ────────────────────────────────────────

export const CLARITY_STEPS: AssessmentStep[] = [
  {
    id: 'clar_why',
    question: 'Can anyone in your organisation explain why this change is happening in a way that would make sense to someone on the front line?',
    hint: 'Not the strategy document version. The real, human, honest version that connects to people\'s daily experience.',
    type: 'seg', cols: 2, module: 'clarity',
    options: [
      { val: '4', label: 'Yes, clearly and consistently', sub: 'A compelling reason anyone could repeat' },
      { val: '3', label: 'Mostly',                        sub: 'The reason exists but varies by who you ask' },
      { val: '2', label: 'Not really',                    sub: 'The reason feels vague or corporate' },
      { val: '1', label: 'No',                            sub: 'People cannot answer why this is happening' },
      { val: '0', label: 'Not sure',                      sub: 'I am not confident in the answer myself' },
    ],
  },
  {
    id: 'clar_endstate',
    question: 'Is there a clear, simple picture of what this change looks like when it is done — one that anyone could understand?',
    hint: 'If you cannot describe the end state simply, your people cannot picture it. It is very hard to head toward something you cannot see.',
    type: 'seg', cols: 2, module: 'clarity',
    options: [
      { val: '4', label: 'Yes, very clearly',  sub: 'A concrete picture everyone can describe' },
      { val: '3', label: 'Mostly',             sub: 'Clear at the leadership level, less so below' },
      { val: '2', label: 'Vague',              sub: 'A general direction without a clear destination' },
      { val: '1', label: 'No',                 sub: 'The end state is unclear even at the top' },
      { val: '0', label: 'Not sure',           sub: 'I am not sure what the end state looks like myself' },
    ],
  },
  {
    id: 'clar_success',
    question: 'Are there clear, agreed measures of success for this change — beyond the project going live?',
    hint: 'Going live is not success. Success is people working differently and the organisation being better for it.',
    type: 'seg', cols: 2, module: 'clarity',
    options: [
      { val: '4', label: 'Yes, clear and agreed',  sub: 'Specific measures of adoption and outcome' },
      { val: '3', label: 'Partially',              sub: 'Some measures but not comprehensive' },
      { val: '2', label: 'Mostly project metrics', sub: 'On time, on budget, go-live date' },
      { val: '1', label: 'No real measures',       sub: 'Success has not been defined' },
      { val: '0', label: 'Not sure',               sub: 'I do not know what we are measuring' },
    ],
  },
  {
    id: 'clar_losses',
    question: 'Have you been honest with your people about what they are giving up as part of this change?',
    hint: 'Every change involves a loss. Acknowledging that builds trust. Ignoring it breeds resentment.',
    type: 'seg', cols: 2, module: 'clarity',
    options: [
      { val: '4', label: 'Yes, openly and honestly', sub: 'We have named what people are letting go of' },
      { val: '3', label: 'Partially',                sub: 'Acknowledged some losses but not all' },
      { val: '2', label: 'Not really',               sub: 'We have focused on the positives' },
      { val: '1', label: 'Not at all',               sub: 'Losses have not been part of the conversation' },
      { val: '0', label: 'Not sure',                 sub: 'I have not thought about this' },
    ],
  },
  {
    id: 'clar_narrative',
    question: 'Is the change narrative simple enough to repeat in a two-minute hallway conversation?',
    hint: 'If it takes a slide deck to explain, it is too complicated. The best change stories fit in two sentences.',
    type: 'seg', cols: 2, module: 'clarity',
    options: [
      { val: '4', label: 'Yes, very simple',  sub: 'Anyone could explain it in two minutes' },
      { val: '3', label: 'Mostly',            sub: 'Simple enough for most people' },
      { val: '2', label: 'Still complex',     sub: 'Requires some context to make sense of' },
      { val: '1', label: 'Very complex',      sub: 'Hard to explain without significant background' },
      { val: '0', label: 'Not sure',          sub: 'I have not tried to simplify it' },
    ],
  },
]

// ─── Module 3 — People & workforce impact ────────────────────────────────

export const PEOPLE_STEPS: AssessmentStep[] = [
  {
    id: 'ppl_impact_depth',
    question: 'How deeply does this change affect what people actually do in their jobs each day?',
    hint: 'New tools that keep the job the same is very different from a change that fundamentally alters what people do and how they are valued.',
    type: 'seg', cols: 2, module: 'people',
    options: [
      { val: '1', label: 'Surface level',  sub: 'Same job, different tools or process steps' },
      { val: '2', label: 'Moderate',       sub: 'Some tasks and ways of working change' },
      { val: '3', label: 'Significant',    sub: 'Roles feel meaningfully different' },
      { val: '4', label: 'Fundamental',    sub: 'What people do and how they are valued is changing' },
      { val: '0', label: 'Not sure',       sub: 'The full impact has not been mapped' },
    ],
  },
  {
    id: 'ppl_vulnerable',
    question: 'Have you identified the groups of people who will find this change the hardest?',
    hint: 'Think about people with lower digital confidence, those in the most affected roles, or those with the most to lose.',
    type: 'seg', cols: 2, module: 'people',
    options: [
      { val: '4', label: 'Yes, identified and planned for', sub: 'We know who they are and have a specific plan' },
      { val: '3', label: 'Identified but not yet planned',  sub: 'We know who they are but support is not in place' },
      { val: '2', label: 'Partially identified',            sub: 'General sense but not a clear picture' },
      { val: '1', label: 'Not considered yet',              sub: 'This has not been part of the planning conversation' },
      { val: '0', label: 'Not sure',                        sub: 'I am not aware of any analysis of this' },
    ],
  },
  {
    id: 'ppl_jobs_risk',
    question: 'Are any roles or jobs at risk as a result of this change?',
    hint: 'If there is any risk to jobs, even unconfirmed, people are already thinking about it. Silence amplifies fear.',
    type: 'seg', cols: 2, module: 'people',
    options: [
      { val: '1', label: 'No, jobs are secure',          sub: 'Employment is not affected' },
      { val: '2', label: 'Roles change but are secure',  sub: 'Jobs exist but look different afterwards' },
      { val: '3', label: 'Some roles at risk',           sub: 'Certain roles may be affected' },
      { val: '4', label: 'Significant job impact',       sub: 'Restructuring or redundancy is part of this' },
      { val: '0', label: 'Not confirmed yet',            sub: 'This has not been finalised or communicated' },
    ],
  },
  {
    id: 'ppl_capacity',
    question: 'Will people be expected to keep doing their current job at full capacity while learning the new way?',
    hint: 'This "double burden" is one of the most underestimated causes of change failure.',
    type: 'seg', cols: 2, module: 'people',
    options: [
      { val: '1', label: 'No, capacity has been protected', sub: 'Time and space built in for the transition' },
      { val: '2', label: 'Partially protected',             sub: 'Some relief but not enough' },
      { val: '3', label: 'Mostly both at once',             sub: 'People expected to manage both' },
      { val: '4', label: 'Full load with no relief',        sub: 'No capacity has been created' },
      { val: '0', label: 'Not yet determined',              sub: 'This has not been worked through' },
    ],
  },
  {
    id: 'ppl_union_engagement',
    question: 'If your workforce is unionised, how would you describe the union\'s current position on this change?',
    hint: 'Skip if not applicable. Early union engagement almost always produces better outcomes.',
    type: 'seg', cols: 2, module: 'people',
    options: [
      { val: '4', label: 'Engaged and broadly supportive', sub: 'Union is aware, consulted, and constructive' },
      { val: '3', label: 'Neutral or watching',            sub: 'No strong position yet' },
      { val: '2', label: 'Cautious or concerned',          sub: 'Raising questions, seeking assurances' },
      { val: '1', label: 'Actively opposed',               sub: 'Union is opposing this change' },
      { val: '0', label: 'Not applicable or not sure',     sub: 'Not unionised, or I do not have visibility' },
    ],
  },
  {
    id: 'ppl_fatigue',
    question: 'How much change fatigue is present in your workforce right now?',
    hint: 'Fatigue shows up as cynicism, passive resistance, and declining engagement — the accumulation of too many changes too close together.',
    type: 'seg', cols: 2, module: 'people',
    options: [
      { val: '1', label: 'Very little',    sub: 'People feel settled and have real capacity' },
      { val: '2', label: 'Some',           sub: 'Mild weariness but generally coping' },
      { val: '3', label: 'Noticeable',     sub: 'Real weariness or quiet resistance present' },
      { val: '4', label: 'Significant',    sub: 'People are exhausted and cynical' },
      { val: '0', label: 'Not sure',       sub: 'We have not checked in on this recently' },
    ],
  },
]

// ─── Module 4 — Change capability & infrastructure ────────────────────────

export const CAPABILITY_STEPS: AssessmentStep[] = [
  {
    id: 'cap_dedicated_resource',
    question: 'Do you have people whose primary role is to manage the change itself — not just deliver the project?',
    hint: 'Project managers deliver the technical work. Change practitioners help your people actually shift. These are different skills.',
    type: 'seg', cols: 2, module: 'capability',
    options: [
      { val: '4', label: 'Yes, dedicated change resource', sub: 'Experienced practitioners specifically for this' },
      { val: '3', label: 'Some coverage',                  sub: 'Part of someone\'s role, not their whole job' },
      { val: '2', label: 'Minimal',                        sub: 'Project team is expected to cover it' },
      { val: '1', label: 'None',                           sub: 'No dedicated change support in place' },
      { val: '0', label: 'Not sure',                       sub: 'I do not know who is responsible for this' },
    ],
  },
  {
    id: 'cap_methodology',
    question: 'Does your organisation have a consistent, repeatable approach to managing change — or does each initiative start from scratch?',
    hint: 'Organisations with a common change approach consistently outperform those that reinvent the wheel every time.',
    type: 'seg', cols: 2, module: 'capability',
    options: [
      { val: '4', label: 'Yes, a clear methodology', sub: 'A consistent approach people understand and use' },
      { val: '3', label: 'Somewhat',                 sub: 'Some structure but it varies by project' },
      { val: '2', label: 'Mostly ad hoc',            sub: 'Each project does its own thing' },
      { val: '1', label: 'None',                     sub: 'No common approach at all' },
      { val: '0', label: 'Not sure',                 sub: 'I am not aware of one' },
    ],
  },
  {
    id: 'cap_training',
    question: 'How well is the training and capability building for this change designed?',
    hint: 'Training that happens in a room before go-live and is never reinforced is not training. Good capability building happens in the flow of real work.',
    type: 'seg', cols: 2, module: 'capability',
    options: [
      { val: '4', label: 'Well designed and delivered',   sub: 'Role-specific, practical, reinforced on the job' },
      { val: '3', label: 'Reasonably good',               sub: 'Structured and broadly relevant' },
      { val: '2', label: 'Basic',                         sub: 'Generic training, not well tailored' },
      { val: '1', label: 'Inadequate or not yet planned', sub: 'Training is not ready or not fit for purpose' },
      { val: '0', label: 'Not sure',                      sub: 'I do not have a clear view of the training plan' },
    ],
  },
  {
    id: 'cap_measurement',
    question: 'Are you measuring whether people are actually adopting the change — or just whether the project delivered?',
    hint: 'Going live and people working differently are two completely different things. Most organisations only measure the first.',
    type: 'seg', cols: 2, module: 'capability',
    options: [
      { val: '4', label: 'Measuring adoption properly', sub: 'Tracking real behaviour change, not just activity' },
      { val: '3', label: 'Somewhat',                    sub: 'Some adoption measures alongside project metrics' },
      { val: '2', label: 'Mostly project metrics',      sub: 'On time, on budget, go-live' },
      { val: '1', label: 'Not measuring adoption',      sub: 'We move on once it goes live' },
      { val: '0', label: 'Not sure',                    sub: 'I am not sure what we are tracking' },
    ],
  },
  {
    id: 'cap_feedback',
    question: 'Do you have a way to hear from people about how the change is landing — before problems become crises?',
    hint: 'Early warning systems save transformations. If you only find out something is wrong when it is already serious, you have no feedback loop.',
    type: 'seg', cols: 2, module: 'capability',
    options: [
      { val: '4', label: 'Yes, a real feedback mechanism', sub: 'Regular, structured, and actually responded to' },
      { val: '3', label: 'Somewhat',                       sub: 'Some channels but not systematic' },
      { val: '2', label: 'Informal only',                  sub: 'Word of mouth and manager observation' },
      { val: '1', label: 'No real mechanism',              sub: 'We mostly find out when something goes wrong' },
      { val: '0', label: 'Not sure',                       sub: 'I am not aware of what is in place' },
    ],
  },
]

// ─── Module 5 — Communication & engagement ────────────────────────────────

export const COMMUNICATION_STEPS: AssessmentStep[] = [
  {
    id: 'comm_message',
    question: 'If you asked someone on the front line to explain this change, what would they say?',
    hint: 'Not the approved version. What they actually say when asked.',
    type: 'seg', cols: 2, module: 'communication',
    options: [
      { val: '4', label: 'They would get it right',       sub: 'Clear, consistent understanding across the organisation' },
      { val: '3', label: 'Mostly right',                  sub: 'Broad awareness with some gaps' },
      { val: '2', label: 'Vague or inconsistent',         sub: 'Different people say different things' },
      { val: '1', label: 'Wrong or unaware',              sub: 'Most people cannot explain what is changing' },
      { val: '0', label: 'Not sure',                      sub: 'We have not checked' },
    ],
  },
  {
    id: 'comm_channels',
    question: 'Are you reaching people through the channels they actually use — not just the ones that are easiest for you?',
    hint: 'Email works for desk-based workers. It does not work for people on a shop floor, in aged care, driving trucks, or working clinical shifts.',
    type: 'seg', cols: 2, module: 'communication',
    options: [
      { val: '4', label: 'Yes, deliberately targeted', sub: 'Channels matched to each audience group' },
      { val: '3', label: 'Mostly',                     sub: 'Good range of channels, not perfectly targeted' },
      { val: '2', label: 'Mostly email and intranet',  sub: 'Digital channels that miss some groups' },
      { val: '1', label: 'One or two channels only',   sub: 'Not reaching everyone effectively' },
      { val: '0', label: 'Not sure',                   sub: 'We have not mapped this deliberately' },
    ],
  },
  {
    id: 'comm_dialogue',
    question: 'Do people have a genuine way to ask questions and raise concerns — and do they actually get answered?',
    hint: 'A feedback form that nobody reads is not dialogue. Real dialogue means someone responds and people can see their input made a difference.',
    type: 'seg', cols: 2, module: 'communication',
    options: [
      { val: '4', label: 'Yes, genuine two-way dialogue', sub: 'Questions asked and genuinely answered' },
      { val: '3', label: 'Somewhat',                      sub: 'Mechanisms exist but not always responsive' },
      { val: '2', label: 'Mostly one-way',                sub: 'Communication goes out but not much comes back' },
      { val: '1', label: 'No real dialogue',              sub: 'No genuine way for people to speak up' },
      { val: '0', label: 'Not sure',                      sub: 'I am not sure what is in place' },
    ],
  },
  {
    id: 'comm_cadence',
    question: 'Are you communicating often enough that people feel informed rather than surprised?',
    hint: 'In the absence of communication, people fill the gap with speculation. Regular updates build confidence.',
    type: 'seg', cols: 2, module: 'communication',
    options: [
      { val: '4', label: 'Yes, regular and consistent',   sub: 'People know what is happening and what is coming' },
      { val: '3', label: 'Mostly',                        sub: 'Reasonable cadence with some gaps' },
      { val: '2', label: 'Milestone-driven only',         sub: 'Communication happens at launch and go-live, then goes quiet' },
      { val: '1', label: 'Infrequent',                    sub: 'People are largely in the dark' },
      { val: '0', label: 'Not sure',                      sub: 'I do not have a clear view of what is going out' },
    ],
  },
  {
    id: 'comm_timing',
    question: 'Do people find out about changes in time to prepare — or are they often the last to know?',
    hint: 'Finding out on the day something goes live, or through rumour, destroys trust faster than almost anything else.',
    type: 'seg', cols: 2, module: 'communication',
    options: [
      { val: '4', label: 'Always in time to prepare',  sub: 'People are informed early with good lead time' },
      { val: '3', label: 'Usually',                    sub: 'Good lead time with occasional exceptions' },
      { val: '2', label: 'Sometimes too late',         sub: 'Communication often feels last-minute' },
      { val: '1', label: 'Often the last to know',     sub: 'Rumour frequently gets there first' },
      { val: '0', label: 'Not sure',                   sub: 'I am not sure how well-timed our communication is' },
    ],
  },
]

// ─── Module 6 — Momentum & delivery health ────────────────────────────────

export const MOMENTUM_STEPS: AssessmentStep[] = [
  {
    id: 'mom_progress',
    question: 'Is this change making consistent, visible progress — or does it feel like it is going around in circles?',
    hint: 'Visible progress keeps people moving. The perception of no progress kills momentum fast.',
    type: 'seg', cols: 2, module: 'momentum',
    options: [
      { val: '4', label: 'Clear, consistent progress', sub: 'People can see things moving forward' },
      { val: '3', label: 'Mostly progressing',         sub: 'On track with some friction' },
      { val: '2', label: 'Slow or stalling',           sub: 'Progress feels hard to see or maintain' },
      { val: '1', label: 'Effectively stalled',        sub: 'The change has stopped moving' },
      { val: '0', label: 'Not sure',                   sub: 'Hard to assess from where I sit' },
    ],
  },
  {
    id: 'mom_easier',
    question: 'Is the new way of working genuinely easier than the old way — or is it actually harder right now?',
    hint: 'If the new way is harder, people will find workarounds. Always. The system needs to make the new behaviour the path of least resistance.',
    type: 'seg', cols: 2, module: 'momentum',
    options: [
      { val: '4', label: 'Easier, the system supports it', sub: 'The new way is genuinely simpler' },
      { val: '3', label: 'About the same',                 sub: 'No clear advantage yet but improving' },
      { val: '2', label: 'Harder in some ways',            sub: 'Some friction that needs addressing' },
      { val: '1', label: 'Harder, people are reverting',   sub: 'Old habits are coming back' },
      { val: '0', label: 'Not yet applicable',             sub: 'The change has not reached go-live yet' },
    ],
  },
  {
    id: 'mom_wins',
    question: 'Are early wins being named, celebrated, and shared across the organisation?',
    hint: 'Celebration is a change management tool. A win nobody hears about does not build momentum.',
    type: 'seg', cols: 2, module: 'momentum',
    options: [
      { val: '4', label: 'Yes, regularly and visibly', sub: 'Wins are shared and celebrated broadly' },
      { val: '3', label: 'Sometimes',                  sub: 'Occasional sharing but not consistent' },
      { val: '2', label: 'Rarely',                     sub: 'Wins exist but are not being communicated' },
      { val: '1', label: 'Not at all',                 sub: 'Nobody hears about wins outside the project team' },
      { val: '0', label: 'Not sure',                   sub: 'I am not sure what is being shared' },
    ],
  },
  {
    id: 'mom_adaptive',
    question: 'When something is not working, does the approach adapt — or does the team keep following the original plan regardless?',
    hint: 'A plan that cannot flex will eventually break. Adapting to what you are learning is not failure — it is good practice.',
    type: 'seg', cols: 2, module: 'momentum',
    options: [
      { val: '4', label: 'Adapts readily',                 sub: 'The plan evolves as we learn' },
      { val: '3', label: 'Mostly adapts',                  sub: 'Generally flexible when needed' },
      { val: '2', label: 'Slow to adapt',                  sub: 'Changes to the plan are difficult to make' },
      { val: '1', label: 'Follows original plan rigidly',  sub: 'The schedule drives everything regardless of what we learn' },
      { val: '0', label: 'Not sure',                       sub: 'I do not know how decisions about the plan are made' },
    ],
  },
  {
    id: 'mom_portfolio',
    question: 'Is this change competing for attention and resources with other significant initiatives running at the same time?',
    hint: 'Portfolio overload is one of the most common and least discussed causes of change failure.',
    type: 'seg', cols: 2, module: 'momentum',
    options: [
      { val: '1', label: 'No, this is the main focus',  sub: 'Clear priority, not competing with much' },
      { val: '2', label: 'Some competition',            sub: 'A few other things running but manageable' },
      { val: '3', label: 'Significant competition',     sub: 'Multiple major initiatives running simultaneously' },
      { val: '4', label: 'Severe competition',          sub: 'Too many changes, not enough capacity' },
      { val: '0', label: 'Not sure',                    sub: 'I do not have a clear view of the full portfolio' },
    ],
  },
]

// ─── Module 7 — Sustainability & embedding ───────────────────────────────

export const SUSTAINABILITY_STEPS: AssessmentStep[] = [
  {
    id: 'sus_behaviours',
    question: 'Three months after go-live, are new behaviours holding — or are old habits coming back?',
    hint: 'The real test of change is not what happens in the week after launch. It is what happens three months later when the project team has moved on.',
    type: 'seg', cols: 2, module: 'sustainability',
    options: [
      { val: '4', label: 'Holding firmly',          sub: 'New behaviours are consistent and sustained' },
      { val: '3', label: 'Mostly holding',          sub: 'Some regression in places but broadly maintained' },
      { val: '2', label: 'Patchy',                  sub: 'Good in some areas, sliding in others' },
      { val: '1', label: 'Reverting',               sub: 'Old habits are returning in many areas' },
      { val: '0', label: 'Not yet at this stage',   sub: 'The change has not been live long enough to assess' },
    ],
  },
  {
    id: 'sus_team_habits',
    question: 'Have teams built their own practices and habits that reinforce the new way — without needing external prompting?',
    hint: 'When teams invent their own rituals around the change, it has truly embedded. External reinforcement alone does not last.',
    type: 'seg', cols: 2, module: 'sustainability',
    options: [
      { val: '4', label: 'Yes, teams have their own habits',    sub: 'Self-sustaining practices have formed' },
      { val: '3', label: 'Emerging',                            sub: 'Some teams, not yet widespread' },
      { val: '2', label: 'Still relying on external prompts',   sub: 'Without reminders, it starts to slip' },
      { val: '1', label: 'No team-level habits',                sub: 'The change stops when the pressure stops' },
      { val: '0', label: 'Not yet at this stage',               sub: 'Too early to assess' },
    ],
  },
  {
    id: 'sus_story',
    question: 'Are people starting to describe the new way as "how we do things here" — or does it still feel like something being done to them?',
    hint: 'When people use the present tense to describe the new way, the change has landed.',
    type: 'seg', cols: 2, module: 'sustainability',
    options: [
      { val: '4', label: '"This is how we do things here"', sub: 'New way is the default, naturally described' },
      { val: '3', label: 'Getting there',                   sub: 'Language is shifting for many people' },
      { val: '2', label: 'Still "the change"',              sub: 'People still refer to it as something separate' },
      { val: '1', label: 'Still feels imposed',             sub: 'People still describe it as something done to them' },
      { val: '0', label: 'Too early to tell',               sub: 'Not enough time has passed to assess' },
    ],
  },
  {
    id: 'sus_learning',
    question: 'Is your organisation capturing what it is learning from this change — in a way that will make the next one faster and less painful?',
    hint: 'Organisations that learn from change get better at it. Those that just survive it repeat the same mistakes.',
    type: 'seg', cols: 2, module: 'sustainability',
    options: [
      { val: '4', label: 'Yes, deliberately',  sub: 'Structured learning and capture is happening' },
      { val: '3', label: 'Informally',          sub: 'Some learning happens but not captured systematically' },
      { val: '2', label: 'Rarely',              sub: 'We move on quickly without capturing lessons' },
      { val: '1', label: 'No',                  sub: 'The same issues come up again and again' },
      { val: '0', label: 'Not sure',            sub: 'I am not aware of any review process' },
    ],
  },
  {
    id: 'sus_accountability',
    question: 'Once the project team moves on, is there clear ongoing accountability for sustaining the change?',
    hint: 'When nobody owns the embedding, nobody does it. Sustainability requires someone with specific accountability after go-live.',
    type: 'seg', cols: 2, module: 'sustainability',
    options: [
      { val: '4', label: 'Yes, clear accountability',  sub: 'Named person or team responsible for embedding' },
      { val: '3', label: 'Partially',                  sub: 'Broadly understood but not formally assigned' },
      { val: '2', label: 'Unclear',                    sub: 'Nobody is specifically responsible' },
      { val: '1', label: 'No accountability',          sub: 'When the project ends, responsibility disappears' },
      { val: '0', label: 'Not yet determined',         sub: 'This has not been worked out yet' },
    ],
  },
]

// ─── All modules in order ─────────────────────────────────────────────────

export const ALL_MODULES = [
  { id: 'leadership',    label: 'Leadership and sponsorship',    steps: LEADERSHIP_STEPS },
  { id: 'clarity',       label: 'Strategic clarity',             steps: CLARITY_STEPS },
  { id: 'people',        label: 'People and workforce impact',   steps: PEOPLE_STEPS },
  { id: 'capability',    label: 'Change capability',             steps: CAPABILITY_STEPS },
  { id: 'communication', label: 'Communication and engagement',  steps: COMMUNICATION_STEPS },
  { id: 'momentum',      label: 'Momentum and delivery health',  steps: MOMENTUM_STEPS },
  { id: 'sustainability',label: 'Sustainability and embedding',  steps: SUSTAINABILITY_STEPS },
]

export const TOTAL_DIAGNOSTIC_QUESTIONS = ALL_MODULES.reduce((sum, m) => sum + m.steps.length, 0)
