'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
    FiUser, FiMail, FiPhone, FiMapPin, FiEdit2,
    FiSave, FiPackage, FiClock, FiTruck, FiCheck,
    FiShield, FiLogOut, FiSettings, FiHeart, FiX,
    FiCamera, FiCreditCard, FiAlertCircle
} from 'react-icons/fi'
import { useAuthStore } from '@/store/authStore'
import Link from 'next/link'

export default function ProfilePage() {
    const router = useRouter()
    const { user, isAuthenticated, logout, updateProfile } = useAuthStore()
    const [activeTab, setActiveTab] = useState('profile')
    const [editing, setEditing] = useState(false)
    const [saved, setSaved] = useState(false)

    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: '',
        address: '',
        city: '',
        country: ''
    })

    // PROTECTION
    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login?redirect=/profile')
        }
    }, [isAuthenticated, router])

    const handleSave = () => {
        if (user) {
            updateProfile({ name: formData.name, email: formData.email })
            setEditing(false)
            setSaved(true)
            setTimeout(() => setSaved(false), 3000)
        }
    }

    const handleLogout = () => {
        logout()
        router.push('/')
    }

    const tabs = [
        { id: 'profile', name: 'Profile', icon: FiUser },
        { id: 'orders', name: 'Orders', icon: FiPackage },
        { id: 'addresses', name: 'Addresses', icon: FiMapPin },
        { id: 'wishlist', name: 'Wishlist', icon: FiHeart },
        { id: 'settings', name: 'Settings', icon: FiSettings },
    ]

    const orders = [
        { id: '#MGS-12345', date: '2024-02-20', status: 'Delivered', total: 299.99, items: 3 },
        { id: '#MGS-12346', date: '2024-02-18', status: 'In Transit', total: 159.50, items: 2 },
        { id: '#MGS-12347', date: '2024-02-15', status: 'Processing', total: 89.99, items: 1 },
    ]

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="text-6xl mb-4"
                    >
                        🔒
                    </motion.div>
                    <h2 className="text-2xl font-black text-gray-800">Redirecting...</h2>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
            <div className="container mx-auto px-4">
                
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-3xl p-8 mb-8 text-white shadow-2xl"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                className="relative"
                            >
                                <div className="w-24 h-24 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-5xl font-black border-4 border-white/30">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="absolute bottom-0 right-0 w-8 h-8 bg-white text-purple-600 rounded-full flex items-center justify-center shadow-lg"
                                >
                                    <FiCamera size={14} />
                                </motion.button>
                            </motion.div>
                            <div>
                                <h1 className="text-4xl font-black mb-2">Welcome back, {user?.name}! 👋</h1>
                                <p className="text-lg opacity-90">{user?.email}</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <div className="px-3 py-1 bg-white/20 backdrop-blur rounded-full text-sm font-bold">
                                        {user?.role?.toUpperCase()}
                                    </div>
                                    <div className="px-3 py-1 bg-green-500/30 backdrop-blur rounded-full text-sm font-bold flex items-center gap-1">
                                        <FiCheck size={12} />
                                        Verified
                                    </div>
                                </div>
                            </div>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleLogout}
                            className="bg-white/20 backdrop-blur px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-white/30 transition-all"
                        >
                            <FiLogOut />
                            Logout
                        </motion.button>
                    </div>
                </motion.div>

                <div className="grid lg:grid-cols-4 gap-8">
                    
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-3xl shadow-xl p-6"
                        >
                            <h3 className="font-black text-gray-800 mb-4 text-lg">Navigation</h3>
                            <div className="space-y-2">
                                {tabs.map((tab) => (
                                    <motion.button
                                        key={tab.id}
                                        whileHover={{ x: 5 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
                                            activeTab === tab.id
                                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                                                : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                    >
                                        <tab.icon size={20} />
                                        {tab.name}
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <AnimatePresence mode="wait">
                            
                            {/* PROFILE TAB */}
                            {activeTab === 'profile' && (
                                <motion.div
                                    key="profile"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="bg-white rounded-3xl shadow-xl p-8"
                                >
                                    <div className="flex items-center justify-between mb-8">
                                        <h2 className="text-3xl font-black text-gray-800">Personal Information</h2>
                                        {!editing ? (
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => setEditing(true)}
                                                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2"
                                            >
                                                <FiEdit2 />
                                                Edit Profile
                                            </motion.button>
                                        ) : (
                                            <div className="flex gap-3">
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={handleSave}
                                                    className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2"
                                                >
                                                    <FiSave />
                                                    Save
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => setEditing(false)}
                                                    className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-bold flex items-center gap-2"
                                                >
                                                    <FiX />
                                                    Cancel
                                                </motion.button>
                                            </div>
                                        )}
                                    </div>

                                    {saved && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0 }}
                                            className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-xl flex items-center gap-3 text-green-700"
                                        >
                                            <FiCheck size={20} />
                                            <span className="font-semibold">Profile updated successfully!</span>
                                        </motion.div>
                                    )}

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                                            <div className="relative">
                                                <FiUser />
                                                <input
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                                    disabled={!editing}
                                                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${
                                                        editing ? 'border-purple-400 bg-white' : 'border-gray-200 bg-gray-50'
                                                    }`}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                                            <div className="relative">
                                                <FiMail />
                                                <input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                                    disabled={!editing}
                                                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${
                                                        editing ? 'border-purple-400 bg-white' : 'border-gray-200 bg-gray-50'
                                                    }`}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Phone</label>
                                            <div className="relative">
                                                <FiPhone />
                                                <input
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                                    disabled={!editing}
                                                    placeholder="+1 (555) 123-4567"
                                                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${
                                                        editing ? 'border-purple-400 bg-white' : 'border-gray-200 bg-gray-50'
                                                    }`}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Address</label>
                                            <div className="relative">
                                                <FiMapPin />
                                                <input
                                                    type="text"
                                                    value={formData.address}
                                                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                                                    disabled={!editing}
                                                    placeholder="123 Main St"
                                                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all ${
                                                        editing ? 'border-purple-400 bg-white' : 'border-gray-200 bg-gray-50'
                                                    }`}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* ORDERS TAB */}
                            {activeTab === 'orders' && (
                                <motion.div
                                    key="orders"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="bg-white rounded-3xl shadow-xl p-8"
                                >
                                    <h2 className="text-3xl font-black text-gray-800 mb-8">Order History</h2>
                                    <div className="space-y-4">
                                        {orders.map((order, index) => (
                                            <motion.div
                                                key={order.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="border-2 border-gray-200 rounded-2xl p-6 hover:border-purple-400 transition-all"
                                            >
                                                <div className="flex items-center justify-between mb-4">
                                                    <div>
                                                        <div className="text-sm text-gray-500 mb-1">Order ID</div>
                                                        <div className="font-black text-xl text-gray-800">{order.id}</div>
                                                    </div>
                                                    <div className={`px-4 py-2 rounded-full font-bold text-sm ${
                                                        order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                                        order.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                                                        'bg-orange-100 text-orange-700'
                                                    }`}>
                                                        {order.status}
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-3 gap-4 text-sm">
                                                    <div>
                                                        <div className="text-gray-500 mb-1">Date</div>
                                                        <div className="font-semibold">{order.date}</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-gray-500 mb-1">Items</div>
                                                        <div className="font-semibold">{order.items} items</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-gray-500 mb-1">Total</div>
                                                        <div className="font-black text-purple-600">${order.total}</div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* OTHER TABS */}
                            {activeTab === 'addresses' && (
                                <motion.div
                                    key="addresses"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="bg-white rounded-3xl shadow-xl p-8 text-center"
                                >
                                    <div className="text-6xl mb-4">📍</div>
                                    <h2 className="text-3xl font-black text-gray-800 mb-4">Saved Addresses</h2>
                                    <p className="text-gray-600">No saved addresses yet</p>
                                </motion.div>
                            )}

                            {activeTab === 'wishlist' && (
                                <motion.div
                                    key="wishlist"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="bg-white rounded-3xl shadow-xl p-8 text-center"
                                >
                                    <div className="text-6xl mb-4">❤️</div>
                                    <h2 className="text-3xl font-black text-gray-800 mb-4">Wishlist</h2>
                                    <p className="text-gray-600 mb-6">Your wishlist is empty</p>
                                    <Link href="/products">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-bold"
                                        >
                                            Browse Products
                                        </motion.button>
                                    </Link>
                                </motion.div>
                            )}

                            {activeTab === 'settings' && (
                                <motion.div
                                    key="settings"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="bg-white rounded-3xl shadow-xl p-8"
                                >
                                    <h2 className="text-3xl font-black text-gray-800 mb-8">Account Settings</h2>
                                    <div className="space-y-6">
                                        <div className="p-6 bg-blue-50 border-2 border-blue-200 rounded-2xl">
                                            <div className="flex items-center gap-3 mb-2">
                                                <FiShield size={24} />
                                                <h3 className="font-black text-gray-800">Security</h3>
                                            </div>
                                            <p className="text-gray-600 mb-4">Manage your password and security settings</p>
                                            <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold">
                                                Change Password
                                            </button>
                                        </div>
                                        <div className="p-6 bg-red-50 border-2 border-red-200 rounded-2xl">
                                            <div className="flex items-center gap-3 mb-2">
                                                <FiAlertCircle size={24} />
                                                <h3 className="font-black text-gray-800">Danger Zone</h3>
                                            </div>
                                            <p className="text-gray-600 mb-4">Delete your account permanently</p>
                                            <button className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold">
                                                Delete Account
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    )
}