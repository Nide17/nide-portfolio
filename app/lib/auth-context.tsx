"use client"
import React, { createContext, useContext, useState, useEffect } from 'react'
import { API_BASE_URL } from '../config'

interface User {
    id?: number
    name: string
    email: string
    role?: string
}

interface AuthContextType {
    user: User | null
    isAuthenticated: boolean
    login: (email: string, password: string) => Promise<void>
    register: (name: string, email: string, password: string) => Promise<void>
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    // Load user from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            try {
                const userData = JSON.parse(storedUser)
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setUser(userData)
                setIsAuthenticated(true)
            } catch (error) {
                console.error('Failed to load user:', error)
            }
        }
    }, [])

    const login = async (email: string, password: string) => {
        // For now, we'll use a simple validation
        // In a real app, you'd verify password against the backend
        // For MVP, we'll just verify the user exists
        const response = await fetch(`${API_BASE_URL}/users/email/${email}`)
        if (!response.ok) {
            throw new Error('User not found')
        }
        const userData = await response.json()

        // Store user and authentication state
        setUser(userData)
        setIsAuthenticated(true)
        localStorage.setItem('user', JSON.stringify(userData))
    }

    const register = async (name: string, email: string, password: string) => {
        const response = await fetch(`${API_BASE_URL}/users/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        })

        if (!response.ok) {
            const error = await response.json()
            throw new Error(error.detail || 'Registration failed')
        }

        const userData = await response.json()
        setUser(userData)
        setIsAuthenticated(true)
        localStorage.setItem('user', JSON.stringify(userData))
    }

    const logout = () => {
        setUser(null)
        setIsAuthenticated(false)
        localStorage.removeItem('user')
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
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
