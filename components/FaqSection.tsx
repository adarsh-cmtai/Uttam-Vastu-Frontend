"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

interface AccordionItemProps {
  item: { question: string; answer: string; };
  index: number;
  activeIndex: number | null;
  onToggle: (index: number) => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ item, index, activeIndex, onToggle }) => {
  const isActive = index === activeIndex

  return (
    <div className="bg-orange-50/80 backdrop-blur-sm rounded-lg border border-orange-200/50 shadow-lg overflow-hidden">
      <button
        onClick={() => onToggle(index)}
        className="w-full flex justify-between items-center p-6 text-left"
      >
        <h3 className="text-lg font-bold text-stone-900">{item.question}</h3>
        <motion.div animate={{ rotate: isActive ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown className="w-6 h-6 text-stone-800" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto", marginTop: "0px", marginBottom: "24px" },
              collapsed: { opacity: 0, height: 0, marginTop: "0px", marginBottom: "0px" },
            }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="px-6"
          >
            <div
              className="text-stone-700 leading-relaxed pb-4 [&_strong]:font-bold [&_br]:mb-2"
              dangerouslySetInnerHTML={{ __html: item.answer.replace(/\n/g, '<br />') }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FaqSection() {
  const { t } = useLanguage();
  const content = t.aboutPage.faqSection;
  const faqData = content.faqs;

  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-r from-[#D7281E] via-[#F36C2C] to-[#F7A64A]">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-4 tracking-tight font-serif drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]">
            {content.title}
          </h1>
          <div className="mx-auto w-24 h-1 bg-stone-900/30 rounded-full"></div>
        </div>
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <AccordionItem
              key={index}
              item={item}
              index={index}
              activeIndex={activeIndex}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </div>
    </section>
  )
}