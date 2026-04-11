"use client"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useAuth } from '../../lib/auth-context'
import { fetchProjects, createProject, updateProject, deleteProject } from '../../lib/api'
import React from 'react'

interface Project {
    id?: number
    title: string
    description?: string
    image?: string
    github?: string
    live_at?: string
    technologies?: string[]
}

export default function AdminProjects() {
    const { isAuthenticated, user } = useAuth()
    const router = useRouter()
    const [projects, setProjects] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [editingId, setEditingId] = useState<number | null>(null)
    const [formData, setFormData] = useState<Project>({
        title: '',
        description: '',
        image: '',
        github: '',
        live_at: '',
        technologies: []
    })
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login')
            return
        }

        loadProjects()
    }, [isAuthenticated, router])

    const loadProjects = async () => {
        try {
            const data = await fetchProjects()
            setProjects(data)
        } catch (err) {
            setError('Failed to load projects')
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setSuccess('')

        try {
            if (editingId) {
                await updateProject(editingId, formData)
                setSuccess('Project updated successfully!')
            } else {
                await createProject(formData)
                setSuccess('Project created successfully!')
            }

            setFormData({
                title: '',
                description: '',
                image: '',
                github: '',
                live_at: '',
                technologies: []
            })
            setEditingId(null)
            setShowForm(false)
            loadProjects()
        } catch (err: any) {
            setError(err.message || 'Failed to save project')
        }
    }

    const handleEdit = (project: Project) => {
        setFormData(project)
        setEditingId(project.id || null)
        setShowForm(true)
    }

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this project?')) return

        try {
            await deleteProject(id)
            setSuccess('Project deleted successfully!')
            loadProjects()
        } catch (err: any) {
            setError(err.message || 'Failed to delete project')
        }
    }

    if (loading) return <div className="pt-20 text-center">Loading...</div>

    return (
        <div className="pt-20 min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Manage Projects</h1>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}
                {success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                        {success}
                    </div>
                )}

                <button
                    onClick={() => {
                        setShowForm(!showForm)
                        if (editingId) {
                            setEditingId(null)
                            setFormData({
                                title: '',
                                description: '',
                                image: '',
                                github: '',
                                live_at: '',
                                technologies: []
                            })
                        }
                    }}
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 mb-8"
                >
                    {showForm ? 'Cancel' : 'Add New Project'}
                </button>

                {showForm && (
                    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md mb-8">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Title *
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Image URL
                                </label>
                                <input
                                    type="url"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Description
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    GitHub URL
                                </label>
                                <input
                                    type="url"
                                    value={formData.github}
                                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Live URL
                                </label>
                                <input
                                    type="url"
                                    value={formData.live_at}
                                    onChange={(e) => setFormData({ ...formData, live_at: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Technologies (comma-separated)
                            </label>
                            <input
                                type="text"
                                value={formData.technologies?.join(', ')}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        technologies: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
                                    })
                                }
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                placeholder="React, Node.js, MongoDB"
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                        >
                            {editingId ? 'Update Project' : 'Create Project'}
                        </button>
                    </form>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <div key={project.id} className="bg-white p-6 rounded-lg shadow-md">
                            {project.image && (
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    width={300}
                                    height={128}
                                    className="w-full h-32 object-cover rounded mb-3"
                                />
                            )}
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
                            {project.description && (
                                <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                            )}
                            {project.technologies && project.technologies.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.technologies.map((tech, idx) => (
                                        <span
                                            key={idx}
                                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            )}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(project)}
                                    className="flex-1 bg-yellow-600 text-white px-3 py-1 rounded text-sm hover:bg-yellow-700"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => project.id && handleDelete(project.id)}
                                    className="flex-1 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}