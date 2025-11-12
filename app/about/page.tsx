import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingWhatsApp from "@/components/floating-whatsapp"
import AboutSection from "@/components/about-section"
import WhyChooseSection from "@/components/why-choose-section"
import TestimonialsSection from "@/components/testimonials-section"
import FaqSection from "@/components/FaqSection" // Naya FAQ section import karein
import Link from "next/link"

export default function About() {
  return (
    <div>
      <Header />

      <div className="bg-gradient-to-r from-[#D7281E] via-[#F36C2C] to-[#F7A64A] py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-4 font-serif drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]">
            About Us
          </h1>
          <div className="flex justify-center items-center gap-2 text-sm font-medium drop-shadow-[0_1px_1px_rgba(255,255,255,0.3)]">
            <Link href="/" className="text-white hover:text-stone-900 transition-colors">
              Home
            </Link>
            <span className="text-stone-700">/</span>
            <span className="text-white font-semibold">About Us</span>
          </div>
        </div>
      </div>

      <AboutSection />
      <WhyChooseSection />
      <TestimonialsSection />
      <FaqSection /> {/* Naya FAQ section yahan add kiya gaya hai */}

      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}