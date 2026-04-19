"use client"
import { useEffect } from 'react'

export default function TitleAnimator() {
    useEffect(() => {
        const titles = [
            'Niyomwungeri Parmenide Ishimwe - Portfolio',
            'Software Engineer - Niyomwungeri Parmenide Ishimwe',
        ]

        let titleIndex = 0
        let charIndex = 0
        let isDeleting = false
        let timeoutId: NodeJS.Timeout

        const animateTitle = () => {
            const currentTitle = titles[titleIndex]
            
            if (isDeleting) {
                // Deleting characters
                document.title = currentTitle.substring(0, charIndex - 1)
                charIndex--
                
                if (charIndex === 0) {
                    isDeleting = false
                    titleIndex = (titleIndex + 1) % titles.length
                    timeoutId = setTimeout(animateTitle, 500)
                } else {
                    timeoutId = setTimeout(animateTitle, 50)
                }
            } else {
                // Typing characters
                document.title = currentTitle.substring(0, charIndex + 1)
                charIndex++
                
                if (charIndex === currentTitle.length) {
                    isDeleting = true
                    timeoutId = setTimeout(animateTitle, 2000)
                } else {
                    timeoutId = setTimeout(animateTitle, 100)
                }
            }
        }

        // Start animation
        timeoutId = setTimeout(animateTitle, 1000)

        // Cleanup
        return () => {
            if (timeoutId) clearTimeout(timeoutId)
            document.title = 'Niyomwungeri Parmenide Ishimwe - Portfolio'
        }
    }, [])

    return null // This component doesn't render anything
}
