'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import {
    FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter,
    FiInstagram, FiLinkedin, FiYoutube, FiSend,
    FiHeart, FiShoppingBag, FiTrendingUp, FiGift,
    FiShield, FiTruck, FiCreditCard, FiCheck
} from 'react-icons/fi'

// Deterministic pseudo-random particle positions.
// Computed once from index only (no Math.random, no useEffect),
// so server-rendered HTML and client HTML always match exactly.
const particles = Array.from({ length: 20 }, (_, i) => {
    const seed = i * 137.5
    return {
        left: seed % 100,
        top: (seed * 1.7) % 100,
        xOffset: (seed % 20) - 10,
        duration: 3 + (i % 3),
        delay: (i % 5) * 0.4,
    }
})

export default function Footer() {
    const [email, setEmail] = useState('')
    const [subscribed, setSubscribed] = useState(false)

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault()
        if (email) {
            setSubscribed(true)
            setTimeout(() => {
                setSubscribed(false)
                setEmail('')
            }, 3000)
        }
    }

    const quickLinks = [
        { name: 'About Us', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Careers', href: '/careers' },
    ]

    const shopLinks = [
        { name: 'All Products', href: '/products' },
        { name: 'Categories', href: '/categories' },
        { name: 'New Arrivals', href: '/products?new=true' },
        { name: 'Best Sellers', href: '/products?bestsellers=true' },
    ]

    const supportLinks = [
        { name: 'Shipping Info', href: '/shipping' },
        { name: 'Returns', href: '/returns' },
        { name: 'Track Order', href: '/track' },
        { name: 'Size Guide', href: '/size-guide' },
    ]

    const socialLinks = [
        { icon: FiFacebook, href: '#', color: 'hover:text-blue-600' },
        { icon: FiTwitter, href: '#', color: 'hover:text-sky-400' },
        { icon: FiInstagram, href: '#', color: 'hover:text-pink-600' },
        { icon: FiLinkedin, href: '#', color: 'hover:text-blue-700' },
        { icon: FiYoutube, href: '#', color: 'hover:text-red-600' },
    ]

    const features = [
        { icon: FiTruck, text: 'Free Shipping', desc: 'On orders $100+' },
        { icon: FiShield, text: 'Secure Payment', desc: '100% Protected' },
        { icon: FiCreditCard, text: 'Easy Returns', desc: '30 Days Policy' },
        { icon: FiGift, text: 'Gift Cards', desc: 'Available Now' },
    ]

    return (
        <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">

            {/* Animated Wave Background */}
            <div className="absolute inset-0 overflow-hidden opacity-10">
                <motion.svg
                    className="absolute bottom-0 w-full"
                    viewBox="0 0 1440 320"
                    animate={{
                        translateX: [-50, 0, -50],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'linear'
                    }}
                >
                    <path
                        fill="currentColor"
                        d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,144C960,149,1056,139,1152,128C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                    />
                </motion.svg>
            </div>

            {/* Floating Particles (deterministic, hydration-safe) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {particles.map((p, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [0, -30, 0],
                            x: [0, p.xOffset, 0],
                            opacity: [0.2, 0.5, 0.2]
                        }}
                        transition={{
                            duration: p.duration,
                            repeat: Infinity,
                            delay: p.delay
                        }}
                        className="absolute w-2 h-2 bg-white rounded-full"
                        style={{
                            left: `${p.left}%`,
                            top: `${p.top}%`,
                        }}
                    />
                ))}
            </div>

            {/* Features Bar */}
            <div className="relative border-b border-white/10 py-8">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.text}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center gap-4"
                            >
                                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                                    <feature.icon size={24} />
                                </div>
                                <div>
                                    <div className="font-bold">{feature.text}</div>
                                    <div className="text-xs text-gray-400">{feature.desc}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="relative container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

                    {/* Company Info */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <Link href="/" className="inline-block mb-6">
                                <div className="text-5xl font-black bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                                    MegaShop
                                </div>
                            </Link>
                            <p className="text-gray-400 mb-6 leading-relaxed">
                                Your ultimate destination for quality products at amazing prices.
                                We bring you the best shopping experience with fast delivery and secure payments.
                            </p>

                            {/* Newsletter */}
                            <div className="bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10">
                                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                                    <FiMail />
                                    Subscribe to Newsletter
                                </h3>
                                <p className="text-sm text-gray-400 mb-4">Get exclusive deals & updates</p>
                                <form onSubmit={handleSubscribe} className="flex gap-2">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Your email"
                                        className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:border-red-400 text-white placeholder-gray-400"
                                        disabled={subscribed}
                                    />
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        type="submit"
                                        disabled={subscribed}
                                        className={`px-6 py-3 rounded-xl font-bold transition-all ${
                                            subscribed
                                                ? 'bg-green-500'
                                                : 'bg-gradient-to-r from-red-600 to-orange-600 hover:shadow-lg'
                                        }`}
                                    >
                                        {subscribed ? <FiCheck size={20} /> : <FiSend size={20} />}
                                    </motion.button>
                                </form>
                                {subscribed && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-green-400 text-sm mt-2 font-semibold"
                                    >
                                        ✓ Successfully subscribed!
                                    </motion.p>
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <h3 className="font-black text-xl mb-6">Quick Links</h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2 group"
                                    >
                                        <motion.span
                                            className="text-red-500"
                                            animate={{ x: [0, 5, 0] }}
                                            transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                                        >
                                            →
                                        </motion.span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Shop Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <h3 className="font-black text-xl mb-6">Shop</h3>
                        <ul className="space-y-3">
                            {shopLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2"
                                    >
                                        <motion.span
                                            className="text-orange-500"
                                            animate={{ x: [0, 5, 0] }}
                                            transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                                        >
                                            →
                                        </motion.span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Support Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <h3 className="font-black text-xl mb-6">Support</h3>
                        <ul className="space-y-3 mb-6">
                            {supportLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2"
                                    >
                                        <motion.span
                                            className="text-yellow-500"
                                            animate={{ x: [0, 5, 0] }}
                                            transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                                        >
                                            →
                                        </motion.span>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Contact Info */}
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center gap-2 text-gray-400">
                                <FiPhone/>
                                <span>+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                                <FiMail/>
                                <span>support@megashop.com</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-400">
                                <FiMapPin/>
                                <span>123 Commerce St, NY</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="relative border-t border-white/10 py-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">

                        {/* Copyright */}
                        <div className="text-gray-400 text-sm flex items-center gap-2">
                            © 2024 MegaShop. Made with
                            <motion.div
                                animate={{ scale: [1, 1.3, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                            >
                                <FiHeart/>
                            </motion.div>
                            by Amazing Team
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center gap-4">
                            <span className="text-gray-400 text-sm font-semibold">Follow Us:</span>
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.href}
                                    whileHover={{ scale: 1.2, y: -5 }}
                                    whileTap={{ scale: 0.9 }}
                                    className={`w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-gray-400 ${social.color} transition-all hover:bg-white/20`}
                                >
                                    <social.icon size={18} />
                                </motion.a>
                            ))}
                        </div>

                        {/* Payment Methods */}
                        <div className="flex items-center gap-3">
                            {['💳', '🅿️', '₿', '🏦'].map((icon, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -5 }}
                                    className="w-12 h-8 bg-white/10 rounded-lg flex items-center justify-center text-lg"
                                >
                                    {icon}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Back to Top Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center text-white shadow-2xl z-50"
            >
                <motion.div
                    animate={{ y: [-3, 3, -3] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                >
                    ↑
                </motion.div>
            </motion.button>
        </footer>
    )
}