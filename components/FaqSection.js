"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const faqData = [
  {
    question: "Why do I need to have Vastu for my Home / Office / Shop or factory?",
    answer: `<strong>a. Health flows from harmony:</strong> Atharwa Ved describes home as a living body. The correct and harmonious entrance welcomes and optimises Prana; an incorrect entrance invites stagnation. Masses report 40% fewer headaches, better sleep and reduced stress after even simple Vastu shifts.

<strong>b. Wealth multiplies in the right direction:</strong> Your Laxmi, treasures, cash or property papers kept in correct spot and in correct direction acts like magnet for prosperity. Factories with corrected Bramhasthan see 20-30% production jumps within a year.

<strong>c. Relationships heal in balanced zones:</strong> Misaligned bedrooms breed arguments. Spaces influence minds, science calls it environmental psychology, we call it effect of Vastu.

<strong>d. Success starts at the door:</strong> An incorrect entry of house / office / factory drains energy. Reorientation or Vastu remedy brings new clients, promotions and funding – like a silent ally working 24/7.

<strong>e. Future Proof legacy:</strong> Atharva Ved says: “यथा पिण्डे तथा ब्रह्माण्डे”- as in the microcosm, so in the macrocosm. A small investment in Vastu today, can prove to bless you multi-fold value tomorrow.`,
  },
  {
    question: "When is the right time for Vastu?",
    answer: `The best time is before trouble begins.
<strong>a. Buying or constructing?</strong> — Lock harmony from day one.
<strong>b. Renovating?</strong> — Realign while walls are open.
<strong>c. Re-occupying an empty space?</strong> — Clear old energies.

But Vastu is never late. If your space feels heavy, relationships strain, business dwindles, health falters, or unexplained issues arise — that’s your signal.

Vastu restores balance. Anytime.`,
  },
  {
    question: "How much should I invest in Vastu?",
    answer: `Your space is unique — so is our care. A cozy 1-BHK breathes differently from a sprawling factory. Area, layout, complexity, and depth of remedy shape the journey.

<strong>Our Promise:</strong>
• Transparent, itemised proposal after a free 10-minute call.
• No bargaining — quality is non-negotiable.
• Every rupee plants a seed sprouting into health, wealth, and joy for years.

Think of it as insuring your peace.`,
  },
]

const AccordionItem = ({ item, index, activeIndex, onToggle }) => {
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
              className="text-stone-700 leading-relaxed whitespace-pre-line pb-4"
              dangerouslySetInnerHTML={{ __html: item.answer }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FaqSection() {
  const [activeIndex, setActiveIndex] = useState(null)

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-r from-[#D7281E] via-[#F36C2C] to-[#F7A64A]">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-4 tracking-tight font-serif drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]">
            Frequently Asked Questions
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