'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

const navLinks = [
  { href: '/',                  label: 'Dashboard',         icon: DashboardIcon },
  { href: '/leaderboard',       label: 'Leaderboard',       icon: TrophyIcon },
  { href: '/teams',             label: 'Teams',             icon: UsersIcon },
  { href: '/activities',        label: 'Activities',        icon: CalendarIcon },
  { href: '/how-to-contribute', label: 'How to Contribute', icon: QuestionIcon },
]

interface SidebarProps {
  githubOwner: string
  githubRepo: string
}

export default function Sidebar({ githubOwner, githubRepo }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-[#050505] border-r border-slate-800/60 z-50 flex flex-col hidden lg:flex">
      {/* Logo */}
      <div className="h-24 flex items-center px-6">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-yellow-600 flex items-center justify-center text-lg font-black text-slate-950 shadow-lg shadow-brand-500/20">
            PR
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-white text-sm leading-tight">25MX</span>
            <span className="font-bold text-white text-sm leading-tight">Placement Readiness</span>
          </div>
        </Link>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-4 py-4 space-y-2">
        {navLinks.map(link => {
          const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
          const Icon = link.icon
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'bg-brand-500/10 text-brand-400 border border-brand-500/30 shadow-[inset_4px_0_0_0_rgba(245,158,11,1)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/50 border border-transparent'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-brand-400' : 'text-slate-500'}`} />
              <span className="font-semibold text-sm">{link.label}</span>
            </Link>
          )
        })}
        <a
          href={`https://github.com/${githubOwner}/${githubRepo}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-4 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900/50 transition-all duration-300 border border-transparent"
        >
          <GitHubIcon className="w-5 h-5 text-slate-500" />
          <span className="font-semibold text-sm">GitHub</span>
        </a>
      </nav>

      {/* Bottom section with hexagon */}
      <div className="px-6 pb-8 relative mt-auto">
        <div className="absolute inset-x-0 bottom-0 h-64 pointer-events-none opacity-40 mix-blend-screen flex items-end justify-center">
          <Image 
            src="/hexagon.png" 
            alt="Glowing Hexagon" 
            fill 
            className="object-contain object-bottom translate-y-12"
            sizes="(max-width: 768px) 100vw, 256px"
            priority
          />
        </div>
        
        <div className="bg-[#0a0a0a]/80 backdrop-blur-md border border-slate-800/60 rounded-xl p-4 relative z-10">
          <p className="text-xs font-medium text-slate-400 leading-relaxed mb-4">
            MCA Department,<br />
            PSG College of Technology<br />
            25MX Cohort
          </p>
          <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-700/50 flex items-center justify-center text-brand-500 text-xs font-bold">
            {'</>'}
          </div>
        </div>
      </div>
    </aside>
  )
}

function DashboardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  )
}

function TrophyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  )
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  )
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )
}

function QuestionIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  )
}
