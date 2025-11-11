"use client"

import { useState } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"

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

const cardVariants: Variants = {
  enter: {
    opacity: 0,
    y: 30,
    scale: 0.98,
  },
  center: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -30,
    scale: 0.98,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
}

const itemVariants: Variants = {
  enter: { opacity: 0, y: 20 },
  center: { opacity: 1, y: 0 },
}

const StarIcon = () => (
  <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)

  return (
    <section className="py-20 sm:py-28 bg-gray-50 as_section">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Trusted by People Like You
          </h1>
          <div className="as_separator mx-auto w-24 h-1 bg-[#f46f21] rounded-full mb-6"></div>
          <p className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-600">
            Real stories from real clients. Discover how astrological guidance has provided clarity, direction, and
            peace of mind in their lives.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <div className="flex flex-col gap-3 lg:col-span-4">
            {testimonials.map((testimonial, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-full p-4 rounded-lg text-left transition-all duration-300 ease-in-out transform focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-500 ${
                  idx === current
                    ? "bg-white border-l-4 border-orange-500 shadow-lg scale-[1.03]"
                    : "bg-transparent hover:bg-white hover:shadow-md border-l-4 border-transparent"
                }`}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0 border-2 border-gray-200"
                  />
                  <div>
                    <h3 className="font-bold text-gray-800">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.text.substring(0, 30)}...</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-8 lg:sticky top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="relative bg-white p-8 sm:p-10 rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
              >
                <motion.div variants={itemVariants} className="flex items-center gap-5 mb-5">
                  <img
                    src={testimonials[current].image}
                    alt={testimonials[current].name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-gray-100"
                  />
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900">{testimonials[current].name}</h4>
                    <div className="mt-1 flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} />
                      ))}
                    </div>
                  </div>
                </motion.div>
                <motion.hr variants={itemVariants} className="border-gray-200" />
                <motion.p
                  variants={itemVariants}
                  className="mt-5 text-lg md:text-xl font-medium leading-relaxed text-gray-700 before:content-['“'] before:mr-1 before:text-4xl before:text-orange-500 before:font-serif after:content-['”'] after:ml-1 after:text-4xl after:text-orange-500 after:font-serif"
                >
                  {testimonials[current].text}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}