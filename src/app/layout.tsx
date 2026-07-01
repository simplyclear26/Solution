import type { Metadata } from 'next'
import { DM_Sans, DM_Serif_Display } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['300', '400', '500'],
})

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
  weight: '400',
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: 'Simply Clear Solution™',
  description: 'A comprehensive transformation diagnostic that produces a risk register, 90-day action plan, communication guide, and executive briefing — built for your specific situation.',
  openGraph: {
    title: 'Simply Clear Solution™',
    description: 'Not a template. Not a generated report. A personal advisory document built from your answers.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmSerif.variable}`}>
      <body className="font-sans bg-white text-[#1C1C1E] antialiased">
        {children}
      </body>
    </html>
  )
}
