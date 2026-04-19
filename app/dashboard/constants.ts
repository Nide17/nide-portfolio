import type { Project, TabKey } from './types'

export const emptyProjectForm: Project = {
    title: '',
    description: '',
    image: '',
    github_backend: '',
    github_frontend: '',
    live_at: '',
    technologies: []
}

export const inputClassName =
    'w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500'

export const dashboardTabs: [TabKey, string][] = [
    ['projects', 'Projects'],
    ['messages', 'Messages'],
    ['visits', 'Visits'],
    ['downloads', 'Downloads']
]
