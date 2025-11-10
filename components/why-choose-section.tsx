"use client"

import { useEffect, useState } from "react"

const stats = [
  { number: 100, suffix: "+", label: "Trusted Clients" },
  { number: 18, suffix: "+", label: "Years Experience" },
  { number: 55, suffix: "+", label: "Types of Horoscopes" },
  { number: 90, suffix: "+", label: "Qualified Astrologers" },
  { number: 99, suffix: "+", label: "Success Rate" },
]

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let current = 0
    const increment = target / 100
    const interval = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(interval)
      } else {
        setCount(Math.floor(current))
      }
    }, 30)
    return () => clearInterval(interval)
  }, [target])

  return (
    <>
      {count}
      {suffix}
    </>
  )
}

export default function WhyChooseSection() {
  return (
    <section className="py-20 bg-white as_section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="mb-6">Why Choose Us</h1>
          <div className="as_separator"></div>
          <p className="max-w-3xl mx-auto text-lg leading-relaxed">
            With years of training in Vedic astrology and a genuine passion for helping others, I combine expertise and
            empathy in every reading. My commitment to providing accurate, meaningful guidance sets me apart.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-[#f46f21] to-[#d45a1a] text-white p-8 rounded-lg text-center shadow-lg hover:shadow-xl transition"
            >
              <div className="text-4xl font-bold mb-2 animate-count-up">
                <Counter target={stat.number} suffix={stat.suffix} />
              </div>
              <p className="text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
