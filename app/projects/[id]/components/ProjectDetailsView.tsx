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
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 pt-32 pb-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link href="/#projects" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold mb-8 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Projects
                </Link>

                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl">
                    <ProjectHero title={project.title} image={project.image} />

                    <div className="p-8 sm:p-12 lg:p-16">
                        <div className="mb-8 pb-8 border-b-2 border-gray-200">
                            <h1 className="text-4xl sm:text-5xl font-bold bg-linear-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent leading-tight">
                                {project.title}
                            </h1>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <div className="w-1 h-6 bg-linear-to-b from-blue-600 to-sky-400 rounded-full" />
                                About This Project
                            </h2>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                {project.description || 'No description provided for this project.'}
                            </p>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <div className="w-1 h-6 bg-linear-to-b from-blue-600 to-sky-400 rounded-full" />
                                Technologies Used
                            </h2>
                            {project.technologies && Array.isArray(project.technologies) && project.technologies.length > 0 ? (
                                <div className="flex flex-wrap gap-3">
                                    {project.technologies.map((tech, index) => (
                                        <div
                                            key={index}
                                            className="px-4 py-2 bg-linear-to-r from-blue-50 to-sky-50 border-2 border-blue-200 text-blue-700 font-semibold rounded-lg hover:border-blue-400 hover:shadow-md transition-all duration-300"
                                        >
                                            {tech}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="px-6 py-4 bg-gray-100 text-gray-600 rounded-lg border-2 border-gray-200">
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

                <div className="mt-16 text-center">
                    <p className="text-gray-600 mb-6">Interested in this project?</p>
                    <Link
                        href="/#contact"
                        className="inline-block px-8 py-4 bg-linear-to-r from-blue-600 to-sky-400 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-sky-500 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                        Get in Touch
                    </Link>
                </div>
            </div>
        </div>
    )
}
