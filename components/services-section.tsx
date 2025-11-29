"use client"

import React from "react";
import { motion, Variants } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext";

export default function ServicesSection() {
  const { t } = useLanguage();
  const content = t.authenticServices;

  const imageVariants: Variants = { hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } } }
  const videoVariants: Variants = { hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } } }

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-r from-[#D7281E] via-[#F36C2C] to-[#F7A64A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-4 tracking-tight font-serif drop-shadow-md">
            {content.title}
          </h1>
          <div className="mx-auto w-24 h-1 bg-white/30 rounded-full mb-6"></div>
          <p className="max-w-3xl mx-auto text-xl leading-relaxed text-white drop-shadow-sm">
            {content.description}
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
              src="/service2.gif" 
              alt="Spiritual harmony" 
              className="w-full h-auto max-w-xl rounded-full object-cover shadow-2xl border-4 border-white/20" 
            />
          </motion.div>

          <motion.div 
            className="flex justify-center items-center"
            variants={videoVariants} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="w-full max-w-xl rounded-2xl overflow-hidden backdrop-blur-sm">
              <video 
                src="/Vastu Video.mp4" 
                autoPlay
                muted 
                loop  
                playsInline 
                className="w-full h-auto max-h-[550px] object-cover block rounded-xl"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}