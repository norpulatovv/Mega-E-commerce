'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
    FiShoppingCart, FiTruck, FiCreditCard, FiCheck,
    FiChevronRight, FiLock, FiTag, FiMapPin, FiMail,
    FiPhone, FiUser, FiPackage, FiPercent, FiAlertCircle,
    FiShield, FiClock, FiX, FiGift, FiZap, FiRefreshCw,
    FiStar, FiArrowRight
} from 'react-icons/fi'
import { useCartStore } from '@/store/cartStore'
import { useAuthStore } from '@/store/authStore'
import Image from 'next/image'
import Link from 'next/link'

export default function CheckoutPage() {
    const router = useRouter()
    const { items, getTotalPrice, clearCart } = useCartStore()
    const { user, isAuthenticated } = useAuthStore()

    const [currentStep, setCurrentStep] = useState(1)
    const [promoCode, setPromoCode] = useState('')
    const [promoApplied, setPromoApplied] = useState(false)
    const [promoError, setPromoError] = useState(false)
    const [processing, setProcessing] = useState(false)
    const [giftWrapping, setGiftWrapping] = useState(false)
    const [expressDelivery, setExpressDelivery] = useState(false)
    const [orderNumber, setOrderNumber] = useState('')

    const [shippingInfo, setShippingInfo] = useState({
        fullName: user?.name || '',
        email: user?.email || '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States',
        saveAddress: false,
        deliveryNotes: ''
    })

    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: '',
        cardName: '',
        expiry: '',
        cvv: '',
        paymentMethod: 'card',
        saveCard: false,
        billingAddress: 'same'
    })

    // PROTECTION
    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login?redirect=/checkout')
        }
    }, [isAuthenticated, router])

    useEffect(() => {
        if (user) {
            setShippingInfo(prev => ({
                ...prev,
                fullName: user.name,
                email: user.email
            }))
        }
    }, [user])

    const subtotal = getTotalPrice()
    const shipping = expressDelivery ? 15.99 : subtotal > 100 ? 0 : 9.99
    const tax = subtotal * 0.08
    const promoDiscount = promoApplied ? subtotal * 0.1 : 0
    const giftWrapFee = giftWrapping ? 5.99 : 0
    const total = subtotal + shipping + tax + giftWrapFee - promoDiscount

    const steps = [
        { id: 1, name: 'Cart', icon: FiShoppingCart, desc: 'Review items' },
        { id: 2, name: 'Shipping', icon: FiTruck, desc: 'Delivery info' },
        { id: 3, name: 'Payment', icon: FiCreditCard, desc: 'Payment method' },
        { id: 4, name: 'Complete', icon: FiCheck, desc: 'Confirmation' }
    ]

    const validPromoCodes = ['MEGA10', 'WELCOME20', 'SAVE15', 'FLASH25']

    const handlePromoCode = () => {
        if (validPromoCodes.includes(promoCode.toUpperCase())) {
            setPromoApplied(true)
            setPromoError(false)
        } else {
            setPromoError(true)
            setPromoApplied(false)
            setTimeout(() => setPromoError(false), 2000)
        }
    }

    const validateStep = (step: number) => {
        if (step === 2) {
            const required = ['fullName', 'email', 'phone', 'address', 'city', 'state', 'zipCode']
            return required.every(field => shippingInfo[field as keyof typeof shippingInfo])
        }
        if (step === 3) {
            if (paymentInfo.paymentMethod === 'card') {
                return paymentInfo.cardNumber && paymentInfo.cardName && paymentInfo.expiry && paymentInfo.cvv
            }
            return true
        }
        return true
    }

    const handleNextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(currentStep + 1)
        } else {
            alert('Please fill all required fields')
        }
    }

    const handlePlaceOrder = async () => {
        setProcessing(true)
        await new Promise(resolve => setTimeout(resolve, 2500))
        const orderNum = `MGS-${Date.now().toString().slice(-8)}`
        setOrderNumber(orderNum)
        setCurrentStep(4)
        setProcessing(false)
        setTimeout(() => {
            clearCart()
        }, 3000)
    }

    // LOADING
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="text-6xl mb-4"
                    >
                        🔒
                    </motion.div>
                    <h2 className="text-2xl font-black text-gray-800 mb-2">Redirecting to Login...</h2>
                    <p className="text-gray-600">Please login to continue checkout</p>
                </motion.div>
            </div>
        )
    }

    // EMPTY CART
    if (items.length === 0 && currentStep !== 4) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center max-w-md"
                >
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-9xl mb-6"
                    >
                        🛒
                    </motion.div>
                    <h2 className="text-4xl font-black text-gray-800 mb-4">Your Cart is Empty</h2>
                    <p className="text-gray-600 mb-8 text-lg">Add some amazing products before checkout</p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => router.push('/products')}
                        className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-xl flex items-center gap-2 mx-auto"
                    >
                        <FiShoppingCart />
                        Start Shopping
                        <FiArrowRight />
                    </motion.button>
                </motion.div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">

            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 py-8">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-between text-white"
                    >
                        <div>
                            <h1 className="text-4xl font-black mb-2">👋 Welcome back, {user?.name}!</h1>
                            <p className="text-lg opacity-90">Complete your secure checkout</p>
                        </div>
                        <div className="hidden md:flex items-center gap-4">
                            <div className="flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-xl">
                                <FiShield />
                                <span className="text-sm font-bold">Secure</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/20 backdrop-blur px-4 py-2 rounded-xl">
                                <FiClock />
                                <span className="text-sm font-bold">Fast</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Progress Steps */}
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-5xl mx-auto mb-12">
                    <div className="grid grid-cols-4 gap-4">
                        {steps.map((step, index) => (
                            <div key={step.id} className="relative">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex flex-col items-center"
                                >
                                    <motion.div
                                        animate={{
                                            scale: currentStep === step.id ? 1.1 : 1,
                                            backgroundColor: currentStep >= step.id ? '#ef4444' : '#e5e7eb'
                                        }}
                                        className={`w-20 h-20 rounded-full flex flex-col items-center justify-center ${currentStep >= step.id ? 'text-white shadow-2xl' : 'text-gray-400 shadow-lg'
                                            } relative z-10 mb-3`}
                                    >
                                        {currentStep > step.id ? (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                            >
                                                <FiCheck size={32} />
                                            </motion.div>
                                        ) : (
                                            <step.icon size={28} />
                                        )}
                                    </motion.div>
                                    <div className="text-center">
                                        <div className={`font-black text-sm ${currentStep >= step.id ? 'text-gray-800' : 'text-gray-400'
                                            }`}>
                                            {step.name}
                                        </div>
                                        <div className="text-xs text-gray-500">{step.desc}</div>
                                    </div>
                                </motion.div>
                                {index < steps.length - 1 && (
                                    <div className="absolute top-10 left-1/2 w-full h-1 bg-gray-200 -z-10">
                                        <motion.div
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: currentStep > step.id ? 1 : 0 }}
                                            className="h-full bg-red-500 origin-left"
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">

                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        <AnimatePresence mode="wait">

                            {/* STEP 1: CART REVIEW */}
                            {currentStep === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    className="bg-white rounded-3xl shadow-2xl p-8"
                                >
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <h2 className="text-3xl font-black text-gray-800">Review Your Order</h2>
                                            <p className="text-gray-600">{items.length} items in cart</p>
                                        </div>
                                    </div>

                                    {/* Extra Options */}
                                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-6 space-y-4 border-2 border-purple-100">
                                        <h3 className="font-black text-gray-800 mb-4 flex items-center gap-2">
                                            <FiGift />
                                            Enhance Your Order
                                        </h3>
                                        <label className="flex items-center gap-4 cursor-pointer p-4 bg-white rounded-xl hover:shadow-lg transition-all">
                                            <input
                                                type="checkbox"
                                                checked={giftWrapping}
                                                onChange={(e) => setGiftWrapping(e.target.checked)}
                                                className="w-6 h-6 rounded border-2 border-gray-300 text-purple-600 focus:ring-2 focus:ring-purple-400"
                                            />
                                            <div className="flex-1">
                                                <div className="font-bold text-gray-800 flex items-center gap-2">
                                                    🎁 Gift Wrapping
                                                    <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">+$5.99</span>
                                                </div>
                                                <div className="text-sm text-gray-500">Beautiful wrapping with ribbon and card</div>
                                            </div>
                                        </label>
                                        <label className="flex items-center gap-4 cursor-pointer p-4 bg-white rounded-xl hover:shadow-lg transition-all">
                                            <input
                                                type="checkbox"
                                                checked={expressDelivery}
                                                onChange={(e) => setExpressDelivery(e.target.checked)}
                                                className="w-6 h-6 rounded border-2 border-gray-300 text-purple-600 focus:ring-2 focus:ring-purple-400"
                                            />
                                            <div className="flex-1">
                                                <div className="font-bold text-gray-800 flex items-center gap-2">
                                                    ⚡ Express Delivery
                                                    <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">+$15.99</span>
                                                </div>
                                                <div className="text-sm text-gray-500">Get it within 1-2 business days</div>
                                            </div>
                                        </label>
                                    </div>

                                    {/* Products List */}
                                    <div className="space-y-4 max-h-96 overflow-y-auto mb-6">
                                        {items.map((item) => (
                                            <motion.div
                                                key={item.id}
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="flex gap-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-all"
                                            >
                                                <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center relative overflow-hidden shadow-lg">
                                                    {item.image.startsWith('http') ? (
                                                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                                                    ) : (
                                                        <span className="text-4xl">{item.image}</span>
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-gray-800 text-lg">{item.name}</h3>
                                                    <p className="text-sm text-gray-500 capitalize">{item.category}</p>
                                                    <div className="flex items-center gap-4 mt-3">
                                                        <span className="text-xl font-black text-red-600">${item.price}</span>
                                                        <span className="text-gray-600 font-semibold">× {item.quantity}</span>
                                                        <span className="ml-auto text-xl font-black text-gray-800">${(item.price * item.quantity).toFixed(2)}</span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>

                                    <div className="flex gap-4">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => router.push('/products')}
                                            className="flex-1 py-4 bg-gray-200 text-gray-700 rounded-2xl font-bold hover:bg-gray-300 transition-colors"
                                        >
                                            ← Continue Shopping
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={handleNextStep}
                                            className="flex-1 bg-gradient-to-r from-red-600 to-orange-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg"
                                        >
                                            Continue to Shipping
                                            <FiChevronRight />
                                        </motion.button>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 2: SHIPPING */}
                            {currentStep === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    className="bg-white rounded-3xl shadow-2xl p-8"
                                >
                                    <h2 className="text-3xl font-black text-gray-800 mb-6">Shipping Information</h2>
                                    <div className="space-y-5">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name *</label>
                                                <div className="relative">
                                                    <FiUser />
                                                    <input
                                                        type="text"
                                                        value={shippingInfo.fullName}
                                                        onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                                                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:outline-none transition-colors"
                                                        placeholder="John Doe"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Email *</label>
                                                <div className="relative">
                                                    <FiMail />
                                                    <input
                                                        type="email"
                                                        value={shippingInfo.email}
                                                        onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                                                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:outline-none transition-colors"
                                                        placeholder="john@example.com"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number *</label>
                                            <div className="relative">
                                                <FiPhone />
                                                <input
                                                    type="tel"
                                                    value={shippingInfo.phone}
                                                    onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                                                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:outline-none transition-colors"
                                                    placeholder="+1 (555) 123-4567"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Street Address *</label>
                                            <div className="relative">
                                                <FiMapPin />
                                                <input
                                                    type="text"
                                                    value={shippingInfo.address}
                                                    onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                                                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:outline-none transition-colors"
                                                    placeholder="123 Main St, Apt 4B"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">City *</label>
                                                <input
                                                    type="text"
                                                    value={shippingInfo.city}
                                                    onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:outline-none transition-colors"
                                                    placeholder="New York"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">State *</label>
                                                <input
                                                    type="text"
                                                    value={shippingInfo.state}
                                                    onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:outline-none transition-colors"
                                                    placeholder="NY"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">ZIP Code *</label>
                                                <input
                                                    type="text"
                                                    value={shippingInfo.zipCode}
                                                    onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
                                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:outline-none transition-colors"
                                                    placeholder="10001"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Delivery Notes (Optional)</label>
                                            <textarea
                                                value={shippingInfo.deliveryNotes}
                                                onChange={(e) => setShippingInfo({ ...shippingInfo, deliveryNotes: e.target.value })}
                                                rows={3}
                                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:outline-none transition-colors"
                                                placeholder="Leave at door, Ring bell twice, etc."
                                            />
                                        </div>
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={shippingInfo.saveAddress}
                                                onChange={(e) => setShippingInfo({ ...shippingInfo, saveAddress: e.target.checked })}
                                                className="w-5 h-5 rounded border-2 text-red-600 focus:ring-2 focus:ring-red-400"
                                            />
                                            <span className="text-sm font-semibold text-gray-700">Save this address for future orders</span>
                                        </label>
                                    </div>
                                    <div className="flex gap-4 mt-8">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => setCurrentStep(1)}
                                            className="flex-1 py-4 bg-gray-200 text-gray-700 rounded-2xl font-bold hover:bg-gray-300 transition-colors"
                                        >
                                            ← Back
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={handleNextStep}
                                            className="flex-1 bg-gradient-to-r from-red-600 to-orange-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg"
                                        >
                                            Continue to Payment
                                            <FiChevronRight />
                                        </motion.button>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 3: PAYMENT */}
                            {currentStep === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    className="bg-white rounded-3xl shadow-2xl p-8"
                                >
                                    <h2 className="text-3xl font-black text-gray-800 mb-6">Payment Method</h2>

                                    {/* Payment Methods */}
                                    <div className="grid grid-cols-3 gap-4 mb-8">
                                        {[
                                            { id: 'card', name: 'Credit Card', icon: '💳', desc: 'Visa, Mastercard' },
                                            { id: 'paypal', name: 'PayPal', icon: '🅿️', desc: 'Fast & Secure' },
                                            { id: 'crypto', name: 'Crypto', icon: '₿', desc: 'Bitcoin, ETH' }
                                        ].map((method) => (
                                            <motion.button
                                                key={method.id}
                                                whileHover={{ scale: 1.05, y: -5 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => setPaymentInfo({ ...paymentInfo, paymentMethod: method.id })}
                                                className={`p-6 rounded-2xl border-2 font-bold transition-all ${paymentInfo.paymentMethod === method.id
                                                        ? 'border-red-500 bg-red-50 shadow-xl'
                                                        : 'border-gray-200 hover:border-gray-300 bg-white'
                                                    }`}
                                            >
                                                <div className="text-4xl mb-3">{method.icon}</div>
                                                <div className="text-sm font-black text-gray-800">{method.name}</div>
                                                <div className="text-xs text-gray-500 mt-1">{method.desc}</div>
                                                {paymentInfo.paymentMethod === method.id && (
                                                    <motion.div
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        className="mt-3"
                                                    >
                                                        <FiCheck size={20} />
                                                    </motion.div>
                                                )}
                                            </motion.button>
                                        ))}
                                    </div>

                                    {/* Card Details */}
                                    {paymentInfo.paymentMethod === 'card' && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            className="space-y-5"
                                        >
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Card Number *</label>
                                                <input
                                                    type="text"
                                                    value={paymentInfo.cardNumber}
                                                    onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:outline-none transition-colors"
                                                    placeholder="1234 5678 9012 3456"
                                                    maxLength={19}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Cardholder Name *</label>
                                                <input
                                                    type="text"
                                                    value={paymentInfo.cardName}
                                                    onChange={(e) => setPaymentInfo({ ...paymentInfo, cardName: e.target.value })}
                                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:outline-none transition-colors"
                                                    placeholder="JOHN DOE"
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 mb-2">Expiry Date *</label>
                                                    <input
                                                        type="text"
                                                        value={paymentInfo.expiry}
                                                        onChange={(e) => setPaymentInfo({ ...paymentInfo, expiry: e.target.value })}
                                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:outline-none transition-colors"
                                                        placeholder="MM/YY"
                                                        maxLength={5}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-700 mb-2">CVV *</label>
                                                    <input
                                                        type="text"
                                                        value={paymentInfo.cvv}
                                                        onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-400 focus:outline-none transition-colors"
                                                        placeholder="123"
                                                        maxLength={4}
                                                    />
                                                </div>
                                            </div>
                                            <label className="flex items-center gap-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={paymentInfo.saveCard}
                                                    onChange={(e) => setPaymentInfo({ ...paymentInfo, saveCard: e.target.checked })}
                                                    className="w-5 h-5 rounded border-2 text-red-600"
                                                />
                                                <span className="text-sm font-semibold text-gray-700">Save card for future purchases</span>
                                            </label>
                                        </motion.div>
                                    )}

                                    {/* Other Payment Methods Message */}
                                    {paymentInfo.paymentMethod !== 'card' && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 text-center"
                                        >
                                            <div className="text-4xl mb-3">
                                                {paymentInfo.paymentMethod === 'paypal' ? '🅿️' : '₿'}
                                            </div>
                                            <p className="text-gray-600">
                                                You'll be redirected to {paymentInfo.paymentMethod === 'paypal' ? 'PayPal' : 'Crypto'} to complete payment
                                            </p>
                                        </motion.div>
                                    )}

                                    <div className="flex gap-4 mt-8">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => setCurrentStep(2)}
                                            className="flex-1 py-4 bg-gray-200 text-gray-700 rounded-2xl font-bold hover:bg-gray-300 transition-colors"
                                        >
                                            ← Back
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={handlePlaceOrder}
                                            disabled={processing}
                                            className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                                        >
                                            {processing ? (
                                                <>
                                                    <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                                    />
                                                    Processing...
                                                </>
                                            ) : (
                                                <>
                                                    <FiLock />
                                                    Place Order • ${total.toFixed(2)}
                                                </>
                                            )}
                                        </motion.button>
                                    </div>
                                </motion.div>
                            )}

                            {/* STEP 4: CONFIRMATION */}
                            {currentStep === 4 && (
                                <motion.div
                                    key="step4"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-white rounded-3xl shadow-2xl p-12 text-center"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                                        className="w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"
                                    >
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        <h2 className="text-5xl font-black text-gray-800 mb-4">Order Placed Successfully!</h2>
                                        <div className="inline-block bg-gradient-to-r from-purple-100 to-pink-100 px-6 py-3 rounded-2xl mb-6">
                                            <p className="text-sm text-gray-600 mb-1">Order Number</p>
                                            <p className="text-2xl font-black text-purple-600">#{orderNumber || `MGS-${Date.now().toString().slice(-8)}`}</p>
                                        </div>
                                        <p className="text-gray-600 mb-4 text-lg">
                                            Thank you for your purchase! We'll send a confirmation email to
                                        </p>
                                        <p className="font-bold text-gray-800 mb-8 text-lg">{shippingInfo.email}</p>

                                        <div className="grid grid-cols-3 gap-4 mb-10 max-w-2xl mx-auto">
                                            <div className="bg-blue-50 rounded-2xl p-6">
                                                <FiMail size={32} />
                                                <div className="text-sm font-bold text-gray-700">Email Sent</div>
                                                <div className="text-xs text-gray-500 mt-1">Confirmation</div>
                                            </div>
                                            <div className="bg-green-50 rounded-2xl p-6">
                                                <FiPackage size={32} />
                                                <div className="text-sm font-bold text-gray-700">Processing</div>
                                                <div className="text-xs text-gray-500 mt-1">Your order</div>
                                            </div>
                                            <div className="bg-orange-50 rounded-2xl p-6">
                                                <FiTruck size={32} />
                                                <div className="text-sm font-bold text-gray-700">Shipping Soon</div>
                                                <div className="text-xs text-gray-500 mt-1">1-2 days</div>
                                            </div>
                                        </div>

                                        <div className="flex gap-4 justify-center">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => router.push('/products')}
                                                className="bg-gray-200 text-gray-700 px-8 py-4 rounded-2xl font-bold hover:bg-gray-300 transition-colors"
                                            >
                                                Continue Shopping
                                            </motion.button>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => router.push('/')}
                                                className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg"
                                            >
                                                Back to Home
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Order Summary Sidebar */}
                    {currentStep < 4 && (
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-3xl shadow-2xl p-8 h-fit sticky top-24"
                        >
                            <h3 className="text-2xl font-black text-gray-800 mb-6">Order Summary</h3>

                            {/* Promo Code */}
                            <div className="mb-6">
                                <label className="block text-sm font-bold text-gray-700 mb-2">Promo Code</label>
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <FiTag />
                                        <motion.input
                                            animate={promoError ? { x: [-5, 5, -5, 5, 0] } : {}}
                                            type="text"
                                            value={promoCode}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPromoCode(e.target.value)}
                                            placeholder="Enter code"
                                            disabled={promoApplied}
                                            className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl text-sm font-medium outline-none transition-all ${promoApplied
                                                    ? 'border-green-400 bg-green-50 text-green-700'
                                                    : promoError
                                                        ? 'border-red-400 bg-red-50'
                                                        : 'border-gray-200 focus:border-red-400'
                                                }`}
                                        />
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handlePromoCode}
                                        disabled={promoApplied}
                                        className={`px-5 py-3 rounded-xl font-bold text-sm transition-all ${promoApplied
                                                ? 'bg-green-500 text-white'
                                                : 'bg-gray-800 text-white hover:bg-gray-700'
                                            }`}
                                    >
                                        {promoApplied ? '✓' : 'Apply'}
                                    </motion.button>
                                </div>
                                {promoApplied && (
                                    <motion.p
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="text-xs text-green-600 mt-2 font-semibold"
                                    >
                                        ✓ Code "{promoCode.toUpperCase()}" applied!
                                    </motion.p>
                                )}
                                {!promoApplied && (
                                    <p className="text-xs text-gray-500 mt-2">
                                        Try: {validPromoCodes.join(', ')}
                                    </p>
                                )}
                            </div>

                            {/* Price Breakdown */}
                            <div className="space-y-3 pb-4 border-b-2 border-gray-200 mb-4">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal ({items.length} items)</span>
                                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span className="flex items-center gap-1">
                                        <FiTruck size={14} />
                                        Shipping
                                        {expressDelivery && <span className="text-xs text-orange-600 font-bold">(Express)</span>}
                                    </span>
                                    <span className={`font-semibold ${shipping === 0 ? 'text-green-600' : ''}`}>
                                        {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                                    </span>
                                </div>
                                {giftWrapping && (
                                    <div className="flex justify-between text-gray-600">
                                        <span className="flex items-center gap-1">
                                            <FiGift size={14} />
                                            Gift Wrapping
                                        </span>
                                        <span className="font-semibold">${giftWrapFee.toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax (8%)</span>
                                    <span className="font-semibold">${tax.toFixed(2)}</span>
                                </div>
                                {promoApplied && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="flex justify-between text-green-600"
                                    >
                                        <span className="flex items-center gap-1 font-bold">
                                            <FiPercent size={14} />
                                            Promo Discount
                                        </span>
                                        <span className="font-bold">-${promoDiscount.toFixed(2)}</span>
                                    </motion.div>
                                )}
                            </div>

                            <div className="flex justify-between text-3xl font-black text-gray-800 mb-6">
                                <span>Total</span>
                                <motion.span
                                    key={total}
                                    initial={{ scale: 1.2, color: '#ef4444' }}
                                    animate={{ scale: 1, color: '#1f2937' }}
                                >
                                    ${total.toFixed(2)}
                                </motion.span>
                            </div>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-3 gap-3 text-center text-xs text-gray-600">
                                <div className="bg-green-50 rounded-xl p-3">
                                    <FiShield size={20} />
                                    <span className="font-semibold">Secure</span>
                                </div>
                                <div className="bg-blue-50 rounded-xl p-3">
                                    <FiTruck size={20} />
                                    <span className="font-semibold">Fast Ship</span>
                                </div>
                                <div className="bg-purple-50 rounded-xl p-3">
                                    <FiRefreshCw size={20} />
                                    <span className="font-semibold">Easy Return</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    )
}