import type { Metadata, Viewport } from 'next'
import './styles/globals.css'
import TitleAnimator from './components/TitleAnimator'
import { SITE_URL } from './config'

// THE HEADER NAVIGATION
import Header from './components/Header'
import { Providers } from './providers'

const metadataBase = SITE_URL ? new URL(SITE_URL) : undefined
const portfolioTitle = 'Niyomwungeri Parmenide Ishimwe | Software Engineer'
const portfolioDescription =
  'Portfolio of Niyomwungeri Parmenide Ishimwe, a full-stack software engineer building modern web applications and performance-focused systems.'

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: portfolioTitle,
    template: '%s | Niyomwungeri Parmenide Ishimwe',
  },
  description: portfolioDescription,
  applicationName: 'Parmenide Portfolio',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    url: SITE_URL || undefined,
    title: portfolioTitle,
    description: portfolioDescription,
    siteName: 'Parmenide Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: portfolioTitle,
    description: portfolioDescription,
  },
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
