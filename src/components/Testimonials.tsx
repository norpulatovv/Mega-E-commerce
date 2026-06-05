'use client'

import { motion } from 'framer-motion'
import { FiStar, FiUser, FiMapPin, FiThumbsUp, FiMessageCircle, FiAward } from 'react-icons/fi'
import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'

interface Testimonial {
  id: number
  name: string
  location: string
  avatar: string
  rating: number
  title: string
  review: string
  product: string
  date: string
  verified: boolean
}

export default function Testimonials() {
  const [hoveredTestimonial, setHoveredTestimonial] = useState<number | null>(null)

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Sarah Johnson',
      location: 'New York, USA',
      avatar: '👩',
      rating: 5,
      title: 'Best Shopping Experience!',
      review: 'Amazing quality products and super fast delivery! I ordered an iPhone and it arrived the next day. Customer service is top-notch. Highly recommend!',
      product: 'iPhone 15 Pro Max',
      date: '2 days ago',
      verified: true
    },
    {
      id: 2,
      name: 'Michael Chen',
      location: 'Singapore',
      avatar: '👨',
      rating: 5,
      title: 'Incredible Service',
      review: 'I have been shopping here for years. The product quality is always excellent and prices are competitive. Free shipping is a huge plus!',
      product: 'MacBook Pro M3',
      date: '1 week ago',
      verified: true
    },
    {
      id: 3,
      name: 'Emma Williams',
      location: 'London, UK',
      avatar: '👩‍🦰',
      rating: 5,
      title: 'Love This Store!',
      review: 'Great variety of products and the website is so easy to navigate. I found exactly what I was looking for. Will definitely shop here again!',
      product: 'Sony Headphones',
      date: '3 days ago',
      verified: true
    },
    {
      id: 4,
      name: 'David Martinez',
      location: 'Madrid, Spain',
      avatar: '👨‍💼',
      rating: 5,
      title: 'Outstanding Quality',
      review: 'The product quality exceeded my expectations. Packaging was perfect and delivery was on time. Customer support helped me with all my questions.',
      product: 'Samsung Galaxy S24',
      date: '5 days ago',
      verified: true
    },
    {
      id: 5,
      name: 'Sophia Anderson',
      location: 'Sydney, Australia',
      avatar: '👩‍💻',
      rating: 5,
      title: 'Highly Recommended!',
      review: 'Best online shopping experience ever! Products are authentic, prices are great, and the customer service team is very helpful and responsive.',
      product: 'Apple Watch Ultra',
      date: '1 week ago',
      verified: true
    },
    {
      id: 6,
      name: 'James Wilson',
      location: 'Toronto, Canada',
      avatar: '👨‍🎓',
      rating: 5,
      title: 'Perfect Experience',
      review: 'From browsing to checkout, everything was smooth. The product arrived in perfect condition. I am extremely satisfied with my purchase!',
      product: 'iPad Air M2',
      date: '4 days ago',
      verified: true
    }
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-white via-purple-50 to-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`testimonial-bg-${i}`}
            animate={{
              y: [0, -60, 0],
              x: [0, 40, 0],
              opacity: [0.02, 0.05, 0.02]
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              delay: i * 1.2
            }}
            className="absolute w-72 h-72 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl"
            style={{
              top: `${i * 15}%`,
              left: `${i * 12}%`
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
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-100 via-pink-100 to-rose-100 text-purple-600 px-8 py-3 rounded-full mb-6 font-bold shadow-lg"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FiMessageCircle/>
            </motion.div>
            <span className="text-lg">Customer Reviews</span>
            <motion.div
              animate={{ 
                rotate: [0, 20, -20, 0],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              💬
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-6xl md:text-7xl font-black mb-6"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600">
              What Our Customers Say
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
            Join thousands of 
            <span className="text-purple-600 font-bold"> happy customers</span> who trust us for their 
            <span className="text-pink-600 font-bold"> shopping needs</span>
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
              { icon: FiStar, value: '4.9/5', label: 'Average Rating' },
              { icon: FiThumbsUp, value: '50K+', label: 'Happy Customers' },
              { icon: FiAward, value: '98%', label: 'Satisfaction Rate' }
            ].map((stat, i) => {
              const StatIcon = stat.icon
              return (
                <motion.div
                  key={`testimonial-stat-${i}`}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="flex items-center gap-3 bg-white px-6 py-4 rounded-2xl shadow-lg border-2 border-purple-100"
                >
                  <div className="text-purple-600 text-3xl">
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

        {/* Testimonials Swiper */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="!pb-16"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={testimonial.id}>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onHoverStart={() => setHoveredTestimonial(testimonial.id)}
                  onHoverEnd={() => setHoveredTestimonial(null)}
                  className="h-full"
                >
                  <motion.div
                    whileHover={{ y: -10, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all h-full flex flex-col relative overflow-hidden border-2 border-gray-100"
                  >
                    {/* Background Gradient */}
                    <motion.div
                      animate={{
                        opacity: hoveredTestimonial === testimonial.id ? 0.1 : 0,
                      }}
                      className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500"
                    />

                    {/* Content */}
                    <div className="relative z-10 flex-1 flex flex-col">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          {/* Avatar */}
                          <motion.div
                            animate={{
                              rotate: hoveredTestimonial === testimonial.id ? [0, -10, 10, 0] : 0,
                            }}
                            transition={{ duration: 0.5 }}
                            className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-3xl shadow-lg"
                          >
                            {testimonial.avatar}
                          </motion.div>

                          {/* Name & Location */}
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-black text-lg text-gray-800">
                                {testimonial.name}
                              </h4>
                              {testimonial.verified && (
                                <motion.div
                                  whileHover={{ scale: 1.2, rotate: 360 }}
                                  className="bg-blue-500 text-white rounded-full p-1"
                                  title="Verified Buyer"
                                >
                                  <FiAward/>
                                </motion.div>
                              )}
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <FiMapPin/>
                              {testimonial.location}
                            </div>
                          </div>
                        </div>

                        {/* Date */}
                        <div className="text-xs text-gray-400 font-semibold">
                          {testimonial.date}
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center gap-1 text-yellow-500">
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={`star-${testimonial.id}-${i}`}
                              initial={{ scale: 0, rotate: -180 }}
                              whileInView={{ scale: 1, rotate: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: i * 0.1 }}
                            >
                              {/* @ts-ignore */}
                              <FiStar className="text-lg fill-current" />
                            </motion.div>
                          ))}
                        </div>
                        <span className="text-sm font-bold text-gray-700">
                          {testimonial.rating}.0
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-black text-gray-800 mb-3">
                        {testimonial.title}
                      </h3>

                      {/* Review */}
                      <p className="text-gray-600 leading-relaxed mb-6 flex-1">
                        "{testimonial.review}"
                      </p>

                      {/* Product */}
                      <div className="mt-auto">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="bg-purple-100 text-purple-600 px-4 py-2 rounded-full font-bold">
                            {testimonial.product}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Quote Icon */}
                    <motion.div
                      animate={{
                        opacity: [0.1, 0.2, 0.1],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute bottom-4 right-4 text-9xl text-purple-100 font-serif leading-none"
                    >
                      "
                    </motion.div>
                  </motion.div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white px-12 py-5 rounded-full font-black text-xl shadow-2xl"
          >
            Read All Reviews →
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}