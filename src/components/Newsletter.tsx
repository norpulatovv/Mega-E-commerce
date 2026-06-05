'use client'

import { motion } from 'framer-motion'
import { FiMail, FiSend, FiGift, FiTrendingUp, FiZap, FiCheck, FiBell } from 'react-icons/fi'
import { useState } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
      setEmail('')

      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 3000)
    }, 1500)
  }

  const benefits = [
    {
      icon: FiGift,
      title: '10% Off First Order',
      description: 'Exclusive welcome discount'
    },
    {
      icon: FiTrendingUp,
      title: 'Early Access',
      description: 'Be first to know about sales'
    },
    {
      icon: FiZap,
      title: 'Flash Deals',
      description: 'Limited time offers'
    },
    {
      icon: FiBell,
      title: 'New Arrivals',
      description: 'Latest product updates'
    }
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`newsletter-bg-${i}`}
            animate={{
              y: [0, -100, 0],
              x: [0, 50, 0],
              scale: [1, 1.3, 1],
              opacity: [0.02, 0.05, 0.02]
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              delay: i * 1.5
            }}
            className="absolute w-96 h-96 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-3xl"
            style={{
              top: `${i * 12}%`,
              left: `${i * 10}%`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Newsletter Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 md:p-16 shadow-2xl overflow-hidden">
            {/* Animated Background Pattern */}
            <motion.div
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{ duration: 20, repeat: Infinity, repeatType: 'reverse' }}
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                backgroundSize: '50px 50px',
              }}
            />

            {/* Floating Icons */}
            {[FiMail, FiGift, FiZap, FiTrendingUp].map((Icon, i) => (
              <motion.div
                key={`float-icon-${i}`}
                animate={{
                  y: [0, -20, 0],
                  x: [0, 10, 0],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  delay: i * 0.5
                }}
                className="absolute text-white/20 text-6xl"
                style={{
                  top: `${20 + i * 20}%`,
                  left: `${10 + i * 20}%`,
                }}
              >
                <Icon />
              </motion.div>
            ))}

            <div className="relative z-10">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                {/* Badge */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-8 py-3 rounded-full mb-6 text-white font-bold shadow-lg"
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.3, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <FiMail/>
                  </motion.div>
                  <span className="text-lg">Newsletter</span>
                  <motion.div
                    animate={{ 
                      rotate: [0, 20, -20, 0],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    📧
                  </motion.div>
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6"
                >
                  Get Exclusive Deals
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto"
                >
                  Subscribe to our newsletter and get 
                  <span className="font-black"> 10% OFF</span> your first order plus 
                  <span className="font-black"> exclusive offers!</span>
                </motion.p>
              </motion.div>

              {/* Form */}
              <motion.form
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                onSubmit={handleSubmit}
                className="max-w-2xl mx-auto mb-12"
              >
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">
                      <FiMail />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      disabled={isLoading || isSubmitted}
                      className="w-full pl-16 pr-6 py-5 rounded-2xl text-lg font-semibold text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-white/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isLoading || isSubmitted}
                    whileHover={{ scale: isSubmitted ? 1 : 1.05 }}
                    whileTap={{ scale: isSubmitted ? 1 : 0.95 }}
                    className={`px-10 py-5 rounded-2xl font-black text-lg shadow-2xl transition-all flex items-center justify-center gap-3 whitespace-nowrap ${
                      isSubmitted
                        ? 'bg-green-500 text-white'
                        : 'bg-white text-blue-600 hover:bg-gray-50'
                    } disabled:cursor-not-allowed`}
                  >
                    {isLoading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-6 h-6 border-3 border-blue-600 border-t-transparent rounded-full"
                        />
                        <span>Subscribing...</span>
                      </>
                    ) : isSubmitted ? (
                      <>
                        <FiCheck />
                        <span>Subscribed!</span>
                      </>
                    ) : (
                      <>
                        <FiSend />
                        <span>Subscribe</span>
                      </>
                    )}
                  </motion.button>
                </div>

                <p className="text-white/80 text-sm mt-4 text-center">
                  🔒 We respect your privacy. Unsubscribe anytime.
                </p>
              </motion.form>

              {/* Benefits Grid */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {benefits.map((benefit, index) => {
                  const BenefitIcon = benefit.icon
                  return (
                    <motion.div
                      key={`benefit-${index}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-white/20 text-center hover:bg-white/20 transition-all"
                    >
                      <motion.div
                        animate={{
                          y: [0, -10, 0],
                          rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: index * 0.5
                        }}
                        className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-4"
                      >
                        <BenefitIcon/>
                      </motion.div>

                      <h3 className="text-xl font-black text-white mb-2">
                        {benefit.title}
                      </h3>

                      <p className="text-white/80 text-sm">
                        {benefit.description}
                      </p>
                    </motion.div>
                  )
                })}
              </motion.div>

              {/* Social Proof */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2 }}
                className="text-center mt-12"
              >
                <div className="flex items-center justify-center gap-2 text-white/90">
                  <div className="flex -space-x-2">
                    {['👨', '👩', '👨‍💼', '👩‍💻', '👨‍🎓'].map((avatar, i) => (
                      <motion.div
                        key={`avatar-${i}`}
                        initial={{ scale: 0, x: -20 }}
                        whileInView={{ scale: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1.3 + i * 0.1 }}
                        className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-2xl border-2 border-purple-600"
                      >
                        {avatar}
                      </motion.div>
                    ))}
                  </div>
                  <div className="text-left ml-4">
                    <div className="font-black text-xl">50,000+</div>
                    <div className="text-sm">Subscribers</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}