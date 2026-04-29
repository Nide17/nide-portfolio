import type { ReactNode } from 'react'
import { GitHubIcon, ExternalLinkIcon, ChevronRightIcon } from '../../../lib/icons'
import Link from 'next/link'

interface ResourceCardProps {
    title: string
    subtitle: string
    href?: string
    accent?: 'dark' | 'blue'
    icon: ReactNode
}

function ResourceCard({ title, subtitle, href, accent = 'dark', icon }: ResourceCardProps) {
    const content = (
        <>
            <div className="flex items-center gap-4">
                <div className={href ? 'transition-transform group-hover:scale-110' : 'opacity-50'}>{icon}</div>
                <div>
                    <div className={href ? (accent === 'dark' ? 'text-sm font-semibold text-white sm:text-base' : 'text-sm font-semibold text-white sm:text-base') : 'text-sm font-semibold sm:text-base'}>
                        {title}
                    </div>
                    <div className={href ? (accent === 'dark' ? 'text-xs text-white/70 sm:text-sm' : 'text-xs text-white/80 sm:text-sm') : 'text-xs text-gray-500 sm:text-sm'}>
                        {subtitle}
                    </div>
                </div>
            </div>
            <ChevronRightIcon className={`h-4 w-4 sm:h-5 sm:w-5 ${href ? 'transition-transform group-hover:translate-x-1' : 'opacity-0'}`} />
        </>
    )

    if (href) {
        return (
            <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={
                    accent === 'blue'
                        ? 'group flex items-center justify-between rounded-3xl bg-linear-to-r from-blue-600 via-sky-500 to-cyan-500 p-5 text-white shadow-[0_18px_40px_-20px_rgba(2,132,199,0.75)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-20px_rgba(2,132,199,0.85)] sm:p-6'
                        : 'group flex items-center justify-between rounded-3xl bg-linear-to-r from-slate-800 to-slate-950 p-5 text-white shadow-[0_18px_40px_-20px_rgba(15,23,42,0.85)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-20px_rgba(15,23,42,0.95)] sm:p-6'
                }
            >
                {content}
            </Link>
        )
    }

    return (
        <div className="flex items-center justify-between rounded-3xl border border-dashed border-gray-300 bg-gray-100 p-5 text-gray-400 sm:p-6">
            {content}
        </div>
    )
}

interface ProjectResourcesProps {
    githubBackend?: string
    githubFrontend?: string
    liveAt?: string
}

export function ProjectResources({ githubBackend, githubFrontend, liveAt }: ProjectResourcesProps) {
    const githubIcon = <GitHubIcon className="h-7 w-7 sm:h-8 sm:w-8" />

    const liveIcon = <ExternalLinkIcon className="h-7 w-7 sm:h-8 sm:w-8" />

    return (
        <div className="mb-12">
            <h2 className="mb-5 flex items-center gap-2 text-lg font-bold text-gray-900 sm:mb-6 sm:text-xl">
                <div className="h-5 w-1 rounded-full bg-linear-to-b from-blue-600 to-sky-400 sm:h-6" />
                Resources
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <ResourceCard
                    title="Backend Repository"
                    subtitle={githubBackend ? 'View source code' : 'Not available'}
                    href={githubBackend}
                    icon={githubIcon}
                />
                <ResourceCard
                    title="Frontend Repository"
                    subtitle={githubFrontend ? 'View source code' : 'Not available'}
                    href={githubFrontend}
                    icon={githubIcon}
                />
                <ResourceCard
                    title="Live Project"
                    subtitle={liveAt ? 'Visit live demo' : 'Not available'}
                    href={liveAt}
                    accent="blue"
                    icon={liveIcon}
                />
            </div>
        </div>
    )
}
