'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
    FiMail, FiLock, FiEye, FiEyeOff, FiUser,
    FiShield, FiCheck, FiAlertCircle, FiArrowRight
} from 'react-icons/fi'
import { useAuthStore } from '@/store/authStore'

export default function LoginPage() {
    const router = useRouter()
    const { login, register, isLoading } = useAuthStore()
    const [isLogin, setIsLogin] = useState(true)
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        rememberMe: false
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setSuccess('')

        if (isLogin) {
            const result = await login(formData.email, formData.password)
            if (result.success) {
                setSuccess(result.message)
                setTimeout(() => router.push('/'), 1000)
            } else {
                setError(result.message)
            }
        } else {
            const result = await register(formData.name, formData.email, formData.password)
            if (result.success) {
                setSuccess(result.message)
                setTimeout(() => router.push('/'), 1000)
            } else {
                setError(result.message)
            }
        }
    }

    const socialLogins = [
        { name: 'Google', icon: '🔵', color: 'from-blue-500 to-blue-600' },
        { name: 'Facebook', icon: '📘', color: 'from-blue-600 to-blue-700' },
        { name: 'Apple', icon: '🍎', color: 'from-gray-800 to-black' },
    ]

    const demoCredentials = [
        { email: 'admin@megashop.com', password: 'admin123', role: 'Admin' },
        { email: 'user@megashop.com', password: 'user123', role: 'User' },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4 relative overflow-hidden">
            
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            scale: [1, 1.5, 1],
                            rotate: [0, 180, 360],
                            opacity: [0.1, 0.2, 0.1]
                        }}
                        transition={{
                            duration: 10 + i * 2,
                            repeat: Infinity,
                            ease: 'linear'
                        }}
                        className="absolute w-64 h-64 bg-gradient-to-r from-red-400 to-orange-400 rounded-full blur-3xl"
                        style={{
                            top: `${(i * 20) % 100}%`,
                            left: `${(i * 30) % 100}%`,
                        }}
                    />
                ))}
            </div>

            <div className="w-full max-w-6xl relative z-10">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    
                    {/* Left Side - Branding */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="hidden md:block"
                    >
                        <div className="space-y-6">
                            <motion.div
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                <h1 className="text-6xl font-black bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent mb-4">
                                    MegaShop
                                </h1>
                                <p className="text-2xl text-gray-700 font-bold mb-8">
                                    Your Ultimate Shopping Destination
                                </p>
                            </motion.div>

                            {/* Features */}
                            <div className="space-y-4">
                                {[
                                    { icon: '🛍️', text: '10,000+ Products' },
                                    { icon: '⚡', text: 'Lightning Fast Delivery' },
                                    { icon: '🔒', text: 'Secure Payments' },
                                    { icon: '🎁', text: 'Exclusive Deals' },
                                ].map((feature, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 + 0.5 }}
                                        whileHover={{ x: 10 }}
                                        className="flex items-center gap-4 bg-white/80 backdrop-blur rounded-2xl p-4 shadow-lg"
                                    >
                                        <div className="text-4xl">{feature.icon}</div>
                                        <div className="text-lg font-bold text-gray-800">{feature.text}</div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Demo Credentials */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                                className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200"
                            >
                                <div className="flex items-center gap-2 mb-3">
                                    <FiShield/>
                                    <h3 className="font-black text-purple-800">Demo Credentials</h3>
                                </div>
                                <div className="space-y-2 text-sm">
                                    {demoCredentials.map((cred, i) => (
                                        <div key={i} className="bg-white/80 rounded-lg p-3">
                                            <div className="font-bold text-gray-700">{cred.role} Account:</div>
                                            <div className="text-gray-600">📧 {cred.email}</div>
                                            <div className="text-gray-600">🔑 {cred.password}</div>
                                        </div>
                                    ))}
                                    <div className="text-xs text-purple-600 font-semibold mt-2">
                                        Or use any email/password for demo!
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right Side - Auth Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-3xl shadow-2xl p-8 md:p-10"
                    >
                        {/* Toggle */}
                        <div className="flex gap-2 mb-8 bg-gray-100 rounded-2xl p-2">
                            <button
                                onClick={() => {
                                    setIsLogin(true)
                                    setError('')
                                    setSuccess('')
                                }}
                                className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                                    isLogin
                                        ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg'
                                        : 'text-gray-600 hover:text-gray-800'
                                }`}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => {
                                    setIsLogin(false)
                                    setError('')
                                    setSuccess('')
                                }}
                                className={`flex-1 py-3 rounded-xl font-bold transition-all ${
                                    !isLogin
                                        ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg'
                                        : 'text-gray-600 hover:text-gray-800'
                                }`}
                            >
                                Sign Up
                            </button>
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={isLogin ? 'login' : 'register'}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                            >
                                <h2 className="text-3xl font-black text-gray-800 mb-2">
                                    {isLogin ? 'Welcome Back!' : 'Create Account'}
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    {isLogin ? 'Login to unlock full features' : 'Sign up to start your journey'}
                                </p>

                                {/* Messages */}
                                <AnimatePresence>
                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="mb-4 p-4 bg-red-50 border-2 border-red-200 rounded-xl flex items-center gap-3 text-red-600"
                                        >
                                            <FiAlertCircle size={20} />
                                            <span className="font-semibold">{error}</span>
                                        </motion.div>
                                    )}
                                    {success && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="mb-4 p-4 bg-green-50 border-2 border-green-200 rounded-xl flex items-center gap-3 text-green-600"
                                        >
                                            <FiCheck size={20} />
                                            <span className="font-semibold">{success}</span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {/* Name */}
                                    {!isLogin && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                        >
                                            <label className="block text-sm font-bold text-gray-700 mb-2">
                                                Full Name
                                            </label>
                                            <div className="relative">
                                                <FiUser size={20} />
                                                <input
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:outline-none transition-colors"
                                                    placeholder="John Doe"
                                                    required={!isLogin}
                                                />
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <FiMail size={20} />
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:outline-none transition-colors"
                                                placeholder="john@example.com"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Password */}
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <FiLock size={20} />
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                value={formData.password}
                                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:outline-none transition-colors"
                                                placeholder="••••••••"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            >
                                                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                                            </button>
                                        </div>
                                        {!isLogin && (
                                            <p className="text-xs text-gray-500 mt-1">
                                                Must be at least 6 characters
                                            </p>
                                        )}
                                    </div>

                                    {/* Remember / Forgot */}
                                    {isLogin && (
                                        <div className="flex items-center justify-between">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.rememberMe}
                                                    onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                                                    className="w-5 h-5 rounded border-2 border-gray-300 text-red-600 focus:ring-2 focus:ring-red-400"
                                                />
                                                <span className="text-sm font-semibold text-gray-700">Remember me</span>
                                            </label>
                                            <Link href="/forgot-password" className="text-sm font-bold text-red-600 hover:text-red-700">
                                                Forgot Password?
                                            </Link>
                                        </div>
                                    )}

                                    {/* Submit */}
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-4 rounded-xl font-black text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 relative overflow-hidden"
                                    >
                                        {/* Shine effect */}
                                        <motion.div
                                            animate={{ x: [-200, 400] }}
                                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                                        />
                                        {isLoading ? (
                                            <>
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                                />
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                {isLogin ? 'Login Now' : 'Create Account'}
                                                <FiArrowRight />
                                            </>
                                        )}
                                    </motion.button>
                                </form>

                                {/* Divider */}
                                <div className="flex items-center gap-4 my-6">
                                    <div className="flex-1 h-px bg-gray-200" />
                                    <span className="text-sm font-semibold text-gray-500">OR</span>
                                    <div className="flex-1 h-px bg-gray-200" />
                                </div>

                                {/* Social Login */}
                                <div className="grid grid-cols-3 gap-3">
                                    {socialLogins.map((social) => (
                                        <motion.button
                                            key={social.name}
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setError('Social login coming soon!')}
                                            className={`py-3 rounded-xl bg-gradient-to-r ${social.color} text-white font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center`}
                                        >
                                            <span className="text-2xl">{social.icon}</span>
                                        </motion.button>
                                    ))}
                                </div>

                                {/* Back */}
                                <div className="mt-6 text-center">
                                    <Link href="/" className="text-sm font-bold text-gray-600 hover:text-red-600 transition-colors inline-flex items-center gap-2">
                                        ← Back to Home
                                    </Link>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}