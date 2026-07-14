'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Avatar from '@/components/Avatar'
import type { StudentSummary } from '@/lib/types'

interface LeaderboardTableProps {
  students: StudentSummary[]
  /** Show only top N rows (0 = show all) */
  limit?: number
  showAttendance?: boolean
}

type SortKey = 'rank' | 'total' | 'attendancePct' | 'name'
type SortDir = 'asc' | 'desc'

const ITEMS_PER_PAGE = 25

export default function LeaderboardTable({
  students,
  limit = 0,
  showAttendance = true,
}: LeaderboardTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('total')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const [currentPage, setCurrentPage] = useState(1)

  const sorted = useMemo(() => {
    const copy = [...students]
    copy.sort((a, b) => {
      let cmp = 0
      if (sortKey === 'rank' || sortKey === 'total') cmp = b.total - a.total
      else if (sortKey === 'attendancePct') cmp = b.attendancePct - a.attendancePct
      else if (sortKey === 'name') cmp = a.name.localeCompare(b.name)
      return sortDir === 'asc' ? -cmp : cmp
    })
    return limit > 0 ? copy.slice(0, limit) : copy
  }, [students, sortKey, sortDir, limit])

  const totalPages = Math.ceil(sorted.length / ITEMS_PER_PAGE)
  const paginatedStudents = limit > 0 
    ? sorted 
    : sorted.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(d => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
    setCurrentPage(1) // Reset to first page on sort
  }

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <span className="text-gray-700 ml-1">↕</span>
    return <span className="text-brand-400 ml-1">{sortDir === 'desc' ? '↓' : '↑'}</span>
  }

  const medal = (i: number) => {
    if (i === 0) return '🥇'
    if (i === 1) return '🥈'
    if (i === 2) return '🥉'
    return null
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th
                className="cursor-pointer hover:text-white select-none w-16"
                onClick={() => handleSort('rank')}
              >
                Rank <SortIcon col="rank" />
              </th>
              <th
                className="cursor-pointer hover:text-white select-none"
                onClick={() => handleSort('name')}
              >
                Student <SortIcon col="name" />
              </th>
              <th className="text-gray-500 w-24">Roll No</th>
              <th className="text-gray-500 w-20">Team</th>
              <th
                className="cursor-pointer hover:text-white select-none w-24 text-right"
                onClick={() => handleSort('total')}
              >
                Score <SortIcon col="total" />
              </th>
              {showAttendance && (
                <th
                  className="cursor-pointer hover:text-white select-none w-28 text-right"
                  onClick={() => handleSort('attendancePct')}
                >
                  Attendance <SortIcon col="attendancePct" />
                </th>
              )}
              <th className="text-gray-500 w-20 text-center">Today</th>
            </tr>
          </thead>
          <tbody>
            {paginatedStudents.map((s, i) => {
              const actualIndex = limit > 0 ? i : (currentPage - 1) * ITEMS_PER_PAGE + i;
              return (
                <tr key={s.roll}>
                  <td className="font-mono text-gray-400 w-16">
                    <span className="mr-1">{medal(actualIndex) ?? ''}</span>
                    {actualIndex + 1}
                  </td>
                  <td>
                    <Link
                      href={`/students/${s.roll}`}
                      className="flex items-center gap-3 font-medium text-white hover:text-brand-400 transition-colors"
                    >
                      <Avatar seed={s.roll} size={28} />
                      {s.name}
                    </Link>
                  </td>
                  <td>
                    <span className="font-mono text-xs text-gray-500">{s.roll}</span>
                  </td>
                  <td>
                    <Link
                      href={`/teams/${s.team}`}
                      className="text-xs text-gray-400 hover:text-brand-400 transition-colors capitalize"
                    >
                      {s.team}
                    </Link>
                  </td>
                  <td className="text-right">
                    <span className="font-bold text-white tabular-nums">{s.total}</span>
                  </td>
                  {showAttendance && (
                    <td className="text-right">
                      <span className={`text-sm tabular-nums ${
                        s.attendancePct >= 80
                          ? 'text-brand-400'
                          : s.attendancePct >= 50
                          ? 'text-yellow-400'
                          : 'text-red-400'
                      }`}>
                        {s.attendanceCount}/{s.attendanceDays} ({s.attendancePct}%)
                      </span>
                    </td>
                  )}
                  <td className="text-center">
                    {s.hasSubmittedToday ? (
                      <span className="text-brand-400 text-base" title="Submitted today">✓</span>
                    ) : (
                      <span className="text-red-500 text-base" title="Not submitted yet">✗</span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile card list */}
      <div className="md:hidden space-y-2">
        {paginatedStudents.map((s, i) => {
          const actualIndex = limit > 0 ? i : (currentPage - 1) * ITEMS_PER_PAGE + i;
          return (
            <Link key={s.roll} href={`/students/${s.roll}`}>
              <div className="card-hover flex items-center gap-3 animate-fade-in">
                <div className="flex-shrink-0 text-center w-10">
                  <div className="text-lg">{medal(actualIndex) ?? ''}</div>
                  <div className="text-xs text-gray-500 font-mono">{actualIndex + 1}</div>
                </div>
                <div className="flex-1 min-w-0 flex items-center gap-3">
                  <Avatar seed={s.roll} size={36} />
                  <div>
                    <div className="font-semibold text-white truncate">{s.name}</div>
                    <div className="text-xs text-gray-500 font-mono">{s.roll} · {s.team}</div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="font-bold text-white text-lg tabular-nums">{s.total}</div>
                  {showAttendance && (
                    <div className={`text-xs tabular-nums ${
                      s.attendancePct >= 80 ? 'text-brand-400' : s.attendancePct >= 50 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {s.attendancePct}%
                    </div>
                  )}
                </div>
                <div>
                  {s.hasSubmittedToday
                    ? <span className="text-brand-400" title="Submitted today">✓</span>
                    : <span className="text-red-500" title="Not submitted yet">✗</span>
                  }
                </div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Pagination Controls */}
      {limit === 0 && totalPages > 1 && (
        <div className="flex items-center justify-between mt-6 bg-[#050505] p-4 rounded-xl border border-slate-800">
          <p className="text-xs font-medium text-slate-500">
            Showing <span className="text-white">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to <span className="text-white">{Math.min(currentPage * ITEMS_PER_PAGE, sorted.length)}</span> of <span className="text-white">{sorted.length}</span> students
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-700 bg-slate-900 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-500/20 hover:text-brand-400 hover:border-brand-500/30 transition-colors"
            >
              Previous
            </button>
            <div className="flex items-center px-2 text-xs font-mono text-slate-400">
              {currentPage} / {totalPages}
            </div>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-700 bg-slate-900 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-brand-500/20 hover:text-brand-400 hover:border-brand-500/30 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  )
}
