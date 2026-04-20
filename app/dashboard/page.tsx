"use client"

import { useCallback, useEffect, useMemo, useState } from 'react'
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
    updateProject,
} from '../lib/api'
import { emptyProjectForm } from './constants'
import { DashboardHeader } from './components/DashboardHeader'
import { DashboardToolbar } from './components/DashboardToolbar'
import { DownloadsTab } from './components/DownloadsTab'
import { MessagesTab } from './components/MessagesTab'
import { ProjectsTab } from './components/ProjectsTab'
import { VisitsTab } from './components/VisitsTab'
import { Unauthorized } from './components/Unauthorized'
import type { Download, Message, Project, ProjectFormState, TabKey, Visit } from './types'

export default function Dashboard() {
    const { isAuthenticated, isReady, logout, user } = useAuth()
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
        downloads: true,
    })
    const [refreshing, setRefreshing] = useState<Record<TabKey, boolean>>({
        projects: false,
        messages: false,
        visits: false,
        downloads: false,
    })
    const [savingProject, setSavingProject] = useState(false)
    const [deletingKey, setDeletingKey] = useState<string | null>(null)
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [editingProjectId, setEditingProjectId] = useState<number | null>(null)
    const [projectForm, setProjectForm] = useState<ProjectFormState>(emptyProjectForm)
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
        if (!isReady) return

        if (!isAuthenticated) {
            router.push('/login')
            return
        }

        // eslint-disable-next-line react-hooks/set-state-in-effect
        void Promise.all([loadProjects(), loadMessages(), loadVisits(), loadDownloads()])
    }, [isAuthenticated, isReady, loadDownloads, loadMessages, loadProjects, loadVisits, router])

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
                project.github_backend,
                project.github_frontend,
                project.live_at,
                ...(project.technologies || []),
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
                download.referrer,
            ]
                .filter(Boolean)
                .join(' ')
                .toLowerCase()
                .includes(value)
        )
    }, [downloads, query])

    const handleProjectSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setError('')
        setSuccess('')
        setSavingProject(true)

        const previousProjects = projects
        const displayValue = projectForm.technologiesRaw || (projectForm.technologies || []).join('; ')
        const parsedTechnologies = displayValue
            .split(/[;,]+/)
            .map((t) => t.trim())
            .filter((t) => t.length > 0)
            .filter((t, i, arr) => arr.indexOf(t) === i)

        const submitForm = {
            ...projectForm,
            technologies: parsedTechnologies,
        }

        const optimisticProject: Project = {
            ...submitForm,
            id: editingProjectId ?? Date.now(),
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

            setProjectForm({ ...projectForm, technologiesRaw: '' })
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
            github_backend: project.github_backend || '',
            github_frontend: project.github_frontend || '',
            live_at: project.live_at || '',
            technologies: project.technologies || [],
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

    const handleProjectFormToggle = () => {
        if (showProjectForm) {
            resetProjectForm()
            return
        }

        setShowProjectForm(true)
        setEditingProjectId(null)
        setProjectForm(emptyProjectForm)
    }

    const currentLoading = loading[activeTab]
    const currentRefreshing = refreshing[activeTab]

    const handleRefresh = () => {
        if (activeTab === 'projects') void loadProjects(true)
        if (activeTab === 'messages') void loadMessages(true)
        if (activeTab === 'visits') void loadVisits(true)
        if (activeTab === 'downloads') void loadDownloads(true)
    }

    const handleLogout = () => {
        logout()
        router.replace('/login')
    }

    if (user?.role !== 'admin') {
        return <Unauthorized />
    }

    return (
        <div className="min-h-screen bg-slate-50 pt-28 pb-16 sm:pt-32 sm:pb-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <DashboardHeader
                    userName={user?.name}
                    projectCount={projects.length}
                    messageCount={messages.length}
                    visitCount={visits.length}
                    downloadCount={downloads.length}
                    onLogout={handleLogout}
                />

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
                    <DashboardToolbar
                        activeTab={activeTab}
                        query={query}
                        isRefreshing={currentRefreshing}
                        onTabChange={setActiveTab}
                        onQueryChange={setQuery}
                        onRefresh={handleRefresh}
                    />

                    <div className="p-4 sm:p-6">
                        {activeTab === 'projects' && (
                            <ProjectsTab
                                currentLoading={currentLoading}
                                showProjectForm={showProjectForm}
                                savingProject={savingProject}
                                editingProjectId={editingProjectId}
                                deletingKey={deletingKey}
                                projectForm={projectForm}
                                filteredProjects={filteredProjects}
                                onToggleForm={handleProjectFormToggle}
                                onResetProjectForm={resetProjectForm}
                                onProjectFormChange={setProjectForm}
                                onSubmit={handleProjectSubmit}
                                onEditProject={handleEditProject}
                                onDeleteProject={handleDeleteProject}
                            />
                        )}

                        {activeTab === 'messages' && (
                            <MessagesTab
                                currentLoading={currentLoading}
                                deletingKey={deletingKey}
                                messages={filteredMessages}
                                onDeleteMessage={handleDeleteMessage}
                            />
                        )}

                        {activeTab === 'visits' && (
                            <VisitsTab
                                currentLoading={currentLoading}
                                deletingKey={deletingKey}
                                visits={filteredVisits}
                                onDeleteVisit={handleDeleteVisit}
                            />
                        )}

                        {activeTab === 'downloads' && (
                            <DownloadsTab
                                currentLoading={currentLoading}
                                deletingKey={deletingKey}
                                downloads={filteredDownloads}
                                onDeleteDownload={handleDeleteDownload}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
