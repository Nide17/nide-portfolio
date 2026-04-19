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
                <div className={href ? 'group-hover:scale-110 transition-transform' : 'opacity-50'}>{icon}</div>
                <div>
                    <div className={href ? (accent === 'dark' ? 'font-semibold text-white hover:text-gray-200' : 'font-semibold') : 'font-semibold'}>
                        {title}
                    </div>
                    <div className={href ? (accent === 'dark' ? 'text-sm text-gray-400' : 'text-sm text-white/80') : 'text-sm'}>
                        {subtitle}
                    </div>
                </div>
            </div>
            <ChevronRightIcon className={`w-5 h-5 ${href ? 'group-hover:translate-x-1 transition-transform' : 'opacity-0'}`} />
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
                        ? 'flex items-center justify-between p-6 bg-linear-to-r from-blue-600 to-sky-500 text-white rounded-xl hover:shadow-xl transition-all duration-300 group'
                        : 'flex items-center justify-between p-6 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all duration-300 group'
                }
            >
                {content}
            </Link>
        )
    }

    return (
        <div className="flex items-center justify-between p-6 bg-gray-100 text-gray-400 rounded-xl border-2 border-dashed border-gray-300">
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
    const githubIcon = <GitHubIcon className="w-8 h-8" />

    const liveIcon = <ExternalLinkIcon className="w-8 h-8" />

    return (
        <div className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-linear-to-b from-blue-600 to-sky-400 rounded-full" />
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
