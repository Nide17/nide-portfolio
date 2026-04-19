import Image from 'next/image'

interface ProjectHeroProps {
    title: string
    image?: string
}

export function ProjectHero({ title, image }: ProjectHeroProps) {
    if (image) {
        return (
            <div className="relative h-80 w-full overflow-hidden bg-linear-to-r from-blue-600 to-sky-400 sm:h-96">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20" />
            </div>
        )
    }

    return (
        <div className="relative h-80 w-full overflow-hidden bg-linear-to-br from-blue-600 via-blue-500 to-sky-400 flex items-center justify-center sm:h-96">
            <div className="text-center">
                <svg className="w-32 h-32 text-white/30 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-white/80 font-medium">No Image Available</p>
            </div>
        </div>
    )
}
