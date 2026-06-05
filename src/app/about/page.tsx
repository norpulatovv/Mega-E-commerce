'use client'

import { motion } from 'framer-motion'
import {
    FiTrendingUp, FiUsers, FiPackage, FiAward,
    FiHeart, FiShield, FiZap, FiGlobe,
    FiMail, FiPhone, FiMapPin, FiStar
} from 'react-icons/fi'
import Link from 'next/link'

export default function AboutPage() {
    const stats = [
        { icon: FiUsers, value: '10M+', label: 'Happy Customers', color: 'from-blue-500 to-blue-600' },
        { icon: FiPackage, value: '50K+', label: 'Products', color: 'from-green-500 to-green-600' },
        { icon: FiGlobe, value: '100+', label: 'Countries', color: 'from-orange-500 to-orange-600' },
        { icon: FiAward, value: '25+', label: 'Awards Won', color: 'from-purple-500 to-purple-600' },
    ]

    const timeline = [
        { year: '2018', title: 'Founded', description: 'MegaShop was born with a vision to revolutionize online shopping' },
        { year: '2019', title: 'First Million', description: 'Reached 1 million satisfied customers worldwide' },
        { year: '2021', title: 'Global Expansion', description: 'Expanded operations to 50+ countries' },
        { year: '2023', title: 'Innovation Award', description: 'Won Best E-commerce Platform award' },
        { year: '2024', title: 'Today', description: '10M+ customers trust us for their shopping needs' },
    ]

    const values = [
        {
            icon: FiHeart,
            title: 'Customer First',
            description: 'Everything we do is centered around making your shopping experience amazing',
            color: 'from-red-500 to-pink-500'
        },
        {
            icon: FiShield,
            title: 'Trust & Security',
            description: 'Your data and payments are protected with industry-leading security',
            color: 'from-blue-500 to-cyan-500'
        },
        {
            icon: FiZap,
            title: 'Fast Delivery',
            description: 'Lightning-fast shipping to get your products to you as quickly as possible',
            color: 'from-yellow-500 to-orange-500'
        },
        {
            icon: FiStar,
            title: 'Quality Products',
            description: 'We partner with the best brands to bring you top-quality products',
            color: 'from-purple-500 to-indigo-500'
        },
    ]

    const team = [
        { name: 'Sarah Johnson', role: 'CEO & Founder', avatar: '👩‍💼', color: 'from-pink-500 to-rose-500' },
        { name: 'Michael Chen', role: 'CTO', avatar: '👨‍💻', color: 'from-blue-500 to-cyan-500' },
        { name: 'Emily Davis', role: 'Head of Design', avatar: '👩‍🎨', color: 'from-purple-500 to-indigo-500' },
        { name: 'James Wilson', role: 'Head of Operations', avatar: '👨‍💼', color: 'from-green-500 to-emerald-500' },
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-red-600 via-orange-600 to-yellow-600 py-24 overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 overflow-hidden">
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
                            className="absolute w-64 h-64 bg-white/10 rounded-full blur-3xl"
                            style={{
                                top: `${(i * 20) % 100}%`,
                                left: `${(i * 30) % 100}%`,
                            }}
                        />
                    ))}
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center text-white max-w-4xl mx-auto"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 200 }}
                            className="text-7xl mb-6"
                        >
                            🚀
                        </motion.div>
                        <h1 className="text-6xl font-black mb-6">About MegaShop</h1>
                        <p className="text-2xl opacity-90 mb-8 leading-relaxed">
                            We're on a mission to make online shopping <span className="font-black">simple</span>, 
                            <span className="font-black"> fast</span>, and <span className="font-black">enjoyable</span> for everyone
                        </p>
                        <div className="flex items-center justify-center gap-4">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link href="/products" className="bg-white text-red-600 px-8 py-4 rounded-2xl font-black text-lg shadow-2xl hover:shadow-xl transition-all inline-block">
                                    Start Shopping
                                </Link>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link href="#contact" className="bg-white/20 backdrop-blur text-white px-8 py-4 rounded-2xl font-black text-lg border-2 border-white/30 hover:bg-white/30 transition-all inline-block">
                                    Contact Us
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="container mx-auto px-4 -mt-16 relative z-10 mb-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-white rounded-3xl p-8 shadow-2xl text-center"
                        >
                            <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                                <stat.icon size={32} />
                            </div>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: index * 0.1 + 0.3, type: 'spring' }}
                                className="text-5xl font-black text-gray-800 mb-2"
                            >
                                {stat.value}
                            </motion.div>
                            <div className="text-gray-600 font-semibold">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Story Section */}
            <div className="bg-white py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-5xl font-black text-gray-800 mb-6">Our Story</h2>
                            <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-orange-600 mx-auto mb-8 rounded-full" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="prose prose-lg max-w-none"
                        >
                            <p className="text-xl text-gray-700 leading-relaxed mb-6">
                                Founded in 2018, <span className="font-black text-red-600">MegaShop</span> started with a simple idea: 
                                make online shopping as easy and enjoyable as walking into your favorite store.
                            </p>
                            <p className="text-xl text-gray-700 leading-relaxed mb-6">
                                What began as a small team of passionate entrepreneurs has grown into a global platform 
                                serving <span className="font-black">millions of customers</span> across 
                                <span className="font-black"> 100+ countries</span>. But our mission remains the same: 
                                put customers first, every single time.
                            </p>
                            <p className="text-xl text-gray-700 leading-relaxed">
                                Today, we're proud to offer over <span className="font-black">50,000 products</span> from 
                                the world's best brands, with lightning-fast delivery and industry-leading customer service. 
                                And we're just getting started.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Timeline */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-5xl font-black text-gray-800 mb-6">Our Journey</h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-orange-600 mx-auto rounded-full" />
                    </motion.div>

                    <div className="max-w-4xl mx-auto">
                        {timeline.map((item, index) => (
                            <motion.div
                                key={item.year}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative pl-8 pb-12 border-l-4 border-red-200 last:pb-0"
                            >
                                <div className="absolute -left-3 top-0 w-6 h-6 bg-gradient-to-r from-red-600 to-orange-600 rounded-full shadow-lg" />
                                <div className="bg-white rounded-2xl p-6 shadow-lg ml-4">
                                    <div className="text-sm font-black text-red-600 mb-2">{item.year}</div>
                                    <h3 className="text-2xl font-black text-gray-800 mb-2">{item.title}</h3>
                                    <p className="text-gray-600">{item.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Values Section */}
            <div className="bg-white py-20">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-5xl font-black text-gray-800 mb-6">Our Values</h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-orange-600 mx-auto mb-6 rounded-full" />
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            These principles guide everything we do
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -10 }}
                                className="text-center"
                            >
                                <div className={`w-20 h-20 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl`}>
                                    <value.icon size={40} />
                                </div>
                                <h3 className="text-2xl font-black text-gray-800 mb-3">{value.title}</h3>
                                <p className="text-gray-600">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Team Section */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-5xl font-black text-gray-800 mb-6">Meet Our Team</h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-orange-600 mx-auto mb-6 rounded-full" />
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            The amazing people behind MegaShop
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                        {team.map((member, index) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -10 }}
                                className="bg-white rounded-3xl p-8 shadow-xl text-center"
                            >
                                <div className={`w-24 h-24 bg-gradient-to-br ${member.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg text-5xl`}>
                                    {member.avatar}
                                </div>
                                <h3 className="text-xl font-black text-gray-800 mb-1">{member.name}</h3>
                                <p className="text-gray-600 font-semibold">{member.role}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Contact CTA */}
            <div id="contact" className="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 py-20">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center text-white max-w-3xl mx-auto"
                    >
                        <h2 className="text-5xl font-black mb-6">Get In Touch</h2>
                        <p className="text-xl opacity-90 mb-12">
                            Have questions? We'd love to hear from you!
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                            <div className="bg-white/20 backdrop-blur rounded-2xl p-6">
                                <FiMail size={32} />
                                <div className="font-bold mb-2">Email Us</div>
                                <div className="text-sm opacity-90">support@megashop.com</div>
                            </div>
                            <div className="bg-white/20 backdrop-blur rounded-2xl p-6">
                                <FiPhone size={32} />
                                <div className="font-bold mb-2">Call Us</div>
                                <div className="text-sm opacity-90">+1 (555) 123-4567</div>
                            </div>
                            <div className="bg-white/20 backdrop-blur rounded-2xl p-6">
                                <FiMapPin size={32} />
                                <div className="font-bold mb-2">Visit Us</div>
                                <div className="text-sm opacity-90">123 Commerce St, NY</div>
                            </div>
                        </div>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link href="/products" className="bg-white text-red-600 px-10 py-5 rounded-2xl font-black text-xl shadow-2xl hover:shadow-xl transition-all inline-block">
                                Start Shopping Now 🛍️
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}