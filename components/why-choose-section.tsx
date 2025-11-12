"use client"

import { useEffect, useRef } from "react"
import { motion, useInView, animate, Variants } from "framer-motion"

const UserGroupIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-2.144M12 14a4 4 0 100-8 4 4 0 000 8zm0 0v6M2 20h5.356M12 14a3 3 0 00-3 3v2h6v-2a3 3 0 00-3-3z" />
  </svg>
)

const CalendarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)

const CheckCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const StarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
)

const BriefcaseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 13.255A23.931 23.931 0 0012 15c3.183 0 6.22-.62 9-1.745M12 21a9 9 0 100-18 9 9 0 000 18z" />
  </svg>
)

const stats = [
  { number: 1200, suffix: "+", label: "Trusted Clients", icon: UserGroupIcon },
  { number: 18, suffix: "+", label: "Years Experience", icon: CalendarIcon },
  { number: 99, suffix: "%", label: "Success Rate", icon: CheckCircleIcon },
  { number: 50, suffix: "+", label: "Horoscope Types", icon: StarIcon },
  { number: 25, suffix: "+", label: "Qualified Astrologers", icon: BriefcaseIcon },
]

function Counter({ to, suffix, className }: { to: number; suffix: string; className?: string }) {
  const nodeRef = useRef<HTMLSpanElement>(null)
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" })

  useEffect(() => {
    if (isInView && nodeRef.current) {
      const node = nodeRef.current
      const controls = animate(0, to, {
        duration: 2,
        ease: "easeOut",
        onUpdate(value) {
          node.textContent = Math.round(value).toString()
        },
      })
      return () => controls.stop()
    }
  }, [to, isInView])

  return (
    <div className={`text-4xl sm:text-5xl font-extrabold tracking-tight ${className}`}>
      <span ref={nodeRef}>0</span>
      {suffix}
    </div>
  )
}

export default function WhyChooseSection() {
  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  }

  return (
    <section className="py-12 sm:py-12 bg-gradient-to-r from-[#D7281E] via-[#F36C2C] to-[#F7A64A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-4 tracking-tight font-serif drop-shadow-md">
            Why Choose Us
          </h1>
          <div className="mx-auto w-24 h-1 bg-white/30 rounded-full mb-6"></div>
          <p className="max-w-3xl mx-auto text-lg leading-relaxed text-white drop-shadow-sm">
            With years of training in Vedic astrology and a genuine passion for helping others, we combine expertise and
            empathy in every reading. Our commitment to providing accurate, meaningful guidance sets us apart.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              className="group relative flex flex-col items-center justify-center p-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-center shadow-lg shadow-black/10 transition-all duration-300 hover:border-orange-300 hover:bg-orange-50"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center justify-center h-14 w-14 rounded-full bg-white/20 mb-5 transition-colors duration-300 group-hover:bg-stone-900/10">
                <stat.icon className="w-8 h-8 text-white transition-colors duration-300 group-hover:text-[#D7281E]" />
              </div>
              <Counter to={stat.number} suffix={stat.suffix} className="text-white transition-colors duration-300 group-hover:text-stone-900" />
              <p className="mt-2 text-sm text-white/80 font-medium transition-colors duration-300 group-hover:text-stone-700">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}