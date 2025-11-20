"use client"

import React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext";

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

export default function VastuServicesSection() {
  const { t } = useLanguage();
  const content = t.coreServices;
  const vastuServices = content.services;

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-r from-[#D7281E] via-[#F36C2C] to-[#F7A64A]">
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
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {vastuServices.map((service, index) => (
            <Link key={index} href="/services" passHref legacyBehavior>
                <motion.a
                  className="group bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 text-center cursor-pointer shadow-lg shadow-black/10 transition-all duration-300 hover:border-orange-300 hover:bg-orange-50 h-full flex flex-col justify-center"
                  variants={cardVariants}
                  whileHover={{ y: -5 }}
                >
                  <div className="text-6xl mb-3 font-serif text-white transition-all duration-300 group-hover:scale-110 group-hover:text-[#D7281E]">
                    {service.symbol}
                  </div>
                  <h4 className="font-bold text-lg text-white mb-1 transition-colors duration-300 group-hover:text-stone-900">
                    {service.name}
                  </h4>
                  <p className="text-sm text-white/80 transition-colors duration-300 group-hover:text-stone-700">
                    {service.description}
                  </p>
                </motion.a>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  )
}