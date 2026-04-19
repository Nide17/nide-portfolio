"use client"
import { useState, useEffect } from 'react'

export default function ScrollTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onVisible = () => {
      const scrolled = document.documentElement.scrollTop
      setVisible(scrolled >= 600)
    }

    window.addEventListener('scroll', onVisible)
    return () => window.removeEventListener('scroll', onVisible)
  }, [])

  const onScroll = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      onClick={onScroll}
      className={`fixed bottom-6 right-6 bg-linear-to-r from-blue-600 to-sky-400 hover:from-blue-700 hover:to-sky-500 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 z-50 transform hover:scale-110 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      aria-label="Scroll to top"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  )
}