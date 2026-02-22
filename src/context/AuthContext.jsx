import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

const STORAGE_KEY = 'kodnest-auth'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setUser(parsed)
      } catch (_) {}
    }
    setIsReady(true)
  }, [])

  const login = (email, password) => {
    const userData = { email, name: email.split('@')[0], id: Date.now().toString() }
    setUser(userData)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isReady }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
