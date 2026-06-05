'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {
    FiClock,
    FiZap,
    FiShoppingCart,
    FiHeart,
    FiEye,
    FiTrendingUp,
    FiTag,
    FiPercent,
    FiCheck
} from 'react-icons/fi'
import { useState, useEffect } from 'react'
import { useCartStore } from '@/store/cartStore'

interface FlashProduct {
    id: number
    name: string
    image: string
    price: number
    originalPrice: number
    discount: number
    sold: number
    stock: number
    category: string
}

export default function FlashSale() {
    const [timeLeft, setTimeLeft] = useState({
        hours: 23,
        minutes: 59,
        seconds: 45
    })
    const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)
    const [addedProducts, setAddedProducts] = useState<number[]>([])
    const { addItem, openCart } = useCartStore()

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                let { hours, minutes, seconds } = prev
                if (seconds > 0) {
                    seconds--
                } else if (minutes > 0) {
                    minutes--
                    seconds = 59
                } else if (hours > 0) {
                    hours--
                    minutes = 59
                    seconds = 59
                } else {
                    return { hours: 23, minutes: 59, seconds: 59 }
                }
                return { hours, minutes, seconds }
            })
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    const handleAddToCart = (product: FlashProduct) => {
        addItem({
            id: String(product.id),
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.image,
            quantity: 1,
            category: product.category,
        })
        setAddedProducts(prev => [...prev, product.id])
        setTimeout(() => {
            setAddedProducts(prev => prev.filter(id => id !== product.id))
        }, 2000)
        openCart()
    }

    const products: FlashProduct[] = [
        {
            id: 1,
            name: 'AirPods Pro 2nd Gen',
            image: '🎧',
            price: 199,
            originalPrice: 249,
            discount: 20,
            sold: 234,
            stock: 500,
            category: 'Audio'
        },
        {
            id: 2,
            name: 'iPad Air M2',
            image: '📱',
            price: 599,
            originalPrice: 799,
            discount: 25,
            sold: 167,
            stock: 300,
            category: 'Tablets'
        },
        {
            id: 3,
            name: 'Apple Watch Ultra',
            image: '⌚',
            price: 699,
            originalPrice: 899,
            discount: 22,
            sold: 145,
            stock: 250,
            category: 'Wearables'
        },
        {
            id: 4,
            name: 'Magic Keyboard',
            image: '⌨️',
            price: 129,
            originalPrice: 179,
            discount: 28,
            sold: 312,
            stock: 400,
            category: 'Accessories'
        },
        {
            id: 5,
            name: 'HomePod Mini',
            image: '🔊',
            price: 79,
            originalPrice: 99,
            discount: 20,
            sold: 456,
            stock: 600,
            category: 'Smart Home'
        },
        {
            id: 6,
            name: 'MagSafe Battery',
            image: '🔋',
            price: 79,
            originalPrice: 99,
            discount: 20,
            sold: 289,
            stock: 450,
            category: 'Accessories'
        }
    ]

    const formatTime = (time: number) => String(time).padStart(2, '0')
    const soldPercentage = (sold: number, stock: number) => ((sold / stock) * 100).toFixed(0)

    return (
        <section className="py-24 bg-gradient-to-b from-white via-red-50 to-white relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(10)].map((_, i) => (
                    <motion.div
                        key={`flash-bg-${i}`}
                        animate={{
                            y: [0, -50, 0],
                            x: [0, 30, 0],
                            opacity: [0.02, 0.05, 0.02]
                        }}
                        transition={{
                            duration: 10 + i * 2,
                            repeat: Infinity,
                            delay: i
                        }}
                        className="absolute w-64 h-64 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-3xl"
                        style={{
                            top: `${i * 15}%`,
                            left: `${i * 10}%`
                        }}
                    />
                ))}
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-red-100 via-orange-100 to-yellow-100 text-red-600 px-8 py-3 rounded-full mb-6 font-bold shadow-lg"
                    >
                        <motion.div
                            animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <FiZap />
                        </motion.div>
                        <span className="text-lg">Flash Sale</span>
                        <motion.div
                            animate={{ scale: [1, 1.5, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        >
                            🔥
                        </motion.div>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-6xl md:text-7xl font-black mb-6"
                    >
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600">
                            Today's Hot Deals
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-xl md:text-2xl text-gray-600 mb-8"
                    >
                        Limited time offers -{' '}
                        <span className="text-red-600 font-bold">Grab them before they're gone!</span>
                    </motion.p>

                    {/* Countdown Timer */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="flex justify-center gap-4 mb-4"
                    >
                        {[
                            { label: 'Hours', value: timeLeft.hours },
                            { label: 'Minutes', value: timeLeft.minutes },
                            { label: 'Seconds', value: timeLeft.seconds }
                        ].map((item, i) => (
                            <motion.div key={item.label} whileHover={{ scale: 1.1, y: -5 }} className="relative">
                                <div className="bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl p-6 shadow-2xl min-w-[100px]">
                                    <motion.div
                                        key={item.value}
                                        initial={{ scale: 1.5, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                        className="text-5xl font-black text-white mb-2"
                                    >
                                        {formatTime(item.value)}
                                    </motion.div>
                                    <div className="text-sm font-bold text-white/80 uppercase">{item.label}</div>
                                </div>
                                {i < 2 && (
                                    <div className="absolute -right-2 top-1/2 -translate-y-1/2 text-4xl font-black text-red-600">:</div>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-red-600 font-bold text-lg flex items-center justify-center gap-2"
                    >
                        <FiClock />
                        Hurry! Sale ends soon
                    </motion.div>
                </motion.div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {products.map((product, index) => {
                        const percentage = soldPercentage(product.sold, product.stock)
                        const isLowStock = parseInt(percentage) > 70
                        const isAdded = addedProducts.includes(product.id)

                        return (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                onHoverStart={() => setHoveredProduct(product.id)}
                                onHoverEnd={() => setHoveredProduct(null)}
                                className="group cursor-pointer"
                            >
                                <motion.div
                                    whileHover={{ y: -10 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all relative"
                                >
                                    {/* Discount Badge */}
                                    <motion.div
                                        initial={{ scale: 0, rotate: -45 }}
                                        whileInView={{ scale: 1, rotate: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 + 0.2 }}
                                        className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-black shadow-lg z-20 flex items-center gap-1"
                                    >
                                        <FiPercent />
                                        -{product.discount}%
                                    </motion.div>

                                    {/* Wishlist Button */}
                                    <motion.button
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg z-20 text-gray-600 hover:text-red-500 transition-colors"
                                    >
                                        <FiHeart />
                                    </motion.button>

                                    {/* Product Image */}
                                    <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-8 aspect-square flex items-center justify-center">
                                        <motion.div
                                            animate={{
                                                y: hoveredProduct === product.id ? [-10, 10, -10] : 0,
                                                scale: hoveredProduct === product.id ? 1.1 : 1,
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: hoveredProduct === product.id ? Infinity : 0,
                                            }}
                                            className="text-9xl filter drop-shadow-2xl"
                                        >
                                            {product.image}
                                        </motion.div>

                                        {/* Hover Actions */}
                                        <AnimatePresence>
                                            {hoveredProduct === product.id && (
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center gap-3"
                                                >
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        className="bg-white text-gray-800 p-4 rounded-full shadow-xl"
                                                    >
                                                        <FiEye />
                                                    </motion.button>
                                                    <motion.button
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => handleAddToCart(product)}
                                                        className="bg-red-600 text-white p-4 rounded-full shadow-xl"
                                                    >
                                                        <FiShoppingCart />
                                                    </motion.button>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {/* Low Stock Warning */}
                                        {isLowStock && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="absolute bottom-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"
                                            >
                                                <FiTrendingUp />
                                                Almost Gone!
                                            </motion.div>
                                        )}
                                    </div>

                                    {/* Product Info */}
                                    <div className="p-6">
                                        <div className="text-sm text-red-600 font-semibold mb-2">{product.category}</div>
                                        <h3 className="text-xl font-black text-gray-800 mb-4 group-hover:text-red-600 transition-colors">
                                            {product.name}
                                        </h3>

                                        {/* Price */}
                                        <div className="flex items-baseline gap-3 mb-4">
                                            <div className="text-3xl font-black text-gray-800">${product.price}</div>
                                            <div className="text-lg text-gray-400 line-through">${product.originalPrice}</div>
                                            <div className="ml-auto text-sm font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                                                Save ${product.originalPrice - product.price}
                                            </div>
                                        </div>

                                        {/* Stock Progress */}
                                        <div className="mb-4">
                                            <div className="flex items-center justify-between text-sm mb-2">
                                                <span className="text-gray-600 font-semibold">
                                                    Sold: {product.sold}/{product.stock}
                                                </span>
                                                <span className="text-red-600 font-bold">{percentage}%</span>
                                            </div>
                                            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${percentage}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1, delay: index * 0.1 }}
                                                    className={`h-full rounded-full ${isLowStock
                                                        ? 'bg-gradient-to-r from-orange-500 to-red-500'
                                                        : 'bg-gradient-to-r from-green-500 to-emerald-500'
                                                        }`}
                                                />
                                            </div>
                                        </div>

                                        {/* Add to Cart Button */}
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleAddToCart(product)}
                                            className={`w-full py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 ${
                                                isAdded
                                                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                                                    : 'bg-gradient-to-r from-red-600 to-orange-600 text-white'
                                            }`}
                                        >
                                            <AnimatePresence mode="wait">
                                                {isAdded ? (
                                                    <motion.div
                                                        key="added"
                                                        initial={{ scale: 0, opacity: 0 }}
                                                        animate={{ scale: 1, opacity: 1 }}
                                                        exit={{ scale: 0, opacity: 0 }}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <FiCheck />
                                                        <span>Added to Cart!</span>
                                                    </motion.div>
                                                ) : (
                                                    <motion.div
                                                        key="add"
                                                        initial={{ scale: 0, opacity: 0 }}
                                                        animate={{ scale: 1, opacity: 1 }}
                                                        exit={{ scale: 0, opacity: 0 }}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <FiShoppingCart />
                                                        <span>Add to Cart</span>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.button>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )
                    })}
                </div>

                {/* View All Button */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 text-white px-12 py-5 rounded-full font-black text-xl shadow-2xl overflow-hidden group"
                    >
                        <motion.div
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 bg-white/30 rounded-full blur-xl"
                        />
                        <span className="relative z-10 flex items-center gap-3">
                            <FiTag />
                            <span>View All Flash Deals</span>
                            <motion.span
                                animate={{ x: [0, 10, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                →
                            </motion.span>
                        </span>
                    </motion.button>
                </motion.div>
            </div>
        </section>
    )
}