'use client'

import { motion } from 'framer-motion'
import { FiUsers, FiShoppingBag, FiTrendingUp, FiAward, FiStar, FiPackage, FiGlobe, FiZap } from 'react-icons/fi'
import { useState, useEffect } from 'react'

interface Stat {
  id: number
  icon: any
  value: number
  suffix: string
  label: string
  color: string
  bgColor: string
}

export default function Stats() {
  const [counters, setCounters] = useState<{ [key: number]: number }>({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
  })

  const stats: Stat[] = [
    {
      id: 1,
      icon: FiUsers,
      value: 50000,
      suffix: '+',
      label: 'Happy Customers',
      color: 'from-blue-600 to-cyan-600',
      bgColor: 'from-blue-50 to-cyan-50'
    },
    {
      id: 2,
      icon: FiShoppingBag,
      value: 100000,
      suffix: '+',
      label: 'Products Sold',
      color: 'from-purple-600 to-pink-600',
      bgColor: 'from-purple-50 to-pink-50'
    },
    {
      id: 3,
      icon: FiTrendingUp,
      value: 98,
      suffix: '%',
      label: 'Satisfaction Rate',
      color: 'from-green-600 to-emerald-600',
      bgColor: 'from-green-50 to-emerald-50'
    },
    {
      id: 4,
      icon: FiAward,
      value: 15,
      suffix: '+',
      label: 'Awards Won',
      color: 'from-yellow-600 to-orange-600',
      bgColor: 'from-yellow-50 to-orange-50'
    },
    {
      id: 5,
      icon: FiStar,
      value: 4.9,
      suffix: '★',
      label: 'Average Rating',
      color: 'from-red-600 to-rose-600',
      bgColor: 'from-red-50 to-rose-50'
    },
    {
      id: 6,
      icon: FiPackage,
      value: 24,
      suffix: 'h',
      label: 'Fast Delivery',
      color: 'from-indigo-600 to-blue-600',
      bgColor: 'from-indigo-50 to-blue-50'
    },
    {
      id: 7,
      icon: FiGlobe,
      value: 150,
      suffix: '+',
      label: 'Countries Served',
      color: 'from-teal-600 to-cyan-600',
      bgColor: 'from-teal-50 to-cyan-50'
    },
    {
      id: 8,
      icon: FiZap,
      value: 99,
      suffix: '%',
      label: 'Uptime',
      color: 'from-violet-600 to-purple-600',
      bgColor: 'from-violet-50 to-purple-50'
    }
  ]

  // Counter Animation
  useEffect(() => {
    stats.forEach((stat) => {
      let start = 0
      const end = stat.value
      const duration = 2000 // 2 seconds
      const increment = end / (duration / 16) // 60fps

      const timer = setInterval(() => {
        start += increment
        if (start >= end) {
          setCounters(prev => ({ ...prev, [stat.id]: end }))
          clearInterval(timer)
        } else {
          setCounters(prev => ({ ...prev, [stat.id]: start }))
        }
      }, 16)
    })
  }, [])

  const formatNumber = (num: number, stat: Stat) => {
    if (stat.id === 5) {
      // Rating - show decimal
      return num.toFixed(1)
    } else if (num >= 1000) {
      // Large numbers
      return Math.floor(num / 1000) + 'K'
    } else {
      return Math.floor(num).toString()
    }
  }

  return (
    <section className="py-24 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`stats-bg-${i}`}
            animate={{
              y: [0, -100, 0],
              x: [0, 50, 0],
              scale: [1, 1.2, 1],
              opacity: [0.02, 0.04, 0.02]
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              delay: i * 1.5
            }}
            className={`absolute w-96 h-96 bg-gradient-to-r ${stats[i].color} rounded-full blur-3xl`}
            style={{
              top: `${(i % 4) * 25}%`,
              left: `${Math.floor(i / 4) * 50}%`
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
          {/* Badge */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 text-blue-600 px-8 py-3 rounded-full mb-6 font-bold shadow-lg"
          >
            <motion.div
              animate={{ 
                rotate: [0, 360],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <FiTrendingUp/>
            </motion.div>
            <span className="text-lg">Our Achievements</span>
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✨
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-6xl md:text-7xl font-black mb-6"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
              Numbers That Matter
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto"
          >
            Our success is measured by your satisfaction and trust in our 
            <span className="text-blue-600 font-bold"> premium service</span>
          </motion.p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => {
            const StatIcon = stat.icon
            
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  transition: { duration: 0.2 }
                }}
                className="group cursor-pointer"
              >
                <div className={`relative bg-gradient-to-br ${stat.bgColor} rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all overflow-hidden border-2 border-white`}>
                  {/* Animated Background Glow */}
                  <motion.div
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      delay: index * 0.2
                    }}
                    className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-3xl blur-2xl`}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.3
                      }}
                      className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl shadow-lg mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <StatIcon className="text-3xl text-white" />
                    </motion.div>

                    {/* Number */}
                    <motion.div
                      className={`text-5xl md:text-6xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r ${stat.color}`}
                    >
                      {formatNumber(counters[stat.id], stat)}
                      <span className="text-4xl">{stat.suffix}</span>
                    </motion.div>

                    {/* Label */}
                    <div className="text-gray-700 font-bold text-lg">
                      {stat.label}
                    </div>

                    {/* Animated Line */}
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                      className={`h-1 bg-gradient-to-r ${stat.color} rounded-full mt-4`}
                    />
                  </div>

                  {/* Corner Decoration */}
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className={`absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-r ${stat.color} rounded-full opacity-10`}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex flex-col md:flex-row items-center gap-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 md:p-10 shadow-2xl text-white"
          >
            <div className="text-left">
              <div className="text-3xl md:text-4xl font-black mb-2">
                Join 50,000+ Happy Customers
              </div>
              <div className="text-lg md:text-xl text-white/90">
                Experience premium shopping with verified quality products
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-8 py-4 rounded-full font-black text-lg shadow-xl hover:shadow-2xl transition-all whitespace-nowrap"
            >
              Start Shopping →
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}