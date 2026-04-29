import Link from 'next/link'

interface ProjectStateProps {
    title: string
    description: string
    backHref: string
    backLabel: string
}

export function ProjectState({ title, description, backHref, backLabel }: ProjectStateProps) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-50 via-white to-sky-50 px-4 pt-24">
            <div className="max-w-xl rounded-[2rem] border border-white/70 bg-white/90 px-6 py-10 text-center shadow-[0_28px_90px_-38px_rgba(14,116,144,0.35)] ring-1 ring-sky-100/70 sm:px-8 sm:py-12">
                <h1 className="mb-4 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">{title}</h1>
                <p className="mb-8 text-sm leading-7 text-gray-600 sm:text-base">{description}</p>
                <Link
                    href={backHref}
                    className="inline-flex items-center justify-center rounded-full bg-linear-to-r from-blue-600 via-sky-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_-18px_rgba(2,132,199,0.75)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_22px_48px_-18px_rgba(2,132,199,0.85)] sm:text-base"
                >
                    {backLabel}
                </Link>
            </div>
        </div>
    )
}
