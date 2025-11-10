"use client"

import { useState, useEffect } from "react"

const sliderContent = [
  {
    heading: "Shape Your Future with Divine Guidance from Uttam Vastu",
    description: "Unlock the secrets of your birth chart today and discover your life's true potential.",
    buttonText: "Book an Appointment",
  },
  {
    heading: "Feeling Lost in Life's Maze?",
    description: "Career, marriage, or health? Find precise solutions to your every problem through astrology.",
    buttonText: "Book an Appointment",
  },
  {
    heading: "Get Accurate Guidance with 18+ Years of Experience",
    description: "Give your life a new and positive direction with our expert astrological consultations.",
    buttonText: "Book an Appointment",
  },
]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliderContent.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 bg-gradient-to-r from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Slider */}
          <div className="animate-fade-in-up">
            <h5 className="text-[#f46f21] mb-4">Uttam Vastu</h5>
            <h1 className="mb-6 text-[#212121]">{sliderContent[current].heading}</h1>
            <div className="w-12 h-1 bg-gradient-to-r from-[#f46f21] to-transparent mb-6"></div>
            <p className="mb-8 text-lg">{sliderContent[current].description}</p>
            <button className="as_btn">{sliderContent[current].buttonText}</button>

            {/* Slider Dots */}
            <div className="flex gap-2 mt-8">
              {sliderContent.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`w-3 h-3 rounded-full transition ${idx === current ? "bg-[#f46f21]" : "bg-gray-300"}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="flex justify-center">
            <img
              src="/astrology-hand-palmistry-cosmic-galaxy.jpg"
              alt="Astrology guidance"
              className="w-full max-w-md rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
