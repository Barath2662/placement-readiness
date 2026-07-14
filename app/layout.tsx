import type { Metadata } from 'next'
import './globals.css'
import Sidebar from '@/components/Sidebar'

const OWNER = process.env.NEXT_PUBLIC_GITHUB_OWNER ?? 'brittytino'
const REPO  = process.env.NEXT_PUBLIC_GITHUB_REPO  ?? 'placement-readiness'

export const metadata: Metadata = {
  title: {
    default: 'Placement Readiness Portal — 25MX',
    template: '%s | Placement Readiness',
  },
  description:
    'Public leaderboard and proof portal for the 25MX Placement Readiness programme. Track submissions, scores, and attendance across all students and teams.',
  metadataBase: new URL('https://placement-readiness.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Placement Readiness Portal',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen antialiased relative bg-[#050505]">
        
        {/* Background Effects Wrapper (Fixed & Clipped to prevent scroll bloat) */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-brand-500/10 blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/10 blur-[120px]" />
        </div>
        
        <div className="relative z-10 flex min-h-screen">
          <Sidebar githubOwner={OWNER} githubRepo={REPO} />
          
          <main className="flex-1 lg:pl-64 min-w-0 flex flex-col">
            <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-12 py-8 animate-fade-in flex-1">
              {children}
            </div>
            
            <footer className="mt-8 border-t border-slate-800/60 py-6 text-center text-xs text-slate-500 backdrop-blur-sm lg:hidden">
              <p className="font-medium text-slate-400">
                MCA Department, PSG College of Technology · 25MX Cohort
              </p>
              <p className="mt-2 text-slate-600">Scores refresh every 60 seconds · No login required</p>
            </footer>
          </main>
        </div>
      </body>
    </html>
  )
}
