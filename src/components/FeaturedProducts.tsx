'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { FiShoppingCart, FiHeart, FiArrowRight, FiStar } from 'react-icons/fi'
import { useCartStore } from '@/store/cartStore'

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

export default function FeaturedProducts() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const { addItem, openCart } = useCartStore()

    useEffect(() => {
        fetch('https://dummyjson.com/products?limit=8')
            .then(res => res.json())
            .then(data => {
                setProducts(data.products)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [])

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

    return (
        <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-20">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-bold mb-4"
                    >
                        ⭐ HANDPICKED FOR YOU
                    </motion.div>
                    <h2 className="text-6xl font-black text-gray-800 mb-4">Featured Products</h2>
                    <div className="w-32 h-2 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 mx-auto rounded-full mb-6" />
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Discover our carefully selected collection of premium products
                    </p>
                </motion.div>

                {loading ? (
                    <div className="text-center py-20">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="text-8xl mx-auto mb-6"
                        >
                            ⚙️
                        </motion.div>
                        <p className="text-2xl font-black text-gray-700">Loading amazing products...</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                            {products.map((product, index) => {
                                const discountedPrice = product.price * (1 - product.discountPercentage / 100)
                                return (
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ y: -15, scale: 1.02 }}
                                        className="bg-white rounded-3xl shadow-2xl overflow-hidden group relative"
                                    >
                                        {/* Discount Badge */}
                                        {product.discountPercentage > 0 && (
                                            <motion.div
                                                initial={{ scale: 0, rotate: -180 }}
                                                whileInView={{ scale: 1, rotate: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: index * 0.1 + 0.2 }}
                                                className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-black shadow-2xl z-10"
                                            >
                                                -{Math.round(product.discountPercentage)}% OFF
                                            </motion.div>
                                        )}

                                        {/* Image */}
                                        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                                            <Image
                                                src={product.thumbnail}
                                                alt={product.title}
                                                fill
                                                className="object-cover group-hover:scale-125 transition-transform duration-700"
                                            />
                                            {/* Overlay on hover */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </div>

                                        {/* Content */}
                                        <div className="p-6">
                                            <div className="text-xs text-purple-600 font-black mb-2 uppercase tracking-wider">
                                                {product.category}
                                            </div>
                                            <h3 className="text-xl font-black text-gray-800 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
                                                {product.title}
                                            </h3>

                                            {/* Rating */}
                                            <div className="flex items-center gap-2 mb-4">
                                                <div className="flex text-yellow-400">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <motion.span
                                                            key={star}
                                                            initial={{ opacity: 0, scale: 0 }}
                                                            whileInView={{ opacity: 1, scale: 1 }}
                                                            viewport={{ once: true }}
                                                            transition={{ delay: index * 0.1 + star * 0.05 }}
                                                        >
                                                            {star <= Math.floor(product.rating) ? '⭐' : '☆'}
                                                        </motion.span>
                                                    ))}
                                                </div>
                                                <span className="text-sm text-gray-600 font-semibold">({product.rating})</span>
                                            </div>

                                            {/* Price */}
                                            <div className="flex items-baseline gap-3 mb-4">
                                                <span className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                                    ${discountedPrice.toFixed(2)}
                                                </span>
                                                {product.discountPercentage > 0 && (
                                                    <span className="text-lg text-gray-400 line-through">
                                                        ${product.price}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Stock Status */}
                                            <div className="mb-4">
                                                {product.stock > 0 ? (
                                                    <div className="flex items-center gap-2 text-green-600 text-sm font-bold">
                                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                                        In Stock ({product.stock} left)
                                                    </div>
                                                ) : (
                                                    <div className="text-red-600 text-sm font-bold">Out of Stock</div>
                                                )}
                                            </div>

                                            {/* Actions */}
                                            <div className="flex gap-3">
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => handleAddToCart(product)}
                                                    disabled={product.stock === 0}
                                                    className={`flex-1 py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-xl transition-all ${
                                                        product.stock > 0
                                                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-2xl'
                                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                    }`}
                                                >
                                                    <FiShoppingCart size={18} />
                                                    Add to Cart
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.15 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="w-14 h-14 bg-gradient-to-br from-red-50 to-pink-50 hover:from-red-100 hover:to-pink-100 text-red-500 rounded-2xl flex items-center justify-center transition-all shadow-lg hover:shadow-xl"
                                                >
                                                    <FiHeart size={20} />
                                                </motion.button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>

                        {/* View All Button */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <Link href="/products">
                                <motion.button
                                    whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white px-12 py-6 rounded-2xl font-black text-2xl shadow-2xl inline-flex items-center gap-4 relative overflow-hidden"
                                >
                                    <motion.div
                                        animate={{ x: [-200, 400] }}
                                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                                    />
                                    <span className="relative z-10">View All Products</span>
                                    <FiArrowRight size={28} />
                                </motion.button>
                            </Link>
                        </motion.div>
                    </>
                )}
            </div>
        </div>
    )
}