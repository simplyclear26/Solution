'use client'

import { useRef } from 'react'
import type { SolutionReport } from '@/lib/types'

interface ExecutiveBriefingProps {
  report: SolutionReport
}

function scoreColor(score: number): string {
  if (score >= 70) return '#2AB8A0'
  if (score >= 50) return '#F0A500'
  if (score >= 30) return '#E07B39'
  return '#C94040'
}

function ratingBg(rating: string): string {
  if (rating === 'Strong')   return '#E8F8F5'
  if (rating === 'Adequate') return '#FEF8E7'
  if (rating === 'At risk')  return '#FEF0E7'
  return '#FEEBEB'
}

function ratingText(rating: string): string {
  if (rating === 'Strong')   return '#1A7A6A'
  if (rating === 'Adequate') return '#A06E00'
  if (rating === 'At risk')  return '#A04010'
  return '#9B2020'
}

export function ExecutiveBriefing({ report }: ExecutiveBriefingProps) {
  const {
    org, initiative, overallScore, overallRating,
    moduleScores, rootCauses, actionPlan,
    strategicRecommendation, simplyClearPhase,
  } = report

  const top3Risks   = rootCauses.slice(0, 3)
  const top3Actions = actionPlan.filter(a => a.week === 'Weeks 1 to 2').slice(0, 3)

  function handlePrint() {
    // Open a new window with just the briefing content and trigger print
    const printWindow = window.open('', '_blank', 'width=900,height=700')
    if (!printWindow) return

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Simply Clear — Executive Briefing</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=DM+Serif+Display&display=swap');
  body {
    font-family: 'DM Sans', sans-serif;
    color: #1C1C1E;
    background: #fff;
    padding: 48px;
    max-width: 800px;
    margin: 0 auto;
    font-size: 13px;
    line-height: 1.5;
  }
  @media print {
    body { padding: 32px; }
    .no-print { display: none !important; }
    @page { margin: 1cm; size: A4; }
  }
  .serif { font-family: 'DM Serif Display', serif; }
  .label { font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase; color: #8E8E93; margin-bottom: 6px; }
  .border-b { border-bottom: 1.5px solid #1C1C1E; padding-bottom: 20px; margin-bottom: 24px; }
  .header { display: flex; justify-content: space-between; align-items: flex-start; }
  .score-big { font-family: 'DM Serif Display', serif; font-size: 52px; line-height: 1; }
  .badge { display: inline-block; padding: 3px 10px; border-radius: 100px; font-size: 10px; font-weight: 500; margin-top: 6px; }
  .phase-box { background: #FAF8F4; border-left: 3px solid #2AB8A0; padding: 14px 18px; border-radius: 6px; margin-bottom: 24px; }
  .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 24px; }
  .score-row { border: 1px solid #E5E3DF; border-radius: 6px; padding: 10px 14px; display: flex; justify-content: space-between; align-items: center; }
  .score-num { font-family: 'DM Serif Display', serif; font-size: 20px; }
  .risk-item { border: 1px solid #E5E3DF; border-radius: 6px; padding: 12px 14px; display: flex; gap: 12px; margin-bottom: 6px; }
  .risk-num { font-family: 'DM Serif Display', serif; color: #8E8E93; font-size: 13px; min-width: 18px; }
  .action-item { background: #FAF8F4; border-radius: 6px; padding: 10px 14px; display: flex; gap: 10px; align-items: flex-start; margin-bottom: 6px; }
  .action-dot { width: 18px; height: 18px; background: #2AB8A0; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px; color: white; font-size: 9px; }
  .rec-box { background: #1C1C1E; color: white; border-radius: 8px; padding: 18px 22px; margin-bottom: 24px; }
  .footer { border-top: 1px solid #E5E3DF; padding-top: 16px; display: flex; justify-content: space-between; color: #8E8E93; font-size: 10px; }
  h2 { font-family: 'DM Serif Display', serif; font-size: 20px; font-weight: normal; margin-bottom: 4px; }
  h3 { font-size: 12px; font-weight: 500; margin-bottom: 3px; }
  .muted { color: #636366; font-weight: 300; }
  .section-label { font-size: 9px; letter-spacing: 0.12em; text-transform: uppercase; color: #8E8E93; margin-bottom: 10px; display: block; }
</style>
</head>
<body>

<div class="border-b header">
  <div>
    <p class="label">Simply Clear Solution™ — Executive Briefing</p>
    <h2>${initiative.init_name || 'Transformation assessment'}</h2>
    <p class="muted">${org.org_name || 'Your organisation'} · ${new Date(report.completedAt).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
  </div>
  <div style="text-align:right">
    <p class="label">Overall health</p>
    <div class="score-big" style="color:${scoreColor(overallScore)}">${overallScore}</div>
    <div style="color:#8E8E93;font-size:12px">/100</div>
    <div class="badge" style="background:${ratingBg(overallRating)};color:${ratingText(overallRating)}">${overallRating}</div>
  </div>
</div>

<div class="phase-box">
  <p class="label">Simply Clear Framework</p>
  <p class="muted">${simplyClearPhase}</p>
</div>

<span class="section-label">Seven-dimension breakdown</span>
<div class="grid2">
  ${moduleScores.map(m => `
    <div class="score-row">
      <span style="font-size:12px">${m.label}</span>
      <div style="display:flex;align-items:center;gap:8px">
        <span class="score-num" style="color:${m.color}">${m.score}</span>
        <span class="badge" style="background:${ratingBg(m.rating)};color:${ratingText(m.rating)}">${m.rating}</span>
      </div>
    </div>
  `).join('')}
</div>

<span class="section-label">Top three risks</span>
${top3Risks.map((risk, i) => `
  <div class="risk-item">
    <span class="risk-num">0${i + 1}</span>
    <div>
      <h3>${risk.title}</h3>
      <p class="muted">${risk.mitigation}</p>
    </div>
  </div>
`).join('')}

<br>
<span class="section-label">Immediate priorities — weeks 1 to 2</span>
${top3Actions.length > 0 ? top3Actions.map((action, i) => `
  <div class="action-item">
    <div class="action-dot">${i + 1}</div>
    <div>
      <h3>${action.action}</h3>
      <p class="muted">Owner: ${action.owner}</p>
    </div>
  </div>
`).join('') : '<p class="muted">See the 90-day action plan in your full report for sequenced priorities.</p>'}

<br>
<div class="rec-box">
  <p class="label" style="color:rgba(255,255,255,0.4)">Recommended next step</p>
  <p class="serif" style="font-size:18px;color:white;margin-bottom:8px">${strategicRecommendation.service}</p>
  <p style="color:rgba(255,255,255,0.6);font-weight:300;font-size:12px;line-height:1.6">${strategicRecommendation.rationale}</p>
</div>

<div class="footer">
  <span style="font-style:italic">Simply Clear</span>
  <span style="letter-spacing:0.08em;text-transform:uppercase">simplyclear.work · Adelaide, Australia</span>
</div>

<script>
  window.onload = function() {
    setTimeout(function() { window.print(); }, 500)
  }
</script>
</body>
</html>`

    printWindow.document.write(html)
    printWindow.document.close()
  }

  return (
    <button
      onClick={handlePrint}
      className="inline-flex items-center gap-2 bg-[#1C1C1E] text-white text-sm font-medium px-6 py-3 rounded-lg hover:bg-[#3A3A3C] transition-all duration-150"
    >
      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
        <path d="M8 2v9M4 8l4 4 4-4M2 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      Download executive briefing (PDF)
    </button>
  )
}
