"use client"
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY
            setIsScrolled(scrollTop > 50)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
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
                        <Link href="/" className={`font-bold transition-all duration-300 font-['Poppins',system-ui,sans-serif] tracking-wider ${isScrolled ? 'text-4xl' : 'text-5xl'
                            }`}>
                            <span className="bg-linear-to-r from-sky-600 via-sky-400 to-sky-300 bg-clip-text text-transparent hover:from-sky-700 hover:via-sky-500 hover:to-sky-400">
                                {"<PARMENIDE />"}
                            </span>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-8">
                        <button
                            onClick={() => scrollToSection('home')}
                            className={`font-bold bg-linear-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent hover:from-blue-700 hover:to-sky-500 transition-all duration-300 font-['Poppins',system-ui,sans-serif] ${isScrolled ? 'text-lg' : 'text-xl'
                                }`}
                        >
                            Home
                        </button>
                        <button
                            onClick={() => scrollToSection('about')}
                            className={`font-bold bg-linear-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent hover:from-blue-700 hover:to-sky-500 transition-all duration-300 font-['Poppins',system-ui,sans-serif] ${isScrolled ? 'text-lg' : 'text-xl'
                                }`}
                        >
                            About
                        </button>
                        <button
                            onClick={() => scrollToSection('projects')}
                            className={`font-bold bg-linear-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent hover:from-blue-700 hover:to-sky-500 transition-all duration-300 font-['Poppins',system-ui,sans-serif] ${isScrolled ? 'text-lg' : 'text-xl'
                                }`}
                        >
                            Projects
                        </button>
                        <button
                            onClick={() => scrollToSection('contact')}
                            className={`font-bold bg-linear-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent hover:from-blue-700 hover:to-sky-500 transition-all duration-300 font-['Poppins',system-ui,sans-serif] ${isScrolled ? 'text-lg' : 'text-xl'
                                }`}
                        >
                            Contact
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}