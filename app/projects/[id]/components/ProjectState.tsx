import Link from 'next/link'

interface ProjectStateProps {
    title: string
    description: string
    backHref: string
    backLabel: string
}

export function ProjectState({ title, description, backHref, backLabel }: ProjectStateProps) {
    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 flex items-center justify-center pt-24">
            <div className="text-center px-4">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
                <p className="text-gray-600 mb-8">{description}</p>
                <Link
                    href={backHref}
                    className="inline-block px-6 py-3 bg-linear-to-r from-blue-600 to-sky-400 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-sky-500 transition-all duration-300"
                >
                    {backLabel}
                </Link>
            </div>
        </div>
    )
}
