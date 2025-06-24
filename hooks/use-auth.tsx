"use client"

import { createContext, useContext, useState, useEffect, useCallback } from "react"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("nextgen-user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error("Error loading user:", error)
      }
    }
    setIsLoading(false)
  }, [])

  // Save user to localStorage whenever user changes
  useEffect(() => {
    if (!isLoading) {
      if (user) {
        localStorage.setItem("nextgen-user", JSON.stringify(user))
      } else {
        localStorage.removeItem("nextgen-user")
      }
    }
  }, [user, isLoading])

  const login = useCallback(async (email, password) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simple validation - in real app, this would be server-side
        if (email && password) {
          const userData = {
            id: 1,
            name: email.split("@")[0],
            email: email,
          }
          setUser(userData)
          resolve(userData)
        } else {
          reject(new Error("Invalid credentials"))
        }
      }, 1000)
    })
  }, [])

  const register = useCallback(async (name, email, password) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (name && email && password) {
          const userData = {
            id: Date.now(),
            name: name,
            email: email,
          }
          setUser(userData)
          resolve(userData)
        } else {
          reject(new Error("Registration failed"))
        }
      }, 1000)
    })
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
