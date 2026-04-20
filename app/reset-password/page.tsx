"use client"

import { useEffect, useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '../lib/auth-context'

function ResetPasswordContent() {
    const { resetPassword, isAuthenticated, isReady } = useAuth()
    const router = useRouter()
    const searchParams = useSearchParams()
    const token = searchParams.get('token') || ''
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState(token ? '' : 'No reset token provided. Please use the link from your email.')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (isReady && isAuthenticated) {
            router.replace('/dashboard')
        }
    }, [isAuthenticated, isReady, router])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setError('')
        setSuccess('')

        if (password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters')
            return
        }

        if (!token) {
            setError('No reset token. Please use the link from your email.')
            return
        }

        setLoading(true)

        try {
            await resetPassword(token, password)
            setSuccess('Password updated successfully. Redirecting to login...')
            setTimeout(() => router.push('/login'), 2000)
        } catch (submitError: any) {
            setError(submitError.message || 'Failed to reset password. Token may be invalid or expired.')
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
                <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Reset Password</h2>

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
                            New Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="••••••••"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                    >
                        {loading ? 'Updating password...' : 'Reset Password'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <Link href="/login" className="text-blue-600 hover:text-blue-800 font-semibold">
                        Back to login
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50 pt-32 text-center">Loading reset form...</div>}>
            <ResetPasswordContent />
        </Suspense>
    )
}
