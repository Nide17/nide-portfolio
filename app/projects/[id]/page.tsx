import type { Metadata } from 'next'
import { ProjectDetailsView } from './components/ProjectDetailsView'
import { ProjectState } from './components/ProjectState'
import { buildProjectMetadata, getProject } from './project-service'
import type { ProjectFetchResult } from './types'

export const maxDuration = 60

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params
    return buildProjectMetadata(id)
}

export default async function Project({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const result: ProjectFetchResult = await getProject(id)

    if (result.status === 'error') {
        return (
            <ProjectState
                title="Project Temporarily Unavailable"
                description="The portfolio API took too long or returned an error. Please try again in a moment."
                backHref="/#projects"
                backLabel="Back to Projects"
            />
        )
    }

    if (result.status === 'not-found') {
        return (
            <ProjectState
                title="Project Not Found"
                description="Sorry, the project you're looking for doesn't exist."
                backHref="/"
                backLabel="Back to Home"
            />
        )
    }

    return <ProjectDetailsView project={result.project} />
}
