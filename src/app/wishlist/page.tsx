'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
    FiHeart, FiShoppingCart, FiTrash2, FiX,
    FiFilter, FiSearch, FiArrowRight, FiStar
} from 'react-icons/fi'
import { useAuthStore } from '@/store/authStore'
import { useCartStore } from '@/store/cartStore'
import Image from 'next/image'
import Link from 'next/link'

interface Product {
    id: number
    title: string
    description: string
    price: number
    discountPercentage: number
    rating: number
    thumbnail: string
    category: string
    stock: number
}

export default function WishlistPage() {
    const router = useRouter()
    const { isAuthenticated } = useAuthStore()
    const { addItem, openCart } = useCartStore()
    
    const [wishlistItems, setWishlistItems] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [removing, setRemoving] = useState<number | null>(null)

    // PROTECTION
    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login?redirect=/wishlist')
        }
    }, [isAuthenticated, router])

    // Fetch wishlist items (demo - using random products)
    useEffect(() => {
        if (isAuthenticated) {
            fetch('https://dummyjson.com/products?limit=12')
                .then(res => res.json())
                .then(data => {
                    setWishlistItems(data.products)
                    setLoading(false)
                })
                .catch(() => setLoading(false))
        }
    }, [isAuthenticated])

    const categories = ['all', ...new Set(wishlistItems.map(item => item.category))]

    const filteredItems = wishlistItems.filter(item => {
        const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
        return matchesSearch && matchesCategory
    })

    const handleRemove = (id: number) => {
        setRemoving(id)
        setTimeout(() => {
            setWishlistItems(wishlistItems.filter(item => item.id !== id))
            setRemoving(null)
        }, 500)
    }

    const handleAddToCart = (product: Product) => {
        const discountedPrice = product.price * (1 - product.discountPercentage / 100)
        addItem({
            id: String(product.id),
            name: product.title,
            price: Number(discountedPrice.toFixed(2)),
            originalPrice: product.price,
            image: product.thumbnail,
            quantity: 1,
            category: product.category,
        })
        openCart()
    }

    const handleAddAllToCart = () => {
        filteredItems.forEach(product => {
            const discountedPrice = product.price * (1 - product.discountPercentage / 100)
            addItem({
                id: String(product.id),
                name: product.title,
                price: Number(discountedPrice.toFixed(2)),
                originalPrice: product.price,
                image: product.thumbnail,
                quantity: 1,
                category: product.category,
            })
        })
        openCart()
    }

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
                    <h2 className="text-2xl font-black text-gray-800">Redirecting to Login...</h2>
                </motion.div>
            </div>
        )
    }

    if (loading) {
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
                        💖
                    </motion.div>
                    <p className="text-xl font-bold text-gray-700">Loading your wishlist...</p>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 py-16">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center text-white"
                    >
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-7xl mb-4"
                        >
                            💖
                        </motion.div>
                        <h1 className="text-6xl font-black mb-4">My Wishlist</h1>
                        <p className="text-xl opacity-90">
                            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                
                {/* Toolbar */}
                {wishlistItems.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-3xl shadow-xl p-6 mb-8"
                    >
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-4 flex-1">
                                {/* Search */}
                                <div className="relative flex-1 max-w-md">
                                    <FiSearch  size={20} />
                                    <input
                                        type="text"
                                        placeholder="Search wishlist..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:outline-none"
                                    />
                                </div>

                                {/* Category Filter */}
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="px-4 py-3 border-2 border-gray-200 rounded-xl font-semibold focus:border-pink-400 focus:outline-none capitalize"
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Add All to Cart */}
                            {filteredItems.length > 0 && (
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleAddAllToCart}
                                    className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg"
                                >
                                    <FiShoppingCart />
                                    Add All to Cart ({filteredItems.length})
                                </motion.button>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* Products Grid */}
                {filteredItems.length > 0 ? (
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredItems.map((product, index) => {
                                const discountedPrice = product.price * (1 - product.discountPercentage / 100)
                                const isRemoving = removing === product.id

                                return (
                                    <motion.div
                                        key={product.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: isRemoving ? 0 : 1, scale: isRemoving ? 0.8 : 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ delay: index * 0.05 }}
                                        whileHover={{ y: -10 }}
                                        className="bg-white rounded-3xl shadow-xl overflow-hidden group relative"
                                    >
                                        {/* Remove Button */}
                                        <motion.button
                                            whileHover={{ scale: 1.1, rotate: 90 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => handleRemove(product.id)}
                                            className="absolute top-4 right-4 w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg z-20 hover:bg-red-600 transition-colors"
                                        >
                                            <FiX size={20} />
                                        </motion.button>

                                        {/* Discount Badge */}
                                        {product.discountPercentage > 0 && (
                                            <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-black shadow-lg z-10">
                                                -{Math.round(product.discountPercentage)}%
                                            </div>
                                        )}

                                        {/* Image */}
                                        <div className="relative aspect-square overflow-hidden bg-gray-100">
                                            <Image
                                                src={product.thumbnail}
                                                alt={product.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            <div className="text-xs text-pink-600 font-bold mb-2 uppercase">{product.category}</div>
                                            <h3 className="text-lg font-black text-gray-800 mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors">
                                                {product.title}
                                            </h3>

                                            {/* Rating */}
                                            <div className="flex items-center gap-2 mb-3">
                                                <div className="flex text-yellow-400">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <span key={star}>
                                                            {star <= Math.floor(product.rating) ? '⭐' : '☆'}
                                                        </span>
                                                    ))}
                                                </div>
                                                <span className="text-xs text-gray-600">({product.rating})</span>
                                            </div>

                                            {/* Price */}
                                            <div className="flex items-baseline gap-2 mb-4">
                                                <span className="text-2xl font-black text-gray-800">${discountedPrice.toFixed(2)}</span>
                                                {product.discountPercentage > 0 && (
                                                    <span className="text-sm text-gray-400 line-through">${product.price}</span>
                                                )}
                                            </div>

                                            {/* Stock */}
                                            <div className="mb-4">
                                                {product.stock > 0 ? (
                                                    <span className="text-sm text-green-600 font-semibold">In Stock ({product.stock})</span>
                                                ) : (
                                                    <span className="text-sm text-red-600 font-semibold">Out of Stock</span>
                                                )}
                                            </div>

                                            {/* Actions */}
                                            <div className="flex gap-2">
                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => handleAddToCart(product)}
                                                    disabled={product.stock === 0}
                                                    className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                                                        product.stock > 0
                                                            ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg hover:shadow-xl'
                                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                    }`}
                                                >
                                                    <FiShoppingCart />
                                                    Add to Cart
                                                </motion.button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    // Empty State
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-20 bg-white rounded-3xl shadow-xl"
                    >
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-9xl mb-6"
                        >
                            💔
                        </motion.div>
                        <h2 className="text-4xl font-black text-gray-800 mb-4">
                            {searchQuery || selectedCategory !== 'all' ? 'No items found' : 'Your Wishlist is Empty'}
                        </h2>
                        <p className="text-xl text-gray-600 mb-8">
                            {searchQuery || selectedCategory !== 'all' 
                                ? 'Try different filters or search terms'
                                : 'Start adding products you love!'
                            }
                        </p>
                        {(searchQuery || selectedCategory !== 'all') ? (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    setSearchQuery('')
                                    setSelectedCategory('all')
                                }}
                                className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold inline-flex items-center gap-2"
                            >
                                Clear Filters
                            </motion.button>
                        ) : (
                            <Link href="/products">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-10 py-5 rounded-2xl font-bold text-xl inline-flex items-center gap-3 shadow-2xl"
                                >
                                    <FiShoppingCart size={24} />
                                    Browse Products
                                    <FiArrowRight size={24} />
                                </motion.button>
                            </Link>
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    )
}