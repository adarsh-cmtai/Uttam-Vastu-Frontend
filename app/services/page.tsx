"use client"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingWhatsApp from "@/components/floating-whatsapp"
import Link from "next/link"
import VastuConsultationForm from "@/components/VastuConsultationForm"
import { useLanguage } from "@/contexts/LanguageContext"

export default function Services() {
  const { t } = useLanguage();

  return (
    <div>
      <Header />

      <div className="bg-gradient-to-r from-[#D7281E] via-[#F36C2C] to-[#F7A64A] py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-4 font-serif drop-shadow-md">
            {t.servicesPage.title}
          </h1>
          <div className="flex justify-center items-center gap-2 text-sm font-medium text-white/80 drop-shadow-sm">
            <Link href="/" className="hover:text-white transition-colors">
              {t.breadcrumbHome}
            </Link>
            <span>/</span>
            <span className="text-white font-semibold">{t.servicesPage.breadcrumbCurrent}</span>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#D7281E] via-[#F36C2C] to-[#F7A64A] pt-0 pb-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-2xl font-semibold text-white mb-6 drop-shadow-sm">
            {t.servicesPage.description1}
          </p>
          <p className="text-lg leading-relaxed text-white/90 drop-shadow-sm">
            {t.servicesPage.description2}
          </p>
        </div>
      </div>

      <VastuConsultationForm />

      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}