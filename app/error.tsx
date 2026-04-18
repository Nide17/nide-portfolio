"use client"

import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-gray-50 to-blue-50 px-4 pt-24">
            <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">Unexpected Error</p>
                <h1 className="mt-4 text-3xl font-bold text-slate-900">Something went wrong.</h1>
                <p className="mt-3 text-slate-600">
                    The page failed to load properly. You can retry the request or return to the homepage.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <button
                        onClick={reset}
                        className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
                    >
                        Try Again
                    </button>
                    <Link
                        href="/"
                        className="rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                    >
                        Back Home
                    </Link>
                </div>
            </div>
        </div>
    )
}
