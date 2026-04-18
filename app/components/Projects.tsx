"use client"
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { fetchProjects } from '../lib/api'

interface Project {
    id: number
    title: string
    description?: string
    image?: string
    github_backend?: string
    github_frontend?: string
    live_at?: string
    technologies?: string[]
    created_at?: string
}

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    const openProject = (projectId: number) => {
        router.push(`/projects/${projectId}`)
    }

    useEffect(() => {
        const loadProjects = async () => {
            const data = await fetchProjects()
            setProjects(data)
            setLoading(false)
        }
        loadProjects()
    }, [])

    if (loading) return (
        <section id="projects" className="py-8 bg-linear-to-br from-gray-50 to-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center items-center min-h-100">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
                        <p className="text-gray-600 text-lg">Loading amazing projects...</p>
                    </div>
                </div>
            </div>
        </section>
    )

    else if (projects.length > 0)
        return (
            <section id="projects" className="py-32 bg-linear-to-br from-gray-50 to-blue-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-5xl md:text-6xl font-bold bg-linear-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent text-center mb-20">
                        Featured Projects
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className="group"
                            >
                                <div className="flex flex-col bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 hover:border-blue-200 transform hover:-translate-y-2"
                                >
                                    {project.image && (
                                        <div className="relative overflow-hidden cursor-pointer" onClick={() => openProject(project.id)}>
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                width={400}
                                                height={200}
                                                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </div>
                                        </div>
                                    )}
                                        <div className="p-6">
                                            <div className="space-y-3" onClick={() => openProject(project.id)}>
                                            <h3 className="flex h-24 items-center justify-center text-center line-clamp-4 text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
                                                {project.title}
                                            </h3>
                                            {project.description && (
                                                <p className="min-h-18 text-gray-600 text-base leading-relaxed line-clamp-3">
                                                    {project.description}
                                                </p>
                                            )}
                                            {!project.description && <div className="min-h-18" />}
                                            {project.technologies && project.technologies.length > 0 && (
                                                <div className="flex min-h-14 flex-wrap content-start gap-2">
                                                    {project.technologies.slice(0, 4).map((tech: string, index: number) => (
                                                        <span
                                                            key={index}
                                                            className="px-2 py-0.5 text-xs bg-blue-100 text-blue-800 font-medium rounded-md"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                    {project.technologies.length > 4 && (
                                                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-md">
                                                            +{project.technologies.length - 4} more
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                            {(!project.technologies || project.technologies.length === 0) && <div className="min-h-14" />}
                                        </div>
                                        <div className="mt-3 min-h-14 border-t border-gray-100 pt-3">
                                            <div className="flex min-h-10 flex-wrap items-center justify-center gap-3">
                                                {(project.github_frontend || project.github_backend) && (
                                                    <>
                                                        {project.github_frontend && (
                                                            <a href={project.github_frontend} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-900 font-medium transition-colors p-1 rounded hover:bg-gray-100 truncate max-w-24">
                                                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111 .793-.261 .793-.577v-2.234c-3.338 .726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745 .083-.729 .083-.729 1.205 .084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492 .997.107-.775 .418-1.305 .762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311 .469-2.381 1.236-3.221-.124-.303-.535-1.524 .117-3.176 0 0 1.008-.322 3.301 1.23 .957-.266 1.983-.399 3.003-.404 1.02 .005 2.047 .138 3.006 .404 2.291-1.552 3.297-1.23 3.297-1.23 .653 1.653 .242 2.874 .118 3.176 .77 .84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921 .43 .372 .823 1.102 .823 2.222v3.293c0 .319 .192 .694 .801 .576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                                </svg>
                                                                <span className="truncate max-w-20">Frontend</span>
                                                            </a>
                                                        )}
                                                        {project.github_backend && (
                                                            <a href={project.github_backend} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-900 font-medium transition-colors p-1 rounded hover:bg-gray-100 truncate max-w-24">
                                                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111 .793-.261 .793-.577v-2.234c-3.338 .726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745 .083-.729 .083-.729 1.205 .084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492 .997.107-.775 .418-1.305 .762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311 .469-2.381 1.236-3.221-.124-.303-.535-1.524 .117-3.176 0 0 1.008-.322 3.301 1.23 .957-.266 1.983-.399 3.003-.404 1.02 .005 2.047 .138 3.006 .404 2.291-1.552 3.297-1.23 3.297-1.23 .653 1.653 .242 2.874 .118 3.176 .77 .84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921 .43 .372 .823 1.102 .823 2.222v3.293c0 .319 .192 .694 .801 .576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                                </svg>
                                                                <span className="truncate max-w-20">Backend</span>
                                                            </a>
                                                        )}
                                                    </>
                                                )}
                                                {project.live_at && (
                                                    <a href={project.live_at} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-700 font-medium transition-colors p-1 rounded hover:bg-emerald-50 truncate max-w-24">
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                        </svg>
                                                        <span className="truncate max-w-20">Live Demo</span>
                                                    </a>
                                                )}
                                                <Link
                                                    href={`/projects/${project.id}`}
                                                    className="flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-700 font-medium transition-colors p-1 rounded hover:bg-emerald-50 whitespace-nowrap"
                                                >
                                                    Details
                                                    <span aria-hidden="true">→</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        )
    else return null
}
