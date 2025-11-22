"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"

type FlowerParticleProps = {
  left: string;
  fallDuration: string;
  swayDuration: string;
  animationDelay: string;
  opacity: number;
  size: string;
  swayDistance: string;
  flowerType: 'rose' | 'sunflower' | 'marigold' | 'hibiscus';
  animationName: 'sway-and-rotate' | 'sway-and-rotate-alt';
  colors: { primary: string; secondary?: string };
};

type FlowerColors = { primary: string; secondary?: string };

const RoseIcon = ({ size, colors }: { size: string, colors: FlowerColors }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={colors.primary} stroke="#000000" strokeOpacity="0.1" strokeWidth="0.5" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 1.5c4.69 0 8.5 3.81 8.5 8.5s-3.81 8.5-8.5 8.5-8.5-3.81-8.5-8.5S7.31 3.5 12 3.5z"/>
        <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
        <path d="M12 9.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z"/>
    </svg>
);

const SunflowerIcon = ({ size, colors }: { size: string, colors: FlowerColors }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g stroke={colors.secondary || "#4a2e1a"} strokeWidth="0.5" strokeLinejoin="round">
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(angle => (
                <path key={angle} fill={colors.primary} d="M12 0 C10 5, 14 5, 12 0 Z" transform={`rotate(${angle} 12 12) translate(0 -5) scale(1.8)`}/>
            ))}
        </g>
        <circle cx="12" cy="12" r="5" fill={colors.secondary || '#654321'}/>
        <circle cx="12" cy="12" r="4.5" fill="#4a2e1a" opacity="0.8"/>
    </svg>
);

const MarigoldIcon = ({ size, colors }: { size: string, colors: FlowerColors }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g fill={colors.primary} stroke={colors.primary} strokeWidth="0.2">
            {[0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340].map(r => (
                <path key={r} d="M12,2 A10,10 0 0,1 18,6 A10,10 0 0,1 18,18 A10,10 0 0,1 12,22 A10,10 0 0,1 6,18 A10,10 0 0,1 6,6 A10,10 0 0,1 12,2" transform={`rotate(${r} 12 12) scale(1, 0.6)`} opacity="0.6"/>
            ))}
        </g>
        <circle cx="12" cy="12" r="4" fill="#F57C00" opacity="0.8"/>
    </svg>
);

const HibiscusIcon = ({ size, colors }: { size: string, colors: FlowerColors }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g fill={colors.primary} stroke={colors.primary} strokeWidth="0.2" strokeLinejoin="round">
            {[0, 72, 144, 216, 288].map(angle => (
                <path key={angle} d="M12 2 C 5 5, 5 12, 12 12 C 19 12, 19 5, 12 2 Z" transform={`rotate(${angle} 12 12)`} />
            ))}
        </g>
        <line x1="12" y1="12" x2="12" y2="4" stroke={colors.secondary || '#FFFDE7'} strokeWidth="1" strokeLinecap="round" />
        <circle cx="12" cy="4" r="1.5" fill={colors.secondary || '#FFFDE7'} />
    </svg>
);


type FlowerColorConfig = {
    [key in 'rose' | 'sunflower' | 'marigold' | 'hibiscus']: {
        primary: string[];
        secondary?: string[];
    }
};

const FallingFlowers = ({ count = 35, position = "left" }: { count: number; position: "left" | "right" }) => {
  const [particles, setParticles] = useState<FlowerParticleProps[]>([]);
  const flowerTypes: ('rose' | 'sunflower' | 'marigold' | 'hibiscus')[] = ['rose', 'sunflower', 'marigold', 'hibiscus'];

  const colors: FlowerColorConfig = {
    rose: { primary: ['#D32F2F', '#C2185B', '#E64A19'] },
    sunflower: { primary: ['#FFC107', '#FFD54F', '#FFA000'], secondary: ['#5D4037', '#6D4C41'] },
    marigold: { primary: ['#FFA726', '#FFB74D', '#FB8C00'] },
    hibiscus: { primary: ['#E91E63', '#EC407A', '#F06292'], secondary: ['#FFFDE7', '#FFFF8D'] }
  };
  
  useEffect(() => {
    const newParticles = Array.from({ length: count }).map((): FlowerParticleProps => {
      const leftPosition = position === "left" 
        ? Math.random() * Math.random() * 95 
        : 100 - Math.random() * Math.random() * 95;
      
      const flowerType = flowerTypes[Math.floor(Math.random() * flowerTypes.length)];
      
      const primaryColor = colors[flowerType].primary[Math.floor(Math.random() * colors[flowerType].primary.length)];
      const secondaryColors = colors[flowerType].secondary;
      const secondaryColor = secondaryColors ? secondaryColors[Math.floor(Math.random() * secondaryColors.length)] : undefined;
      
      return {
        left: `${leftPosition}%`,
        fallDuration: `${Math.random() * 12 + 12}s`,
        swayDuration: `${Math.random() * 5 + 5}s`,
        animationDelay: `${Math.random() * 18}s`,
        opacity: Math.random() * 0.7 + 0.3,
        size: `${Math.random() * 20 + 15}px`,
        swayDistance: `${(Math.random() - 0.5) * 50}px`,
        flowerType: flowerType,
        animationName: Math.random() > 0.5 ? 'sway-and-rotate' : 'sway-and-rotate-alt',
        colors: { primary: primaryColor, secondary: secondaryColor }
      };
    });
    setParticles(newParticles);
  }, [count, position]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <div key={i} className="absolute animate-fall" style={{ left: p.left, animationDuration: p.fallDuration, animationDelay: p.animationDelay }}>
          <div className={p.animationName} style={{ opacity: p.opacity, animationDuration: p.swayDuration, '--sway-x': p.swayDistance } as React.CSSProperties}>
            {p.flowerType === 'rose' && <RoseIcon size={p.size} colors={p.colors} />}
            {p.flowerType === 'sunflower' && <SunflowerIcon size={p.size} colors={p.colors} />}
            {p.flowerType === 'marigold' && <MarigoldIcon size={p.size} colors={p.colors} />}
            {p.flowerType === 'hibiscus' && <HibiscusIcon size={p.size} colors={p.colors} />}
          </div>
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
        @keyframes fall { 
          0% { transform: translateY(-10vh) scale(0.7); opacity: 0; } 
          10% { opacity: 1; transform: scale(1); } 
          90% { opacity: 1; } 
          100% { transform: translateY(105vh) scale(0.8); opacity: 0; } 
        }
        @keyframes sway-and-rotate { 
          0% { transform: translateX(0) rotate(0deg); } 
          50% { transform: translateX(var(--sway-x, 25px)) rotate(180deg); } 
          100% { transform: translateX(0) rotate(360deg); } 
        }
        @keyframes sway-and-rotate-alt { 
          0% { transform: translateX(0) rotate(0deg); } 
          50% { transform: translateX(calc(var(--sway-x, 25px) * -1)) rotate(-180deg); } 
          100% { transform: translateX(0) rotate(-360deg); } 
        }
        .animate-fall { 
          animation-name: fall; 
          animation-timing-function: linear; 
          animation-iteration-count: infinite; 
        }
        .sway-and-rotate, .sway-and-rotate-alt { 
          animation-timing-function: ease-in-out; 
          animation-iteration-count: infinite; 
        }
        .sway-and-rotate {
          animation-name: sway-and-rotate;
        }
        .sway-and-rotate-alt {
          animation-name: sway-and-rotate-alt;
        }
      `}</style>
      <section className="bg-gradient-to-r from-[#D7281E] via-[#F36C2C] to-[#F7A64A] overflow-hidden relative">
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="absolute top-0 left-0 h-full w-1/3 md:w-2/5"><FallingFlowers count={30} position="left" /></div>
          <div className="absolute top-0 right-0 h-full w-1/3 md:w-2/5"><FallingFlowers count={30} position="right" /></div>
        </div>
        <div className="w-full relative z-0">
          <img src="/Vastumaye landing page animation 9/Vastumaye landing page animation 9.gif" alt="Vastumaye - Vastu Shastra for Harmony" className="w-full h-auto" />
        </div>
        <div className="max-w-4xl mx-auto px-6 lg:px-8 w-full text-center py-12 lg:py-16 relative z-20">
          <div key={current}>
            <p className="font-semibold text-stone-900 uppercase tracking-widest mb-4 text-lg">{currentSlide.preHeading}</p>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-stone-900 mb-6 leading-tight font-serif drop-shadow-md">{currentSlide.heading}</h1>
            <div className="flex justify-center"><div className="w-24 h-1.5 bg-gradient-to-r from-white/80 to-white rounded-full mb-8"></div></div>
            <p className="text-lg text-white text-xl max-w-3xl mx-auto mb-10 leading-relaxed whitespace-pre-line">{currentSlide.description}</p>
            
            <Link
              href={currentSlide.href}
              className="bg-gradient-to-r from-[#D7281E] via-[#F36C2C] to-[#F7A64A] text-stone-900 font-bold py-4 px-10 rounded-full shadow-lg shadow-black/10 border border-stone-200 transform hover:scale-105 transition-all duration-300 ease-in-out text-lg"
            >
              {currentSlide.buttonText}
            </Link>

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