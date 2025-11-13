"use client"

import { useState, useEffect } from "react"

const sliderContent = [
  {
    preHeading: "Welcome to Vastumaye",
    heading: "Harnessing the Energy of the Elements",
    description:
      "Vastu Shastra is the ancient Indian science of architecture, aligning your space with the five elements (Panch Mahabhutas) for harmony, wellness, and prosperity.",
    buttonText: "Learn More",
  },
  {
    preHeading: "A Blueprint for a Fulfilling Life",
    heading: "Achieve Dharma, Artha, Kama, Moksha",
    description:
      "Fulfill your life's duties and goals. Vastu guides you to attain material gains, enjoy them rightfully, and seek salvation through a balanced and harmonious environment.",
    buttonText: "Explore Our Vastu Services",
  },
  {
    preHeading: "Ancient Wisdom from the Atharva Veda",
    heading: "The Timeless Boon of Vastu Purush",
    description: `वर तस्मे दादो प्रीतो ब्रम्ह लोक पितामहः ।
ग्रामे वा नगरे वापि दुर्गे वा पतनेयपि वा ॥
प्रसादे च प्रपायन च जलोद्द्यां तथा च ।
यस्त्वा न पुजयेन्मयो मोहद्वस्तुनर् प्रभो ॥
आ श्री मृत्योमाप्नोति विध्नस्तस्य पदे पदे ।
वास्तुपुजमकुर्वान्स्तवाहरो भविष्यत्येति ॥

Lord Bramha's decree: Honoring Vastu Purush at the start of any construction brings prosperity and peace, while forgetting him can lead to hurdles and poverty.`,
    buttonText: "Get a Consultation",
  },
]

type ParticleStyle = {
  left: string;
  animationDuration: string;
  animationDelay: string;
  opacity: number;
  width: string;
  height: string;
  backgroundColor: string;
};

const FallingParticles = ({ count = 20, position = "left" }: { count: number; position: "left" | "right" }) => {
  const [particles, setParticles] = useState<ParticleStyle[]>([]);
  const colors = ["#FFFFFF", "#FFDDC1", "#FFC8A2", "#F7A64A", "#F36C2C"];

  useEffect(() => {
    const newParticles = Array.from({ length: count }).map(() => {
      let leftPosition = 0;
      if (position === "left") {
        leftPosition = Math.random() * Math.random() * 90; 
      } else {
        leftPosition = 100 - Math.random() * Math.random() * 90;
      }

      return {
        left: `${leftPosition}%`,
        animationDuration: `${Math.random() * 10 + 8}s, ${Math.random() * 4 + 5}s`,
        animationDelay: `${Math.random() * 12}s`,
        opacity: Math.random() * 0.6 + 0.3,
        width: `${Math.random() * 3 + 1.5}px`,
        height: `${Math.random() * 3 + 1.5}px`,
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
      };
    });
    setParticles(newParticles);
  }, [count, position]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      {particles.map((style, i) => (
        <span
          key={i}
          className="absolute rounded-full animate-fall-sway"
          style={style}
        ></span>
      ))}
    </div>
  );
};

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliderContent.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index: number) => {
    setCurrent(index);
  };

  const currentSlide = sliderContent[current];

  return (
    <>
      <style jsx global>{`
        @keyframes fall {
          0% { transform: translateY(-10vh); opacity: 0; }
          5% { opacity: 1; }
          95% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes sway {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(${Math.random() > 0.5 ? '' : '-'}15px); }
        }
        .animate-fall-sway {
          animation: fall linear infinite, sway ease-in-out infinite;
        }
      `}</style>

      <section className="bg-gradient-to-r from-[#D7281E] via-[#F36C2C] to-[#F7A64A] overflow-hidden relative">
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="absolute top-0 left-0 h-full w-1/4 md:w-1/3">
            <FallingParticles count={60} position="left" />
          </div>
          <div className="absolute top-0 right-0 h-full w-1/4 md:w-1/3">
            <FallingParticles count={60} position="right" />
          </div>
        </div>

        <div className="w-full relative z-0">
          <img
            src="/home.PNG"
            alt="Vastumaye - Vastu Shastra for Harmony"
            className="w-full h-auto"
          />
        </div>

        <div className="max-w-4xl mx-auto px-6 lg:px-8 w-full text-center py-12 lg:py-16 relative z-20">
          <div key={current}>
            <p className="font-semibold text-stone-900 uppercase tracking-widest mb-4">
              {currentSlide.preHeading}
            </p>

            <h1 className="text-4xl lg:text-5xl font-extrabold text-stone-900 mb-6 leading-tight font-serif drop-shadow-md">
              {currentSlide.heading}
            </h1>

            <div className="flex justify-center">
              <div className="w-24 h-1.5 bg-gradient-to-r from-white/80 to-white rounded-full mb-8"></div>
            </div>

            <p className="text-lg text-white text-xl max-w-3xl mx-auto mb-10 leading-relaxed whitespace-pre-line">
              {currentSlide.description}
            </p>

            <button className="bg-gradient-to-r from-[#D7281E] via-[#F36C2C] to-[#F7A64A] text-stone-900 font-bold py-4 px-10 rounded-full shadow-lg shadow-black/10 border border-stone-200 transform hover:scale-105 transition-all duration-300 ease-in-out text-lg">
              {currentSlide.buttonText}
            </button>
          </div>

          <div className="flex gap-3 mt-12 justify-center">
            {sliderContent.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleDotClick(idx)}
                className={`h-3 rounded-full transition-all duration-300 ease-in-out ${
                  idx === current
                    ? "w-8 bg-stone-900"
                    : "w-3 bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}