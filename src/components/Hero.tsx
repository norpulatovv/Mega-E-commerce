'use client'

import { motion } from 'framer-motion'
import { FiShoppingBag, FiTrendingUp, FiZap, FiStar } from 'react-icons/fi'
import { useState, useEffect } from 'react'

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0)

    const slides = [
        {
            title: "Summer Collection 2024",
            subtitle: "Up to 70% OFF",
            description: "Discover the hottest trends of the season",
            bgColor: "from-blue-600 via-purple-600 to-pink-600"
        },
        {
            title: "Electronics Sale",
            subtitle: "Best Deals Ever",
            description: "Premium gadgets at unbeatable prices",
            bgColor: "from-cyan-600 via-blue-600 to-indigo-600"
        },
        {
            title: "Fashion Week Special",
            subtitle: "New Arrivals",
            description: "Be the first to grab exclusive items",
            bgColor: "from-rose-600 via-pink-600 to-fuchsia-600"
        }
    ]

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])

    const features = [
        { icon: FiShoppingBag, value: "10K+", label: "Products" },
        { icon: FiTrendingUp, value: "50K+", label: "Happy Customers" },
        { icon: FiZap, value: "24/7", label: "Support" },
        { icon: FiStar, value: "4.9", label: "Rating" }
    ]

    return (
        <section className={`relative min-h-screen bg-gradient-to-r ${slides[currentSlide].bgColor} text-white overflow-hidden transition-all duration-1000`}>
            {/* Animated Background Circles */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [360, 180, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-3xl"
                />
            </div>

            <div className="container mx-auto px-4 py-20 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
                    {/* Left Side - Content */}
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full"
                        >
                            <FiZap />
                            <span className="font-semibold">Limited Time Offer</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-5xl md:text-7xl font-bold leading-tight"
                        >
                            {slides[currentSlide].title}
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-3xl md:text-5xl font-bold text-yellow-300"
                        >
                            {slides[currentSlide].subtitle}
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-xl md:text-2xl text-white/90 max-w-xl"
                        >
                            {slides[currentSlide].description}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-wrap gap-4"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-white/50 transition-all flex items-center gap-2"
                            >
                                <FiShoppingBag />
                                Shop Now
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg backdrop-blur-sm bg-white/10 hover:bg-white hover:text-blue-600 transition-all"
                            >
                                Explore Deals
                            </motion.button>
                        </motion.div>

                        <div className="flex gap-3">
                            {slides.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`h-2 rounded-full transition-all ${currentSlide === index ? 'w-12 bg-white' : 'w-2 bg-white/50'
                                        }`}
                                />
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="hidden lg:block"
                    >
                        <motion.div
                            animate={{
                                y: [0, -20, 0],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="relative"
                        >
                            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
                                <div className="aspect-square flex items-center justify-center">
                                    <div className="text-center space-y-6">
                                        <motion.div
                                            animate={{
                                                rotate: [0, 10, -10, 0],
                                            }}
                                            transition={{
                                                duration: 3,
                                                repeat: Infinity,
                                            }}
                                            className="text-9xl"
                                        >
                                            🛍️
                                        </motion.div>
                                        <div className="space-y-2">
                                            <div className="text-2xl font-bold">Premium Quality</div>
                                            <div className="text-white/80">Trusted by thousands</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <motion.div
                                animate={{
                                    y: [0, -15, 0],
                                    rotate: [0, 5, 0]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    delay: 0.5
                                }}
                                className="absolute -top-8 -right-8 bg-yellow-400 text-yellow-900 p-6 rounded-2xl shadow-xl font-bold text-lg"
                            >
                                70% OFF
                            </motion.div>

                            <motion.div
                                animate={{
                                    y: [0, 15, 0],
                                    rotate: [0, -5, 0]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    delay: 1
                                }}
                                className="absolute -bottom-8 -left-8 bg-white text-blue-600 p-6 rounded-2xl shadow-xl font-bold text-lg"
                            >
                                Free Shipping
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20"
                        >
                            <div className="flex justify-center mb-3 text-3xl">
                                <feature.icon />
                            </div>
                            <div className="text-3xl font-bold mb-1">{feature.value}</div>
                            <div className="text-white/80">{feature.label}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                    <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" />
                </svg>
            </div>
        </section>
    )
}