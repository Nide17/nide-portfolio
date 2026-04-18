import type { Metadata } from 'next'
import { API_BASE_URL, SITE_URL } from '../../config'
import type { ProjectFetchResult } from './types'

const PROJECT_FETCH_TIMEOUT_MS = 10_000
const PROJECT_FETCH_RETRY_DELAY_MS = 750

export async function getProject(id: string, retries = 1): Promise<ProjectFetchResult> {
    if (!API_BASE_URL) {
        return { status: 'error', project: null }
    }

    try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), PROJECT_FETCH_TIMEOUT_MS)

        const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
            next: { revalidate: 60 },
            signal: controller.signal,
        })

        clearTimeout(timeoutId)

        if (res.status === 404) {
            return { status: 'not-found', project: null }
        }

        if (!res.ok) {
            throw new Error(`Failed to fetch project ${id}: ${res.status} ${res.statusText}`)
        }

        return { status: 'success', project: await res.json() }
    } catch (error) {
        console.error(`Failed to fetch project (retries left: ${retries}):`, error)

        if (retries > 0) {
            await new Promise((resolve) => setTimeout(resolve, PROJECT_FETCH_RETRY_DELAY_MS))
            return getProject(id, retries - 1)
        }

        return { status: 'error', project: null }
    }
}

export async function buildProjectMetadata(id: string): Promise<Metadata> {
    const result = await getProject(id, 0)

    if (result.status !== 'success') {
        return {
            title: 'Project',
            robots: {
                index: false,
                follow: true,
            },
        }
    }

    const { project } = result
    const description =
        project.description?.slice(0, 160) ||
        'Project case study from the portfolio of Niyomwungeri Parmenide Ishimwe.'
    const canonicalPath = `/projects/${id}`

    return {
        title: project.title,
        description,
        alternates: {
            canonical: canonicalPath,
        },
        openGraph: {
            title: project.title,
            description,
            url: SITE_URL ? `${SITE_URL}${canonicalPath}` : undefined,
            type: 'article',
            images: project.image ? [{ url: project.image, alt: project.title }] : undefined,
        },
        twitter: {
            card: project.image ? 'summary_large_image' : 'summary',
            title: project.title,
            description,
            images: project.image ? [project.image] : undefined,
        },
    }
}
