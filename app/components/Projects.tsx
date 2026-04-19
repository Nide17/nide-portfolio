"use client"
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { EyeIcon, GitHubIcon, ExternalLinkIcon } from '../lib/icons'
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
                                                <EyeIcon className="w-5 h-5 text-blue-600" />
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
                                                                <GitHubIcon className="w-3 h-3" />
                                                                <span className="truncate max-w-20">Frontend</span>
                                                            </a>
                                                        )}
                                                        {project.github_backend && (
                                                            <a href={project.github_backend} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-900 font-medium transition-colors p-1 rounded hover:bg-gray-100 truncate max-w-24">
                                                                <GitHubIcon className="w-3 h-3" />
                                                                <span className="truncate max-w-20">Backend</span>
                                                            </a>
                                                        )}
                                                    </>
                                                )}
                                                {project.live_at && (
                                                    <a href={project.live_at} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-700 font-medium transition-colors p-1 rounded hover:bg-emerald-50 truncate max-w-24">
                                                        <ExternalLinkIcon className="w-3 h-3" />
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
