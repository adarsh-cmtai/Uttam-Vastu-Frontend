"use client"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingWhatsApp from "@/components/floating-whatsapp"
import Link from "next/link"
import VastuConsultationForm from "@/components/VastuConsultationForm"

export default function Services() {
  return (
    <div>
      <Header />

      <div className="bg-gradient-to-r from-[#D7281E] via-[#F36C2C] to-[#F7A64A] py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-4 font-serif drop-shadow-md">
            Our Services
          </h1>
          <div className="flex justify-center items-center gap-2 text-sm font-medium text-white/80 drop-shadow-sm">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-white font-semibold">Our Services</span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#D7281E] via-[#F36C2C] to-[#F7A64A] pt-0 pb-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-2xl font-semibold text-white mb-6 drop-shadow-sm">
            {"Our expert services offer you tailored insights that align with your unique cosmic blueprint, empowering you to make informed decisions and live with purpose."}
          </p>
          <p className="text-lg leading-relaxed text-white/90 drop-shadow-sm">
            We specialize in Vastu consultations, providing personalized readings to harmonize your living and working spaces for peace, prosperity, and well-being.
          </p>
        </div>
      </div>

      <VastuConsultationForm />

      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}