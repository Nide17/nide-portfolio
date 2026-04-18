import type { ProjectPayload } from '../lib/api'

export interface Message {
    id: number
    sender_name: string
    sender_email: string
    subject: string
    body: string
    created_at: string
}

export interface Visit {
    id: number
    ip_address: string
    device?: string
    operating_system?: string
    browser?: string
    path?: string
    referrer?: string
    created_at: string
}

export interface Download {
    id: number
    ip_address: string
    document_name: string
    device?: string
    operating_system?: string
    browser?: string
    country?: string
    referrer?: string
    created_at: string
}

export interface Project extends ProjectPayload {
    id?: number
    created_at?: string
}

export type ProjectFormState = Project & { technologiesRaw?: string }

export type TabKey = 'projects' | 'messages' | 'visits' | 'downloads'
