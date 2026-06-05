'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {
    FiX, FiShoppingCart, FiTrash2, FiArrowRight,
    FiTag, FiTruck, FiShield, FiRefreshCw, FiGift,
    FiChevronRight, FiZap
} from 'react-icons/fi'
import { useCartStore } from '@/store/cartStore'
import { useRouter } from 'next/navigation'
import CartItem from './CartItem'
import { useState } from 'react'

export default function CartDrawer() {
    const router = useRouter()
    const { items, isOpen, closeCart, clearCart, getTotalItems, getTotalPrice, getDiscountTotal } = useCartStore()
    const [promoCode, setPromoCode] = useState('')
    const [promoApplied, setPromoApplied] = useState(false)
    const [promoError, setPromoError] = useState(false)
    const [isCheckingOut, setIsCheckingOut] = useState(false)

    const totalItems = getTotalItems()
    const totalPrice = getTotalPrice()
    const discountTotal = getDiscountTotal()
    const shipping = totalPrice > 100 ? 0 : 9.99
    const promoDiscount = promoApplied ? totalPrice * 0.1 : 0
    const finalPrice = totalPrice + shipping - promoDiscount

    const handlePromo = () => {
        if (promoCode.toUpperCase() === 'MEGA10') {
            setPromoApplied(true)
            setPromoError(false)
        } else {
            setPromoError(true)
            setPromoApplied(false)
            setTimeout(() => setPromoError(false), 2000)
        }
    }

    const handleCheckout = () => {
        setIsCheckingOut(true)
        setTimeout(() => {
            closeCart()
            router.push('/checkout')
            setIsCheckingOut(false)
        }, 500)
    }

    const handleStartShopping = () => {
        closeCart()
        router.push('/products')
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '100%', opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md z-50 flex flex-col"
                    >
                        {/* Glow Effect */}
                        <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-96 bg-gradient-to-r from-red-500/30 to-transparent blur-xl pointer-events-none" />

                        <div className="flex flex-col h-full bg-white shadow-2xl">

                            {/* Header */}
                            <div className="relative bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 p-6 flex-shrink-0">
                                {/* Animated Background Pattern */}
                                <div className="absolute inset-0 overflow-hidden">
                                    {[...Array(5)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            animate={{
                                                scale: [1, 1.5, 1],
                                                opacity: [0.1, 0.2, 0.1],
                                                rotate: [0, 180, 360]
                                            }}
                                            transition={{ duration: 8 + i * 2, repeat: Infinity }}
                                            className="absolute w-32 h-32 bg-white/10 rounded-full"
                                            style={{ top: `${i * 20 - 10}%`, left: `${i * 25}%` }}
                                        />
                                    ))}
                                </div>

                                <div className="relative z-10 flex items-center justify-between">
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <motion.div
                                                animate={{ rotate: [0, -10, 10, 0] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            >
                                                <FiShoppingCart size={24} />
                                            </motion.div>
                                            <h2 className="text-2xl font-black text-white">My Cart</h2>
                                        </div>
                                        <AnimatePresence mode="wait">
                                            <motion.p
                                                key={totalItems}
                                                initial={{ opacity: 0, y: 5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -5 }}
                                                className="text-white/80 text-sm font-medium"
                                            >
                                                {totalItems === 0
                                                    ? 'Your cart is empty'
                                                    : `${totalItems} item${totalItems > 1 ? 's' : ''} in your cart`}
                                            </motion.p>
                                        </AnimatePresence>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        {/* Clear Cart */}
                                        {items.length > 0 && (
                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={clearCart}
                                                className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                                            >
                                                <FiTrash2 size={16} />
                                            </motion.button>
                                        )}

                                        {/* Close */}
                                        <motion.button
                                            whileHover={{ scale: 1.1, rotate: 90 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={closeCart}
                                            className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                                        >
                                            <FiX size={20} />
                                        </motion.button>
                                    </div>
                                </div>

                                {/* Progress Bar - Free Shipping */}
                                {totalPrice < 100 && totalPrice > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="relative z-10 mt-4"
                                    >
                                        <div className="flex justify-between text-xs text-white/80 mb-1">
                                            <span className="flex items-center gap-1">
                                                <FiTruck size={12} />
                                                Add ${(100 - totalPrice).toFixed(2)} for free shipping
                                            </span>
                                            <span>${totalPrice.toFixed(2)}/$100</span>
                                        </div>
                                        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${(totalPrice / 100) * 100}%` }}
                                                className="h-full bg-white rounded-full"
                                            />
                                        </div>
                                    </motion.div>
                                )}

                                {/* Free Shipping Achieved */}
                                {totalPrice >= 100 && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="relative z-10 mt-4 flex items-center gap-2 bg-white/20 rounded-xl px-4 py-2"
                                    >
                                        <FiTruck />
                                        <span className="text-white text-sm font-bold">🎉 You've unlocked FREE shipping!</span>
                                    </motion.div>
                                )}
                            </div>

                            {/* Items List */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                                <AnimatePresence>
                                    {items.length === 0 ? (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="flex flex-col items-center justify-center h-full py-20 text-center"
                                        >
                                            <motion.div
                                                animate={{
                                                    y: [0, -15, 0],
                                                    rotate: [0, -10, 10, 0]
                                                }}
                                                transition={{ duration: 3, repeat: Infinity }}
                                                className="text-8xl mb-6"
                                            >
                                                🛒
                                            </motion.div>
                                            <h3 className="text-2xl font-black text-gray-800 mb-2">Cart is Empty</h3>
                                            <p className="text-gray-500 mb-8 max-w-xs">
                                                Looks like you haven't added anything yet. Start shopping!
                                            </p>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={handleStartShopping}
                                                className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg"
                                            >
                                                <FiZap />
                                                Start Shopping
                                                <FiArrowRight />
                                            </motion.button>
                                        </motion.div>
                                    ) : (
                                        items.map((item, index) => (
                                            <CartItem key={item.id} item={item} index={index} />
                                        ))
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Footer */}
                            {items.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex-shrink-0 p-4 bg-gray-50 border-t border-gray-100 space-y-4"
                                >
                                    {/* Promo Code */}
                                    <div className="flex gap-2">
                                        <div className="relative flex-1">
                                            <FiTag 
                                            size={16} />
                                            <motion.input
                                                animate={promoError ? { x: [-5, 5, -5, 5, 0] } : {}}
                                                transition={{ duration: 0.4 }}
                                                type="text"
                                                placeholder="Promo code (MEGA10)"
                                                value={promoCode}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPromoCode(e.target.value)}
                                                className={`w-full pl-9 pr-4 py-3 rounded-xl border-2 text-sm font-medium outline-none transition-colors ${promoApplied
                                                        ? 'border-green-400 bg-green-50 text-green-700'
                                                        : promoError
                                                            ? 'border-red-400 bg-red-50'
                                                            : 'border-gray-200 bg-white focus:border-red-400'
                                                    }`}
                                            />
                                        </div>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={handlePromo}
                                            disabled={promoApplied}
                                            className={`px-4 py-3 rounded-xl font-bold text-sm transition-colors ${promoApplied
                                                    ? 'bg-green-500 text-white'
                                                    : 'bg-gray-800 text-white hover:bg-gray-700'
                                                }`}
                                        >
                                            {promoApplied ? '✓ Applied' : 'Apply'}
                                        </motion.button>
                                    </div>

                                    {/* Price Breakdown */}
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between text-gray-600">
                                            <span>Subtotal ({totalItems} items)</span>
                                            <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                                        </div>

                                        {discountTotal > 0 && (
                                            <div className="flex justify-between text-green-600">
                                                <span>Flash Sale Savings</span>
                                                <span className="font-bold">-${discountTotal.toFixed(2)}</span>
                                            </div>
                                        )}

                                        {promoApplied && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                className="flex justify-between text-purple-600"
                                            >
                                                <span className="flex items-center gap-1">
                                                    <FiGift size={12} />
                                                    Promo (MEGA10)
                                                </span>
                                                <span className="font-bold">-${promoDiscount.toFixed(2)}</span>
                                            </motion.div>
                                        )}

                                        <div className="flex justify-between text-gray-600">
                                            <span className="flex items-center gap-1">
                                                <FiTruck size={12} />
                                                Shipping
                                            </span>
                                            <span className={`font-semibold ${shipping === 0 ? 'text-green-600' : ''}`}>
                                                {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                                            </span>
                                        </div>

                                        <div className="h-px bg-gray-200" />

                                        <div className="flex justify-between text-lg font-black text-gray-800">
                                            <span>Total</span>
                                            <motion.span
                                                key={finalPrice}
                                                initial={{ scale: 1.2, color: '#ef4444' }}
                                                animate={{ scale: 1, color: '#1f2937' }}
                                            >
                                                ${finalPrice.toFixed(2)}
                                            </motion.span>
                                        </div>
                                    </div>

                                    {/* Trust Badges */}
                                    <div className="flex justify-center gap-6 text-xs text-gray-500">
                                        {[
                                            { icon: FiShield, text: 'Secure' },
                                            { icon: FiTruck, text: 'Fast Delivery' },
                                            { icon: FiRefreshCw, text: 'Easy Returns' },
                                        ].map(({ icon: Icon, text }) => (
                                            <div key={text} className="flex items-center gap-1">
                                                <Icon size={12} />
                                                <span>{text}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Checkout Button */}
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleCheckout}
                                        disabled={isCheckingOut}
                                        className="w-full relative bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 text-white py-4 rounded-2xl font-black text-lg shadow-xl overflow-hidden"
                                    >
                                        {/* Shine Effect */}
                                        <motion.div
                                            animate={{ x: [-200, 400] }}
                                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                                        />
                                        <AnimatePresence mode="wait">
                                            {isCheckingOut ? (
                                                <motion.div
                                                    key="loading"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="flex items-center justify-center gap-3"
                                                >
                                                    <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                                    />
                                                    Processing...
                                                </motion.div>
                                            ) : (
                                                <motion.div
                                                    key="checkout"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="relative z-10 flex items-center justify-center gap-3"
                                                >
                                                    <FiZap />
                                                    Checkout • ${finalPrice.toFixed(2)}
                                                    <FiChevronRight />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.button>

                                    {/* Continue Shopping */}
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => {
                                            closeCart()
                                            router.push('/products')
                                        }}
                                        className="w-full py-3 rounded-2xl font-bold text-gray-600 hover:text-gray-800 hover:bg-gray-200 bg-gray-100 transition-colors flex items-center justify-center gap-2"
                                    >
                                        Continue Shopping
                                        <FiArrowRight size={16} />
                                    </motion.button>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}