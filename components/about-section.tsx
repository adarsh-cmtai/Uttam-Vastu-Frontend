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
    <section className="py-12 sm:py-12 bg-gradient-to-r from-[#D7281E] via-[#F36C2C] to-[#F7A64A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-4 tracking-tight font-serif drop-shadow-md">
            About Vastumaye
          </h1>
          <div className="mx-auto w-24 h-1 bg-white/30 rounded-full mb-6"></div>
          <p className="max-w-3xl mx-auto text-lg leading-relaxed text-white drop-shadow-sm">
            At Vastumaye, we observe Vastu as dharma — a sacred duty to nurture safety, harmony, and joy in every home and workplace. Our mission is simple: Bring peace where you live, prosperity where you work.
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
            <div className="absolute w-[90%] h-[90%] bg-white/60 rounded-full transform rotate-[-6deg]"></div>
            <img
              src="/astrologer-professional-portrait.jpg"
              alt="Vastumaye Vastu Master"
              className="relative w-full max-w-sm h-auto rounded-full shadow-2xl object-cover aspect-square"
            />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-white mb-6 font-serif">
              Who We Are?
            </motion.h2>

            <motion.p variants={itemVariants} className="text-white leading-relaxed mb-6">
              Born from a deep-rooted belief in Sanatan wisdom, our team of certified Vastu Masters blends experience with quiet passion. We listen first, visit with respect, and then craft remedies that heal without upheaval.
            </motion.p>
            
            <motion.p variants={itemVariants} className="font-semibold text-white mb-4">
              We check all three types of Vastu Dosh:
            </motion.p>

            <ul className="space-y-4 mb-8 text-white">
              <motion.li variants={itemVariants} className="flex items-start gap-3">
                <CheckIcon className="w-6 h-6 text-white mt-1 flex-shrink-0" />
                <span>
                  <strong className="font-bold text-white">Bhumi Dosh (Land Defect):</strong> Analyzing the soil, slope, and shape of your land.
                </span>
              </motion.li>
              <motion.li variants={itemVariants} className="flex items-start gap-3">
                <CheckIcon className="w-6 h-6 text-white mt-1 flex-shrink-0" />
                <span>
                  <strong className="font-bold text-white">Vatavaran Dosh (Environment Defect):</strong> Assessing surrounding energies.
                </span>
              </motion.li>
              <motion.li variants={itemVariants} className="flex items-start gap-3">
                <CheckIcon className="w-6 h-6 text-white mt-1 flex-shrink-0" />
                <span>
                  <strong className="font-bold text-white">Nirman Dosh (Construction Defect):</strong> Correcting structural imbalances.
                </span>
              </motion.li>
            </ul>

            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 bg-white/70 backdrop-blur-sm border-l-4 border-stone-800 p-4 rounded-r-lg"
            >
              <AwardIcon className="w-10 h-10 text-stone-900 flex-shrink-0" />
              <div>
                <p className="font-bold text-lg text-stone-900">Authentic Sanatan Wisdom</p>
                <p className="text-sm text-stone-700">Holistic Vastu remedies without demolition.</p>
              </div>
            </motion.div>

            <motion.p variants={itemVariants} className="mt-8 text-white italic leading-relaxed whitespace-pre-line">
              अपने घर, कार्यालय और दुकान/उद्योग के वास्तु में सुधार करें, 
              अव्यवस्था और विरोधाभास को दूर करें, 
              सुख, स्वास्थ्य, शांति और धन को आकर्षित करें 
              और वास्तुमय हो जाएं।
            </motion.p>

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