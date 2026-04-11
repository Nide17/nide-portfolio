"use client"
import React, { useState } from 'react'
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

    return (
        <section id="contact" className="py-32 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-5xl md:text-6xl font-bold bg-linear-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent text-center mb-20">
                    Get In Touch
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="text-center lg:text-left">
                        <p className="text-2xl text-gray-700 mb-8 leading-relaxed">
                            &quot;Do you have a project to discuss? A collaboration, an idea? Please reach out — I&apos;m open and eager to hear from you!&quot;
                        </p>
                        <div className="space-y-6">
                            <div className="flex justify-center lg:justify-start items-center space-x-4">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <span className="text-lg text-gray-700">Kigali, Rwanda</span>
                            </div>
                            <div className="flex justify-center lg:justify-start items-center space-x-4">
                                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                </div>
                                <span className="text-lg text-gray-700">nidedrogba@gmail.com</span>
                            </div>
                            <div className="flex justify-center lg:justify-start items-center space-x-4">
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <span className="text-lg text-gray-700">+250788551997</span>
                            </div>
                        </div>

                        <div className="mt-12">
                            <h3 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent mb-8 text-center font-['Poppins',system-ui,sans-serif]">
                                Connect with me
                            </h3>
                            <div className="flex justify-center space-x-6">
                                <a
                                    href="https://www.linkedin.com/in/niyomwungeri-parmenide-ishimwe-1a5394123/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl group"
                                >
                                    <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </a>
                                <a
                                    href="https://github.com/Nide17"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 bg-gray-800 hover:bg-gray-900 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl group"
                                >
                                    <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-xl">
                        {loading && (
                            <div className="flex justify-center mb-6">
                                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                            </div>
                        )}

                        {error && (
                            <div className="text-red-600 text-center mb-6 bg-red-50 p-4 rounded-lg">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="text-green-600 text-center mb-6 bg-green-50 p-4 rounded-lg">
                                {success}
                            </div>
                        )}

                        <form onSubmit={onSubmitHandler} className="space-y-6">
                            <div>
                                <input
                                    name="name"
                                    type="text"
                                    placeholder="Your Name..."
                                    value={state.name}
                                    onChange={onChangeHandler}
                                    required
                                    className="w-full px-6 py-5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-lg font-['Poppins',system-ui,sans-serif] bg-gray-50 focus:bg-white shadow-sm hover:shadow-md"
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
                                    className="w-full px-6 py-5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-lg font-['Poppins',system-ui,sans-serif] bg-gray-50 focus:bg-white shadow-sm hover:shadow-md"
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
                                    className="w-full px-6 py-5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-lg font-['Poppins',system-ui,sans-serif] bg-gray-50 focus:bg-white shadow-sm hover:shadow-md"
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
                                    className="w-full px-6 py-5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none text-lg font-['Poppins',system-ui,sans-serif] bg-gray-50 focus:bg-white shadow-sm hover:shadow-md"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-linear-to-r from-blue-600 to-sky-400 text-white py-5 px-8 rounded-xl hover:from-blue-700 hover:to-sky-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg font-['Poppins',system-ui,sans-serif] shadow-lg hover:shadow-xl transform hover:scale-105"
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