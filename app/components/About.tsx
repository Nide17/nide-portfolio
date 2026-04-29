"use client"
import { getClientIP, getDeviceInfo, trackDownload, getCountryFromIP, shouldTrackDownload, markDownloadTracked } from '../lib/api'

const skills = [
    { name: 'React', mark: 'R', tone: 'from-sky-500 to-cyan-400' },
    { name: 'Node.js', mark: 'N', tone: 'from-emerald-500 to-lime-400' },
    { name: 'Python', mark: 'Py', tone: 'from-blue-600 to-yellow-400' },
    { name: 'C', mark: 'C', tone: 'from-slate-700 to-slate-500' },
    { name: 'FastAPI', mark: 'F', tone: 'from-teal-500 to-emerald-400' },
    { name: 'PostgreSQL', mark: 'Pg', tone: 'from-indigo-600 to-sky-500' },
    { name: 'TypeScript', mark: 'TS', tone: 'from-blue-700 to-sky-500' },
    { name: 'Linux', mark: 'Lx', tone: 'from-gray-700 to-gray-500' },
]

export default function About() {
    const handleCVdownload = async () => {
        // Start download immediately (don't wait for tracking)
        const link = document.createElement('a')
        link.href = '/SoftwareEngineerParmenide.pdf'
        link.download = 'Niyomwungeri_Parmenide_Ishimwe_CV.pdf'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        // Track download asynchronously (won't block the download)
        try {
            const ip = await getClientIP()
            if (!shouldTrackDownload(ip)) {
                return
            }

            const country = await getCountryFromIP(ip)
            const { browser, os, device } = getDeviceInfo()

            const result = await trackDownload({
                ip_address: ip,
                document_name: 'CV - Niyomwungeri Parmenide Ishimwe',
                device,
                operating_system: os,
                browser,
                country,
                referrer: document.referrer || undefined
            })

            if (result) {
                markDownloadTracked(ip)
            }
        } catch (error) {
            console.error('Failed to track download:', error)
            // Download still works even if tracking fails
        }
    }

    return (
        <section id="about" className="bg-gray-50 py-20 sm:py-24 lg:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="mb-6 bg-linear-to-r from-blue-600 via-sky-500 to-cyan-500 bg-clip-text text-3xl font-bold leading-tight text-transparent font-['Poppins',system-ui,sans-serif] sm:mb-10 sm:text-5xl lg:text-6xl">
                        About Me
                    </h2>
                    <div className="space-y-6 sm:space-y-8">
                        <p className="text-sm leading-7 text-gray-700 sm:text-lg sm:leading-8 lg:text-xl">
                            Full-Stack Software Engineer with 5+ years of experience building scalable web applications
                            using React, Node.js, and Python. Currently developing high-performance Deep Packet Inspection
                            (DPI) systems in C and Python on Linux at Rohde & Schwarz.
                        </p>
                        <p className="text-sm leading-7 text-gray-700 sm:text-lg sm:leading-8 lg:text-xl">
                            Experienced in system design, code reviews, and software release processes, with active
                            participation in cross-team architecture discussions. Proven ability to deliver end-to-end
                            solutions and optimize performance-critical systems.
                        </p>
                        <div className="rounded-4xl border border-white/70 bg-white/80 p-5 shadow-[0_22px_60px_-36px_rgba(14,116,144,0.35)] ring-1 ring-sky-100/70 backdrop-blur-sm sm:p-6">
                            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-sky-700 sm:text-sm">
                                Core Stack
                            </p>
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                                {skills.map((skill) => (
                                    <div
                                        key={skill.name}
                                        className="flex items-center gap-3 rounded-2xl border border-sky-100 bg-linear-to-br from-white to-sky-50 px-3 py-3 text-left shadow-sm transition-transform duration-300 hover:-translate-y-0.5"
                                    >
                                        <span className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-linear-to-br ${skill.tone} text-xs font-bold text-white shadow-sm sm:text-sm`}>
                                            {skill.mark}
                                        </span>
                                        <span className="text-sm font-semibold text-gray-700 sm:text-base">
                                            {skill.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="pt-4 sm:pt-6">
                            <button
                                onClick={handleCVdownload}
                                className="inline-flex items-center justify-center gap-3 rounded-full bg-linear-to-r from-blue-600 via-sky-500 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_-18px_rgba(2,132,199,0.7)] transition-all hover:scale-[1.02] hover:shadow-[0_22px_48px_-18px_rgba(2,132,199,0.85)] sm:px-8 sm:py-4 sm:text-lg"
                            >
                                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-sm backdrop-blur-sm sm:h-9 sm:w-9 sm:text-lg">
                                    CV
                                </span>
                                <span>Download</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
