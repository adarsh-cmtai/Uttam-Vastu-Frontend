"use client"

import { useState, useEffect } from "react"

const sliderContent = [
  {
    preHeading: "Uttam Vastu Astrology",
    heading: "Shape Your Future with Divine Guidance",
    description: "Unlock the secrets of your birth chart today and discover your life's true potential. We provide expert consultations to help you navigate life's challenges.",
    buttonText: "Book an Appointment",
  },
  {
    preHeading: "Guidance for Life's Challenges",
    heading: "Feeling Lost in Life's Maze?",
    description: "Career, marriage, or health? Find precise and effective solutions to your every problem through the timeless wisdom of astrology.",
    buttonText: "Explore Our Services",
  },
  {
    preHeading: "18+ Years Of Trusted Experience",
    heading: "Get Accurate and Reliable Guidance",
    description: "Give your life a new and positive direction. Our expert astrological consultations are backed by years of dedicated practice and deep knowledge.",
    buttonText: "Contact Us Today",
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

  const handleDotClick = (index: number) => {
    setCurrent(index)
  }

  const currentSlide = sliderContent[current]

  return (
    <section className="relative flex items-center bg-black/10 min-h-screen overflow-hidden py-20 lg:py-0">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          <div className="text-center md:text-left">
            <div key={current} className="animate-fade-in-up">
              <p className="font-medium text-white/80 uppercase tracking-widest mb-4">
                {currentSlide.preHeading}
              </p>
              
              <h1 className="text-xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
                {currentSlide.heading}
              </h1>
              
              <div className="flex justify-center md:justify-start">
                <div className="w-24 h-1.5 bg-gradient-to-r from-orange-500 to-amber-400 rounded-full mb-8"></div>
              </div>

              <p className="text-lg text-white/90 max-w-xl mx-auto md:mx-0 mb-10 leading-relaxed">
                {currentSlide.description}
              </p>
              
              <button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-4 px-10 rounded-full shadow-lg shadow-orange-500/20 transform hover:scale-105 transition-all duration-300 ease-in-out text-lg">
                {currentSlide.buttonText}
              </button>
            </div>
            
            <div className="flex gap-3 mt-12 justify-center md:justify-start">
              {sliderContent.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleDotClick(idx)}
                  className={`h-3 rounded-full transition-all duration-300 ease-in-out ${
                    idx === current ? "w-8 bg-orange-500" : "w-3 bg-gray-600 hover:bg-gray-500"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
          
          <div className="hidden md:flex justify-center items-center animate-fade-in">
            <img
              src="/astrology-hand-palmistry-cosmic-galaxy.jpg"
              alt="Astrology guidance with cosmic hand palmistry"
              className="w-full max-w-md lg:max-w-lg rounded-xl"
            />
          </div>

        </div>
      </div>
    </section>
  )
}