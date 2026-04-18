export interface ProjectDetail {
    id?: number
    title: string
    description?: string
    image?: string
    github_backend?: string
    github_frontend?: string
    live_at?: string
    technologies?: string[]
    created_at?: string
}

export type ProjectFetchResult =
    | { status: 'success'; project: ProjectDetail }
    | { status: 'not-found'; project: null }
    | { status: 'error'; project: null }
