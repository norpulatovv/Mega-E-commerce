'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
    FiPlus, FiEdit2, FiTrash2, FiSearch, FiFilter,
    FiX, FiSave, FiPackage, FiDollarSign,
    FiTag, FiBarChart2, FiTrendingUp,
    FiShield, FiAlertCircle, FiCheck
} from 'react-icons/fi'
import Image from 'next/image'
import { useAuthStore } from '@/store/authStore'

interface Product {
    id: number
    title: string
    description: string
    price: number
    discountPercentage: number
    rating: number
    stock: number
    brand: string
    category: string
    thumbnail: string
}

export default function AdminProductsPage() {
    const router = useRouter()
    const { user, isAuthenticated, canAccessAdmin } = useAuthStore()
    
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [showAddModal, setShowAddModal] = useState(false)
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)
    const [categories, setCategories] = useState<string[]>([])
    const [notification, setNotification] = useState<{type: 'success' | 'error', message: string} | null>(null)

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        discountPercentage: '',
        stock: '',
        brand: '',
        category: '',
        thumbnail: ''
    })

    // PROTECTION
    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login?redirect=/admin/products')
            return
        }
        if (!canAccessAdmin()) {
            router.push('/')
            return
        }
    }, [isAuthenticated, canAccessAdmin, router])

    // Fetch products
    useEffect(() => {
        if (isAuthenticated && canAccessAdmin()) {
            fetchProducts()
        }
    }, [isAuthenticated, canAccessAdmin])

    const fetchProducts = async () => {
        try {
            setLoading(true)
            const res = await fetch('https://dummyjson.com/products?limit=100')
            const data = await res.json()
            setProducts(data.products)
            
            const uniqueCategories = ['all', ...new Set(data.products.map((p: Product) => p.category))]
            setCategories(uniqueCategories as string[])
        } catch (error) {
            console.error('Failed to fetch products:', error)
            showNotification('error', 'Failed to load products')
        } finally {
            setLoading(false)
        }
    }

    const showNotification = (type: 'success' | 'error', message: string) => {
        setNotification({ type, message })
        setTimeout(() => setNotification(null), 3000)
    }

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
        return matchesSearch && matchesCategory
    })

    const handleAddProduct = () => {
        if (!formData.title || !formData.price || !formData.stock) {
            showNotification('error', 'Please fill all required fields')
            return
        }

        const newProduct: Product = {
            id: Date.now(),
            title: formData.title,
            description: formData.description,
            price: parseFloat(formData.price),
            discountPercentage: parseFloat(formData.discountPercentage) || 0,
            rating: 4.5,
            stock: parseInt(formData.stock),
            brand: formData.brand,
            category: formData.category || 'general',
            thumbnail: formData.thumbnail || 'https://via.placeholder.com/300'
        }
        setProducts([newProduct, ...products])
        showNotification('success', 'Product added successfully!')
        resetForm()
    }

    const handleUpdateProduct = () => {
        if (!editingProduct) return
        
        setProducts(products.map(p => 
            p.id === editingProduct.id 
                ? { 
                    ...p,
                    title: formData.title,
                    description: formData.description,
                    price: parseFloat(formData.price),
                    discountPercentage: parseFloat(formData.discountPercentage),
                    stock: parseInt(formData.stock),
                    brand: formData.brand,
                    category: formData.category,
                    thumbnail: formData.thumbnail
                  }
                : p
        ))
        showNotification('success', 'Product updated successfully!')
        resetForm()
    }

    const handleDeleteProduct = (id: number) => {
        if (confirm('Are you sure you want to delete this product?')) {
            setProducts(products.filter(p => p.id !== id))
            showNotification('success', 'Product deleted successfully!')
        }
    }

    const openEditModal = (product: Product) => {
        setEditingProduct(product)
        setFormData({
            title: product.title,
            description: product.description,
            price: String(product.price),
            discountPercentage: String(product.discountPercentage),
            stock: String(product.stock),
            brand: product.brand,
            category: product.category,
            thumbnail: product.thumbnail
        })
        setShowAddModal(true)
    }

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            price: '',
            discountPercentage: '',
            stock: '',
            brand: '',
            category: '',
            thumbnail: ''
        })
        setEditingProduct(null)
        setShowAddModal(false)
    }

    const stats = [
        { label: 'Total Products', value: products.length, icon: FiPackage, color: 'from-blue-500 to-blue-600' },
        { label: 'Categories', value: categories.length - 1, icon: FiTag, color: 'from-green-500 to-green-600' },
        { label: 'Total Stock', value: products.reduce((acc, p) => acc + p.stock, 0), icon: FiBarChart2, color: 'from-orange-500 to-orange-600' },
        { label: 'Avg Price', value: `$${(products.reduce((acc, p) => acc + p.price, 0) / products.length || 0).toFixed(2)}`, icon: FiDollarSign, color: 'from-purple-500 to-purple-600' }
    ]

    // LOADING
    if (loading && isAuthenticated && canAccessAdmin()) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center"
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="text-6xl mb-4"
                    >
                        ⚙️
                    </motion.div>
                    <p className="text-xl font-bold text-gray-700">Loading Admin Panel...</p>
                </motion.div>
            </div>
        )
    }

    // ACCESS DENIED
    if (!isAuthenticated || !canAccessAdmin()) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center max-w-md bg-white rounded-3xl shadow-2xl p-10"
                >
                    <motion.div
                        animate={{ 
                            rotate: [0, -10, 10, -10, 0],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-8xl mb-6"
                    >
                        🚫
                    </motion.div>
                    <h2 className="text-4xl font-black text-gray-800 mb-4">Access Denied</h2>
                    <p className="text-gray-600 mb-2">
                        You need <span className="font-bold text-purple-600">admin privileges</span>
                    </p>
                    <p className="text-sm text-gray-500 mb-8">
                        {!isAuthenticated ? 'Please login first' : 'Your account does not have admin access'}
                    </p>

                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <FiShield size={20} />
                            <h3 className="font-black text-purple-800">Demo Admin Access</h3>
                        </div>
                        <div className="bg-white rounded-xl p-4 text-left space-y-2">
                            <div className="text-sm">
                                <span className="text-gray-600">Email:</span>
                                <div className="font-mono text-purple-600 font-bold">Norpulatov@gmail.com</div>
                            </div>
                            <div className="text-sm">
                                <span className="text-gray-600">Password:</span>
                                <div className="font-mono text-purple-600 font-bold">12345678</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => router.push('/')}
                            className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-2xl font-bold"
                        >
                            ← Home
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => router.push('/login?redirect=/admin/products')}
                            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-2xl font-bold"
                        >
                            Login as Admin
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        )
    }

    // MAIN ADMIN PANEL
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Notification Toast */}
            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="fixed top-24 right-4 z-50"
                    >
                        <div className={`px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 ${
                            notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
                        } text-white`}>
                            {notification.type === 'success' ? <FiCheck size={20} /> : <FiAlertCircle size={20} />}
                            <span className="font-bold">{notification.message}</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-12">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-between text-white"
                    >
                        <div>
                            <h1 className="text-4xl font-black mb-2">Admin Dashboard</h1>
                            <p className="text-lg opacity-90">Welcome back, {user?.name}! 👋</p>
                        </div>
                        <div className="hidden md:flex items-center gap-4">
                            <div className="bg-white/20 backdrop-blur px-4 py-2 rounded-xl">
                                <div className="text-xs opacity-80">Role</div>
                                <div className="font-bold">{user?.role?.toUpperCase()}</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-2xl p-6 shadow-lg relative overflow-hidden"
                        >
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-10 rounded-full -mr-16 -mt-16`} />
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                                        <stat.icon size={24} />
                                    </div>
                                    <FiTrendingUp/>
                                </div>
                                <div className="text-3xl font-black text-gray-800 mb-1">{stat.value}</div>
                                <div className="text-sm text-gray-600">{stat.label}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Toolbar */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-4 flex-1">
                            <div className="relative flex-1 max-w-md">
                                <FiSearch/>
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none"
                                />
                            </div>

                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="px-4 py-3 border-2 border-gray-200 rounded-xl font-semibold focus:border-purple-400 focus:outline-none capitalize"
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowAddModal(true)}
                            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg"
                        >
                            <FiPlus />
                            Add Product
                        </motion.button>
                    </div>
                </div>

                {/* Products Table */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b-2 border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-black text-gray-700 uppercase">Image</th>
                                    <th className="px-6 py-4 text-left text-sm font-black text-gray-700 uppercase">Product</th>
                                    <th className="px-6 py-4 text-left text-sm font-black text-gray-700 uppercase">Category</th>
                                    <th className="px-6 py-4 text-left text-sm font-black text-gray-700 uppercase">Price</th>
                                    <th className="px-6 py-4 text-left text-sm font-black text-gray-700 uppercase">Stock</th>
                                    <th className="px-6 py-4 text-left text-sm font-black text-gray-700 uppercase">Rating</th>
                                    <th className="px-6 py-4 text-right text-sm font-black text-gray-700 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                <AnimatePresence>
                                    {filteredProducts.map((product, index) => (
                                        <motion.tr
                                            key={product.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ delay: index * 0.02 }}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="w-16 h-16 relative rounded-lg overflow-hidden">
                                                    <Image
                                                        src={product.thumbnail}
                                                        alt={product.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-gray-800">{product.title}</div>
                                                <div className="text-sm text-gray-500">{product.brand}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold capitalize">
                                                    {product.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-gray-800">${product.price}</div>
                                                {product.discountPercentage > 0 && (
                                                    <div className="text-xs text-green-600">-{product.discountPercentage}%</div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`font-semibold ${product.stock > 50 ? 'text-green-600' : product.stock > 20 ? 'text-orange-600' : 'text-red-600'}`}>
                                                    {product.stock}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-1">
                                                    <span>⭐</span>
                                                    <span className="font-semibold">{product.rating}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => openEditModal(product)}
                                                        className="w-9 h-9 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-200 transition-colors"
                                                    >
                                                        <FiEdit2 size={16} />
                                                    </motion.button>
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => handleDeleteProduct(product.id)}
                                                        className="w-9 h-9 bg-red-100 text-red-600 rounded-lg flex items-center justify-center hover:bg-red-200 transition-colors"
                                                    >
                                                        <FiTrash2 size={16} />
                                                    </motion.button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="text-center py-20">
                            <div className="text-6xl mb-4">📦</div>
                            <p className="text-xl font-bold text-gray-600">No products found</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Add/Edit Modal */}
            <AnimatePresence>
                {showAddModal && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={resetForm}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl z-50 max-h-[90vh] overflow-y-auto"
                        >
                            <div className="bg-white rounded-3xl shadow-2xl p-8 m-4">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-3xl font-black text-gray-800">
                                        {editingProduct ? 'Edit Product' : 'Add New Product'}
                                    </h2>
                                    <button onClick={resetForm} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">
                                        <FiX size={20} />
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Product Name *</label>
                                        <input
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none"
                                            placeholder="iPhone 15 Pro Max"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                                        <textarea
                                            value={formData.description}
                                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                                            rows={3}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none"
                                            placeholder="Product description..."
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Price ($) *</label>
                                            <input
                                                type="number"
                                                value={formData.price}
                                                onChange={(e) => setFormData({...formData, price: e.target.value})}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none"
                                                placeholder="999"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Discount (%)</label>
                                            <input
                                                type="number"
                                                value={formData.discountPercentage}
                                                onChange={(e) => setFormData({...formData, discountPercentage: e.target.value})}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none"
                                                placeholder="10"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Stock *</label>
                                            <input
                                                type="number"
                                                value={formData.stock}
                                                onChange={(e) => setFormData({...formData, stock: e.target.value})}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none"
                                                placeholder="100"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Brand</label>
                                            <input
                                                type="text"
                                                value={formData.brand}
                                                onChange={(e) => setFormData({...formData, brand: e.target.value})}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none"
                                                placeholder="Apple"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) => setFormData({...formData, category: e.target.value})}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none capitalize"
                                        >
                                            <option value="">Select category</option>
                                            {categories.filter(c => c !== 'all').map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">Image URL</label>
                                        <input
                                            type="text"
                                            value={formData.thumbnail}
                                            onChange={(e) => setFormData({...formData, thumbnail: e.target.value})}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none"
                                            placeholder="https://..."
                                        />
                                    </div>

                                    <div className="flex gap-4 pt-4">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={editingProduct ? handleUpdateProduct : handleAddProduct}
                                            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2"
                                        >
                                            <FiSave />
                                            {editingProduct ? 'Update Product' : 'Add Product'}
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={resetForm}
                                            className="px-6 py-4 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition-colors"
                                        >
                                            Cancel
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    )
}