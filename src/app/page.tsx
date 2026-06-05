import Hero from '@/components/Hero'
import Categories from '@/components/Categories'
import FeaturedProducts from '@/components/FeaturedProducts'
import FlashSale from '@/components/FlashSale'
import Stats from '@/components/Stats'
import Brands from '@/components/Brands'
import Testimonials from '@/components/Testimonials'
import Newsletter from '@/components/Newsletter'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Categories />
      <FeaturedProducts />
      <FlashSale />
      <Stats />
      <Brands />
      <Testimonials />
      <Newsletter />
    </main>
  )
}