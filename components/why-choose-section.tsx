"use client"

import React, { useEffect, useRef } from "react"
import { motion, useInView, animate, Variants } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"
import { CalendarDaysIcon, CheckCircleIcon, StarIcon, BriefcaseIcon, User2Icon } from "lucide-react"

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
  const { t } = useLanguage();
  const content = t.aboutPage.whyChooseSection;
  
  const stats = [
    { number: 15, suffix: "+", label: content.stat1Label, icon: User2Icon },
    { number: 1, suffix: "+", label: content.stat2Label, icon: CalendarDaysIcon },
    { number: 90, suffix: "%", label: content.stat3Label, icon: CheckCircleIcon },
    { number: 3, suffix: "+", label: content.stat4Label, icon: StarIcon },
    { number: 1, suffix: "", label: content.stat5Label, icon: BriefcaseIcon },
  ];

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
            {content.title}
          </h1>
          <div className="mx-auto w-24 h-1 bg-white/30 rounded-full mb-6"></div>
          <p className="max-w-3xl mx-auto text-lg leading-relaxed text-white drop-shadow-sm">
            {content.description}
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