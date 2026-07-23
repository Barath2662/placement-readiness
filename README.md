# Placement Readiness Portal

> **GitHub Description:** A fully transparent, GitHub-driven leaderboard and submission portal for the 25MX Cohort (MCA Department, PSG College of Technology). No database, no logins.
> **GitHub Topics:** `nextjs`, `tailwindcss`, `github-actions`, `education`, `leaderboard`, `markdown-driven`, `placement-readiness`

**25MX Cohort — MCA Department, PSG College of Technology**  
*Placement Rep: Tino Britty J*

A fully transparent, GitHub-driven leaderboard and submission portal. No database, no logins. Everything is driven by PRs and Markdown files.  
> Students fork → work in their own folder → open PR → owner merges → leaderboard updates automatically.

📊 **Live Site:** [class.psgmx.tech](https://class.psgmx.tech/)  
📖 **How to contribute:** [HOW_TO_CONTRIBUTE.md](./HOW_TO_CONTRIBUTE.md)  

> [!WARNING]
> **Strict Rule:** You must ONLY work inside the `activities/` folder. Do not edit, modify, or delete any other files or folders in this repository. Any pull requests that touch other files will be automatically rejected.

---

## Leaderboard (auto-updated after every merge)

<!-- LEADERBOARD:START -->
| Rank | Student | Roll No | Score | Attendance |
|------|---------|---------|-------|-----------|
| 🥇 1 | BARATHVIKRAMAN S K | 25mx103 | 50 | 2/2 (100%) |
| 🥈 2 | Tino Britty J | 25mx354 | 25 | 1/2 (50%) |
| 🥉 3 | KASBIYA M | 25mx322 | 25 | 1/2 (50%) |
| 4 | SABARISH P | 25mx343 | 25 | 1/2 (50%) |
| 5 | Meyappan R | 25mx326 | 25 | 1/2 (50%) |
| 6 | Shanmugappriya K | 25mx223 | 23 | 1/2 (50%) |
| 7 | Dayananda J | 25mx308 | 20 | 1/2 (50%) |
| 8 | Induja E | 25mx315 | 20 | 1/2 (50%) |
| 9 | Tamilini S | 25mx352 | 20 | 1/2 (50%) |
| 10 | ROHITHMAHESHWARAN K | 25mx342 | 0 | 0/2 (0%) |

**🏆 Top Team:** Team 6 (avg: 5.6 pts)
**Today's submissions:** 1/123 students submitted on 2026-07-17 · **Last updated:** 2026-07-24
<!-- LEADERBOARD:END -->

---

## Automated Scoring System

The portal uses an automated bot (`scripts/recalculate-scores.mjs`) to assign scores for each day's submission. The maximum score for standard days is **30 points**, but **Day 1 and Day 2** have a max of **25 points** (Prompting is disabled).

Here is exactly how the daily marks are calculated:

- **Submission (`+10 pts`)**: Automatically given if you created your folder and pushed code.
- **Documentation (`+0 to +5 pts`)**: An automated heuristic checks your main deliverable file (e.g., `profile.md` for Day 1, or `README.md` for other days). If any `.md` file in your folder has markdown headers (`#`) and more than 80 characters of meaningful content, you get 5 points. If your markdown files are missing, mostly empty, or just copy-pasted templates, you get 0 points.
- **Quality (`+5 pts`)**: Given by default (until manual review).
- **Reflection (`+5 pts`)**: Given by default (until manual review).
- **Prompting (`+5 pts`)**: 0 points on Day 1 & Day 2 (disabled). Otherwise, given by default (until manual review).

> [!TIP]
> If you received `20 points` instead of `25 points`, your Markdown file (`profile.md` or `README.md`) failed the documentation check! Make sure you are writing actual content, using markdown headers, and avoiding blank templates.

---

## Repository Structure

```
placement-readiness/
├── activities/                   ← One folder per day, containing student submissions. YOU ONLY WORK HERE.
├── app/                          ← Next.js 14 App Router routes (deployed to Vercel)
├── components/                   ← React UI components
├── lib/                          ← Data loading logic (data.ts)
├── data/                         ← The single source of truth for the portal
│   ├── roster.json               ← Master student list
│   ├── scoreboard.json           ← All student scores
│   ├── attendance.json           ← Per-day attendance
│   └── teams.json                ← Team roster + rollups
├── scripts/                      ← Node scripts run by GitHub Actions
└── .github/workflows/            ← validate-pr.yml, on-merge.yml
```

---

## Local Development

If you want to run the portal locally:

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000)

## Quick Links

- 🔴 **Students who haven't submitted today** — check the [live dashboard](https://class.psgmx.tech/)
- 📋 [Full Leaderboard](https://class.psgmx.tech/leaderboard)
- 👥 [Team Standings](https://class.psgmx.tech/teams)
- 📅 [Activity Timeline](https://class.psgmx.tech/activities)
