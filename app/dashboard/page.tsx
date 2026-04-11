"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '../lib/auth-context'
import { useRouter } from 'next/navigation'
import { API_BASE_URL } from '../config'

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
    created_at: string
}

export default function Dashboard() {
    const { isAuthenticated, user } = useAuth()
    const router = useRouter()
    const [messages, setMessages] = useState<Message[]>([])
    const [visits, setVisits] = useState<Visit[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login')
            return
        }

        loadData()
    }, [isAuthenticated, router])

    const loadData = async () => {
        try {
            const [messagesRes, visitsRes] = await Promise.all([
                fetch(`${API_BASE_URL}/messages/`),
                fetch(`${API_BASE_URL}/visits/`)
            ])

            if (messagesRes.ok) {
                setMessages(await messagesRes.json())
            }
            if (visitsRes.ok) {
                setVisits(await visitsRes.json())
            }
        } catch (error) {
            console.error('Failed to load data:', error)
        } finally {
            setLoading(false)
        }
    }

    const clearMessages = async () => {
        if (!confirm('Are you sure you want to delete all messages?')) return

        try {
            for (const msg of messages) {
                await fetch(`${API_BASE_URL}/messages/${msg.id}`, { method: 'DELETE' })
            }
            setMessages([])
        } catch (error) {
            console.error('Failed to delete messages:', error)
        }
    }

    if (loading) {
        return <div className="pt-20 text-center">Loading...</div>
    }

    return (
        <div className="min-h-screen bg-gray-50 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    {user && <p className="text-gray-600">Welcome, {user.name}!</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Total Visits</h2>
                        <p className="text-4xl font-bold text-blue-600">{visits.length}</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Total Messages</h2>
                        <p className="text-4xl font-bold text-green-600">{messages.length}</p>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Admin Tools</h2>
                        <Link
                            href="/admin/projects"
                            className="text-blue-600 hover:text-blue-800 font-semibold block mb-2"
                        >
                            → Manage Projects
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Messages Section */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-900">Messages</h2>
                            {messages.length > 0 && (
                                <button
                                    onClick={clearMessages}
                                    className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                                >
                                    Clear All
                                </button>
                            )}
                        </div>

                        {messages.length === 0 ? (
                            <p className="text-gray-500">No messages yet.</p>
                        ) : (
                            <div className="space-y-4 max-h-96 overflow-y-auto">
                                {messages.map((msg) => (
                                    <div key={msg.id} className="border-b pb-4">
                                        <div className="flex justify-between mb-2">
                                            <h3 className="font-semibold text-gray-900">{msg.sender_name}</h3>
                                            <span className="text-xs text-gray-500">
                                                {new Date(msg.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-1">
                                            <strong>Email:</strong> {msg.sender_email}
                                        </p>
                                        <p className="text-sm text-gray-600 mb-2">
                                            <strong>Subject:</strong> {msg.subject}
                                        </p>
                                        <p className="text-gray-700">{msg.body}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Visits Section */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Visits</h2>

                        {visits.length === 0 ? (
                            <p className="text-gray-500">No visits yet.</p>
                        ) : (
                            <div className="space-y-3 max-h-96 overflow-y-auto">
                                {visits.slice(-20).reverse().map((visit) => (
                                    <div key={visit.id} className="border-l-4 border-blue-500 pl-4 py-2">
                                        <div className="flex justify-between">
                                            <span className="font-medium text-gray-900">{visit.ip_address}</span>
                                            <span className="text-xs text-gray-500">
                                                {new Date(visit.created_at).toLocaleTimeString()}
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {visit.device && <span>{visit.device}</span>}
                                            {visit.operating_system && <span> • {visit.operating_system}</span>}
                                            {visit.browser && <span> • {visit.browser}</span>}
                                        </div>
                                        {visit.path && <p className="text-xs text-gray-500 mt-1">Page: {visit.path}</p>}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
