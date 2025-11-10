import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingWhatsApp from "@/components/floating-whatsapp"
import AboutSection from "@/components/about-section"
import WhyChooseSection from "@/components/why-choose-section"
import TestimonialsSection from "@/components/testimonials-section"
import Link from "next/link"

export default function About() {
  return (
    <div>
      <Header />

      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="mb-4">About Us</h1>
          <div className="flex justify-center gap-2 text-sm">
            <Link href="/" className="hover:text-[#f46f21] transition">
              Home
            </Link>
            <span className="text-gray-500">/</span>
            <span className="text-gray-700">About Us</span>
          </div>
        </div>
      </div>

      {/* Main Content - Reusing components for consistency */}
      <AboutSection />
      <WhyChooseSection />
      <TestimonialsSection />

      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}
