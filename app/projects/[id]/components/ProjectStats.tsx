interface ProjectStatsProps {
    technologiesCount: number
    hasGithubBackend: boolean
    hasGithubFrontend: boolean
}

export function ProjectStats({
    technologiesCount,
    hasGithubBackend,
    hasGithubFrontend,
}: ProjectStatsProps) {
    return (
        <div className="grid grid-cols-2 gap-3 border-t border-sky-100 pt-8 sm:gap-4">
            <div className="rounded-2xl bg-sky-50/70 p-4 text-center sm:p-5">
                <div className="bg-linear-to-r from-blue-600 to-sky-500 bg-clip-text text-xl font-bold text-transparent sm:text-3xl">
                    {technologiesCount}
                </div>
                <p className="mt-2 text-xs text-gray-600 sm:text-sm">Technologies</p>
            </div>
            <div className="rounded-2xl bg-sky-50/70 p-4 text-center sm:p-5">
                <div className="bg-linear-to-r from-blue-600 to-sky-500 bg-clip-text text-xl font-bold text-transparent sm:text-3xl">
                    {hasGithubBackend ? '✓' : '○'}
                </div>
                <p className="mt-2 text-xs text-gray-600 sm:text-sm">Backend Code Available</p>
            </div>
            <div className="rounded-2xl bg-sky-50/70 p-4 text-center sm:p-5">
                <div className="bg-linear-to-r from-blue-600 to-sky-500 bg-clip-text text-xl font-bold text-transparent sm:text-3xl">
                    {hasGithubFrontend ? '✓' : '○'}
                </div>
                <p className="mt-2 text-xs text-gray-600 sm:text-sm">Frontend Code Available</p>
            </div>
        </div>
    )
}
