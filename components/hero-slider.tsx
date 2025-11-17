"use client"

import React, { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/LanguageContext"

type ParticleProps = { left: string; fallDuration: string; swayDuration: string; animationDelay: string; opacity: number; width: string; height: string; backgroundColor: string; swayDistance: string; };

const FallingParticles = ({ count = 60, position = "left" }: { count: number; position: "left" | "right" }) => {
  const [particles, setParticles] = useState<ParticleProps[]>([]);
  const colors = ["#FFFFFF", "#FFDDC1", "#FFC8A2", "#F7A64A", "#F36C2C"];

  useEffect(() => {
    const newParticles = Array.from({ length: count }).map(() => {
      const leftPosition = position === "left" ? Math.random() * Math.random() * 90 : 100 - Math.random() * Math.random() * 90;
      return {
        left: `${leftPosition}%`,
        fallDuration: `${Math.random() * 10 + 8}s`,
        swayDuration: `${Math.random() * 4 + 5}s`,
        animationDelay: `${Math.random() * 12}s`,
        opacity: Math.random() * 0.6 + 0.3,
        width: `${Math.random() * 3 + 1.5}px`,
        height: `${Math.random() * 3 + 1.5}px`,
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        swayDistance: `${(Math.random() - 0.5) * 30}px`,
      };
    });
    setParticles(newParticles);
  }, [count, position]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <div key={i} className="absolute animate-fall" style={{ left: p.left, animationDuration: p.fallDuration, animationDelay: p.animationDelay }}>
          <span className="block rounded-full animate-sway" style={{ opacity: p.opacity, width: p.width, height: p.height, backgroundColor: p.backgroundColor, animationDuration: p.swayDuration, '--sway-x': p.swayDistance } as React.CSSProperties}></span>
        </div>
      ))}
    </div>
  );
};

export default function HeroSlider() {
  const { t } = useLanguage();
  const sliderContent = t.heroSlider.slides;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliderContent.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [sliderContent.length]);

  const handleDotClick = (index: number) => {
    setCurrent(index);
  };

  const currentSlide = sliderContent[current];

  return (
    <>
      <style jsx global>{`
        @keyframes fall { 0% { transform: translateY(-10vh); opacity: 0; } 5% { opacity: 1; } 95% { opacity: 1; } 100% { transform: translateY(100vh); opacity: 0; } }
        @keyframes sway { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(var(--sway-x, 15px)); } }
        .animate-fall { animation-name: fall; animation-timing-function: linear; animation-iteration-count: infinite; }
        .animate-sway { animation-name: sway; animation-timing-function: ease-in-out; animation-iteration-count: infinite; }
      `}</style>
      <section className="bg-gradient-to-r from-[#D7281E] via-[#F36C2C] to-[#F7A64A] overflow-hidden relative">
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="absolute top-0 left-0 h-full w-1/4 md:w-1/3"><FallingParticles count={60} position="left" /></div>
          <div className="absolute top-0 right-0 h-full w-1/4 md:w-1/3"><FallingParticles count={60} position="right" /></div>
        </div>
        <div className="w-full relative z-0">
          <img src="/home.PNG" alt="Vastumaye - Vastu Shastra for Harmony" className="w-full h-auto" />
        </div>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 w-full text-center py-12 lg:py-16 relative z-20">
          <div key={current}>
            <p className="font-semibold text-stone-900 uppercase tracking-widest mb-4">{currentSlide.preHeading}</p>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-stone-900 mb-6 leading-tight font-serif drop-shadow-md">{currentSlide.heading}</h1>
            <div className="flex justify-center"><div className="w-24 h-1.5 bg-gradient-to-r from-white/80 to-white rounded-full mb-8"></div></div>
            <p className="text-lg text-white text-xl max-w-3xl mx-auto mb-10 leading-relaxed whitespace-pre-line">{currentSlide.description}</p>
            <button className="bg-gradient-to-r from-[#D7281E] via-[#F36C2C] to-[#F7A64A] text-stone-900 font-bold py-4 px-10 rounded-full shadow-lg shadow-black/10 border border-stone-200 transform hover:scale-105 transition-all duration-300 ease-in-out text-lg">
              {currentSlide.buttonText}
            </button>
          </div>
          <div className="flex gap-3 mt-12 justify-center">
            {sliderContent.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleDotClick(idx)}
                className={`h-3 rounded-full transition-all duration-300 ease-in-out ${ idx === current ? "w-8 bg-stone-900" : "w-3 bg-white/40 hover:bg-white/60" }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}