"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '../lib/auth-context'

export default function ForgotPasswordPage() {
    const { forgotPassword, isAuthenticated, isReady } = useAuth()
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)
    // Placeholder - will be available after auth-context update
    // forgotPassword available from useAuth

    useEffect(() => {
        if (isReady && isAuthenticated) {
            router.replace('/dashboard')
        }
    }, [isAuthenticated, isReady, router])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setError('')
        setSuccess('')

        if (!email) {
            setError('Please enter your email')
            return
        }

        setLoading(true)

        try {
            await forgotPassword(email)
            setSuccess('Reset link sent to your email. Check your inbox (and spam folder).')
        } catch (submitError: any) {
            console.error('Forgot password error:', submitError)
            setError(submitError.message || 'Failed to send reset link')
        } finally {
            setLoading(false)
        }
    }

    if (!isReady) {
        return <div className="min-h-screen bg-gray-50 pt-32 text-center">Loading...</div>
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-32 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Forgot Password</h2>
                <p className="text-gray-600 text-center mb-6">Enter your email and we&apos;ll send you a link to reset your password.</p>

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

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="you@example.com"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                    >
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>

                <div className="mt-6 text-center space-y-2">
                    <Link href="/login" className="text-blue-600 hover:text-blue-800 font-semibold block">
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    )
}
