"use client"
import React, { createContext, useContext, useState, useEffect } from 'react'
import { registerUser, logoutUser, loginUser } from './api'

interface User {
    id?: number
    name: string
    email: string
    role?: string
}

interface AuthContextType {
    user: User | null
    isAuthenticated: boolean
    isReady: boolean
    login: (email: string, password: string) => Promise<void>
    register: (name: string, email: string, password: string) => Promise<void>
    resetPassword: (email: string, password: string) => Promise<void>
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isReady, setIsReady] = useState(false)

    // Load token on mount
    useEffect(() => {
        const token = localStorage.getItem('access_token')
        if (token) {
            setIsAuthenticated(true)
        }
        setIsReady(true)
    }, [])

    const login = async (email: string, password: string) => {
        const loginResponse = await loginUser(email, password);
        localStorage.setItem('access_token', loginResponse.access_token);
        localStorage.setItem('user_email', email);
        setIsAuthenticated(true);
    }

    const register = async (name: string, email: string, password: string) => {
        await registerUser({ name, email, password });
        await login(email, password);
    }

    const resetPassword = async (email: string, password: string) => {
        await login(email, password);
    }

    const logout = async () => {
        try {
            // Call the backend logout API which is stateless
            await logoutUser()
        } catch (error) {
            // If the logout API call fails, we still want to clear the local session
            console.error('Backend logout failed:', error)
        } finally {
            // Clear the local session
            setUser(null)
            setIsAuthenticated(false)
            localStorage.removeItem('user_email')
            localStorage.removeItem('access_token')
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, isReady, login, register, resetPassword, logout }}>
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
