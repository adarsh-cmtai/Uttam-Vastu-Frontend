"use client"

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

const gridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

export default function VastuServicesSection() {
  const { t } = useLanguage();
  const content = t.coreServices;
  const vastuServices = content.services;
  
  const [selectedServiceIndex, setSelectedServiceIndex] = useState<number | null>(null);

  const handleServiceClick = (index: number) => {
    setSelectedServiceIndex(index);
  };

  const handleClose = () => {
    setSelectedServiceIndex(null);
  };

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-r from-[#D7281E] via-[#F36C2C] to-[#F7A64A] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 min-h-[600px]">
        <motion.div 
            className="text-center mb-16"
            animate={{ 
              opacity: selectedServiceIndex !== null ? 0.3 : 1, 
              scale: selectedServiceIndex !== null ? 0.95 : 1 
            }}
            transition={{ duration: 0.3 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-4 tracking-tight font-serif drop-shadow-md">
            {content.title}
          </h1>
          <div className="mx-auto w-24 h-1 bg-white/30 rounded-full mb-6"></div>
          <p className="max-w-3xl mx-auto text-xl leading-relaxed text-white drop-shadow-sm">
            {content.description}
          </p>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            {selectedServiceIndex === null ? (
              <motion.div
                key="grid"
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
                variants={gridVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {vastuServices.map((service: any, index: number) => (
                  <motion.div
                    key={index}
                    onClick={() => handleServiceClick(index)}
                    className="group bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 text-center cursor-pointer shadow-lg shadow-black/10 transition-all duration-300 hover:border-orange-300 hover:bg-orange-50 h-full flex flex-col justify-center items-center"
                    variants={cardVariants}
                    whileHover={{ y: -5 }}
                    layoutId={`card-${index}`}
                  >
                    <motion.div 
                      className="text-6xl mb-3 font-serif text-white transition-all duration-300 group-hover:scale-110 group-hover:text-[#D7281E]"
                      layoutId={`symbol-${index}`}
                    >
                      {service.symbol}
                    </motion.div>
                    <motion.h4 
                      className="font-bold text-lg text-white mb-1 transition-colors duration-300 group-hover:text-stone-900"
                      layoutId={`title-${index}`}
                    >
                      {service.name}
                    </motion.h4>
                    <p className="text-sm text-white/80 transition-colors duration-300 group-hover:text-stone-700">
                      {service.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="detail"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full flex flex-col md:flex-row items-center gap-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/30 p-6 md:p-10 shadow-2xl relative"
              >
                <button 
                  onClick={handleClose}
                  className="absolute top-4 right-4 bg-white/20 hover:bg-white text-white hover:text-[#D7281E] p-2 rounded-full transition-all duration-300 z-10"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>

                <div className="w-full md:w-1/3 flex flex-col justify-center items-center bg-orange-50/20 rounded-xl p-8 border border-white/20">
                   <motion.div 
                     className="text-9xl mb-6 drop-shadow-lg"
                     layoutId={`symbol-${selectedServiceIndex}`}
                   >
                      {vastuServices[selectedServiceIndex].symbol}
                   </motion.div>
                   <motion.h3 
                    className="text-3xl font-bold text-white text-center font-serif mb-2 drop-shadow-md"
                    layoutId={`title-${selectedServiceIndex}`}
                   >
                      {vastuServices[selectedServiceIndex].name}
                   </motion.h3>
                   <div className="h-1 w-16 bg-white/50 rounded-full"></div>
                </div>

                <div className="w-full md:w-2/3 flex flex-col justify-center text-white">
                  <h4 className="text-2xl font-bold mb-4 text-stone-900 drop-shadow-sm">
                    {vastuServices[selectedServiceIndex].description}
                  </h4>
                  
                  <p className="text-lg md:text-xl leading-relaxed text-white/95 font-medium drop-shadow-md">
                    {vastuServices[selectedServiceIndex].detail}
                  </p>

                  <div className="mt-8">
                    <button 
                        onClick={handleClose}
                        className="px-8 py-3 bg-white text-[#D7281E] font-bold rounded-full shadow-lg hover:bg-stone-100 hover:scale-105 transition-all duration-300"
                    >
                        {content.btnText}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}