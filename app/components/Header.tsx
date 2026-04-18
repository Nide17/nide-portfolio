"use client"
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY
            setIsScrolled(scrollTop > 50)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMobileMenuOpen(false)
            }
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        setIsMobileMenuOpen(false)
    }

    return (
        <nav className={`fixed top-0 w-full transition-all duration-300 z-50 border-b ${isScrolled
            ? 'bg-white/98 backdrop-blur-md shadow-lg border-gray-200 h-20'
            : 'bg-white/95 backdrop-blur-sm shadow-sm border-gray-100 h-24'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`flex justify-between transition-all duration-300 ${isScrolled ? 'h-20' : 'h-24'
                    }`}>
                    <div className="flex items-center">
                        <Link href="/" className={`font-bold transition-all duration-300 font-['Poppins',system-ui,sans-serif] tracking-wider ${isScrolled ? 'text-2xl sm:text-4xl' : 'text-3xl sm:text-5xl'
                            }`}>
                            <span className="bg-linear-to-r from-sky-600 via-sky-400 to-sky-300 bg-clip-text text-transparent hover:from-sky-700 hover:via-sky-500 hover:to-sky-400">
                                {"<PARMENIDE />"}
                            </span>
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/#home">
                            <span className={`font-bold bg-linear-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent hover:from-blue-700 hover:to-sky-500 transition-all duration-300 font-['Poppins',system-ui,sans-serif] cursor-pointer ${isScrolled ? 'text-lg' : 'text-xl'
                                }`}>
                                Home
                            </span>
                        </Link>
                        <Link href="/#about">
                            <span className={`font-bold bg-linear-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent hover:from-blue-700 hover:to-sky-500 transition-all duration-300 font-['Poppins',system-ui,sans-serif] cursor-pointer ${isScrolled ? 'text-lg' : 'text-xl'
                                }`}>
                                About
                            </span>
                        </Link>
                        <Link href="/#projects">
                            <span className={`font-bold bg-linear-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent hover:from-blue-700 hover:to-sky-500 transition-all duration-300 font-['Poppins',system-ui,sans-serif] cursor-pointer ${isScrolled ? 'text-lg' : 'text-xl'
                                }`}>
                                Projects
                            </span>
                        </Link>
                        <button
                            onClick={() => scrollToSection('contact')}
                            className={`font-bold bg-linear-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent hover:from-blue-700 hover:to-sky-500 transition-all duration-300 font-['Poppins',system-ui,sans-serif] ${isScrolled ? 'text-lg' : 'text-xl'
                                }`}
                        >
                            Contact
                        </button>
                    </div>
                    <div className="flex items-center md:hidden">
                        <button
                            type="button"
                            aria-label="Toggle navigation menu"
                            aria-expanded={isMobileMenuOpen}
                            onClick={() => setIsMobileMenuOpen((open) => !open)}
                            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white/80 text-sky-700 shadow-sm transition-colors hover:bg-sky-50"
                        >
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M4 17h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
                {isMobileMenuOpen && (
                    <div className="border-t border-gray-100 py-4 md:hidden">
                        <div className="flex flex-col gap-2 rounded-3xl border border-sky-100 bg-white px-3 py-3 shadow-lg shadow-sky-100/70">
                            <Link
                                href="/#home"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="rounded-2xl border border-transparent bg-sky-50 px-4 py-3 text-base font-semibold font-['Poppins',system-ui,sans-serif] tracking-wide transition-all hover:border-sky-100 hover:bg-sky-100"
                            >
                                <span className="bg-linear-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent">
                                    Home
                                </span>
                            </Link>
                            <Link
                                href="/#about"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="rounded-2xl border border-transparent bg-sky-50 px-4 py-3 text-base font-semibold font-['Poppins',system-ui,sans-serif] tracking-wide transition-all hover:border-sky-100 hover:bg-sky-100"
                            >
                                <span className="bg-linear-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent">
                                    About
                                </span>
                            </Link>
                            <Link
                                href="/#projects"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="rounded-2xl border border-transparent bg-sky-50 px-4 py-3 text-base font-semibold font-['Poppins',system-ui,sans-serif] tracking-wide transition-all hover:border-sky-100 hover:bg-sky-100"
                            >
                                <span className="bg-linear-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent">
                                    Projects
                                </span>
                            </Link>
                            <button
                                onClick={() => scrollToSection('contact')}
                                className="rounded-2xl border border-transparent bg-sky-50 px-4 py-3 text-left text-base font-semibold font-['Poppins',system-ui,sans-serif] tracking-wide transition-all hover:border-sky-100 hover:bg-sky-100"
                            >
                                <span className="bg-linear-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent">
                                    Contact
                                </span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}
