"use client"

import Link from 'next/link'

export default function GlobalError() {
    return (
        <html lang="en">
            <body className="bg-slate-50">
                <div className="flex min-h-screen items-center justify-center px-4">
                    <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl">
                        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">Application Error</p>
                        <h1 className="mt-4 text-3xl font-bold text-slate-900">The application hit a fatal error.</h1>
                        <p className="mt-3 text-slate-600">
                            Refresh the page or return to the homepage and try again.
                        </p>
                        <div className="mt-8">
                            <Link
                                href="/"
                                className="inline-flex rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
                            >
                                Back Home
                            </Link>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    )
}
