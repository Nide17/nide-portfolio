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
const socialImage = '/images/NIDEiMAGE.JPG'

const personStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Niyomwungeri Parmenide Ishimwe',
  jobTitle: 'Software Engineer',
  description: portfolioDescription,
  url: SITE_URL || undefined,
  image: SITE_URL ? `${SITE_URL}${socialImage}` : socialImage,
  sameAs: [
    'https://github.com/Nide17',
    'https://www.linkedin.com/in/niyomwungeri-parmenide-ishimwe-1a5394123/',
  ],
}

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: portfolioTitle,
    template: '%s | Niyomwungeri Parmenide Ishimwe',
  },
  description: portfolioDescription,
  applicationName: 'Niyomwungeri Parmenide Ishimwe',
  alternates: {
    canonical: '/',
  },
  authors: [
    {
      name: 'Niyomwungeri Parmenide Ishimwe',
      url: 'https://parmenide.me',
    },
  ],
  generator: 'Next.js',
  keywords: ['niyomwungeri', 'parmenide', 'ishimwe', 'software', 'engineer', 'full-stack', 'developer', 'web', 'applications'],
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
    siteName: 'Niyomwungeri Parmenide Ishimwe',
    images: [
      {
        url: socialImage,
        alt: 'Niyomwungeri Parmenide Ishimwe portfolio preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: portfolioTitle,
    description: portfolioDescription,
    images: [socialImage],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personStructuredData) }}
        />
        <TitleAnimator />
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}
