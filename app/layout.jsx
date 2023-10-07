import Footer from '../utils/Footer'
import '../styles/globals.css'
import styles from '../styles/layout.module.css'

// THE HEADER NAVIGATION
import Header from '../utils/Header'

export const metadata = {
  title:
    typeof window !== 'undefined' && window.location.pathname === '/'
      ? 'Parmenide'
      : `Parmenide - ${typeof window !== 'undefined'
        ? window.location.pathname.slice(1).charAt(0).toUpperCase() +
        window.location.pathname.slice(2)
        : ''
      }`,
  description: 'Niyomwungeri Parmenide Ishimwe Portfolio',
}

// PROVIDER COMPONENT
export default function RootLayout({ children }) {

  // DISABLE NEXT JS 13 ERROR OVERLAY
  const noOverlayWorkaroundScript = `
  window.addEventListener('error', event => {
    event.stopImmediatePropagation()
  })

  window.addEventListener('unhandledrejection', event => {
    event.stopImmediatePropagation()
  })
`
  // RETURN THE LAYOUT
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
        <title>Niyomwungeri Parmenide ISHIMWE</title>

        {/* DISABLE NEXT JS 13 ERROR OVERLAY */}
        {process.env.NODE_ENV !== 'production' && <script dangerouslySetInnerHTML={{ __html: noOverlayWorkaroundScript }} />}
      </head>
      <body className={styles.container}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
