import Link from 'next/link'
import Image from 'next/image'
import { API_BASE_URL } from '../../config'

export const maxDuration = 120

const PROJECT_FETCH_TIMEOUT_MS = 115_000

type ProjectFetchResult =
    | { status: 'success'; project: any }
    | { status: 'not-found'; project: null }
    | { status: 'error'; project: null }

async function getProject(id: string, retries = 2): Promise<ProjectFetchResult> {
    try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), PROJECT_FETCH_TIMEOUT_MS)
        
        const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
            next: { revalidate: 60 },
            signal: controller.signal
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
            // Wait 2 seconds before retrying
            await new Promise(resolve => setTimeout(resolve, 2000))
            return getProject(id, retries - 1)
        }
        
        return { status: 'error', project: null }
    }
}

export default async function Project({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const result: ProjectFetchResult = await getProject(id)

    if (result.status === 'error') {
        return (
            <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 flex items-center justify-center pt-24">
                <div className="text-center px-4">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Project Temporarily Unavailable</h1>
                    <p className="text-gray-600 mb-8">The portfolio API took too long or returned an error. Please try again in a moment.</p>
                    <Link href="/#projects" className="inline-block px-6 py-3 bg-linear-to-r from-blue-600 to-sky-400 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-sky-500 transition-all duration-300">
                        Back to Projects
                    </Link>
                </div>
            </div>
        )
    }

    if (result.status === 'not-found') {
        return (
            <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 flex items-center justify-center pt-24">
                <div className="text-center px-4">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Project Not Found</h1>
                    <p className="text-gray-600 mb-8">Sorry, the project you&apos;re looking for doesn&apos;t exist.</p>
                    <Link href="/" className="inline-block px-6 py-3 bg-linear-to-r from-blue-600 to-sky-400 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-sky-500 transition-all duration-300">
                        Back to Home
                    </Link>
                </div>
            </div>
        )
    }

    const { project } = result
    const formattedDate = project.created_at ? new Date(project.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A'

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 pt-32 pb-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <Link href="/#projects" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold mb-8 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Projects
                </Link>

                {/* Main Card Container */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl">
                    {/* Hero Image Section */}
                    {project.image ? (
                        <div className="relative h-80 sm:h-96 w-full bg-linear-to-r from-blue-600 to-sky-400 overflow-hidden">
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/20"></div>
                        </div>
                    ) : (
                        <div className="relative h-80 sm:h-96 w-full bg-linear-to-br from-blue-600 via-blue-500 to-sky-400 flex items-center justify-center overflow-hidden">
                            <div className="text-center">
                                <svg className="w-32 h-32 text-white/30 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <p className="text-white/80 font-medium">No Image Available</p>
                            </div>
                        </div>
                    )}

                    <div className="p-8 sm:p-12 lg:p-16">
                        {/* Title */}
                        <div className="mb-8 pb-8 border-b-2 border-gray-200">
                            <h1 className="text-4xl sm:text-5xl font-bold bg-linear-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent leading-tight">
                                {project.title}
                            </h1>
                        </div>

                        {/* Description Section */}
                        <div className="mb-12">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <div className="w-1 h-6 bg-linear-to-b from-blue-600 to-sky-400 rounded-full"></div>
                                About This Project
                            </h2>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                {project.description || 'No description provided for this project.'}
                            </p>
                        </div>

                        {/* Technologies Section */}
                        <div className="mb-12">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <div className="w-1 h-6 bg-linear-to-b from-blue-600 to-sky-400 rounded-full"></div>
                                Technologies Used
                            </h2>
                            {project.technologies && Array.isArray(project.technologies) && project.technologies.length > 0 ? (
                                <div className="flex flex-wrap gap-3">
                                    {project.technologies.map((tech: string, index: number) => (
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

                        {/* Links Section */}
                        <div className="mb-12">
                            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <div className="w-1 h-6 bg-linear-to-b from-blue-600 to-sky-400 rounded-full"></div>
                                Resources
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* GitHub Link */}
                                {project.github ? (
                                    <Link
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between p-6 bg-gray-900 text-white rounded-xl hover:bg-black transition-all duration-300 group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <svg className="w-8 h-8 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                            </svg>
                                            <div>
                                                <div className="font-semibold">GitHub Repository</div>
                                                <div className="text-sm text-gray-400">View source code</div>
                                            </div>
                                        </div>
                                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                ) : (
                                    <div className="flex items-center justify-between p-6 bg-gray-100 text-gray-400 rounded-xl border-2 border-dashed border-gray-300">
                                        <div className="flex items-center gap-4">
                                            <svg className="w-8 h-8 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                            </svg>
                                            <div>
                                                <div className="font-semibold">GitHub Repository</div>
                                                <div className="text-sm">Not available</div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Live Demo Link */}
                                {project.live_at ? (
                                    <Link
                                        href={project.live_at}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between p-6 bg-linear-to-r from-blue-600 to-sky-500 text-white rounded-xl hover:shadow-xl transition-all duration-300 group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <svg className="w-8 h-8 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                            <div>
                                                <div className="font-semibold">Live Project</div>
                                                <div className="text-sm text-white/80">Visit live demo</div>
                                            </div>
                                        </div>
                                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                ) : (
                                    <div className="flex items-center justify-between p-6 bg-gray-100 text-gray-400 rounded-xl border-2 border-dashed border-gray-300">
                                        <div className="flex items-center gap-4">
                                            <svg className="w-8 h-8 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                            <div>
                                                <div className="font-semibold">Live Project</div>
                                                <div className="text-sm">Not available</div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Project Stats */}
                        <div className="grid grid-cols-2 gap-4 pt-8 border-t-2 border-gray-200">
                            <div className="text-center p-4">
                                <div className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
                                    {project.technologies && Array.isArray(project.technologies) ? project.technologies.length : 0}
                                </div>
                                <p className="text-sm text-gray-600 mt-2">Technologies</p>
                            </div>
                            <div className="text-center p-4">
                                <div className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
                                    {project.github ? '✓' : '○'}
                                </div>
                                <p className="text-sm text-gray-600 mt-2">Code Available</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mt-16 text-center">
                    <p className="text-gray-600 mb-6">Interested in this project?</p>
                    <Link href="/#contact" className="inline-block px-8 py-4 bg-linear-to-r from-blue-600 to-sky-400 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-sky-500 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                        Get in Touch
                    </Link>
                </div>
            </div>
        </div>
    )
};
