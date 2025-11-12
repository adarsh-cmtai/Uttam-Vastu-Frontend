"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const products = [
  { name: "Onyx", price: "₹2,999", description: "Premium quality gemstone" },
  { name: "Pearl", price: "₹3,499", description: "Natural freshwater pearl" },
  { name: "Yellow Sapphire", price: "₹5,999", description: "Authentic yellow sapphire" },
  { name: "Red Coral", price: "₹4,499", description: "Pure red coral stone" },
  { name: "Emerald", price: "₹6,999", description: "Natural emerald gem" },
  { name: "Blue Sapphire", price: "₹7,999", description: "Premium blue sapphire" },
  { name: "Hessonite", price: "₹3,999", description: "Certified hessonite" },
  { name: "Cat's Eye", price: "₹4,999", description: "Natural cat's eye stone" },
]

const StarIcon = () => (
  <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

const CartIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
)

export default function ProductsSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <section className="py-12 sm:py-12 bg-gradient-to-r from-[#D7281E] via-[#F36C2C] to-[#F7A64A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-4 tracking-tight font-serif drop-shadow-md">
            Popular Products
          </h1>
          <div className="mx-auto w-24 h-1 bg-white/30 rounded-full mb-6"></div>
          <p className="max-w-3xl mx-auto text-lg leading-relaxed text-white drop-shadow-sm">
            Explore our handpicked selection of authentic gemstones, each chosen for its purity and energy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, idx) => (
            <motion.div
              key={idx}
              className="relative bg-white/10 backdrop-blur-sm rounded-lg  border border-white/20 overflow-hidden group cursor-pointer"
              onMouseEnter={() => setHoveredId(idx)}
              onMouseLeave={() => setHoveredId(null)}
              whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)" }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={`/meditation-spiritual-astrology.jpg`}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                <AnimatePresence>
                  {hoveredId === idx && (
                    <motion.button
                      className="absolute top-3 right-3 h-10 w-10 flex items-center justify-center rounded-full bg-white text-[#D7281E] shadow-lg"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                      <CartIcon />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-white text-lg truncate">{product.name}</h3>
                <p className="text-sm text-white/80 mb-3 truncate">{product.description}</p>
                <div className="flex justify-between items-center">
                  <p className="text-xl font-extrabold text-white">{product.price}</p>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}