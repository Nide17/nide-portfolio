import type { Metadata, Viewport } from 'next'
import './styles/globals.css'
import TitleAnimator from './components/TitleAnimator'

// THE HEADER NAVIGATION
import Header from './components/Header'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'Niyomwungeri Parmenide Ishimwe - Portfolio',
  description: 'Full-Stack Software Engineer specializing in modern web technologies. Explore my projects and experience.',
  robots: 'index, follow',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

// PROVIDER COMPONENT
export default function RootLayout({ children }: { children: React.ReactNode }) {
  // RETURN THE LAYOUT
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen" suppressHydrationWarning={true}>
        <TitleAnimator />
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}
