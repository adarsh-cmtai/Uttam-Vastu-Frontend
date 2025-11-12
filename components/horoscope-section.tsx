"use client"

import { motion, Variants } from "framer-motion"

const zodiacSigns = [
  { name: "Aries", dates: "Mar 21 - Apr 19", symbol: "♈" },
  { name: "Taurus", dates: "Apr 20 - May 20", symbol: "♉" },
  { name: "Gemini", dates: "May 21 - Jun 20", symbol: "♊" },
  { name: "Cancer", dates: "Jun 21 - Jul 22", symbol: "♋" },
  { name: "Leo", dates: "Jul 23 - Aug 22", symbol: "♌" },
  { name: "Virgo", dates: "Aug 23 - Sep 22", symbol: "♍" },
  { name: "Libra", dates: "Sep 23 - Oct 22", symbol: "♎" },
  { name: "Scorpio", dates: "Oct 23 - Nov 21", symbol: "♏" },
  { name: "Sagittarius", dates: "Nov 22 - Dec 21", symbol: "♐" },
  { name: "Capricorn", dates: "Dec 22 - Jan 19", symbol: "♑" },
  { name: "Aquarius", dates: "Jan 20 - Feb 18", symbol: "♒" },
  { name: "Pisces", dates: "Feb 19 - Mar 20", symbol: "♓" },
]

const gridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
}

export default function HoroscopeSection() {
  return (
    <section className="py-12 sm:py-12 bg-gradient-to-r from-[#D7281E] via-[#F36C2C] to-[#F7A64A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-4 tracking-tight font-serif drop-shadow-md">
            Horoscope Forecasts
          </h1>
          <div className="mx-auto w-24 h-1 bg-white/30 rounded-full mb-6"></div>
          <p className="max-w-3xl mx-auto text-lg leading-relaxed text-white drop-shadow-sm">
            This week is a time for reflection and personal growth. Focus on nurturing your relationships and take some
            time for self-care to recharge your energy.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {zodiacSigns.map((sign) => (
            <motion.a
              key={sign.name}
              href="#"
              className="group bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 text-center cursor-pointer shadow-lg shadow-black/10 transition-all duration-300 hover:border-orange-300 hover:bg-orange-50"
              variants={cardVariants}
              whileHover={{ y: -5 }}
            >
              <div className="text-6xl mb-3 font-serif text-white transition-all duration-300 group-hover:scale-110 group-hover:text-[#D7281E]">
                {sign.symbol}
              </div>
              <h4 className="font-bold text-lg text-white mb-1 transition-colors duration-300 group-hover:text-stone-900">{sign.name}</h4>
              <p className="text-sm text-white/80 transition-colors duration-300 group-hover:text-stone-700">{sign.dates}</p>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}