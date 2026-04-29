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
        <section id="projects" className="relative overflow-hidden py-16 sm:py-24 bg-linear-to-br from-blue-50 via-white to-sky-50">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -left-32 top-10 h-56 w-56 rounded-full bg-sky-200/40 blur-3xl" />
                <div className="absolute -right-24 bottom-8 h-64 w-64 rounded-full bg-blue-300/30 blur-3xl" />
            </div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center items-center min-h-100">
                    <div className="rounded-4xl border border-white/80 bg-white/85 px-8 py-10 text-center shadow-[0_24px_70px_-34px_rgba(14,116,144,0.45)] ring-1 ring-sky-100/70 backdrop-blur-sm">
                        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-sky-100 via-white to-blue-100 shadow-inner">
                            <div className="h-9 w-9 animate-spin rounded-full border-[3px] border-sky-600/80 border-t-transparent"></div>
                        </div>
                        <p className="bg-linear-to-r from-sky-700 via-blue-600 to-cyan-500 bg-clip-text text-base font-semibold text-transparent sm:text-lg">
                            Loading amazing projects...
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )

    else if (projects.length > 0)
        return (
            <section id="projects" className="relative overflow-hidden py-24 sm:py-32 bg-linear-to-br from-blue-50 via-white to-sky-50">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -left-28 top-20 h-72 w-72 rounded-full bg-sky-200/45 blur-3xl" />
                    <div className="absolute -right-20 top-1/3 h-80 w-80 rounded-full bg-blue-200/35 blur-3xl" />
                    <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-sky-300/50 to-transparent" />
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto mb-16 max-w-3xl text-center">
                        <span className="inline-flex items-center rounded-full border border-sky-200 bg-white/80 px-4 py-1 text-sm font-semibold uppercase tracking-[0.22em] text-sky-700 shadow-sm">
                            Selected Work
                        </span>
                        <h2 className="mt-6 bg-linear-to-r from-sky-700 via-blue-600 to-cyan-500 bg-clip-text text-3xl font-bold leading-tight text-transparent sm:text-5xl md:text-6xl">
                            Featured Projects
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className="group"
                            >
                                <div className="flex h-full flex-col overflow-hidden rounded-4xl border border-white/70 bg-white/90 shadow-[0_24px_80px_-36px_rgba(14,116,144,0.3)] ring-1 ring-sky-100/70 backdrop-blur-sm transition-all duration-500 group-hover:-translate-y-3 group-hover:shadow-[0_32px_90px_-36px_rgba(2,132,199,0.35)]">
                                    {project.image && (
                                        <div className="relative overflow-hidden cursor-pointer" onClick={() => openProject(project.id)}>
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                width={400}
                                                height={200}
                                                className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-linear-to-t from-sky-950/70 via-sky-900/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90"></div>
                                            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                                                <div className="rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                                                    Project
                                                </div>
                                                <div className="rounded-full bg-white/90 p-2 text-sky-700 opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                                                    <EyeIcon className="w-5 h-5" />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex flex-col p-6 sm:p-7">
                                        <div className="cursor-pointer space-y-4" onClick={() => openProject(project.id)}>
                                            <h3 className="flex h-24 items-center justify-center text-center line-clamp-4 text-xl font-bold leading-tight text-gray-900 transition-colors group-hover:text-sky-700 sm:text-2xl">
                                                {project.title}
                                            </h3>
                                            {project.description && (
                                                <p className="min-h-18 text-sm leading-6 text-gray-600 line-clamp-3 sm:text-base sm:leading-7">
                                                    {project.description}
                                                </p>
                                            )}
                                            {!project.description && <div className="min-h-18" />}
                                            {project.technologies && project.technologies.length > 0 && (
                                                <div className="flex min-h-14 flex-wrap content-start gap-2">
                                                    {project.technologies.slice(0, 4).map((tech: string, index: number) => (
                                                        <span
                                                            key={index}
                                                            className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-800"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                    {project.technologies.length > 4 && (
                                                        <span className="rounded-full border border-gray-200 bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                                                            +{project.technologies.length - 4} more
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                            {(!project.technologies || project.technologies.length === 0) && <div className="min-h-14" />}
                                        </div>
                                        <div className="mt-6 border-t border-sky-100 pt-5">
                                            <div className="flex min-h-10 flex-wrap items-center gap-3">
                                                {(project.github_frontend || project.github_backend) && (
                                                    <>
                                                        {project.github_frontend && (
                                                            <a href={project.github_frontend} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white px-3 py-2 text-xs font-semibold text-gray-600 transition-colors hover:border-sky-200 hover:bg-sky-50 hover:text-gray-900">
                                                                <GitHubIcon className="w-3 h-3" />
                                                                <span>Frontend</span>
                                                            </a>
                                                        )}
                                                        {project.github_backend && (
                                                            <a href={project.github_backend} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white px-3 py-2 text-xs font-semibold text-gray-600 transition-colors hover:border-sky-200 hover:bg-sky-50 hover:text-gray-900">
                                                                <GitHubIcon className="w-3 h-3" />
                                                                <span>Backend</span>
                                                            </a>
                                                        )}
                                                    </>
                                                )}
                                                {project.live_at && (
                                                    <a href={project.live_at} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-blue-600 via-sky-500 to-cyan-500 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-transform hover:scale-[1.02] hover:shadow-md">
                                                        <ExternalLinkIcon className="w-3 h-3" />
                                                        <span>Live Demo</span>
                                                    </a>
                                                )}
                                                <Link
                                                    href={`/projects/${project.id}`}
                                                    className="ml-auto inline-flex items-center gap-2 text-xs font-semibold text-sky-700 transition-colors hover:text-sky-900 whitespace-nowrap sm:text-sm"
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

    else return (
            <section id="projects" className="relative overflow-hidden py-24 sm:py-32 bg-linear-to-br from-blue-50 via-white to-sky-50">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-sky-200/35 blur-3xl" />
                <div className="absolute -right-20 bottom-10 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl" />
                <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-sky-300/50 to-transparent" />
            </div>
            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="rounded-4xl border border-white/70 bg-white/85 px-6 py-10 text-center shadow-[0_30px_90px_-40px_rgba(14,116,144,0.5)] ring-1 ring-sky-100/70 backdrop-blur-sm sm:px-10 sm:py-12">
                    <span className="inline-flex items-center rounded-full border border-sky-200 bg-white/80 px-4 py-1 text-sm font-semibold uppercase tracking-[0.22em] text-sky-700 shadow-sm">
                        Selected Work
                    </span>
                    <h2 className="mt-5 text-2xl font-bold leading-tight text-gray-900 sm:text-4xl">
                        More projects on
                        <span className="ml-2 bg-linear-to-r from-sky-700 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                            GitHub
                        </span>
                    </h2>
                    <div className="mt-8 flex justify-center">
                        <a
                            href="https://github.com/Nide17?tab=repositories"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-3 rounded-full bg-linear-to-r from-sky-600 via-blue-600 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_-20px_rgba(2,132,199,0.8)] transition-transform hover:scale-[1.02] sm:px-6 sm:text-base"
                        >
                            Explore Repositories
                            <GitHubIcon className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
