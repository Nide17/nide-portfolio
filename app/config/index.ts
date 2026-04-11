const dev = process.env.NODE_ENV !== 'production'

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || (dev ? 'http://localhost:8000' : '')
export const server = API_BASE_URL
