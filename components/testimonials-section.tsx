"use client"

import { useState } from "react"

const testimonials = [
  {
    name: "Rina Sharma",
    text: "Uttam Vastu has been incredibly helpful in guiding me through a difficult career transition. The insights were accurate and actionable.",
    image: "/client-portrait-woman.jpg",
  },
  {
    name: "Adi Kumar",
    text: "I was skeptical at first, but the personalized chart analysis changed my perspective completely. Highly recommended!",
    image: "/client-portrait-man.jpg",
  },
  {
    name: "Sushmita Sharma",
    text: "The consultation helped me understand my relationships better. I feel more confident about my future now.",
    image: "/client-portrait-woman.jpg",
  },
  {
    name: "Vikram Pandey",
    text: "Exceptional guidance on financial matters. Uttam Vastu provided practical advice backed by astrology.",
    image: "/client-portrait-man.jpg",
  },
  {
    name: "Anjali Desai",
    text: "The remedies suggested have made a significant difference in my health and wellness journey.",
    image: "/client-portrait-woman.jpg",
  },
  {
    name: "Reema Vats",
    text: "Uttam Vastu is professional, knowledgeable, and genuinely cares about their clients' wellbeing.",
    image: "/client-portrait-woman.jpg",
  },
]

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)

  return (
    <section className="py-20 bg-black/10 as_section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="mb-6">What My Clients Say</h1>
          <div className="as_separator"></div>
          <p className="max-w-3xl mx-auto text-lg leading-relaxed">
            Discover how my astrological readings have made a difference in the lives of my clients. Their feedback and
            stories offer a glimpse into how astrology can provide practical insights and spiritual clarity.
          </p>
        </div>

        {/* Testimonials Slider */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left - Thumbnails */}
          <div className="flex flex-col gap-4 md:col-span-1">
            {testimonials.map((testimonial, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`p-4 rounded-lg transition ${
                  idx === current ? "bg-[#f46f21] text-white" : "bg-white text-[#212121] hover:bg-gray-100"
                }`}
              >
                <div className="text-sm font-bold text-left">{testimonial.name}</div>
              </button>
            ))}
          </div>

          {/* Right - Current Testimonial */}
          <div className="md:col-span-2 bg-white p-12 rounded-lg shadow-lg">
            <div className="mb-6">
              <img
                src={testimonials[current].image || "/placeholder.svg"}
                alt={testimonials[current].name}
                className="w-20 h-20 rounded-full object-cover mb-4"
              />
              <h4 className="font-bold">{testimonials[current].name}</h4>
            </div>
            <p className="text-lg leading-relaxed italic text-gray-600">"{testimonials[current].text}"</p>
            <div className="mt-6 flex gap-1">
              {[...Array(5)].map((_, i) => (
                <i key={i} className="fa fa-star text-[#f46f21]"></i>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
