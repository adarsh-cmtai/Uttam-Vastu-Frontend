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
    <section className="py-20 sm:py-28 bg-slate-50 as_section">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Horoscope Forecasts
          </h1>
          <div className="as_separator mx-auto w-24 h-1 bg-[#f46f21] rounded-full mb-6"></div>
          <p className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-600">
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
              className="group bg-white p-6 rounded-xl border border-gray-200 text-center cursor-pointer shadow-sm transition-all duration-300 hover:border-orange-500 hover:shadow-lg"
              variants={cardVariants}
              whileHover={{ y: -5 }}
            >
              <div className="text-6xl mb-3 font-serif text-orange-500 transition-transform duration-300 group-hover:scale-110">
                {sign.symbol}
              </div>
              <h4 className="font-bold text-lg text-gray-800 mb-1">{sign.name}</h4>
              <p className="text-sm text-gray-500">{sign.dates}</p>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}