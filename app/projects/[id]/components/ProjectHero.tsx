import Image from 'next/image'

interface ProjectHeroProps {
    title: string
    image?: string
}

export function ProjectHero({ title, image }: ProjectHeroProps) {
    if (image) {
        return (
            <div className="relative h-64 w-full overflow-hidden bg-linear-to-r from-blue-600 via-sky-500 to-cyan-500 sm:h-80 lg:h-96">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-sky-950/35 via-transparent to-transparent" />
            </div>
        )
    }

    return (
        <div className="relative flex h-64 w-full items-center justify-center overflow-hidden bg-linear-to-br from-blue-600 via-sky-500 to-cyan-500 sm:h-80 lg:h-96">
            <div className="text-center">
                <svg className="mx-auto mb-4 h-20 w-20 text-white/30 sm:h-24 sm:w-24 lg:h-32 lg:w-32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm font-medium text-white/80 sm:text-base">No Image Available</p>
            </div>
        </div>
    )
}
