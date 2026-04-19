import type { MetadataRoute } from 'next'
import { SITE_URL } from './config'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/dashboard', '/login', '/register', '/reset-password'],
            },
        ],
        sitemap: SITE_URL ? `${SITE_URL}/sitemap.xml` : undefined,
    }
}
