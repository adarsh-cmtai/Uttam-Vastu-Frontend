import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingWhatsApp from "@/components/floating-whatsapp"
import HeroSlider from "@/components/hero-slider"
import AboutSection from "@/components/about-section"
import HoroscopeSection from "@/components/horoscope-section"
import ServicesSection from "@/components/services-section"
import TestimonialsSection from "@/components/testimonials-section"
import WhyChooseSection from "@/components/why-choose-section"
import ProductsSection from "@/components/products-section"

export default function Home() {
  return (
    <div>
      <Header />
      <HeroSlider />
      <AboutSection />
      <HoroscopeSection />
      <ServicesSection />
      <TestimonialsSection />
      <WhyChooseSection />
      <ProductsSection />
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}
