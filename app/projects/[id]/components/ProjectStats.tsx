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
        <div className="grid grid-cols-2 gap-4 pt-8 border-t-2 border-gray-200">
            <div className="text-center p-4">
                <div className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
                    {technologiesCount}
                </div>
                <p className="text-sm text-gray-600 mt-2">Technologies</p>
            </div>
            <div className="text-center p-4">
                <div className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
                    {hasGithubBackend ? '✓' : '○'}
                </div>
                <p className="text-sm text-gray-600 mt-2">Frontend Code Available</p>
            </div>
            <div className="text-center p-4">
                <div className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
                    {hasGithubFrontend ? '✓' : '○'}
                </div>
                <p className="text-sm text-gray-600 mt-2">Frontend Code Available</p>
            </div>
        </div>
    )
}
