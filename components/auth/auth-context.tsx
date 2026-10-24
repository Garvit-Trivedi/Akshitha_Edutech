'use client'

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { api, getAuthToken, setAuthToken } from '@/lib/api'

export interface User {
  id: string
  name: string
  email: string
  phone: string
  role: 'jobseeker' | 'employer' | 'admin'
  isVerified: boolean
  company?: any
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (data: { email: string; password: string }) => Promise<User>
  register: (data: {
    name: string
    email: string
    phone: string
    password: string
    role: 'jobseeker' | 'employer'
    terms: boolean
  }) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const refreshUser = useCallback(async () => {
    const token = getAuthToken()
    if (!token) {
      setUser(null)
      setLoading(false)
      return
    }

    try {
      const res = await api.auth.me()
      setUser(res.data.user)
    } catch {
      setAuthToken(null)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refreshUser()
  }, [refreshUser])

  const login = async (data: { email: string; password: string }) => {
    const res = await api.auth.login(data)
    setUser(res.data.user)
    return res.data.user
  }

  const register = async (data: {
    name: string
    email: string
    phone: string
    password: string
    role: 'jobseeker' | 'employer'
    terms: boolean
  }) => {
    const res = await api.auth.register(data)
    setUser(res.data.user)
  }

  const logout = async () => {
    try {
      await api.auth.logout()
    } finally {
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
