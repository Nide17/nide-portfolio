import Link from 'next/link'
import { ProjectHero } from './ProjectHero'
import { ProjectResources } from './ProjectResources'
import { ProjectStats } from './ProjectStats'
import type { ProjectDetail } from '../types'

interface ProjectDetailsViewProps {
    project: ProjectDetail
}

export function ProjectDetailsView({ project }: ProjectDetailsViewProps) {
    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-sky-50 pt-28 pb-16 sm:pt-32 sm:pb-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link href="/#projects" className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white/80 px-4 py-2 text-sm font-semibold text-sky-700 shadow-sm transition-colors hover:bg-sky-50 hover:text-sky-900 sm:mb-8 sm:text-base">
                    <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Projects
                </Link>

                <div className="overflow-hidden rounded-4xl border border-white/70 bg-white/90 shadow-[0_28px_90px_-38px_rgba(14,116,144,0.35)] ring-1 ring-sky-100/70 transition-all duration-300">
                    <ProjectHero title={project.title} image={project.image} />

                    <div className="p-6 sm:p-10 lg:p-14">
                        <div className="mb-6 border-b border-sky-100 pb-6 sm:mb-8 sm:pb-8">
                            <h1 className="bg-linear-to-r from-blue-600 via-sky-500 to-cyan-500 bg-clip-text text-3xl font-bold leading-tight text-transparent sm:text-4xl lg:text-5xl">
                                {project.title}
                            </h1>
                        </div>

                        <div className="mb-10 sm:mb-12">
                            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900 sm:text-xl">
                                <div className="h-5 w-1 rounded-full bg-linear-to-b from-blue-600 to-sky-400 sm:h-6" />
                                About This Project
                            </h2>
                            <p className="text-sm leading-7 text-gray-700 sm:text-base lg:text-lg lg:leading-8">
                                {project.description || 'No description provided for this project.'}
                            </p>
                        </div>

                        <div className="mb-10 sm:mb-12">
                            <h2 className="mb-5 flex items-center gap-2 text-lg font-bold text-gray-900 sm:mb-6 sm:text-xl">
                                <div className="h-5 w-1 rounded-full bg-linear-to-b from-blue-600 to-sky-400 sm:h-6" />
                                Technologies Used
                            </h2>
                            {project.technologies && Array.isArray(project.technologies) && project.technologies.length > 0 ? (
                                <div className="flex flex-wrap gap-2 sm:gap-3">
                                    {project.technologies.map((tech, index) => (
                                        <div
                                            key={index}
                                            className="rounded-full border border-sky-200 bg-linear-to-r from-blue-50 to-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700 transition-all duration-300 hover:border-sky-300 hover:shadow-sm sm:px-4 sm:py-2 sm:text-sm"
                                        >
                                            {tech}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="rounded-2xl border border-gray-200 bg-gray-100 px-5 py-4 text-sm text-gray-600 sm:px-6">
                                    No technologies specified for this project.
                                </div>
                            )}
                        </div>

                        <ProjectResources
                            githubBackend={project.github_backend}
                            githubFrontend={project.github_frontend}
                            liveAt={project.live_at}
                        />

                        <ProjectStats
                            technologiesCount={Array.isArray(project.technologies) ? project.technologies.length : 0}
                            hasGithubBackend={!!project.github_backend}
                            hasGithubFrontend={!!project.github_frontend}
                        />
                    </div>
                </div>

                <div className="mt-12 text-center sm:mt-16">
                    <p className="mb-5 text-sm text-gray-600 sm:mb-6 sm:text-base">Interested in this project?</p>
                    <Link
                        href="/#contact"
                        className="inline-flex items-center justify-center rounded-full bg-linear-to-r from-blue-600 via-sky-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_-18px_rgba(2,132,199,0.75)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_22px_48px_-18px_rgba(2,132,199,0.85)] sm:px-8 sm:py-4 sm:text-base"
                    >
                        Get in Touch
                    </Link>
                </div>
            </div>
        </div>
    )
}
