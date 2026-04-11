"use client"
import React, { createContext, useContext, useState, useEffect } from 'react'
import { getUserByEmail, registerUser, updateUser, type UserRecord } from './api'

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

    const persistSession = (userData: UserRecord) => {
        const sessionUser = {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            role: userData.role
        }

        setUser(sessionUser)
        setIsAuthenticated(true)
        localStorage.setItem('user', JSON.stringify(sessionUser))
    }

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
        setIsReady(true)
    }, [])

    const login = async (email: string, password: string) => {
        const userData = await getUserByEmail(email)
        if (!userData) {
            throw new Error('User not found')
        }

        if (!('password' in userData) || typeof userData.password !== 'string') {
            throw new Error('Backend user record does not support password verification')
        }

        if (userData.password !== password) {
            throw new Error('Invalid email or password')
        }

        persistSession(userData)
    }

    const register = async (name: string, email: string, password: string) => {
        const existingUser = await getUserByEmail(email)
        if (existingUser) {
            throw new Error('An account with this email already exists')
        }

        const userData = await registerUser({ name, email, password })
        persistSession(userData)
    }

    const resetPassword = async (email: string, password: string) => {
        const existingUser = await getUserByEmail(email)
        if (!existingUser || typeof existingUser.id !== 'number') {
            throw new Error('User not found')
        }

        const updatedUser = await updateUser(existingUser.id, {
            name: existingUser.name,
            email: existingUser.email,
            role: existingUser.role,
            password
        })

        persistSession(updatedUser)
    }

    const logout = () => {
        setUser(null)
        setIsAuthenticated(false)
        localStorage.removeItem('user')
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
