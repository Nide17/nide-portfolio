"use client"
import React, { useState } from 'react'
import { LocationIcon, EmailIcon, LinkedInIcon, GitHubIcon } from '../lib/icons'
import { sendMessage } from '../lib/api'

interface ContactState {
    name: string
    email: string
    subject: string
    message: string
}

export default function Contact() {
    const [state, setState] = useState<ContactState>({
        name: '',
        email: '',
        subject: '',
        message: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [emailCopied, setEmailCopied] = useState(false)

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setState(prev => ({ ...prev, [name]: value }))
    }

    const onSubmitHandler = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        setSuccess(null)

        try {
            await sendMessage({
                sender_name: state.name,
                sender_email: state.email,
                subject: state.subject,
                body: state.message
            })

            setSuccess('Message sent successfully!')
            setState({ name: '', email: '', subject: '', message: '' })
        } catch (err) {
            setError('Failed to send message. Please try again later.')
        } finally {
            setLoading(false)
        }
    }

    const onCopyEmail = async () => {
        const email = ['nidedrogba', 'gmail.com'].join('@')

        try {
            await navigator.clipboard.writeText(email)
            setEmailCopied(true)
            window.setTimeout(() => setEmailCopied(false), 2000)
        } catch {
            setError('Unable to copy email right now. Please use the contact form.')
        }
    }

    return (
        <section id="contact" className="bg-gray-50 py-20 sm:py-24 lg:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="mb-10 bg-linear-to-r from-blue-600 via-sky-500 to-cyan-500 bg-clip-text text-center text-3xl font-bold leading-tight text-transparent sm:mb-16 sm:text-5xl lg:mb-20 lg:text-6xl">
                    Get In Touch
                </h2>
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch lg:gap-12">
                    <div className="text-center lg:flex lg:h-full lg:flex-col lg:justify-between lg:text-left">
                        <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-gray-700 sm:text-xl sm:leading-8 lg:mx-0 lg:text-2xl">
                            &quot;Do you have a project to discuss? A collaboration, an idea? Please reach out — I&apos;m open and eager to hear from you!&quot;
                        </p>
                        <div className="space-y-4 sm:space-y-5">
                            <div className="flex items-center justify-center gap-4 rounded-2xl border border-sky-100 bg-white px-4 py-4 text-left shadow-sm sm:px-5 lg:justify-start">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100">
                                    <LocationIcon className="w-5 h-5 text-blue-600" />
                                </div>
                                <span className="text-sm text-gray-700 sm:text-lg">Kigali, Rwanda</span>
                            </div>
                            <div className="flex items-center justify-center gap-4 rounded-2xl border border-sky-100 bg-white px-4 py-4 text-left shadow-sm sm:px-5 lg:justify-start">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-rose-100">
                                    <EmailIcon className="w-5 h-5 text-rose-600" />
                                </div>
                                <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
                                    <span className="text-sm text-gray-700 sm:text-lg">Prefer email? Use the form or copy my address.</span>
                                    <button
                                        type="button"
                                        onClick={onCopyEmail}
                                        className="shrink-0 rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700 transition-colors hover:bg-sky-100 sm:text-sm"
                                    >
                                        {emailCopied ? 'Copied' : 'Copy email'}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_60px_-35px_rgba(14,116,144,0.45)] backdrop-blur-sm sm:mt-12 sm:p-7">
                            <h3 className="mb-6 bg-linear-to-r from-blue-600 via-sky-500 to-cyan-500 bg-clip-text text-center text-xl font-bold text-transparent font-['Poppins',system-ui,sans-serif] sm:text-3xl lg:text-left">
                                Connect with me
                            </h3>
                            <div className="flex justify-center gap-4 sm:gap-5 lg:justify-start">
                                <a
                                    href="https://www.linkedin.com/in/niyomwungeri-parmenide-ishimwe-1a5394123/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-blue-600 to-sky-500 shadow-[0_18px_40px_-20px_rgba(37,99,235,0.8)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_48px_-18px_rgba(37,99,235,0.85)]"
                                    aria-label="LinkedIn"
                                >
                                    <LinkedInIcon className="w-6 h-6 text-white transition-transform group-hover:scale-110" />
                                </a>
                                <a
                                    href="https://github.com/Nide17"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-slate-800 to-slate-950 shadow-[0_18px_40px_-20px_rgba(15,23,42,0.85)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_48px_-18px_rgba(15,23,42,0.95)]"
                                    aria-label="GitHub"
                                >
                                    <GitHubIcon className="w-6 h-6 text-white transition-transform group-hover:scale-110" />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-4xl border border-white/70 bg-white/85 p-6 shadow-[0_28px_80px_-36px_rgba(15,23,42,0.35)] ring-1 ring-sky-100/70 backdrop-blur-sm sm:p-8 lg:flex lg:h-full lg:flex-col lg:p-9">
                        {loading && (
                            <div className="mb-6 flex justify-center">
                                <div className="h-10 w-10 animate-spin rounded-full border-4 border-sky-600 border-t-transparent"></div>
                            </div>
                        )}

                        {error && (
                            <div className="mb-6 rounded-2xl border border-rose-100 bg-rose-50 px-4 py-3 text-center text-rose-600">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="mb-6 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-center text-emerald-600">
                                {success}
                            </div>
                        )}

                        <form onSubmit={onSubmitHandler} className="space-y-5 sm:space-y-6 lg:flex lg:h-full lg:flex-col">
                            <div>
                                <input
                                    name="name"
                                    type="text"
                                    placeholder="Your Name..."
                                    value={state.name}
                                    onChange={onChangeHandler}
                                    required
                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-['Poppins',system-ui,sans-serif] text-slate-800 shadow-sm transition-all duration-300 placeholder:text-sm placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-sky-100 sm:px-6 sm:py-5 sm:text-lg sm:placeholder:text-lg"
                                />
                            </div>
                            <div>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Your Email..."
                                    value={state.email}
                                    onChange={onChangeHandler}
                                    required
                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-['Poppins',system-ui,sans-serif] text-slate-800 shadow-sm transition-all duration-300 placeholder:text-sm placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-sky-100 sm:px-6 sm:py-5 sm:text-lg sm:placeholder:text-lg"
                                />
                            </div>
                            <div>
                                <input
                                    name="subject"
                                    type="text"
                                    placeholder="Subject..."
                                    value={state.subject}
                                    onChange={onChangeHandler}
                                    required
                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-['Poppins',system-ui,sans-serif] text-slate-800 shadow-sm transition-all duration-300 placeholder:text-sm placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-sky-100 sm:px-6 sm:py-5 sm:text-lg sm:placeholder:text-lg"
                                />
                            </div>
                            <div>
                                <textarea
                                    name="message"
                                    rows={6}
                                    placeholder="Your Message..."
                                    value={state.message}
                                    onChange={onChangeHandler}
                                    required
                                    className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm font-['Poppins',system-ui,sans-serif] text-slate-800 shadow-sm transition-all duration-300 placeholder:text-sm placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-sky-100 sm:px-6 sm:py-5 sm:text-lg sm:placeholder:text-lg lg:min-h-[12rem] lg:flex-1"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-2xl bg-linear-to-r from-blue-600 via-sky-500 to-cyan-500 px-6 py-4 text-base font-semibold text-white shadow-[0_20px_40px_-18px_rgba(2,132,199,0.75)] transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_24px_48px_-18px_rgba(2,132,199,0.85)] disabled:cursor-not-allowed disabled:opacity-50 sm:px-8 sm:py-5 sm:text-lg lg:mt-auto"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
