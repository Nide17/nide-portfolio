"use client"
import { useEffect } from 'react'
import Image from 'next/image'
import { trackVisit, getClientIP, getDeviceInfo, shouldTrackVisit, markVisitTracked } from '../lib/api'

export default function Welcome() {
    useEffect(() => {
        // Track visit
        const trackPageVisit = async () => {
            try {
                const ip = await getClientIP()
                if (!shouldTrackVisit(ip)) {
                    return
                }

                const { browser, os, device } = getDeviceInfo()

                const result = await trackVisit({
                    ip_address: ip,
                    device,
                    operating_system: os,
                    browser,
                    path: '/',
                    referrer: document.referrer || undefined
                })

                if (result) {
                    markVisitTracked(ip)
                }
            } catch (error) {
                console.error('Failed to track visit:', error)
            }
        }

        trackPageVisit()
    }, [])

    return (
        <section id="home" className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-sky-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    <div className="text-center lg:text-left">
                        <div className="mb-5 sm:mb-6">
                            <p className="mb-3 text-sm font-semibold tracking-[0.18em] text-sky-700 font-['Poppins',system-ui,sans-serif] sm:text-lg sm:tracking-[0.24em]">
                                Hello, I&apos;m
                            </p>
                            <h1 className="bg-linear-to-r from-blue-600 via-sky-500 to-cyan-500 bg-clip-text text-3xl font-bold leading-[1.08] text-transparent font-['Poppins',system-ui,sans-serif] sm:text-5xl sm:leading-[1.05] lg:text-6xl">
                                Niyomwungeri Parmenide Ishimwe
                            </h1>
                        </div>
                        <p className="bg-linear-to-r from-slate-700 via-sky-700 to-blue-700 bg-clip-text text-base font-semibold leading-tight text-transparent font-['Poppins',system-ui,sans-serif] sm:text-2xl lg:text-3xl">
                            Software Engineer
                        </p>
                        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-slate-600 sm:mt-5 sm:text-base lg:mx-0 lg:text-lg">
                            I build fast, reliable full-stack software.
                        </p>
                        <div className="mt-5 flex flex-wrap justify-center gap-3 lg:justify-start">
                            <span className="inline-flex items-center rounded-full border border-sky-200 bg-white/80 px-4 py-1.5 text-xs font-semibold text-sky-700 shadow-sm sm:text-sm">
                                5+ years of experience
                            </span>
                            <span className="inline-flex items-center rounded-full border border-sky-200 bg-white/80 px-4 py-1.5 text-xs font-semibold text-sky-700 shadow-sm sm:text-sm">
                                Rohde &amp; Schwarz
                            </span>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div className="relative">
                            <Image
                                src="/images/NIDEiMAGE.JPG"
                                alt="Niyomwungeri Parmenide Ishimwe"
                                width={600}
                                height={600}
                                sizes="(max-width: 640px) 16rem, (max-width: 1024px) 18rem, 22rem"
                                className="h-64 w-64 rounded-full border-4 border-white object-cover shadow-2xl sm:h-72 sm:w-72 lg:h-88 lg:w-88"
                                priority
                            />
                            <div className="absolute -inset-4 rounded-full bg-linear-to-r from-blue-400 to-sky-400 opacity-20 animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
