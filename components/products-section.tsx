"use client"

import { useState } from "react"

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

export default function ProductsSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <section className="py-20 bg-black/10 as_section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="mb-6">Popular Products</h1>
          <div className="as_separator"></div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition relative"
              onMouseEnter={() => setHoveredId(idx)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Product Image */}
              <div className="relative h-48 bg-gradient-to-br from-[#f46f21] to-[#d45a1a] flex items-center justify-center overflow-hidden">
                <img
                  src={`/meditation-spiritual-astrology.jpg`}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded text-xs font-bold">
                  New
                </span>

                {/* Hover Overlay */}
                {hoveredId === idx && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <button className="as_btn bg-white text-[#f46f21] hover:bg-gray-100">Add to Cart</button>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fa fa-star text-[#f46f21] text-sm"></i>
                  ))}
                </div>
                <h4 className="font-bold mb-2">{product.name}</h4>
                <p className="text-sm text-gray-600 mb-3">{product.description}</p>
                <div className="text-lg font-bold text-[#f46f21]">{product.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
