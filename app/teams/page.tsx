import type { Metadata } from 'next'
import {
  getAllData,
  buildTeamSummaries,
} from '@/lib/data'
import TeamCard from '@/components/TeamCard'

export const metadata: Metadata = {
  title: 'Teams',
  description: 'All 7 team standings, attendance rates, and member counts for the Placement Readiness cohort.',
}

export const revalidate = 60

export default async function TeamsPage() {
  const { roster, scoreboard, attendance, teams } = await getAllData()
  const teamSummaries = buildTeamSummaries(teams, roster, scoreboard, attendance)

  const labA = teamSummaries.filter(t => t.lab === 'A')
  const labB = teamSummaries.filter(t => t.lab === 'B')

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Team <span className="text-gradient">Standings</span>
        </h1>
        <p className="text-gray-400 mt-1">
          {teamSummaries.length} teams · {Object.keys(roster).length} students total
        </p>
      </div>

      {/* Overall team stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="stat-card p-6 glass hover:-translate-y-1 transition-transform lg:col-span-1 border border-brand-500/20 shadow-[0_0_15px_rgba(245,158,11,0.05)]">
          <div className="stat-label mb-2 opacity-80">Top Team</div>
          <div className="stat-value text-3xl text-brand-400">{teamSummaries[0]?.name ?? '—'}</div>
          <div className="stat-sub mt-2 opacity-60">{teamSummaries[0]?.averageScore ?? 0} avg pts</div>
        </div>
        <div className="stat-card p-6 glass hover:-translate-y-1 transition-transform border border-brand-500/20 shadow-[0_0_15px_rgba(245,158,11,0.05)]">
          <div className="stat-label mb-2 opacity-80">Best Attendance</div>
          <div className="stat-value text-3xl text-yellow-400">
            {[...teamSummaries].sort((a, b) => b.attendanceRate - a.attendanceRate)[0]?.name ?? '—'}
          </div>
          <div className="stat-sub mt-2 opacity-60">
            {[...teamSummaries].sort((a, b) => b.attendanceRate - a.attendanceRate)[0]?.attendanceRate ?? 0}%
          </div>
        </div>
        <div className="stat-card p-6 glass hover:-translate-y-1 transition-transform col-span-2 lg:col-span-1 border border-brand-500/20 shadow-[0_0_15px_rgba(245,158,11,0.05)]">
          <div className="stat-label mb-2 opacity-80">Average Team Score</div>
          <div className="stat-value text-3xl text-brand-500">
            {teamSummaries.length > 0
              ? Math.round(teamSummaries.reduce((s, t) => s + (Number(t.averageScore) || 0), 0) / teamSummaries.length) || 0
              : 0}
          </div>
          <div className="stat-sub mt-2 opacity-60">across all teams</div>
        </div>
      </div>

      {/* Lab A */}
      {labA.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="px-3 py-1 bg-slate-800/80 text-slate-300 rounded text-xs font-bold border border-slate-700 uppercase tracking-widest">
              Lab A
            </span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {labA.map((team, i) => (
              <TeamCard key={team.id} team={team} rank={teamSummaries.indexOf(team)} />
            ))}
          </div>
        </div>
      )}

      {/* Lab B */}
      {labB.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span className="px-3 py-1 bg-slate-800/80 text-slate-300 rounded text-xs font-bold border border-slate-700 uppercase tracking-widest">
              Lab B
            </span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {labB.map((team) => (
              <TeamCard key={team.id} team={team} rank={teamSummaries.indexOf(team)} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
