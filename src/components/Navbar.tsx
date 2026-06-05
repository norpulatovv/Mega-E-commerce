'use client'

import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useAuthStore } from '@/store/authStore'
import { useState, useEffect } from 'react'
import {
    FiSearch, FiShoppingCart, FiUser, FiMenu, FiX,
    FiHeart, FiZap, FiGift, FiHome, FiGrid,
    FiInfo, FiChevronDown, FiPhone, FiMail,
    FiShield, FiTrendingUp
} from 'react-icons/fi'
import { useCartStore } from '@/store/cartStore'
import { useRouter } from 'next/navigation'

const Navbar = () => {
    const { user, isAuthenticated, logout } = useAuthStore()
    const router = useRouter()
    const [scrolled, setScrolled] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [megaMenuOpen, setMegaMenuOpen] = useState(false)
    const [showTopBar, setShowTopBar] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [wishlistCount, setWishlistCount] = useState(0)

    const { getTotalItems, openCart } = useCartStore()
    const cartItems = getTotalItems()
    const { scrollY } = useScroll()
    const navbarY = useTransform(scrollY, [0, 100], [0, -10])

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY
            setScrolled(currentScrollY > 20)
            setShowTopBar(currentScrollY < lastScrollY || currentScrollY < 100)
            setLastScrollY(currentScrollY)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [lastScrollY])

    const navLinks = [
        { href: '/', label: 'Home', icon: FiHome },
        { href: '/products', label: 'Products', icon: FiGrid },
        { href: '/categories', label: 'Categories', icon: FiTrendingUp, hasMegaMenu: true },
        { href: '/admin/products', label: 'Admin', icon: FiShield },
        { href: '/about', label: 'About', icon: FiInfo },
    ]

    const categories = [
        { name: 'Electronics', emoji: '📱', slug: 'smartphones', items: ['Phones', 'Laptops', 'Tablets', 'Cameras'] },
        { name: 'Fashion', emoji: '👕', slug: 'mens-shirts', items: ['Men', 'Women', 'Kids', 'Accessories'] },
        { name: 'Home & Garden', emoji: '🏡', slug: 'furniture', items: ['Furniture', 'Decor', 'Kitchen', 'Garden'] },
        { name: 'Sports', emoji: '⚽', slug: 'sports-accessories', items: ['Fitness', 'Outdoor', 'Team Sports', 'Cycling'] },
        { name: 'Books', emoji: '📚', slug: 'beauty', items: ['Fiction', 'Non-Fiction', 'Kids', 'Comics'] },
        { name: 'Toys', emoji: '🎮', slug: 'womens-jewellery', items: ['Action Figures', 'Board Games', 'Puzzles', 'Outdoor Toys'] },
    ]

    const trendingSearches = ['iPhone 15', 'Nike Air Max', 'PlayStation 5', 'MacBook Pro']

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            router.push(`/products?search=${encodeURIComponent(searchQuery)}`)
            setSearchOpen(false)
            setSearchQuery('')
        }
    }

    return (
        <>
            {/* Top Info Bar */}
            <AnimatePresence>
                {showTopBar && (
                    <motion.div
                        initial={{ height: 40, opacity: 1 }}
                        animate={{ height: scrolled ? 0 : 40, opacity: scrolled ? 0 : 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 overflow-hidden"
                    >
                        <div className="max-w-7xl mx-auto px-4 h-10 flex items-center justify-between text-white text-xs">
                            <motion.div
                                animate={{ x: [-20, 0] }}
                                transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                                className="flex items-center gap-2 font-bold"
                            >
                                <FiZap />
                                <span>Flash Sale! Up to 50% OFF - Limited Time Only!</span>
                                <FiGift />
                            </motion.div>
                            <div className="hidden md:flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <FiPhone size={12} />
                                    <span>+1 (555) 123-4567</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FiMail size={12} />
                                    <span>support@megashop.com</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Navbar */}
            <motion.nav
                style={{ y: navbarY }}
                className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
                        ? 'bg-white/98 backdrop-blur-xl shadow-2xl'
                        : 'bg-white shadow-md'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">

                        {/* Logo */}
                        <Link href="/" className="flex items-center group">
                            <motion.div
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative"
                            >
                                <motion.div
                                    className="text-4xl font-black bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent"
                                >
                                    MegaShop
                                </motion.div>
                                <motion.div
                                    className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 rounded-full"
                                    initial={{ scaleX: 0 }}
                                    whileHover={{ scaleX: 1 }}
                                    transition={{ duration: 0.3 }}
                                />
                                <motion.div
                                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    HOT
                                </motion.div>
                            </motion.div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-2">
                            {navLinks.map((link) => (
                                <div key={link.href} className="relative">
                                    {link.hasMegaMenu ? (
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onMouseEnter={() => setMegaMenuOpen(true)}
                                            onMouseLeave={() => setMegaMenuOpen(false)}
                                            className="flex items-center gap-2 px-5 py-3 text-gray-700 hover:text-red-600 font-bold rounded-2xl hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 transition-all group relative overflow-hidden"
                                        >
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 opacity-0 group-hover:opacity-10 transition-opacity"
                                            />
                                            <link.icon size={20} />
                                            <span>{link.label}</span>
                                            <motion.div
                                                animate={{ rotate: megaMenuOpen ? 180 : 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <FiChevronDown size={18} />
                                            </motion.div>
                                        </motion.button>
                                    ) : (
                                        <Link href={link.href}>
                                            <motion.div
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className={`flex items-center gap-2 px-5 py-3 font-bold rounded-2xl transition-all group relative overflow-hidden ${link.label === 'Admin'
                                                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                                                        : 'text-gray-700 hover:text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50'
                                                    }`}
                                            >
                                                {link.label !== 'Admin' && (
                                                    <motion.div
                                                        className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 opacity-0 group-hover:opacity-10 transition-opacity"
                                                    />
                                                )}
                                                <link.icon size={20} />
                                                <span>{link.label}</span>
                                            </motion.div>
                                        </Link>
                                    )}

                                    {/* Mega Menu Dropdown */}
                                    {link.hasMegaMenu && (
                                        <AnimatePresence>
                                            {megaMenuOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                                                    transition={{ duration: 0.2 }}
                                                    onMouseEnter={() => setMegaMenuOpen(true)}
                                                    onMouseLeave={() => setMegaMenuOpen(false)}
                                                    className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[800px] bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
                                                >
                                                    <div className="relative">
                                                        <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 opacity-50" />

                                                        <div className="relative p-8 grid grid-cols-3 gap-6">
                                                            {categories.map((cat, i) => (
                                                                <Link
                                                                    href={`/products?category=${cat.slug}`}
                                                                    key={cat.name}
                                                                    onClick={() => setMegaMenuOpen(false)}
                                                                >
                                                                    <motion.div
                                                                        initial={{ opacity: 0, x: -20 }}
                                                                        animate={{ opacity: 1, x: 0 }}
                                                                        transition={{ delay: i * 0.05 }}
                                                                        whileHover={{ x: 5 }}
                                                                        className="group cursor-pointer"
                                                                    >
                                                                        <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all border border-gray-100">
                                                                            <div className="flex items-center gap-3 mb-3">
                                                                                <span className="text-3xl">{cat.emoji}</span>
                                                                                <span className="font-black text-gray-800 group-hover:text-red-600 transition-colors">
                                                                                    {cat.name}
                                                                                </span>
                                                                            </div>
                                                                            <div className="space-y-1">
                                                                                {cat.items.map((item) => (
                                                                                    <div
                                                                                        key={item}
                                                                                        className="text-sm text-gray-600 hover:text-red-600 hover:translate-x-1 transition-all cursor-pointer"
                                                                                    >
                                                                                        • {item}
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        </div>
                                                                    </motion.div>
                                                                </Link>
                                                            ))}
                                                        </div>

                                                        <div className="relative bg-gradient-to-r from-red-600 to-orange-600 p-6 text-white">
                                                            <div className="flex items-center justify-between">
                                                                <div>
                                                                    <div className="text-2xl font-black mb-2">🔥 Trending Now</div>
                                                                    <div className="text-sm opacity-90">Discover what's hot this week!</div>
                                                                </div>
                                                                <Link href="/products">
                                                                    <motion.button
                                                                        whileHover={{ scale: 1.05 }}
                                                                        whileTap={{ scale: 0.95 }}
                                                                        onClick={() => setMegaMenuOpen(false)}
                                                                        className="bg-white text-red-600 px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
                                                                    >
                                                                        View All
                                                                    </motion.button>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Right Side Icons */}
                        <div className="flex items-center gap-3">

                            {/* Search */}
                            <motion.button
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setSearchOpen(true)}
                                className="hidden sm:flex w-12 h-12 items-center justify-center text-gray-700 hover:text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 rounded-2xl transition-all relative group"
                            >
                                <FiSearch size={22} />
                                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
                            </motion.button>

                            {/* Wishlist */}
                            <Link href="/wishlist">
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: -5 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="hidden sm:flex w-12 h-12 items-center justify-center text-gray-700 hover:text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 rounded-2xl transition-all relative"
                                >
                                    <FiHeart size={22} />
                                    <AnimatePresence>
                                        {wishlistCount > 0 && (
                                            <motion.span
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                exit={{ scale: 0 }}
                                                className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-black shadow-lg"
                                            >
                                                {wishlistCount}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            </Link>

                            {/* Cart */}
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={openCart}
                                className="relative w-12 h-12 flex items-center justify-center text-gray-700 hover:text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 rounded-2xl transition-all group"
                            >
                                <motion.div
                                    animate={{ rotate: [0, -10, 10, 0] }}
                                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                                >
                                    <FiShoppingCart size={22} />
                                </motion.div>
                                <AnimatePresence>
                                    {cartItems > 0 && (
                                        <motion.span
                                            initial={{ scale: 0, rotate: -180 }}
                                            animate={{ scale: 1, rotate: 0 }}
                                            exit={{ scale: 0, rotate: 180 }}
                                            className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-black shadow-lg"
                                        >
                                            <motion.span
                                                key={cartItems}
                                                initial={{ scale: 1.5, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                            >
                                                {cartItems}
                                            </motion.span>
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.button>

                            {/* User Login */}
                            {/* User Profile/Login */}
                            {isAuthenticated && user ? (
                                <div className="relative group">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="flex items-center gap-2 px-4 py-2 hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 rounded-2xl transition-all"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-white font-bold shadow-lg">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="hidden md:block text-left">
                                            <div className="text-sm font-bold text-gray-800">{user.name}</div>
                                            <div className="text-xs text-gray-500">{user.role}</div>
                                        </div>
                                    </motion.button>

                                    {/* Dropdown Menu */}
                                    <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                                        <div className="p-4 border-b border-gray-100">
                                            <div className="font-bold text-gray-800">{user.name}</div>
                                            <div className="text-sm text-gray-500">{user.email}</div>
                                        </div>
                                        <div className="p-2">
                                            <Link href="/profile">
                                                <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-xl cursor-pointer">
                                                    <FiUser />
                                                    <span>My Profile</span>
                                                </div>
                                            </Link>
                                            {user.role === 'admin' && (
                                                <Link href="/admin/products">
                                                    <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-xl cursor-pointer">
                                                        <FiShield />
                                                        <span>Admin Panel</span>
                                                    </div>
                                                </Link>
                                            )}
                                            <button
                                                onClick={() => {
                                                    logout()
                                                    router.push('/')
                                                }}
                                                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-600 rounded-xl"
                                            >
                                                <FiX />
                                                <span>Logout</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <Link href="/login">
                                    <motion.div
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="w-12 h-12 flex items-center justify-center text-gray-700 hover:text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 rounded-2xl transition-all"
                                    >
                                        <FiUser size={22} />
                                    </motion.div>
                                </Link>
                            )}

                            {/* Mobile Menu */}
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="lg:hidden w-12 h-12 flex items-center justify-center text-gray-700 hover:text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50 rounded-2xl transition-all"
                            >
                                <AnimatePresence mode="wait">
                                    {mobileMenuOpen ? (
                                        <motion.div
                                            key="close"
                                            initial={{ rotate: -90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: 90, opacity: 0 }}
                                        >
                                            <FiX size={24} />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="menu"
                                            initial={{ rotate: 90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: -90, opacity: 0 }}
                                        >
                                            <FiMenu size={24} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="lg:hidden bg-gradient-to-b from-white to-gray-50 border-t border-gray-100 overflow-hidden"
                        >
                            <div className="px-4 py-6 space-y-2 max-h-[70vh] overflow-y-auto">
                                {navLinks.map((link, i) => (
                                    <motion.div
                                        key={link.href}
                                        initial={{ x: -50, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <Link href={link.href} onClick={() => setMobileMenuOpen(false)}>
                                            <div className={`flex items-center gap-4 px-6 py-4 font-bold transition-all group rounded-2xl ${link.label === 'Admin'
                                                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                                                    : 'text-gray-700 hover:text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-orange-50'
                                                }`}>
                                                <link.icon size={22} />
                                                <span className="text-lg">{link.label}</span>
                                                <FiChevronDown size={18} />
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>

            {/* Search Modal */}
            <AnimatePresence>
                {searchOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSearchOpen(false)}
                            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: -50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: -50 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="fixed top-24 left-1/2 -translate-x-1/2 w-full max-w-3xl z-50 px-4"
                        >
                            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                                <form onSubmit={handleSearch} className="relative p-6 border-b border-gray-100">
                                    <div className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-400">
                                        <FiSearch size={24} />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search for products, brands, categories..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        autoFocus
                                        className="w-full pl-16 pr-4 py-5 text-xl font-medium border-none focus:outline-none"
                                    />
                                </form>

                                <div className="p-6">
                                    <div className="text-sm font-bold text-gray-500 mb-4 flex items-center gap-2">
                                        <FiTrendingUp />
                                        Trending Searches
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {trendingSearches.map((term) => (
                                            <motion.button
                                                key={term}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => {
                                                    setSearchQuery(term)
                                                    router.push(`/products?search=${encodeURIComponent(term)}`)
                                                    setSearchOpen(false)
                                                }}
                                                className="px-4 py-2 bg-gradient-to-r from-red-50 to-orange-50 hover:from-red-100 hover:to-orange-100 text-red-600 rounded-full text-sm font-semibold transition-all"
                                            >
                                                {term}
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>

                                {searchQuery && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-6 bg-gray-50 border-t border-gray-100"
                                    >
                                        <div className="text-sm text-gray-600">
                                            Press <kbd className="px-2 py-1 bg-white rounded shadow text-xs font-bold">Enter</kbd> to search for <span className="font-bold text-red-600">"{searchQuery}"</span>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Spacer */}
            <div className={showTopBar ? 'h-24' : 'h-20'} />
        </>
    )
}

export default Navbar