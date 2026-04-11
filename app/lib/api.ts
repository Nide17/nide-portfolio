// API utility functions for interacting with the FastAPI backend
import { API_BASE_URL } from '../config'

// Helper to get client IP address
export async function getClientIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json')
        const data = await response.json()
        return data.ip
    } catch (error) {
        console.error('Failed to get IP:', error)
        return '0.0.0.0'
    }
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

    // Detect OS
    if (ua.indexOf('Win') > -1) os = 'Windows'
    else if (ua.indexOf('Mac') > -1) os = 'macOS'
    else if (ua.indexOf('Linux') > -1) os = 'Linux'
    else if (ua.indexOf('Android') > -1) os = 'Android'
    else if (ua.indexOf('iPhone') > -1 || ua.indexOf('iPad') > -1) os = 'iOS'

    // Detect browser
    if (ua.indexOf('Firefox') > -1) browser = 'Firefox'
    else if (ua.indexOf('Chrome') > -1) browser = 'Chrome'
    else if (ua.indexOf('Safari') > -1) browser = 'Safari'
    else if (ua.indexOf('Edge') > -1) browser = 'Edge'

    // Detect device type
    if (/Mobile|Android|iPhone/.test(ua)) device = 'Mobile'
    else if (/Tablet|iPad/.test(ua)) device = 'Tablet'

    return { browser, os, device }
}

// ===== PROJECTS =====
export async function fetchProjects() {
    try {
        const response = await fetch(`${API_BASE_URL}/projects/`)
        if (!response.ok) throw new Error('Failed to fetch projects')
        return await response.json()
    } catch (error) {
        console.log('Error fetching projects:', error)
        return []
    }
}

export async function createProject(projectData: any) {
    try {
        // Patch the payload to avoid backend failure with technologies array and image URL
        const patchedData = {
            ...projectData,
            technologies: null, // Backend currently fails with array, set to null for now
            image: null // Backend currently fails with image URLs, set to null for now
        }

        const response = await fetch(`${API_BASE_URL}/projects/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(patchedData)
        })
        if (!response.ok) throw new Error('Failed to create project')
        return await response.json()
    } catch (error) {
        console.error('Error creating project:', error)
        throw error
    }
}

export async function updateProject(projectId: number, projectData: any) {
    try {
        const response = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(projectData)
        })
        if (!response.ok) throw new Error('Failed to update project')
        return await response.json()
    } catch (error) {
        console.error('Error updating project:', error)
        throw error
    }
}

export async function deleteProject(projectId: number) {
    try {
        const response = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
            method: 'DELETE'
        })
        if (!response.ok) throw new Error('Failed to delete project')
        return await response.json()
    } catch (error) {
        console.error('Error deleting project:', error)
        throw error
    }
}

// ===== MESSAGES =====
export async function sendMessage(messageData: {
    sender_name: string
    sender_email: string
    subject: string
    body: string
}) {
    try {
        const response = await fetch(`${API_BASE_URL}/messages/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(messageData)
        })
        if (!response.ok) throw new Error('Failed to send message')
        return await response.json()
    } catch (error) {
        console.error('Error sending message:', error)
        throw error
    }
}

// ===== VISITS =====
const VISIT_TRACKING_TIMEOUT_MS = 10_000 // 10 seconds timeout for visit tracking

export async function trackVisit(visitData: {
    ip_address: string
    device?: string
    operating_system?: string
    browser?: string
    path?: string
    referrer?: string
}) {
    const maxRetries = 3

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            const controller = new AbortController()
            const timeoutId = setTimeout(() => controller.abort(), VISIT_TRACKING_TIMEOUT_MS)

            const response = await fetch(`${API_BASE_URL}/visits/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(visitData),
                signal: controller.signal
            })

            clearTimeout(timeoutId)

            if (!response.ok) {
                if ((response.status === 503 || response.status >= 500) && attempt < maxRetries) {
                    // Server error or service unavailable, retry with exponential backoff
                    const waitTime = Math.pow(2, attempt) * 1000
                    console.log(`Visit tracking failed (${response.status}), retrying in ${waitTime}ms... (attempt ${attempt + 1}/${maxRetries})`)
                    await new Promise(resolve => setTimeout(resolve, waitTime))
                    continue
                }
                console.warn('Visit tracking failed:', response.status)
                return null
            }

            return await response.json()
        } catch (error: any) {
            if (error?.name === 'AbortError' && attempt < maxRetries) {
                const waitTime = Math.pow(2, attempt) * 1000
                console.log(`Visit tracking timeout, retrying in ${waitTime}ms... (attempt ${attempt + 1}/${maxRetries})`)
                await new Promise(resolve => setTimeout(resolve, waitTime))
                continue
            }

            if (attempt < maxRetries) {
                const waitTime = Math.pow(2, attempt) * 1000
                console.log(`Visit tracking error: ${error?.message}, retrying in ${waitTime}ms... (attempt ${attempt + 1}/${maxRetries})`)
                await new Promise(resolve => setTimeout(resolve, waitTime))
                continue
            }

            console.warn('Visit tracking error (all retries exhausted):', error)
            return null
        }
    }

    return null
}

// ===== DOWNLOADS =====
export async function trackDownload(downloadData: {
    ip_address: string
    document_name: string
    device?: string
    operating_system?: string
    browser?: string
    country?: string
    referrer?: string
}) {
    const maxRetries = 3
    const timeout = 10000 // 10 seconds per attempt

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        try {
            const controller = new AbortController()
            const timeoutId = setTimeout(() => controller.abort(), timeout)

            const response = await fetch(`${API_BASE_URL}/downloads/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(downloadData),
                signal: controller.signal
            })

            clearTimeout(timeoutId)

            if (!response.ok) {
                if ((response.status === 503 || response.status >= 500) && attempt < maxRetries) {
                    // Server error or service unavailable, retry with exponential backoff
                    const waitTime = Math.pow(2, attempt) * 1000
                    console.log(`Download tracking failed (${response.status}), retrying in ${waitTime}ms... (attempt ${attempt + 1}/${maxRetries})`)
                    await new Promise(resolve => setTimeout(resolve, waitTime))
                    continue
                }
                throw new Error(`HTTP ${response.status}: ${response.statusText}`)
            }

            return await response.json()
        } catch (error: any) {
            if (error?.name === 'AbortError' && attempt < maxRetries) {
                const waitTime = Math.pow(2, attempt) * 1000
                console.log(`Download tracking timeout, retrying in ${waitTime}ms... (attempt ${attempt + 1}/${maxRetries})`)
                await new Promise(resolve => setTimeout(resolve, waitTime))
                continue
            }

            if (attempt < maxRetries) {
                const waitTime = Math.pow(2, attempt) * 1000
                console.log(`Download tracking error: ${error?.message}, retrying in ${waitTime}ms... (attempt ${attempt + 1}/${maxRetries})`)
                await new Promise(resolve => setTimeout(resolve, waitTime))
                continue
            }

            console.error('Error tracking download after all retries:', error)
            // Don't throw error - download should still work even if tracking fails
            return null
        }
    }

    return null
}

// ===== USERS & AUTH =====
export async function registerUser(userData: {
    name: string
    email: string
    password: string
    role?: string
}) {
    try {
        const response = await fetch(`${API_BASE_URL}/users/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        })
        if (!response.ok) throw new Error('Failed to register')
        return await response.json()
    } catch (error) {
        console.error('Error registering user:', error)
        throw error
    }
}

export async function fetchUsers() {
    try {
        const response = await fetch(`${API_BASE_URL}/users/`)
        if (!response.ok) throw new Error('Failed to fetch users')
        return await response.json()
    } catch (error) {
        console.error('Error fetching users:', error)
        return []
    }
}

export async function getUserByEmail(email: string) {
    try {
        const response = await fetch(`${API_BASE_URL}/users/email/${email}`)
        if (!response.ok) {
            if (response.status === 404) return null
            throw new Error('Failed to fetch user')
        }
        return await response.json()
    } catch (error) {
        console.error('Error fetching user:', error)
        return null
    }
}
