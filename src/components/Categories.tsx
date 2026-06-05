'use client'

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import {
    FiMonitor, FiShoppingBag, FiHome, FiTruck, FiBook, FiMusic,
    FiWatch, FiCamera, FiCoffee, FiGift, FiHeart, FiZap,
    FiSmartphone, FiHeadphones, FiTv, FiStar, FiTrendingUp,
    FiPackage, FiAward, FiBox, FiShield, FiPercent
} from 'react-icons/fi'
import { useState, useRef, useEffect } from 'react'

export default function Categories() {
    const [activeTab, setActiveTab] = useState('all')
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const containerRef = useRef<HTMLDivElement>(null)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        })
    }

    const categories = [
        {
            id: 1,
            name: 'Electronics & Gadgets',
            icon: FiMonitor,
            gradient: 'from-blue-500 via-blue-600 to-cyan-500',
            hoverGradient: 'from-blue-600 via-cyan-500 to-blue-700',
            count: '12,547',
            trending: true,
            discount: '25% OFF',
            emoji: '💻',
            bgPattern: 'electronics',
            tags: ['Laptops', 'Phones', 'Tablets'],
            newArrivals: 234
        },
        {
            id: 2,
            name: 'Fashion & Apparel',
            icon: FiShoppingBag,
            gradient: 'from-pink-500 via-rose-500 to-red-500',
            hoverGradient: 'from-pink-600 via-rose-600 to-red-600',
            count: '23,891',
            trending: true,
            discount: '40% OFF',
            emoji: '👗',
            bgPattern: 'fashion',
            tags: ['Clothing', 'Shoes', 'Bags'],
            newArrivals: 567
        },
        {
            id: 3,
            name: 'Home & Living',
            icon: FiHome,
            gradient: 'from-green-500 via-emerald-500 to-teal-500',
            hoverGradient: 'from-green-600 via-emerald-600 to-teal-600',
            count: '8,234',
            trending: false,
            discount: '15% OFF',
            emoji: '🏠',
            bgPattern: 'home',
            tags: ['Furniture', 'Decor', 'Kitchen'],
            newArrivals: 123
        },
        {
            id: 4,
            name: 'Sports & Fitness',
            icon: FiTruck,
            gradient: 'from-orange-500 via-amber-500 to-yellow-500',
            hoverGradient: 'from-orange-600 via-amber-600 to-yellow-600',
            count: '5,987',
            trending: true,
            discount: '30% OFF',
            emoji: '⚽',
            bgPattern: 'sports',
            tags: ['Equipment', 'Apparel', 'Nutrition'],
            newArrivals: 89
        },
        {
            id: 5,
            name: 'Books & Stationery',
            icon: FiBook,
            gradient: 'from-purple-500 via-violet-500 to-indigo-500',
            hoverGradient: 'from-purple-600 via-violet-600 to-indigo-600',
            count: '15,156',
            trending: false,
            discount: '20% OFF',
            emoji: '📚',
            bgPattern: 'books',
            tags: ['Fiction', 'Education', 'Comics'],
            newArrivals: 345
        },
        {
            id: 6,
            name: 'Audio & Music',
            icon: FiMusic,
            gradient: 'from-red-500 via-pink-500 to-purple-500',
            hoverGradient: 'from-red-600 via-pink-600 to-purple-600',
            count: '4,876',
            trending: true,
            discount: '35% OFF',
            emoji: '🎵',
            bgPattern: 'music',
            tags: ['Headphones', 'Speakers', 'Instruments'],
            newArrivals: 156
        },
        {
            id: 7,
            name: 'Watches & Jewelry',
            icon: FiWatch,
            gradient: 'from-yellow-500 via-orange-500 to-red-500',
            hoverGradient: 'from-yellow-600 via-orange-600 to-red-600',
            count: '3,543',
            trending: false,
            discount: '50% OFF',
            emoji: '⌚',
            bgPattern: 'watches',
            tags: ['Luxury', 'Smart', 'Casual'],
            newArrivals: 67
        },
        {
            id: 8,
            name: 'Photography & Cameras',
            icon: FiCamera,
            gradient: 'from-indigo-500 via-blue-500 to-cyan-500',
            hoverGradient: 'from-indigo-600 via-blue-600 to-cyan-600',
            count: '2,432',
            trending: true,
            discount: '28% OFF',
            emoji: '📷',
            bgPattern: 'photo',
            tags: ['DSLR', 'Mirrorless', 'Accessories'],
            newArrivals: 45
        },
        {
            id: 9,
            name: 'Food & Groceries',
            icon: FiCoffee,
            gradient: 'from-amber-500 via-yellow-500 to-orange-500',
            hoverGradient: 'from-amber-600 via-yellow-600 to-orange-600',
            count: '18,987',
            trending: false,
            discount: '10% OFF',
            emoji: '☕',
            bgPattern: 'food',
            tags: ['Organic', 'Beverages', 'Snacks'],
            newArrivals: 789
        },
        {
            id: 10,
            name: 'Gifts & Collectibles',
            icon: FiGift,
            gradient: 'from-teal-500 via-cyan-500 to-blue-500',
            hoverGradient: 'from-teal-600 via-cyan-600 to-blue-600',
            count: '6,654',
            trending: true,
            discount: '45% OFF',
            emoji: '🎁',
            bgPattern: 'gifts',
            tags: ['Birthday', 'Anniversary', 'Special'],
            newArrivals: 234
        },
        {
            id: 11,
            name: 'Beauty & Cosmetics',
            icon: FiHeart,
            gradient: 'from-rose-500 via-pink-500 to-fuchsia-500',
            hoverGradient: 'from-rose-600 via-pink-600 to-fuchsia-600',
            count: '14,210',
            trending: true,
            discount: '38% OFF',
            emoji: '💄',
            bgPattern: 'beauty',
            tags: ['Skincare', 'Makeup', 'Fragrance'],
            newArrivals: 456
        },
        {
            id: 12,
            name: 'Gaming & Console',
            icon: FiZap,
            gradient: 'from-violet-500 via-purple-500 to-indigo-500',
            hoverGradient: 'from-violet-600 via-purple-600 to-indigo-600',
            count: '9,765',
            trending: true,
            discount: '32% OFF',
            emoji: '🎮',
            bgPattern: 'gaming',
            tags: ['PS5', 'Xbox', 'PC Gaming'],
            newArrivals: 234
        },
        {
            id: 13,
            name: 'Smartphones & Tablets',
            icon: FiSmartphone,
            gradient: 'from-sky-500 via-blue-500 to-indigo-500',
            hoverGradient: 'from-sky-600 via-blue-600 to-indigo-600',
            count: '11,234',
            trending: true,
            discount: '22% OFF',
            emoji: '📱',
            bgPattern: 'phones',
            tags: ['iPhone', 'Android', 'Tablets'],
            newArrivals: 345
        },
        {
            id: 14,
            name: 'Audio Accessories',
            icon: FiHeadphones,
            gradient: 'from-fuchsia-500 via-purple-500 to-violet-500',
            hoverGradient: 'from-fuchsia-600 via-purple-600 to-violet-600',
            count: '7,890',
            trending: false,
            discount: '27% OFF',
            emoji: '🎧',
            bgPattern: 'audio',
            tags: ['Earbuds', 'Headsets', 'Speakers'],
            newArrivals: 123
        },
        {
            id: 15,
            name: 'TV & Entertainment',
            icon: FiTv,
            gradient: 'from-slate-500 via-gray-500 to-zinc-500',
            hoverGradient: 'from-slate-600 via-gray-600 to-zinc-600',
            count: '4,567',
            trending: false,
            discount: '18% OFF',
            emoji: '📺',
            bgPattern: 'tv',
            tags: ['Smart TV', 'Streaming', '4K'],
            newArrivals: 67
        },
        {
            id: 16,
            name: 'Premium & Luxury',
            icon: FiAward,
            gradient: 'from-yellow-400 via-amber-500 to-orange-500',
            hoverGradient: 'from-yellow-500 via-amber-600 to-orange-600',
            count: '1,234',
            trending: true,
            discount: '15% OFF',
            emoji: '💎',
            bgPattern: 'luxury',
            tags: ['Designer', 'Limited', 'Exclusive'],
            newArrivals: 23
        },
    ]

    const tabs = [
        { id: 'all', label: 'All Categories', icon: FiPackage },
        { id: 'trending', label: 'Trending', icon: FiTrendingUp },
        { id: 'deals', label: 'Best Deals', icon: FiPercent },
        { id: 'new', label: 'New Arrivals', icon: FiStar },
    ]

    const filteredCategories = categories.filter(cat => {
        if (activeTab === 'all') return true
        if (activeTab === 'trending') return cat.trending
        if (activeTab === 'deals') return parseInt(cat.discount) >= 30
        if (activeTab === 'new') return cat.newArrivals > 200
        return true
    })

    return (
        <section className="py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        opacity: [0.03, 0.05, 0.03]
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute top-20 -right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [90, 0, 90],
                        opacity: [0.03, 0.05, 0.03]
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute -bottom-20 -left-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl"
                />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 px-8 py-3 rounded-full mb-6 font-bold shadow-lg"
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        >
                            <FiPackage/>
                        </motion.div>
                        <span>16+ Categories</span>
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-2 h-2 bg-green-500 rounded-full"
                        />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 mb-6"
                    >
                        Explore Categories
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                    >
                        Discover thousands of products across 16+ categories.
                        <span className="text-blue-600 font-semibold"> Premium quality</span>,
                        <span className="text-purple-600 font-semibold"> unbeatable prices</span>,
                        and <span className="text-green-600 font-semibold">fast delivery</span>!
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7 }}
                        className="flex flex-wrap justify-center gap-8 mt-8"
                    >
                        {[
                            { icon: FiBox, value: '50K+', label: 'Products' },
                            { icon: FiShield, value: '100%', label: 'Authentic' },
                            { icon: FiTrendingUp, value: '4.9★', label: 'Rating' },
                            { icon: FiPercent, value: '70%', label: 'Max Discount' },
                        ].map((stat, i) => {
                            const StatIcon = stat.icon
                            return (
                                <motion.div
                                    key={i}
                                    whileHover={{ scale: 1.1, y: -5 }}
                                    className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-lg"
                                >
                                    <div className="text-blue-600">
                                        <StatIcon />
                                    </div>
                                    <div>
                                        <div className="font-bold text-2xl text-gray-800">{stat.value}</div>
                                        <div className="text-sm text-gray-500">{stat.label}</div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-4 mb-12"
                >
                    {tabs.map((tab) => {
                        const TabIcon = tab.icon
                        return (
                            <motion.button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-lg ${activeTab === tab.id
                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl'
                                        : 'bg-white text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                <TabIcon />
                                <span>{tab.label}</span>
                                {activeTab === tab.id && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="w-2 h-2 bg-yellow-300 rounded-full"
                                        transition={{ type: "spring", stiffness: 300 }}
                                    />
                                )}
                            </motion.button>
                        )
                    })}
                </motion.div>

                <motion.div
                    ref={containerRef}
                    onMouseMove={handleMouseMove}
                    layout
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8"
                >
                    {filteredCategories.map((category, index) => {
                        const IconComponent = category.icon
                        const isHovered = hoveredIndex === index

                        return (
                            <motion.div
                                key={category.id}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                onHoverStart={() => setHoveredIndex(index)}
                                onHoverEnd={() => setHoveredIndex(null)}
                                whileHover={{ zIndex: 10 }}
                                className="group cursor-pointer"
                            >
                                <motion.div
                                    whileHover={{
                                        y: -15,
                                        rotateX: 5,
                                        rotateY: 5,
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className="relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
                                    style={{
                                        transformStyle: 'preserve-3d',
                                    }}
                                >
                                    {category.trending && (
                                        <motion.div
                                            initial={{ scale: 0, rotate: -45 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg z-20"
                                        >
                                            <FiTrendingUp />
                                            HOT
                                        </motion.div>
                                    )}

                                    <motion.div
                                        initial={{ x: -100, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: index * 0.1 + 0.2 }}
                                        className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg z-20"
                                    >
                                        {category.discount}
                                    </motion.div>

                                    {/* Gradient Background */}
                                    <motion.div
                                        animate={{
                                            opacity: isHovered ? 0.15 : 0.05,
                                            scale: isHovered ? 1.1 : 1,
                                        }}
                                        className={`absolute inset-0 bg-gradient-to-br ${isHovered ? category.hoverGradient : category.gradient}`}
                                    />

                                    <div className="absolute inset-0 opacity-5">
                                        <motion.div
                                            animate={{
                                                backgroundPosition: isHovered ? ['0% 0%', '100% 100%'] : '0% 0%',
                                            }}
                                            transition={{ duration: 20, repeat: Infinity }}
                                            className="w-full h-full"
                                            style={{
                                                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, currentColor 10px, currentColor 20px)',
                                            }}
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-10 p-6">
                                        <motion.div
                                            animate={{
                                                rotateY: isHovered ? [0, 360] : 0,
                                                scale: isHovered ? 1.15 : 1,
                                            }}
                                            transition={{
                                                rotateY: { duration: 0.8 },
                                                scale: { duration: 0.3 }
                                            }}
                                            className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mx-auto mb-4 shadow-2xl relative`}
                                            style={{
                                                transformStyle: 'preserve-3d',
                                            }}
                                        >
                                            <motion.div
                                                animate={{
                                                    scale: isHovered ? [1, 1.5, 1] : 1,
                                                    opacity: isHovered ? [0.5, 0, 0.5] : 0,
                                                }}
                                                transition={{ duration: 1.5, repeat: Infinity }}
                                                className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${category.gradient} blur-xl`}
                                            />

                                            <div className="text-white relative z-10">
                                                <IconComponent />
                                            </div>
                                        </motion.div>

                                        <motion.div
                                            animate={{
                                                y: isHovered ? [-10, 10, -10] : 0,
                                                rotate: isHovered ? [0, 5, -5, 0] : 0,
                                                scale: isHovered ? [1, 1.1, 1] : 1,
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: isHovered ? Infinity : 0,
                                            }}
                                            className="text-6xl text-center mb-4 filter drop-shadow-2xl"
                                        >
                                            {category.emoji}
                                        </motion.div>

                                        <h3 className="text-center text-lg font-black text-gray-800 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all">
                                            {category.name}
                                        </h3>

                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="text-center mb-3"
                                        >
                                            <span className="text-sm font-bold text-gray-600 bg-gray-100 px-4 py-2 rounded-full inline-flex items-center gap-2">
                                                <FiBox />
                                                {category.count} items
                                            </span>
                                        </motion.div>

                                        <div className="flex flex-wrap gap-2 justify-center mb-3">
                                            {category.tags.slice(0, 2).map((tag, i) => (
                                                <motion.span
                                                    key={i}
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ delay: index * 0.05 + i * 0.1 }}
                                                    className="text-xs bg-white/50 backdrop-blur-sm px-2 py-1 rounded-full text-gray-700 font-semibold"
                                                >
                                                    {tag}
                                                </motion.span>
                                            ))}
                                        </div>

                                        {category.newArrivals > 100 && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="text-center"
                                            >
                                                <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold inline-flex items-center gap-1">
                                                    <FiStar />
                                                    {category.newArrivals} New
                                                </span>
                                            </motion.div>
                                        )}

                                        <motion.div
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{
                                                opacity: isHovered ? 1 : 0,
                                                scale: isHovered ? 1 : 0,
                                                rotate: isHovered ? 360 : 0
                                            }}
                                            transition={{ duration: 0.5 }}
                                            className="absolute bottom-4 right-4 w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white shadow-xl"
                                        >
                                            →
                                        </motion.div>
                                    </div>

                                    <motion.div
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: isHovered ? 1 : 0 }}
                                        transition={{ duration: 0.4 }}
                                        className={`absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r ${category.gradient} origin-left`}
                                    />

                                    <motion.div
                                        animate={{
                                            x: isHovered ? ['-100%', '100%'] : '-100%',
                                        }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: isHovered ? Infinity : 0,
                                            ease: "linear"
                                        }}
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                        style={{
                                            transform: 'skewX(-20deg)',
                                        }}
                                    />
                                </motion.div>
                            </motion.div>
                        )
                    })}
                </motion.div>

                {/* Load More Section */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-20"
                >
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-12 py-5 rounded-full font-black text-xl shadow-2xl hover:shadow-3xl transition-all overflow-hidden group"
                    >
                        {/* Button Glow */}
                        <motion.div
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.5, 0, 0.5],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                            }}
                            className="absolute inset-0 bg-white/30 rounded-full blur-xl"
                        />

                        <span className="relative z-10 flex items-center gap-3">
                            <FiPackage />
                            <span>Explore All Categories</span>
                            <motion.span
                                animate={{ x: [0, 10, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                →
                            </motion.span>
                        </span>

                        {/* Animated Border */}
                        <motion.div
                            animate={{
                                rotate: 360,
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            className="absolute inset-0 rounded-full"
                            style={{
                                background: 'conic-gradient(from 0deg, transparent, rgba(255,255,255,0.3), transparent)',
                            }}
                        />
                    </motion.button>

                    {/* Additional Info */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7 }}
                        className="mt-6 text-gray-600 text-lg"
                    >
                        Can't find what you're looking for?
                        <motion.span
                            whileHover={{ scale: 1.05 }}
                            className="text-blue-600 font-bold cursor-pointer ml-2"
                        >
                            Contact Support →
                        </motion.span>
                    </motion.p>
                </motion.div>
            </div>
        </section>
    )
}