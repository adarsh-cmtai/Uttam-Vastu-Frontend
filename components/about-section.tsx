"use client"

import { motion, Variants } from "framer-motion"

export default function AboutSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
  }

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section className="py-20 sm:py-28 bg-white as_section">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            About Uttam Vastu
          </h1>
          <div className="as_separator mx-auto w-24 h-1 bg-[#f46f21] rounded-full mb-6"></div>
          <p className="max-w-3xl mx-auto text-lg leading-relaxed text-gray-600">
            Uttam Vastu is your gateway to the profound wisdom of Vedic Astrology. Our mission is to provide you with
            meaningful insights into your horoscope, planetary placements, and life's journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            className="relative flex justify-center items-center"
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="absolute w-[90%] h-[90%] bg-slate-100 rounded-2xl transform rotate-[-6deg]"></div>
            <img
              src="/astrologer-professional-portrait.jpg"
              alt="Uttam Vastu"
              className="relative w-full max-w-sm h-auto rounded-2xl shadow-2xl object-cover aspect-square"
            />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-gray-900 mb-6">
              Illuminating Your Path with Ancient Wisdom
            </motion.h2>

            <motion.p variants={itemVariants} className="text-gray-600 leading-relaxed mb-6">
              We specialize in personalized Vedic Astrology consultations designed to illuminate your life's path. We
              help you navigate your journey with clarity and confidence by:
            </motion.p>

            <ul className="space-y-4 mb-8">
              <motion.li variants={itemVariants} className="flex items-start gap-3">
                <CheckIcon className="w-6 h-6 text-orange-500 mt-1 flex-shrink-0" />
                <span>
                  Analyzing your unique birth chart to uncover hidden opportunities, strengths, and challenges.
                </span>
              </motion.li>
              <motion.li variants={itemVariants} className="flex items-start gap-3">
                <CheckIcon className="w-6 h-6 text-orange-500 mt-1 flex-shrink-0" />
                <span>
                  Providing practical, actionable, and life-transforming guidance on health, relationships, career,
                  and finances.
                </span>
              </motion.li>
              <motion.li variants={itemVariants} className="flex items-start gap-3">
                <CheckIcon className="w-6 h-6 text-orange-500 mt-1 flex-shrink-0" />
                <span>
                  Offering effective remedies and muhurats to ensure you live a balanced, purposeful, and spiritually
                  enriched life.
                </span>
              </motion.li>
            </ul>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 bg-orange-50 border-l-4 border-orange-500 p-4 rounded-lg mb-8"
            >
              <AwardIcon className="w-10 h-10 text-orange-600 flex-shrink-0" />
              <div>
                <p className="font-bold text-lg text-gray-800">18+ Years of Experience</p>
                <p className="text-sm text-gray-600">Guiding individuals towards a better future.</p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <button className="as_btn">Read More</button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
)

const AwardIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)