"use client"
import { getClientIP, getDeviceInfo, trackDownload, getCountryFromIP, shouldTrackDownload, markDownloadTracked } from '../lib/api'

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
        <section id="about" className="py-32 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-5xl md:text-6xl font-bold bg-linear-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent mb-12 font-['Poppins',system-ui,sans-serif] text-center">
                        About Me
                    </h2>
                    <div className="space-y-8">
                        <p className="text-xl text-gray-700 leading-relaxed">
                            Full-Stack Software Engineer with 5+ years of experience building scalable web applications
                            using React, Node.js, and Python. Currently developing high-performance Deep Packet Inspection
                            (DPI) systems in C and Python on Linux at Rohde & Schwarz.
                        </p>
                        <p className="text-xl text-gray-700 leading-relaxed">
                            Experienced in system design, code reviews, and software release processes, with active
                            participation in cross-team architecture discussions. Proven ability to deliver end-to-end
                            solutions and optimize performance-critical systems.
                        </p>
                        <div className="pt-8">
                            <button
                                onClick={handleCVdownload}
                                className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl"
                            >
                                📄 Download My C.V.
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
