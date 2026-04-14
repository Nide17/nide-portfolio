"use client"

import { type ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '../lib/auth-context'
import {
    createProject,
    deleteDownload,
    deleteMessage,
    deleteProject,
    deleteVisit,
    fetchDownloads,
    fetchMessages,
    fetchProjects,
    fetchVisits,
    getCurrentUser,
    updateProject,
    type ProjectPayload,
    type UserRecord
} from '../lib/api'

interface Message {
    id: number
    sender_name: string
    sender_email: string
    subject: string
    body: string
    created_at: string
}

interface Visit {
    id: number
    ip_address: string
    device?: string
    operating_system?: string
    browser?: string
    path?: string
    referrer?: string
    created_at: string
}

interface Download {
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

interface Project extends ProjectPayload {
    id?: number
    created_at?: string
}

type TabKey = 'projects' | 'messages' | 'visits' | 'downloads'

const emptyProjectForm: Project = {
    title: '',
    description: '',
    image: '',
    github: '',
    live_at: '',
    technologies: []
}

const inputClassName =
    'w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500'

export default function Dashboard() {
    const { isAuthenticated, isReady, logout, user, login } = useAuth()
    const router = useRouter()

    const [activeTab, setActiveTab] = useState<TabKey>('projects')
    const [query, setQuery] = useState('')
    const [projects, setProjects] = useState<Project[]>([])
    const [messages, setMessages] = useState<Message[]>([])
    const [visits, setVisits] = useState<Visit[]>([])
    const [downloads, setDownloads] = useState<Download[]>([])
    const [loading, setLoading] = useState<Record<TabKey, boolean>>({
        projects: true,
        messages: true,
        visits: true,
        downloads: true
    })
    const [refreshing, setRefreshing] = useState<Record<TabKey, boolean>>({
        projects: false,
        messages: false,
        visits: false,
        downloads: false
    })
    const [savingProject, setSavingProject] = useState(false)
    const [deletingKey, setDeletingKey] = useState<string | null>(null)
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [editingProjectId, setEditingProjectId] = useState<number | null>(null)
    const [projectForm, setProjectForm] = useState<Project & { technologiesRaw?: string }>(emptyProjectForm)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const setTabLoading = (tab: TabKey, value: boolean) => {
        setLoading((current) => ({ ...current, [tab]: value }))
    }

    const setTabRefreshing = (tab: TabKey, value: boolean) => {
        setRefreshing((current) => ({ ...current, [tab]: value }))
    }

    const loadProjects = useCallback(async (isRefresh = false) => {
        if (isRefresh) setTabRefreshing('projects', true)
        else setTabLoading('projects', true)

        try {
            setProjects(await fetchProjects())
        } catch (loadError) {
            console.error(loadError)
            setError('Failed to load projects.')
        } finally {
            setTabLoading('projects', false)
            setTabRefreshing('projects', false)
        }
    }, [])

    const loadMessages = useCallback(async (isRefresh = false) => {
        if (isRefresh) setTabRefreshing('messages', true)
        else setTabLoading('messages', true)

        try {
            setMessages(await fetchMessages())
        } catch (loadError) {
            console.error(loadError)
            setError('Failed to load messages.')
        } finally {
            setTabLoading('messages', false)
            setTabRefreshing('messages', false)
        }
    }, [])

    const loadVisits = useCallback(async (isRefresh = false) => {
        if (isRefresh) setTabRefreshing('visits', true)
        else setTabLoading('visits', true)

        try {
            setVisits(await fetchVisits())
        } catch (loadError) {
            console.error(loadError)
            setError('Failed to load visits.')
        } finally {
            setTabLoading('visits', false)
            setTabRefreshing('visits', false)
        }
    }, [])

    const loadDownloads = useCallback(async (isRefresh = false) => {
        if (isRefresh) setTabRefreshing('downloads', true)
        else setTabLoading('downloads', true)

        try {
            setDownloads(await fetchDownloads())
        } catch (loadError) {
            console.error(loadError)
            setError('Failed to load downloads.')
        } finally {
            setTabLoading('downloads', false)
            setTabRefreshing('downloads', false)
        }
    }, [])

    useEffect(() => {
        if (!isReady) {
            return
        }

        if (!isAuthenticated) {
            router.push('/login')
            return
        }

        void Promise.all([
            loadProjects(),
            loadMessages(),
            loadVisits(),
            loadDownloads()
        ])
    }, [isAuthenticated, isReady, loadDownloads, loadMessages, loadProjects, loadVisits, router])

    // getCurrentUser fetches on demand if needed
    const [currentUser, setCurrentUser] = useState<UserRecord | null>(null);

    useEffect(() => {
        if (isAuthenticated && localStorage.getItem('access_token')) {
            getCurrentUser().then(setCurrentUser).catch((err) => {
                if (err.message.includes('401')) {
                    // Invalid token, logout
                    localStorage.removeItem('access_token');
                    router.push('/login');
                } else {
                    console.error('Failed to fetch current user:', err);
                }
            });
        }
    }, [isAuthenticated, router]);

    const resetProjectForm = () => {
        setProjectForm(emptyProjectForm)
        setEditingProjectId(null)
        setShowProjectForm(false)
    }

    const filteredProjects = useMemo(() => {
        const value = query.trim().toLowerCase()
        if (!value) return projects

        return projects.filter((project) =>
            [
                project.title,
                project.description,
                project.github,
                project.live_at,
                ...(project.technologies || [])
            ]
                .filter(Boolean)
                .join(' ')
                .toLowerCase()
                .includes(value)
        )
    }, [projects, query])

    const filteredMessages = useMemo(() => {
        const value = query.trim().toLowerCase()
        if (!value) return messages

        return messages.filter((message) =>
            [message.sender_name, message.sender_email, message.subject, message.body]
                .join(' ')
                .toLowerCase()
                .includes(value)
        )
    }, [messages, query])

    const filteredVisits = useMemo(() => {
        const value = query.trim().toLowerCase()
        if (!value) return visits

        return visits.filter((visit) =>
            [visit.ip_address, visit.device, visit.operating_system, visit.browser, visit.path, visit.referrer]
                .filter(Boolean)
                .join(' ')
                .toLowerCase()
                .includes(value)
        )
    }, [visits, query])

    const filteredDownloads = useMemo(() => {
        const value = query.trim().toLowerCase()
        if (!value) return downloads

        return downloads.filter((download) =>
            [
                download.document_name,
                download.ip_address,
                download.country,
                download.device,
                download.operating_system,
                download.browser,
                download.referrer
            ]
                .filter(Boolean)
                .join(' ')
                .toLowerCase()
                .includes(value)
        )
    }, [downloads, query])

    const handleProjectSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
        setError('')
        setSuccess('')
        setSavingProject(true)

        const previousProjects = projects
        const displayValue = projectForm.technologiesRaw || (projectForm.technologies || []).join('; ')
        const parsedTechnologies = displayValue
            .split(/[;,]+/)
            .map((t: string) => t.trim())
            .filter((t: string) => t.length > 0)
            .filter((t: string, i: number, arr: string[]) => arr.indexOf(t) === i);

        const submitForm = {
            ...projectForm,
            technologies: parsedTechnologies
        };

        const optimisticProject: Project = {
            ...submitForm,
            id: editingProjectId ?? Date.now()
        }

        if (editingProjectId) {
            setProjects((current) =>
                current.map((project) => (project.id === editingProjectId ? { ...project, ...optimisticProject } : project))
            )
        } else {
            setProjects((current) => [optimisticProject, ...current])
        }

        try {
            if (editingProjectId) {
                await updateProject(editingProjectId, submitForm)
                setSuccess('Project updated successfully.')
            } else {
                await createProject({ ...projectForm, technologies: parsedTechnologies })
                setSuccess('Project created successfully.')
            }

            setProjectForm({ ...projectForm, technologiesRaw: '' });
            resetProjectForm()
            await loadProjects(true)
        } catch (submitError: any) {
            setProjects(previousProjects)
            setError(submitError.message || 'Failed to save project.')
        } finally {
            setSavingProject(false)
        }
    }

    const handleEditProject = (project: Project) => {
        setActiveTab('projects')
        setShowProjectForm(true)
        setEditingProjectId(project.id || null)
        setProjectForm({
            title: project.title || '',
            description: project.description || '',
            image: project.image || '',
            github: project.github || '',
            live_at: project.live_at || '',
            technologies: project.technologies || []
        })
    }

    const handleDeleteProject = async (projectId: number) => {
        if (!confirm('Delete this project?')) return

        const previousProjects = projects
        setDeletingKey(`project-${projectId}`)
        setProjects((current) => current.filter((project) => project.id !== projectId))

        try {
            await deleteProject(projectId)
            setSuccess('Project deleted successfully.')
            if (editingProjectId === projectId) {
                resetProjectForm()
            }
        } catch (deleteError: any) {
            setProjects(previousProjects)
            setError(deleteError.message || 'Failed to delete project.')
        } finally {
            setDeletingKey(null)
        }
    }

    const handleDeleteMessage = async (messageId: number) => {
        if (!confirm('Delete this message?')) return

        const previousMessages = messages
        setDeletingKey(`message-${messageId}`)
        setMessages((current) => current.filter((message) => message.id !== messageId))

        try {
            await deleteMessage(messageId)
            setSuccess('Message deleted successfully.')
        } catch (deleteError: any) {
            setMessages(previousMessages)
            setError(deleteError.message || 'Failed to delete message.')
        } finally {
            setDeletingKey(null)
        }
    }

    const handleDeleteVisit = async (visitId: number) => {
        if (!confirm('Delete this visit entry?')) return

        const previousVisits = visits
        setDeletingKey(`visit-${visitId}`)
        setVisits((current) => current.filter((visit) => visit.id !== visitId))

        try {
            await deleteVisit(visitId)
            setSuccess('Visit deleted successfully.')
        } catch (deleteError: any) {
            setVisits(previousVisits)
            setError(deleteError.message || 'Failed to delete visit.')
        } finally {
            setDeletingKey(null)
        }
    }

    const handleDeleteDownload = async (downloadId: number) => {
        if (!confirm('Delete this download entry?')) return

        const previousDownloads = downloads
        setDeletingKey(`download-${downloadId}`)
        setDownloads((current) => current.filter((download) => download.id !== downloadId))

        try {
            await deleteDownload(downloadId)
            setSuccess('Download deleted successfully.')
        } catch (deleteError: any) {
            setDownloads(previousDownloads)
            setError(deleteError.message || 'Failed to delete download.')
        } finally {
            setDeletingKey(null)
        }
    }

    const currentLoading = loading[activeTab]
    const currentRefreshing = refreshing[activeTab]

    if (!isReady || !isAuthenticated) {
        return <div className="min-h-screen bg-slate-50 pt-32 text-center">Loading...</div>
    }

    const handleLogout = () => {
        logout()
        router.replace('/login')
    }

    return (
        <div className="min-h-screen bg-slate-50 pt-28 pb-16 sm:pt-32 sm:pb-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
                        {currentUser ? (
                            <>
                                <p className="mt-2 text-2xl font-bold bg-linear-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent">
                                    Welcome back, {currentUser.name}!
                                </p>
                                <p className="text-slate-600">
                                    Manage content and review activity.
                                </p>
                            </>
                        ) : (
                            <>
                                <p className="mt-2 text-slate-600">
                                    Welcome to your dashboard.
                                </p>
                                <p className="text-sm text-slate-500 mt-1">
                                    Manage content and review activity.
                                </p>
                            </>
                        )}

                    </div>

                    <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3 sm:flex">
                            <StatCard label="Projects" value={projects.length} />
                            <StatCard label="Messages" value={messages.length} />
                            <StatCard label="Visits" value={visits.length} />
                            <StatCard label="Downloads" value={downloads.length} />
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={handleLogout}
                                className="rounded-xl border border-slate-300 bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-700">
                        {success}
                    </div>
                )}

                <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-200 p-4 sm:p-6">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            <div className="flex flex-wrap gap-2">
                                {([
                                    ['projects', 'Projects'],
                                    ['messages', 'Messages'],
                                    ['visits', 'Visits'],
                                    ['downloads', 'Downloads']
                                ] as [TabKey, string][]).map(([key, label]) => (
                                    <button
                                        key={key}
                                        onClick={() => setActiveTab(key)}
                                        className={
                                            activeTab === key
                                                ? 'rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white'
                                                : 'rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200'
                                        }
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                                <input
                                    type="search"
                                    value={query}
                                    onChange={(event) => setQuery(event.target.value)}
                                    placeholder="Search current tab"
                                    className="w-full rounded-xl border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:w-72"
                                />
                                <button
                                    onClick={() => {
                                        if (activeTab === 'projects') void loadProjects(true)
                                        if (activeTab === 'messages') void loadMessages(true)
                                        if (activeTab === 'visits') void loadVisits(true)
                                        if (activeTab === 'downloads') void loadDownloads(true)
                                    }}
                                    disabled={currentRefreshing}
                                    className="rounded-xl border border-slate-300 px-4 py-2.5 text-slate-700 hover:bg-slate-50 disabled:opacity-60"
                                >
                                    {currentRefreshing ? 'Refreshing...' : 'Refresh'}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 sm:p-6">
                        {activeTab === 'projects' && (
                            <div className="space-y-6">
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <h2 className="text-xl font-semibold text-slate-900">Projects</h2>
                                        <p className="text-sm text-slate-500">Create, edit, and remove portfolio projects.</p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            if (showProjectForm) {
                                                resetProjectForm()
                                                return
                                            }
                                            setShowProjectForm(true)
                                            setEditingProjectId(null)
                                            setProjectForm(emptyProjectForm)
                                        }}
                                        className="rounded-xl bg-blue-600 px-4 py-2.5 text-white hover:bg-blue-700"
                                    >
                                        {showProjectForm ? 'Close Form' : 'New Project'}
                                    </button>
                                </div>

                                {showProjectForm && (
                                    <form onSubmit={handleProjectSubmit} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                                        <div className="mb-4">
                                            <h3 className="text-lg font-semibold text-slate-900">
                                                {editingProjectId ? 'Edit Project' : 'Create Project'}
                                            </h3>
                                        </div>

                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                            <Field label="Title *">
                                                <input
                                                    type="text"
                                                    value={projectForm.title}
                                                    onChange={(event) => setProjectForm({ ...projectForm, title: event.target.value })}
                                                    required
                                                    className={inputClassName}
                                                />
                                            </Field>
                                            <Field label="Image URL">
                                                <input
                                                    type="url"
                                                    value={projectForm.image}
                                                    onChange={(event) => setProjectForm({ ...projectForm, image: event.target.value })}
                                                    className={inputClassName}
                                                />
                                            </Field>
                                        </div>

                                        <div className="mt-4">
                                            <Field label="Description">
                                                <textarea
                                                    value={projectForm.description}
                                                    onChange={(event) => setProjectForm({ ...projectForm, description: event.target.value })}
                                                    rows={4}
                                                    className={inputClassName}
                                                />
                                            </Field>
                                        </div>

                                        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                                            <Field label="GitHub URL">
                                                <input
                                                    type="url"
                                                    value={projectForm.github}
                                                    onChange={(event) => setProjectForm({ ...projectForm, github: event.target.value })}
                                                    className={inputClassName}
                                                />
                                            </Field>
                                            <Field label="Live URL">
                                                <input
                                                    type="url"
                                                    value={projectForm.live_at}
                                                    onChange={(event) => setProjectForm({ ...projectForm, live_at: event.target.value })}
                                                    className={inputClassName}
                                                />
                                            </Field>
                                        </div>

                                        <div className="mt-4">
                                            <Field label="Technologies">
                                                <textarea
                                                    rows={3}
                                                    className={inputClassName}
                                                    value={projectForm.technologiesRaw || (projectForm.technologies || []).join('; ')}
                                                    onChange={(event) => {
                                                        const rawValue = event.target.value;
                                                        setProjectForm({
                                                            ...projectForm,
                                                            technologiesRaw: rawValue
                                                        });
                                                    }}
                                                    placeholder="React, Next.js; FastAPI, TypeScript (comma, semicolon only)"
                                                />
                                            </Field>
                                            <p className="mt-1 text-xs text-red-600 font-medium">
                                                Use , or ; separators to list technologies.
                                            </p>
                                        </div>

                                        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                                            <button
                                                type="submit"
                                                disabled={savingProject}
                                                className="rounded-xl bg-emerald-600 px-5 py-2.5 text-white hover:bg-emerald-700 disabled:opacity-60"
                                            >
                                                {savingProject
                                                    ? editingProjectId
                                                        ? 'Updating...'
                                                        : 'Creating...'
                                                    : editingProjectId
                                                        ? 'Update Project'
                                                        : 'Create Project'}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={resetProjectForm}
                                                className="rounded-xl border border-slate-300 px-5 py-2.5 text-slate-700 hover:bg-white"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                )}

                                {currentLoading ? (
                                    <ListSkeleton />
                                ) : (
                                    <div className="space-y-4">
                                        {filteredProjects.length === 0 ? (
                                            <EmptyState text="No projects found." />
                                        ) : (
                                            filteredProjects.map((project) => {


                                                return (
                                                    <div key={project.id ?? project.title} className="rounded-2xl border border-slate-200 p-4">
                                                        <div className="flex flex-col gap-4 lg:flex-row">
                                                            {project.image && (
                                                                <div className="relative h-40 overflow-hidden rounded-xl bg-slate-100 lg:h-32 lg:w-56 lg:shrink-0">
                                                                    <Image src={project.image} alt={project.title} fill className="object-cover" loading="eager" />
                                                                </div>
                                                            )}

                                                            <div className="min-w-0 flex-1">
                                                                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                                                    <div className="min-w-0">
                                                                        <h3 className="font-semibold text-slate-900 wrap-break-word">{project.title}</h3>
                                                                        {project.description && (
                                                                            <p className="mt-1 text-sm text-slate-600 wrap-break-word">{project.description}</p>
                                                                        )}
                                                                    </div>

                                                                    {project.id && (
                                                                        <div className="flex gap-2">
                                                                            <button
                                                                                onClick={() => handleEditProject(project)}
                                                                                className="rounded-lg bg-amber-500 px-3 py-1.5 text-sm text-white hover:bg-amber-600"
                                                                            >
                                                                                Edit
                                                                            </button>
                                                                            <button
                                                                                onClick={() => handleDeleteProject(project.id as number)}
                                                                                disabled={deletingKey === `project-${project.id}`}
                                                                                className="rounded-lg bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700 disabled:opacity-60"
                                                                            >
                                                                                {deletingKey === `project-${project.id}` ? 'Deleting...' : 'Delete'}
                                                                            </button>
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                {project.technologies && project.technologies.length > 0 && (
                                                                    <div className="mt-3 flex flex-wrap gap-2">
                                                                        {project.technologies.map((tech) => (
                                                                            <span key={tech} className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                                                                                {tech}
                                                                            </span>
                                                                        ))}
                                                                    </div>
                                                                )}

                                                                <div className="mt-4 flex flex-wrap gap-4 text-sm">
                                                                    {project.github && (
                                                                        <a
                                                                            href={project.github}
                                                                            target="_blank"
                                                                            rel="noreferrer"
                                                                            className="break-all text-blue-600 hover:text-blue-800"
                                                                        >
                                                                            GitHub
                                                                        </a>
                                                                    )}
                                                                    {project.live_at && (
                                                                        <a
                                                                            href={project.live_at}
                                                                            target="_blank"
                                                                            rel="noreferrer"
                                                                            className="break-all text-blue-600 hover:text-blue-800"
                                                                        >
                                                                            Live Site
                                                                        </a>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'messages' && (
                            currentLoading ? (
                                <ListSkeleton />
                            ) : filteredMessages.length === 0 ? (
                                <EmptyState text="No messages found." />
                            ) : (
                                <div className="space-y-4">
                                    {filteredMessages.map((message) => (
                                        <div key={message.id} className="rounded-2xl border border-slate-200 p-4">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="min-w-0">
                                                    <h3 className="font-semibold text-slate-900 wrap-break-word">{message.sender_name}</h3>
                                                    <p className="text-sm text-slate-600 break-all">{message.sender_email}</p>
                                                    <p className="mt-2 text-sm font-medium text-slate-800 wrap-break-word">{message.subject}</p>
                                                    <p className="mt-2 text-sm text-slate-600 wrap-break-word">{message.body}</p>
                                                    <p className="mt-3 text-xs text-slate-500">{new Date(message.created_at).toLocaleString()}</p>
                                                </div>
                                                <button
                                                    onClick={() => handleDeleteMessage(message.id)}
                                                    disabled={deletingKey === `message-${message.id}`}
                                                    className="text-sm text-red-600 hover:text-red-800 disabled:opacity-60"
                                                >
                                                    {deletingKey === `message-${message.id}` ? 'Deleting...' : 'Delete'}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )
                        )}

                        {activeTab === 'visits' && (
                            currentLoading ? (
                                <ListSkeleton />
                            ) : filteredVisits.length === 0 ? (
                                <EmptyState text="No visits found." />
                            ) : (
                                <div className="space-y-4">
                                    {filteredVisits.map((visit) => (
                                        <div key={visit.id} className="rounded-2xl border border-slate-200 p-4">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="min-w-0">
                                                    <p className="font-medium text-slate-900 break-all">{visit.ip_address}</p>
                                                    <p className="mt-1 text-sm text-slate-600">
                                                        {[visit.device, visit.operating_system, visit.browser].filter(Boolean).join(' • ') || 'Unknown device'}
                                                    </p>
                                                    {visit.path && <p className="mt-2 break-all text-xs text-slate-500">Path: {visit.path}</p>}
                                                    {visit.referrer && <p className="mt-1 break-all text-xs text-slate-500">Referrer: {visit.referrer}</p>}
                                                    <p className="mt-2 text-xs text-slate-500">{new Date(visit.created_at).toLocaleString()}</p>
                                                </div>
                                                <button
                                                    onClick={() => handleDeleteVisit(visit.id)}
                                                    disabled={deletingKey === `visit-${visit.id}`}
                                                    className="text-sm text-red-600 hover:text-red-800 disabled:opacity-60"
                                                >
                                                    {deletingKey === `visit-${visit.id}` ? 'Deleting...' : 'Delete'}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )
                        )}

                        {activeTab === 'downloads' && (
                            currentLoading ? (
                                <ListSkeleton />
                            ) : filteredDownloads.length === 0 ? (
                                <EmptyState text="No downloads found." />
                            ) : (
                                <div className="space-y-4">
                                    {filteredDownloads.map((download) => (
                                        <div key={download.id} className="rounded-2xl border border-slate-200 p-4">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="min-w-0">
                                                    <p className="font-medium text-slate-900 wrap-break-word">{download.document_name}</p>
                                                    <p className="mt-1 break-all text-sm text-slate-600">
                                                        {download.ip_address}
                                                        {download.country ? ` • ${download.country}` : ''}
                                                    </p>
                                                    <p className="mt-1 text-sm text-slate-600">
                                                        {[download.device, download.operating_system, download.browser].filter(Boolean).join(' • ') || 'Unknown device'}
                                                    </p>
                                                    {download.referrer && <p className="mt-2 break-all text-xs text-slate-500">Referrer: {download.referrer}</p>}
                                                    <p className="mt-2 text-xs text-slate-500">{new Date(download.created_at).toLocaleString()}</p>
                                                </div>
                                                <button
                                                    onClick={() => handleDeleteDownload(download.id)}
                                                    disabled={deletingKey === `download-${download.id}`}
                                                    className="text-sm text-red-600 hover:text-red-800 disabled:opacity-60"
                                                >
                                                    {deletingKey === `download-${download.id}` ? 'Deleting...' : 'Delete'}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

function StatCard({ label, value }: { label: string; value: number }) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-center shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
        </div>
    )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
    return (
        <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span>
            {children}
        </label>
    )
}

function EmptyState({ text }: { text: string }) {
    return (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center text-slate-500">
            {text}
        </div>
    )
}

function ListSkeleton() {
    return (
        <div className="space-y-4">
            <div className="h-24 animate-pulse rounded-2xl bg-slate-100" />
            <div className="h-24 animate-pulse rounded-2xl bg-slate-100" />
            <div className="h-24 animate-pulse rounded-2xl bg-slate-100" />
        </div>
    )
}
