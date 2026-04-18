const dev = process.env.NODE_ENV !== 'production'

function normalizeUrl(value?: string) {
    return value?.trim().replace(/\/+$/, '') || ''
}

export const API_BASE_URL = normalizeUrl(process.env.NEXT_PUBLIC_API_BASE_URL) || (dev ? 'http://localhost:8000' : '')
export const SITE_URL = normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL) || (dev ? 'http://localhost:3000' : '')
export const server = API_BASE_URL
