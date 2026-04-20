// API utility functions for interacting with the FastAPI backend
import { API_BASE_URL } from '../config'

export interface ProjectPayload {
    title: string
    description?: string
    image?: string
    github_backend?: string
    github_frontend?: string
    live_at?: string
    technologies?: string[]
}

export interface MessagePayload {
    sender_name: string
    sender_email: string
    subject: string
    body: string
}

export interface VisitPayload {
    ip_address: string
    device?: string
    operating_system?: string
    browser?: string
    path?: string
    referrer?: string
}

export interface DownloadPayload {
    ip_address: string
    document_name: string
    device?: string
    operating_system?: string
    browser?: string
    country?: string
    referrer?: string
}

export interface UserPayload {
    name: string
    email: string
    password: string
    role?: string
}

export interface UserRecord extends UserPayload {
    id?: number
}

interface TrackingCacheEntry {
    ip: string
    timestamp: number
}

const ONE_DAY_MS = 24 * 60 * 60 * 1000
const CLIENT_IP_CACHE_KEY = 'client-ip-cache'
const VISIT_TRACKING_CACHE_KEY = 'visit-tracking-cache'
const DOWNLOAD_TRACKING_CACHE_KEY = 'download-tracking-cache'

async function requestAPIJson<T>(path: string, init?: RequestInit): Promise<T> {
    if (!API_BASE_URL) {
        throw new Error('NEXT_PUBLIC_API_BASE_URL is not configured')
    }

    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    const headers = token ? { Authorization: `Bearer ${token}`, ...init?.headers } : init?.headers;

    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...init,
        headers
    });

    if (!response.ok) {
        let detail = '';

        try {
            const errorData = await response.json();
            detail = errorData?.detail || errorData?.message || '';
        } catch {
            detail = '';
        }

        throw new Error(detail ? `${detail} (HTTP ${response.status})` : `Request failed with status ${response.status}`);
    }

    if (response.status === 204) {
        return null as T;
    }

    return response.json();
}

function requestAPIJsonWithBody(body: unknown, init?: RequestInit): RequestInit {
    return {
        ...init,
        headers: {
            'Content-Type': 'application/json',
            ...(init?.headers || {})
        },
        body: JSON.stringify(body)
    }
}

function readTrackingCache(key: string): TrackingCacheEntry | null {
    if (typeof window === 'undefined') return null

    try {
        const raw = localStorage.getItem(key)
        if (!raw) return null

        const parsed = JSON.parse(raw) as TrackingCacheEntry
        if (!parsed?.ip || typeof parsed.timestamp !== 'number') return null
        return parsed
    } catch (error) {
        console.error(`Failed to read local cache for ${key}:`, error)
        return null
    }
}

function writeTrackingCache(key: string, entry: TrackingCacheEntry) {
    if (typeof window === 'undefined') return

    try {
        localStorage.setItem(key, JSON.stringify(entry))
    } catch (error) {
        console.error(`Failed to write local cache for ${key}:`, error)
    }
}

function isFreshCacheEntry(entry: TrackingCacheEntry | null) {
    return !!entry && Date.now() - entry.timestamp < ONE_DAY_MS
}

// Helper to get client IP address
export async function getClientIP() {
    const cachedIp = readTrackingCache(CLIENT_IP_CACHE_KEY)
    if (isFreshCacheEntry(cachedIp)) {
        return cachedIp?.ip;
    }

    try {
        const response = await fetch('https://api.ipify.org?format=json')
        const data = await response.json()
        writeTrackingCache(CLIENT_IP_CACHE_KEY, {
            ip: data.ip,
            timestamp: Date.now()
        })
        return data.ip
    } catch (error) {
        console.error('Failed to get IP:', error)
        return '0.0.0.0'
    }
}

function shouldTrackForKey(key: string, ip: string) {
    const cachedEntry = readTrackingCache(key)
    return !(isFreshCacheEntry(cachedEntry) && cachedEntry?.ip === ip)
}

function markTrackedForKey(key: string, ip: string) {
    writeTrackingCache(key, {
        ip,
        timestamp: Date.now()
    })
}

export function shouldTrackVisit(ip: string) {
    return shouldTrackForKey(VISIT_TRACKING_CACHE_KEY, ip)
}

export function markVisitTracked(ip: string) {
    markTrackedForKey(VISIT_TRACKING_CACHE_KEY, ip)
}

export function shouldTrackDownload(ip: string) {
    return shouldTrackForKey(DOWNLOAD_TRACKING_CACHE_KEY, ip)
}

export function markDownloadTracked(ip: string) {
    markTrackedForKey(DOWNLOAD_TRACKING_CACHE_KEY, ip)
}

// Helper to get country from IP address
export async function getCountryFromIP(ip: string) {
    try {
        const response = await fetch(`https://ipapi.co/${ip}/json/`)
        const data = await response.json()
        return data.country_name || 'Unknown'
    } catch (error) {
        console.error('Failed to get country:', error)
        return 'Unknown'
    }
}

// Helper to detect browser and OS from user agent
export function getDeviceInfo() {
    const ua = navigator.userAgent
    let browser = 'Unknown'
    let os = 'Unknown'
    let device = 'Desktop'

    if (ua.indexOf('Win') > -1) os = 'Windows'
    else if (ua.indexOf('Mac') > -1) os = 'macOS'
    else if (ua.indexOf('Linux') > -1) os = 'Linux'
    else if (ua.indexOf('Android') > -1) os = 'Android'
    else if (ua.indexOf('iPhone') > -1 || ua.indexOf('iPad') > -1) os = 'iOS'

    if (ua.indexOf('Firefox') > -1) browser = 'Firefox'
    else if (ua.indexOf('Chrome') > -1) browser = 'Chrome'
    else if (ua.indexOf('Safari') > -1) browser = 'Safari'
    else if (ua.indexOf('Edge') > -1) browser = 'Edge'

    if (/Mobile|Android|iPhone/.test(ua)) device = 'Mobile'
    else if (/Tablet|iPad/.test(ua)) device = 'Tablet'

    return { browser, os, device }
}

// ===== PROJECTS =====
export async function fetchProjects() {
    try {
        return await requestAPIJson<any[]>('/projects/')
    } catch (error) {
        console.error('Error fetching projects:', error)
        return []
    }
}

export async function fetchProjectById(projectId: string | number) {
    return requestAPIJson<any>(`/projects/${projectId}`)
}

export async function createProject(projectData: ProjectPayload) {
    return requestAPIJson<any>('/projects/', requestAPIJsonWithBody(projectData, { method: 'POST' }))
}

export async function updateProject(projectId: number, projectData: ProjectPayload) {
    return requestAPIJson<any>(`/projects/${projectId}`, requestAPIJsonWithBody(projectData, { method: 'PUT' }))
}

export async function deleteProject(projectId: number) {
    return requestAPIJson<any>(`/projects/${projectId}`, { method: 'DELETE' })
}

// ===== MESSAGES =====
export async function sendMessage(messageData: MessagePayload) {
    return requestAPIJson<any>('/messages/', requestAPIJsonWithBody(messageData, { method: 'POST' }))
}

export async function fetchMessages() {
    try {
        return await requestAPIJson<any[]>('/messages/')
    } catch (error) {
        console.error('Error fetching messages:', error)
        return []
    }
}

export async function deleteMessage(messageId: number) {
    return requestAPIJson<any>(`/messages/${messageId}`, { method: 'DELETE' })
}

// ===== VISITS =====
export async function fetchVisits() {
    try {
        return await requestAPIJson<any[]>('/visits/')
    } catch (error) {
        console.error('Error fetching visits:', error)
        return []
    }
}

export async function deleteVisit(visitId: number) {
    return requestAPIJson<any>(`/visits/${visitId}`, { method: 'DELETE' })
}

const VISIT_TRACKING_TIMEOUT_MS = 10_000

export async function trackVisit(visitData: VisitPayload) {
    if (!API_BASE_URL) return null

    const maxRetries = 3

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            const controller = new AbortController()
            const timeoutId = setTimeout(() => controller.abort(), VISIT_TRACKING_TIMEOUT_MS)

            const response = await fetch(`${API_BASE_URL}/visits/`, requestAPIJsonWithBody(visitData, {
                method: 'POST',
                signal: controller.signal
            }))

            clearTimeout(timeoutId)

            if (!response.ok) {
                if ((response.status === 503 || response.status >= 500) && attempt < maxRetries) {
                    const waitTime = Math.pow(2, attempt) * 1000
                    await new Promise((resolve) => setTimeout(resolve, waitTime))
                    continue
                }
                return null
            }

            return await response.json()
        } catch (error: any) {
            if (attempt < maxRetries) {
                const waitTime = Math.pow(2, attempt) * 1000
                await new Promise((resolve) => setTimeout(resolve, waitTime))
                continue
            }

            console.warn('Visit tracking error (all retries exhausted):', error)
            return null
        }
    }

    return null
}

// ===== DOWNLOADS =====
export async function trackDownload(downloadData: DownloadPayload) {
    if (!API_BASE_URL) return null

    const maxRetries = 3
    const timeout = 10_000

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            const controller = new AbortController()
            const timeoutId = setTimeout(() => controller.abort(), timeout)

            const response = await fetch(`${API_BASE_URL}/downloads/`, requestAPIJsonWithBody(downloadData, {
                method: 'POST',
                signal: controller.signal
            }))

            clearTimeout(timeoutId)

            if (!response.ok) {
                if ((response.status === 503 || response.status >= 500) && attempt < maxRetries) {
                    const waitTime = Math.pow(2, attempt) * 1000
                    await new Promise((resolve) => setTimeout(resolve, waitTime))
                    continue
                }

                throw new Error(`HTTP ${response.status}: ${response.statusText}`)
            }

            return await response.json()
        } catch (error: any) {
            if (attempt < maxRetries) {
                const waitTime = Math.pow(2, attempt) * 1000
                await new Promise((resolve) => setTimeout(resolve, waitTime))
                continue
            }

            console.error('Error tracking download after all retries:', error)
            return null
        }
    }

    return null
}

export async function fetchDownloads() {
    try {
        return await requestAPIJson<any[]>('/downloads/')
    } catch (error) {
        console.error('Error fetching downloads:', error)
        return []
    }
}

export async function deleteDownload(downloadId: number) {
    return requestAPIJson<any>(`/downloads/${downloadId}`, { method: 'DELETE' })
}

// ===== USERS & AUTH =====
export async function registerUser(userData: UserPayload) {
    return requestAPIJson<any>('/users/register', requestAPIJsonWithBody(userData, { method: 'POST' }))
}

export async function fetchUsers() {
    try {
        return await requestAPIJson<any[]>('/users/')
    } catch (error) {
        console.error('Error fetching users:', error)
        return []
    }
}

export async function getUserByEmail(email: string) {
    try {
        return await requestAPIJson<UserRecord>(`/users/email/${email}`)
    } catch (error: any) {
        if (String(error?.message || '').toLowerCase().includes('404')) {
            return null
        }

        console.error('Error fetching user:', error)
        return null
    }
}

export async function updateUser(userId: number, userData: UserPayload) {
    return requestAPIJson<UserRecord>(`/users/${userId}`, requestAPIJsonWithBody(userData, { method: 'PUT' }))
}

export async function logoutUser() {
    try {
        // Attempt to call the stateless backend logout API
        await requestAPIJson<void>('/users/logout', { method: 'POST' })
    } catch (error) {
        console.error('Logout request failed:', error)
        throw error
    }
}



export interface LoginResponse {
    access_token: string;
    token_type: string;
}

export async function loginUser(email: string, password: string) {
    return requestAPIJson<LoginResponse>('/users/login', requestAPIJsonWithBody({ email, password }, { method: 'POST' }));
}

export async function getCurrentUser() {
    return requestAPIJson<UserRecord>('/users/me');
}

// ===== PASSWORD RESET =====
export interface ResetPasswordPayload {
    token: string;
    password: string;
}

export async function forgotPassword(email: string) {
    return requestAPIJson<void>('/users/forgot-password', requestAPIJsonWithBody({ email }, { method: 'POST' }));
}

export async function resetPassword(payload: ResetPasswordPayload) {
    return requestAPIJson<void>('/users/reset-password', requestAPIJsonWithBody({ token: payload.token, new_password: payload.password }, { method: 'POST' }));
}
