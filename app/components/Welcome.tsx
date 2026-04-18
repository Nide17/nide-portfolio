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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="text-center lg:text-left">
                        <div className="mb-8">
                            <p className="text-4xl md:text-5xl lg:text-5xl text-gray-600 mb-4 font-semibold font-['Poppins',system-ui,sans-serif] leading-tight">
                                Hello, I&apos;m
                            </p>
                            <h1 className="text-3xl md:text-4xl lg:text-4xl font-bold bg-linear-to-r from-blue-600 via-sky-400 to-sky-600 bg-clip-text text-transparent mb-4 font-['Poppins',system-ui,sans-serif] leading-tight">
                                Niyomwungeri Parmenide Ishimwe
                            </h1>
                        </div>
                        <p className="text-3xl md:text-4xl lg:text-4xl font-bold bg-linear-to-r from-blue-600 via-sky-400 to-sky-700 bg-clip-text text-transparent leading-tight font-['Poppins',system-ui,sans-serif]">
                            A Software Engineer
                        </p>
                    </div>
                    <div className="flex justify-center">
                        <div className="relative">
                            <Image
                                src="/images/NIDEiMAGE.JPG"
                                alt="Niyomwungeri Parmenide Ishimwe"
                                width={350}
                                height={350}
                                className="rounded-full shadow-2xl border-4 border-white"
                                priority
                            />
                            <div className="absolute -inset-4 bg-linear-to-r from-blue-400 to-sky-400 rounded-full opacity-20 animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
