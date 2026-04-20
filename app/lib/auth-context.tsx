"use client"
import React, { createContext, useContext, useState, useEffect } from 'react'
import { registerUser, logoutUser, loginUser, getCurrentUser, forgotPassword, resetPassword } from './api'

interface User {
    id?: number
    name: string
    email: string
    role?: string
}

interface ResetPasswordPayload {
    token: string;
    password: string;
}

interface AuthContextType {
    user: User | null
    isAuthenticated: boolean
    isReady: boolean
    login: (email: string, password: string) => Promise<void>
    register: (name: string, email: string, password: string) => Promise<void>
    forgotPassword: (email: string) => Promise<void>
    resetPassword: (token: string, password: string) => Promise<void>
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isReady, setIsReady] = useState(false)

    useEffect(() => {
        let isMounted = true

        const bootstrapAuth = async () => {
            const token = localStorage.getItem('access_token')
            if (!token) {
                if (isMounted) {
                    setUser(null)
                    setIsAuthenticated(false)
                    setIsReady(true)
                }
                return
            }

            try {
                const currentUser = await getCurrentUser()
                if (!isMounted) return

                setUser(currentUser)
                setIsAuthenticated(true)
            } catch {
                localStorage.removeItem('user_email')
                localStorage.removeItem('access_token')

                if (!isMounted) return

                setUser(null)
                setIsAuthenticated(false)
            } finally {
                if (isMounted) {
                    setIsReady(true)
                }
            }
        }

        void bootstrapAuth()

        return () => {
            isMounted = false
        }
    }, [])

    const login = async (email: string, password: string) => {
        const loginResponse = await loginUser(email, password)
        localStorage.setItem('access_token', loginResponse.access_token)
        localStorage.setItem('user_email', email)
        const currentUserData = await getCurrentUser()
        setUser(currentUserData)
        setIsAuthenticated(true)
    }

    const register = async (name: string, email: string, password: string) => {
        await registerUser({ name, email, password })
        await login(email, password)
    }

    const forgotPassword = async (email: string) => {
        const { forgotPassword: apiForgot } = await import('./api')
        await apiForgot(email)
    }

    const resetPassword = async (token: string, password: string) => {
        const { resetPassword: apiReset } = await import('./api')
        await apiReset({ token, password })
    }

    const logout = async () => {
        try {
            // Call the backend logout API which is stateless
            await logoutUser()
        } catch (error) {
            // If the logout API call fails, we still want to clear the local session
        } finally {
            setUser(null)
            setIsAuthenticated(false)
            localStorage.removeItem('user_email')
            localStorage.removeItem('access_token')
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, isReady, login, register, forgotPassword, resetPassword, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context
}
