"use client"

import { motion, Variants } from "framer-motion"
import { ClipboardCheckIcon, LaptopIcon } from "lucide-react"

const HomeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h4.5m-4.5 0v-4.5m0 4.5H3" />
  </svg>
)

const BuildingOfficeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h6M9 11.25h6M9 15.75h6" />
  </svg>
)

const services = [
  {
    title: "Residential Vastu Analysis",
    description: "Harmonize your home to foster health, happiness, and strong family bonds. On-site and online options available.",
    icon: HomeIcon,
    link: "#",
  },
  {
    title: "Commercial & Industrial Vastu",
    description: "Optimize your office, shop, or factory for enhanced productivity, growth, and financial success.",
    icon: BuildingOfficeIcon,
    link: "#",
  },
  {
    title: "Pre-Purchase Guidance",
    description: "Invest wisely. We analyze potential properties to ensure they align with Vastu principles before you commit.",
    icon: ClipboardCheckIcon,
    link: "#",
  },
  {
    title: "Online Vastu Consultation",
    description: "Receive expert Vastu advice from anywhere in the world through detailed video calls and floor plan analysis.",
    icon: LaptopIcon,
    link: "#",
  },
]

export default function ServicesSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  }

  const imageVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  }

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-r from-[#D7281E] via-[#F36C2C] to-[#F7A64A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-4 tracking-tight font-serif drop-shadow-md">
            Our Authentic Vastu Services
          </h1>
          <div className="mx-auto w-24 h-1 bg-white/30 rounded-full mb-6"></div>
          <p className="max-w-3xl mx-auto text-xl leading-relaxed text-white drop-shadow-sm">
            We offer authentic Vastu consultations to create balance and positive energy. Our solutions are practical, powerful, and designed to bring lasting harmony without demolition.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            className="flex justify-center"
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <img
              src="/meditation-spiritual-astrology.jpg"
              alt="Spiritual harmony and balance achieved through Vastu principles"
              className="w-full h-auto max-w-lg rounded-full shadow-xl object-cover"
            />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                className="group bg-orange-50/80 backdrop-blur-sm p-6 rounded-xl border border-orange-200/50 shadow-lg shadow-black/10 text-left transition-all duration-300 hover:border-orange-300 hover:bg-orange-50"
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-stone-900/10 mb-5">
                  <service.icon className="w-6 h-6 text-[#D7281E]" />
                </div>
                <h3 className="font-bold text-lg text-stone-900 mb-2">{service.title}</h3>
                <p className="text-sm text-stone-700 mb-4 leading-relaxed">{service.description}</p>
                <a
                  href={service.link}
                  className="text-sm font-semibold text-[#D7281E] group-hover:text-stone-900 transition-colors"
                >
                  Explore More &rarr;
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}