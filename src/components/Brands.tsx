'use client'

import { motion } from 'framer-motion'
import { FiStar, FiTrendingUp, FiAward, FiZap } from 'react-icons/fi'

interface Brand {
  id: number
  name: string
  logo: string
  description: string
}

export default function Brands() {
  const brands: Brand[] = [
    {
      id: 1,
      name: 'Apple',
      logo: '🍎',
      description: 'Premium Electronics'
    },
    {
      id: 2,
      name: 'Samsung',
      logo: '📱',
      description: 'Innovation Leader'
    },
    {
      id: 3,
      name: 'Sony',
      logo: '🎮',
      description: 'Entertainment Giant'
    },
    {
      id: 4,
      name: 'Nike',
      logo: '👟',
      description: 'Sports Excellence'
    },
    {
      id: 5,
      name: 'Adidas',
      logo: '⚽',
      description: 'Athletic Performance'
    },
    {
      id: 6,
      name: 'Dell',
      logo: '💻',
      description: 'Computing Power'
    },
    {
      id: 7,
      name: 'Canon',
      logo: '📷',
      description: 'Imaging Excellence'
    },
    {
      id: 8,
      name: 'Bose',
      logo: '🎧',
      description: 'Audio Perfection'
    },
    {
      id: 9,
      name: 'LG',
      logo: '📺',
      description: 'Life\'s Good'
    },
    {
      id: 10,
      name: 'HP',
      logo: '🖨️',
      description: 'Tech Solutions'
    },
    {
      id: 11,
      name: 'Microsoft',
      logo: '🪟',
      description: 'Software Leader'
    },
    {
      id: 12,
      name: 'Lenovo',
      logo: '⌨️',
      description: 'Smart Technology'
    }
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-white via-blue-50 to-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`brand-bg-${i}`}
            animate={{
              y: [0, -80, 0],
              x: [0, 40, 0],
              opacity: [0.02, 0.05, 0.02]
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              delay: i * 1.5
            }}
            className="absolute w-80 h-80 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl"
            style={{
              top: `${i * 20}%`,
              left: `${i * 15}%`
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
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 text-blue-600 px-8 py-3 rounded-full mb-6 font-bold shadow-lg"
          >
            <motion.div
              animate={{ 
                rotate: [0, 360],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <FiAward/>
            </motion.div>
            <span className="text-lg">Trusted Brands</span>
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🏆
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-6xl md:text-7xl font-black mb-6"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              Top Global Brands
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
            We partner with the world's most 
            <span className="text-blue-600 font-bold"> trusted brands</span> to bring you 
            <span className="text-purple-600 font-bold"> premium quality</span>
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-8 mt-10"
          >
            {[
              { icon: FiStar, value: '100+', label: 'Top Brands' },
              { icon: FiTrendingUp, value: '500K+', label: 'Products' },
              { icon: FiZap, value: '24/7', label: 'Support' }
            ].map((stat, i) => {
              const StatIcon = stat.icon
              return (
                <motion.div
                  key={`brand-stat-${i}`}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="flex items-center gap-3 bg-white px-6 py-4 rounded-2xl shadow-lg border-2 border-blue-100"
                >
                  <div className="text-blue-600 text-3xl">
                    <StatIcon />
                  </div>
                  <div className="text-left">
                    <div className="font-black text-2xl text-gray-800">{stat.value}</div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: index * 0.05,
                type: "spring",
                stiffness: 200
              }}
              whileHover={{ 
                scale: 1.1, 
                y: -10,
                rotateZ: [0, -5, 5, 0],
                transition: { duration: 0.3 }
              }}
              className="group cursor-pointer"
            >
              <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all border-2 border-gray-100 hover:border-blue-200 overflow-hidden">
                {/* Animated Background */}
                <motion.div
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0, 0.1, 0],
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    delay: index * 0.2
                  }}
                  className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl"
                />

                {/* Content */}
                <div className="relative z-10 text-center">
                  {/* Logo */}
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: index * 0.3
                    }}
                    className="text-6xl mb-4 filter drop-shadow-lg group-hover:scale-110 transition-transform"
                  >
                    {brand.logo}
                  </motion.div>

                  {/* Brand Name */}
                  <h3 className="text-xl font-black text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {brand.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 font-semibold">
                    {brand.description}
                  </p>

                  {/* Animated Line */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.05 + 0.3 }}
                    className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-4 mx-auto"
                    style={{ maxWidth: '60%' }}
                  />
                </div>

                {/* Corner Badge */}
                <motion.div
                  initial={{ scale: 0, rotate: -45 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 + 0.5 }}
                  className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-xs font-black"
                >
                  <FiStar />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Infinite Scroll Animation (Optional Marquee) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 shadow-2xl text-center text-white overflow-hidden relative">
            <motion.div
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              style={{ backgroundSize: '200% 100%' }}
            />

            <div className="relative z-10">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl mb-6"
              >
                🤝
              </motion.div>
              <h3 className="text-4xl md:text-5xl font-black mb-4">
                Want to Partner With Us?
              </h3>
              <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
                Join the world's leading brands and reach millions of customers
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-10 py-5 rounded-full font-black text-xl shadow-2xl hover:shadow-white/50 transition-all"
              >
                Become a Partner →
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}