"use client"
import React, { useState } from 'react'
import { LocationIcon, EmailIcon, PhoneIcon, LinkedInIcon, GitHubIcon } from '../lib/icons'
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
                                    <LocationIcon className="w-4 h-4 text-blue-600" />
                                </div>
                                <span className="text-lg text-gray-700">Kigali, Rwanda</span>
                            </div>
                            <div className="flex justify-center lg:justify-start items-center space-x-4">
                                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                    <EmailIcon className="w-4 h-4 text-red-600" />
                                </div>
                                <span className="text-lg text-gray-700">nidedrogba@gmail.com</span>
                            </div>
                            <div className="flex justify-center lg:justify-start items-center space-x-4">
                                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                    <PhoneIcon className="w-4 h-4 text-green-600" />
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
                                    <LinkedInIcon className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                                </a>
                                <a
                                    href="https://github.com/Nide17"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 bg-gray-800 hover:bg-gray-900 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl group"
                                >
                                    <GitHubIcon className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
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