import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
    id: string
    name: string
    email: string
    avatar?: string
    role: 'user' | 'admin'
    createdAt: string
}

interface AuthState {
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean
    
    // Actions
    login: (email: string, password: string) => Promise<{ success: boolean; message: string }>
    register: (name: string, email: string, password: string) => Promise<{ success: boolean; message: string }>
    logout: () => void
    updateProfile: (data: Partial<User>) => void
    
    // Permissions
    canAccessAdmin: () => boolean
    canCheckout: () => boolean
    canAddToWishlist: () => boolean
}

// Demo users database
const DEMO_USERS = [
    { email: 'admin@megashop.com', password: 'admin123', name: 'Admin User', role: 'admin' as const },
    { email: 'user@megashop.com', password: 'user123', name: 'John Doe', role: 'user' as const },
]

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            isAuthenticated: false,
            isLoading: false,

            // LOGIN
            login: async (email: string, password: string) => {
                set({ isLoading: true })
                
                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, 1500))
                
                // Check demo users
                const demoUser = DEMO_USERS.find(u => u.email === email && u.password === password)
                
                if (demoUser) {
                    const user: User = {
                        id: Date.now().toString(),
                        name: demoUser.name,
                        email: demoUser.email,
                        role: demoUser.role,
                        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${demoUser.name}`,
                        createdAt: new Date().toISOString()
                    }
                    
                    set({ user, isAuthenticated: true, isLoading: false })
                    return { success: true, message: 'Login successful!' }
                }
                
                // Accept any credentials (for demo)
                const user: User = {
                    id: Date.now().toString(),
                    name: email.split('@')[0],
                    email: email,
                    role: 'user',
                    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
                    createdAt: new Date().toISOString()
                }
                
                set({ user, isAuthenticated: true, isLoading: false })
                return { success: true, message: 'Login successful!' }
            },

            // REGISTER
            register: async (name: string, email: string, password: string) => {
                set({ isLoading: true })
                
                await new Promise(resolve => setTimeout(resolve, 1500))
                
                // Check if email already exists (demo check)
                const existingUser = DEMO_USERS.find(u => u.email === email)
                if (existingUser) {
                    set({ isLoading: false })
                    return { success: false, message: 'Email already registered. Please login.' }
                }
                
                // Validate
                if (!name || name.length < 2) {
                    set({ isLoading: false })
                    return { success: false, message: 'Name must be at least 2 characters' }
                }
                
                if (!email || !email.includes('@')) {
                    set({ isLoading: false })
                    return { success: false, message: 'Invalid email address' }
                }
                
                if (!password || password.length < 6) {
                    set({ isLoading: false })
                    return { success: false, message: 'Password must be at least 6 characters' }
                }
                
                const user: User = {
                    id: Date.now().toString(),
                    name: name,
                    email: email,
                    role: 'user',
                    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
                    createdAt: new Date().toISOString()
                }
                
                set({ user, isAuthenticated: true, isLoading: false })
                return { success: true, message: 'Account created successfully!' }
            },

            // LOGOUT
            logout: () => {
                set({ user: null, isAuthenticated: false })
            },

            // UPDATE PROFILE
            updateProfile: (data: Partial<User>) => {
                const currentUser = get().user
                if (currentUser) {
                    set({ user: { ...currentUser, ...data } })
                }
            },

            // PERMISSIONS
            canAccessAdmin: () => {
                const { user, isAuthenticated } = get()
                return isAuthenticated && user?.role === 'admin'
            },

            canCheckout: () => {
                return get().isAuthenticated
            },

            canAddToWishlist: () => {
                return get().isAuthenticated
            },
        }),
        {
            name: 'megashop-auth',
        }
    )
)