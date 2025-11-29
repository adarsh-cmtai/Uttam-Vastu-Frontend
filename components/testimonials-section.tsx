"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"

const sliderVariants: Variants = {
  enter: (direction: number) => ({ x: direction > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  exit: (direction: number) => ({ x: direction < 0 ? '100%' : '-100%', opacity: 0, transition: { duration: 0.3, ease: 'easeIn' } }),
}

const StarIcon = () => (
  <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

export default function TestimonialsSection() {
  const { t } = useLanguage();
  const content = t.testimonialsSection;
  const testimonials = content.testimonials;

  const [[page, direction], setPage] = useState([0, 0])

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection])
  }
  
  const current = ((page % testimonials.length) + testimonials.length) % testimonials.length

  useEffect(() => {
    const interval = setInterval(() => { paginate(1) }, 6000) // Interval thoda badha diya
    return () => clearInterval(interval)
  }, [page, testimonials.length])
  
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-r from-[#D7281E] via-[#F36C2C] to-[#F7A64A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-4 tracking-tight font-serif drop-shadow-md">
            {content.title}
          </h1>
          <div className="mx-auto w-24 h-1 bg-white/30 rounded-full mb-6"></div>
          <p className="max-w-3xl mx-auto text-xl  leading-relaxed text-white drop-shadow-sm">
            {content.description}
          </p>
        </div>
        <div className="max-w-3xl mx-auto relative min-h-[32rem] flex items-center justify-center overflow-hidden">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={sliderVariants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                if (Math.abs(offset.x) > 50) {
                  paginate(offset.x > 0 ? -1 : 1)
                }
              }}
              className="absolute w-full max-w-2xl bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 flex flex-col items-center text-center shadow-2xl"
            >
              <img src={testimonials[current].image} alt={testimonials[current].name} className="w-20 h-20 rounded-full object-cover border-4 border-white mb-4 flex-shrink-0" />
              <div className="flex gap-1 mb-3 flex-shrink-0">
                {[...Array(5)].map((_, i) => ( <StarIcon key={i} /> ))}
              </div>
              <div className="flex-grow overflow-y-auto">
                <p className="text-base sm:text-lg text-white mb-4 leading-relaxed">"{testimonials[current].text}"</p>
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-white tracking-wide mt-2 flex-shrink-0">{testimonials[current].name}</h4>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setPage([idx, idx > current ? 1 : -1])}
              className={`h-3 rounded-full transition-all duration-300 ease-in-out ${ idx === current ? "w-6 bg-white" : "w-3 bg-white/40 hover:bg-white/60" }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}