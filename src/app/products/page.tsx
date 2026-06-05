'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
    FiGrid, FiList, FiFilter, FiSearch,
    FiStar, FiHeart, FiShoppingCart, FiLoader
} from 'react-icons/fi'
import { useCartStore } from '@/store/cartStore'
import Image from 'next/image'

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
    images: string[]
}

export default function ProductsPage() {
    const searchParams = useSearchParams()
    const urlCategory = searchParams.get('category') || 'all'
    const urlSearch = searchParams.get('search') || ''

    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const [selectedCategory, setSelectedCategory] = useState(urlCategory)
    const [sortBy, setSortBy] = useState('featured')
    const [searchQuery, setSearchQuery] = useState(urlSearch)
    const [showFilters, setShowFilters] = useState(false)
    const [products, setProducts] = useState<Product[]>([])
    const [categories, setCategories] = useState<string[]>([])
    const [loading, setLoading] = useState(true)
    const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)

    const { addItem, openCart } = useCartStore()

    // Fetch products
    useEffect(() => {
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
            } finally {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])

    // Update filters when URL changes
    useEffect(() => {
        setSelectedCategory(urlCategory)
        setSearchQuery(urlSearch)
    }, [urlCategory, urlSearch])
    const filteredProducts = useMemo(() => {
        let filtered = products.filter(product => {
            const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
            const matchesSearch =
                product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (product.brand?.toLowerCase().includes(searchQuery.toLowerCase()))
            return matchesCategory && matchesSearch
        })

        if (sortBy === 'price-low') filtered.sort((a, b) => a.price - b.price)
        if (sortBy === 'price-high') filtered.sort((a, b) => b.price - a.price)
        if (sortBy === 'rating') filtered.sort((a, b) => b.rating - a.rating)
        if (sortBy === 'discount') filtered.sort((a, b) => b.discountPercentage - a.discountPercentage)

        return filtered
    }, [products, selectedCategory, searchQuery, sortBy])

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

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="text-6xl"
                >
                    <FiLoader />
                </motion.div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 py-16">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center text-white"
                    >
                        <h1 className="text-5xl font-black mb-4">
                            {urlCategory !== 'all' && selectedCategory !== 'all'
                                ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Products`
                                : urlSearch
                                    ? `Search Results for "${urlSearch}"`
                                    : 'Discover Amazing Products'
                            }
                        </h1>
                        <p className="text-xl opacity-90">
                            {filteredProducts.length} products found
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Sidebar Filters */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}
                    >
                        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24 space-y-6">
                            {/* Search */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Search Products</label>
                                <div className="relative">
                                    <FiSearch />
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:outline-none"
                                    />
                                </div>
                            </div>

                            {/* Categories */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-3">Categories</label>
                                <div className="space-y-2 max-h-96 overflow-y-auto">
                                    {categories.map((cat) => (
                                        <motion.button
                                            key={cat}
                                            whileHover={{ x: 5 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => setSelectedCategory(cat)}
                                            className={`w-full text-left px-4 py-3 rounded-xl font-semibold transition-all capitalize ${selectedCategory === cat
                                                    ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            {cat}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            {/* Reset */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => {
                                    setSelectedCategory('all')
                                    setSearchQuery('')
                                }}
                                className="w-full py-3 bg-gray-800 text-white rounded-xl font-bold hover:bg-gray-700 transition-colors"
                            >
                                Reset Filters
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Products Grid */}
                    <div className="flex-1">
                        {/* Toolbar */}
                        <div className="bg-white rounded-2xl shadow-lg p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl font-semibold"
                                >
                                    <FiFilter />
                                    Filters
                                </button>
                                <div className="text-gray-600 font-semibold">
                                    {filteredProducts.length} Products
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                {/* Sort */}
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="px-4 py-2 border-2 border-gray-200 rounded-xl font-semibold focus:border-red-400 focus:outline-none"
                                >
                                    <option value="featured">Featured</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="rating">Top Rated</option>
                                    <option value="discount">Best Discount</option>
                                </select>

                                {/* View Toggle */}
                                <div className="flex bg-gray-100 rounded-xl p-1">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white shadow' : ''
                                            }`}
                                    >
                                        <FiGrid size={20} />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white shadow' : ''
                                            }`}
                                    >
                                        <FiList size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Products */}
                        <motion.div
                            layout
                            className={
                                viewMode === 'grid'
                                    ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                                    : 'space-y-4'
                            }
                        >
                            <AnimatePresence mode="popLayout">
                                {filteredProducts.map((product, index) => {
                                    const discountedPrice = product.price * (1 - product.discountPercentage / 100)

                                    return (
                                        <motion.div
                                            key={product.id}
                                            layout
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ delay: index * 0.02 }}
                                            onHoverStart={() => setHoveredProduct(product.id)}
                                            onHoverEnd={() => setHoveredProduct(null)}
                                            className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden group ${viewMode === 'list' ? 'flex' : ''
                                                }`}
                                        >
                                            {/* Image */}
                                            <div className={`relative bg-white ${viewMode === 'grid' ? 'aspect-square' : 'w-48'
                                                } overflow-hidden`}>
                                                {product.discountPercentage > 0 && (
                                                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-black shadow-lg z-10">
                                                        -{Math.round(product.discountPercentage)}%
                                                    </div>
                                                )}
                                                <Image
                                                    src={product.thumbnail}
                                                    alt={product.title}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                            </div>

                                            {/* Info */}
                                            <div className="p-6 flex-1">
                                                <div className="text-xs text-red-500 font-bold mb-2 capitalize">{product.category}</div>
                                                <h3 className="text-lg font-black text-gray-800 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
                                                    {product.title}
                                                </h3>
                                                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>

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
                                                <div className="text-sm mb-4">
                                                    {product.stock > 0 ? (
                                                        <span className="text-green-600 font-semibold">In Stock ({product.stock})</span>
                                                    ) : (
                                                        <span className="text-red-600 font-semibold">Out of Stock</span>
                                                    )}
                                                </div>

                                                {/* Actions */}
                                                <div className="flex gap-2">
                                                    <motion.button
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        onClick={() => handleAddToCart(product)}
                                                        disabled={product.stock === 0}
                                                        className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${product.stock > 0
                                                                ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white hover:shadow-lg'
                                                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                            }`}
                                                    >
                                                        <FiShoppingCart />
                                                        Add to Cart
                                                    </motion.button>
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        className="w-12 h-12 bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-500 rounded-xl flex items-center justify-center transition-colors"
                                                    >
                                                        <FiHeart />
                                                    </motion.button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )
                                })}
                            </AnimatePresence>
                        </motion.div>

                        {/* No Results */}
                        {filteredProducts.length === 0 && !loading && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-20"
                            >
                                <div className="text-8xl mb-6">🔍</div>
                                <h3 className="text-2xl font-black text-gray-800 mb-2">No Products Found</h3>
                                <p className="text-gray-600 mb-8">Try adjusting your filters or search terms</p>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        setSelectedCategory('all')
                                        setSearchQuery('')
                                    }}
                                    className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-3 rounded-2xl font-bold"
                                >
                                    Reset Filters
                                </motion.button>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}