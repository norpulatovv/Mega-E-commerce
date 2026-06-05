'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { FiTrash2, FiMinus, FiPlus, FiHeart, FiStar } from 'react-icons/fi'
import { useCartStore, CartItem as CartItemType } from '@/store/cartStore'
import { useState } from 'react'

interface CartItemProps {
    item: CartItemType
    index: number
}

export default function CartItem({ item, index }: CartItemProps) {
    const { removeItem, updateQuantity } = useCartStore()
    const [isWishlisted, setIsWishlisted] = useState(false)
    const [isRemoving, setIsRemoving] = useState(false)
    const [showSaved, setShowSaved] = useState(false)

    const handleRemove = async () => {
        setIsRemoving(true)
        setTimeout(() => removeItem(item.id), 400)
    }

    const handleWishlist = () => {
        setIsWishlisted(prev => !prev)
        setShowSaved(true)
        setTimeout(() => setShowSaved(false), 2000)
    }

    const savings = item.originalPrice
        ? (item.originalPrice - item.price) * item.quantity
        : 0

    const totalPrice = item.price * item.quantity

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={isRemoving
                ? { opacity: 0, x: -100, scale: 0.8 }
                : { opacity: 1, y: 0, scale: 1 }
            }
            exit={{ opacity: 0, x: -100, scale: 0.8 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="relative group"
        >
            {/* Glow Effect on Hover */}
            <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute -inset-1 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-yellow-500/20 rounded-3xl blur-md pointer-events-none"
            />

            <div className="relative bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden">

                {/* Savings Badge */}
                <AnimatePresence>
                    {savings > 0 && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0, rotate: -12 }}
                            animate={{ opacity: 1, scale: 1, rotate: -12 }}
                            className="absolute -top-1 -right-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-black px-3 py-1 rounded-full shadow-lg z-10"
                        >
                            Save ${savings.toFixed(0)}
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="flex gap-4">
                    {/* Product Image */}
                    <motion.div
                        whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                        transition={{ duration: 0.4 }}
                        className="relative w-24 h-24 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center text-5xl shadow-inner flex-shrink-0 cursor-pointer overflow-hidden"
                    >
                        {/* Shimmer Effect */}
                        <motion.div
                            animate={{ x: [-100, 200] }}
                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
                        />
                        {item.image}
                    </motion.div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                        {/* Category & Rating */}
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
                                {item.category}
                            </span>
                            <div className="flex items-center gap-1 text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <FiStar key={i} size={10}/>
                                ))}
                            </div>
                        </div>

                        {/* Product Name */}
                        <h4 className="font-black text-gray-800 text-sm leading-tight mb-2 truncate">
                            {item.name}
                        </h4>

                        {/* Size & Color */}
                        {(item.size || item.color) && (
                            <div className="flex gap-2 mb-2">
                                {item.size && (
                                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">
                                        Size: {item.size}
                                    </span>
                                )}
                                {item.color && (
                                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">
                                        Color: {item.color}
                                    </span>
                                )}
                            </div>
                        )}

                        {/* Price */}
                        <div className="flex items-center gap-2 mb-3">
                            <motion.span
                                key={totalPrice}
                                initial={{ scale: 1.3, color: '#ef4444' }}
                                animate={{ scale: 1, color: '#1f2937' }}
                                className="text-xl font-black"
                            >
                                ${totalPrice.toFixed(2)}
                            </motion.span>
                            {item.originalPrice && (
                                <span className="text-xs text-gray-400 line-through">
                                    ${(item.originalPrice * item.quantity).toFixed(2)}
                                </span>
                            )}
                        </div>

                        {/* Controls Row */}
                        <div className="flex items-center justify-between">
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
                                <motion.button
                                    whileHover={{ scale: 1.15 }}
                                    whileTap={{ scale: 0.85 }}
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="w-7 h-7 bg-white rounded-lg flex items-center justify-center shadow-sm text-gray-600 hover:text-red-500 transition-colors"
                                >
                                    <FiMinus size={12} />
                                </motion.button>

                                <motion.span
                                    key={item.quantity}
                                    initial={{ scale: 1.5, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="font-black text-gray-800 w-8 text-center text-sm"
                                >
                                    {item.quantity}
                                </motion.span>

                                <motion.button
                                    whileHover={{ scale: 1.15 }}
                                    whileTap={{ scale: 0.85 }}
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="w-7 h-7 bg-white rounded-lg flex items-center justify-center shadow-sm text-gray-600 hover:text-green-500 transition-colors"
                                >
                                    <FiPlus size={12} />
                                </motion.button>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-2">
                                {/* Wishlist */}
                                <div className="relative">
                                    <motion.button
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.8 }}
                                        onClick={handleWishlist}
                                        className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${isWishlisted
                                            ? 'bg-red-100 text-red-500'
                                            : 'bg-gray-100 text-gray-400 hover:text-red-400'
                                            }`}
                                    >
                                        <motion.div
                                            animate={isWishlisted ? { scale: [1, 1.5, 1] } : {}}
                                        >
                                            <svg
                                                viewBox="0 0 24 24"
                                                width={14}
                                                height={14}
                                                fill={isWishlisted ? 'currentColor' : 'none'}
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                            </svg>
                                        </motion.div>
                                    </motion.button>

                                    {/* Saved Toast */}
                                    <AnimatePresence>
                                        {showSaved && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 5, scale: 0.8 }}
                                                animate={{ opacity: 1, y: -35, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                                className="absolute left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap pointer-events-none z-50"
                                            >
                                                {isWishlisted ? '❤️ Saved!' : 'Removed'}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Delete */}
                                <motion.button
                                    whileHover={{ scale: 1.2, rotate: 10 }}
                                    whileTap={{ scale: 0.8 }}
                                    onClick={handleRemove}
                                    className="w-8 h-8 bg-red-50 rounded-xl flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-100 transition-colors"
                                >
                                    <FiTrash2 size={14} />
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Shine Line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-400/30 to-transparent"
                />
            </div>
        </motion.div>
    )
}