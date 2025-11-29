"use client"

import { useState, FormEvent, ChangeEvent } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingWhatsApp from "@/components/floating-whatsapp"
import Link from "next/link"
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, MessageSquare } from "lucide-react"
import toast from "react-hot-toast"
import enquiryService, { EnquiryFormData } from "@/services/enquiryService"
import { useLanguage } from "@/contexts/LanguageContext"

export default function Contact() {
  const { t } = useLanguage();
  const initialData: EnquiryFormData = { name: "", email: "", phone: "", subject: "", message: "" };
  const [formData, setFormData] = useState<EnquiryFormData>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
        await enquiryService.submitEnquiry(formData);
        toast.success("Message sent successfully!");
        setSubmitted(true);
        setFormData(initialData);
    } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to send message.");
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <div className="bg-gradient-to-r from-[#D7281E] via-[#F36C2C] to-[#F7A64A]">
      <Header />
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-4 font-serif drop-shadow-md">{t.contactPage.title}</h1>
            <div className="flex justify-center items-center gap-2 text-sm font-medium text-white/80 drop-shadow-sm">
                <Link href="/" className="hover:text-white transition-colors">{t.breadcrumbHome}</Link>
                <span className="text-white/70">/</span>
                <span className="text-white font-semibold">{t.contactPage.breadcrumbCurrent}</span>
            </div>
        </div>
      </div>
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl p-8 sm:p-12 rounded-2xl">
            
            <div>
              <h2 className="text-3xl font-bold text-white mb-2 font-serif drop-shadow-md">{t.contactPage.formTitle}</h2>
              <div className="h-1 bg-white/30 rounded mb-8 w-24"></div>
              {submitted ? (
                <div className="bg-green-500/20 border border-green-500/50 text-white px-4 py-3 rounded mb-6 text-center">
                    <h3 className="font-bold text-lg">{t.contactPage.successTitle}</h3>
                    <p>{t.contactPage.successMessage}</p>
                </div>
              ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div><label className="block text-sm font-semibold mb-2 text-white">{t.contactPage.labelName}</label><input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white" placeholder={t.contactPage.placeholderName}/></div>
                <div><label className="block text-sm font-semibold mb-2 text-white">{t.contactPage.labelEmail}</label><input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white" placeholder={t.contactPage.placeholderEmail}/></div>
                <div><label className="block text-sm font-semibold mb-2 text-white">{t.contactPage.labelPhone}</label><input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white" placeholder={t.contactPage.placeholderPhone}/></div>
                <div><label className="block text-sm font-semibold mb-2 text-white">{t.contactPage.labelSubject}</label><input type="text" name="subject" value={formData.subject} onChange={handleChange} required className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white" placeholder={t.contactPage.placeholderSubject}/></div>
                <div><label className="block text-sm font-semibold mb-2 text-white">{t.contactPage.labelMessage}</label><textarea name="message" value={formData.message} onChange={handleChange} required rows={5} className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white" placeholder={t.contactPage.placeholderMessage}></textarea></div>
                <button type="submit" disabled={isLoading} className="w-full bg-white text-[#D7281E] font-bold py-3 px-6 rounded-lg hover:bg-white/90 transition-colors duration-300 shadow-md disabled:opacity-60">
                  {isLoading ? t.contactPage.buttonSending : t.contactPage.buttonSend}
                </button>
              </form>
              )}
            </div>

            <div className="relative overflow-hidden">
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-white mb-2 font-serif drop-shadow-md">{t.contactPage.infoTitle}</h2>
                <div className="h-1 bg-white/30 rounded mb-8 w-24"></div>
                
                <div className="space-y-8 mb-12">
                  <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"><MapPin className="w-6 h-6 text-white" /></div>
                    <div><h4 className="font-bold text-white">{t.contactPage.infoAddressTitle}</h4><p className="text-white/80">{t.contactPage.infoAddressText}</p></div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"><Phone className="w-6 h-6 text-white" /></div>
                    <div><h4 className="font-bold text-white">{t.contactPage.infoPhoneTitle}</h4><p className="text-white/80">+91 73030 62088</p></div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center"><Mail className="w-6 h-6 text-white" /></div>
                    <div><h4 className="font-bold text-white">{t.contactPage.infoEmailTitle}</h4><p className="text-white/80">vastumaye@gmail.com</p></div>
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="font-bold mb-4 text-white">{t.contactPage.infoFollowTitle}</h4>
                  <div className="flex gap-4">
                    <a href="#" className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-full text-white hover:bg-white/30 transition"><Facebook /></a>
                    <a href="#" className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-full text-white hover:bg-white/30 transition"><Instagram /></a>
                    <a href="#" className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-full text-white hover:bg-white/30 transition"><Youtube /></a>
                    <a href="https://wa.me/917303062088" className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-full text-white hover:bg-white/30 transition"><MessageSquare /></a>
                  </div>
                </div>
              </div>

              <img 
                src="/QR.JPG" 
                alt="Contact Decoration" 
                className="absolute top-20 -bottom-0 right-16 w-40 h-40 opacity-80 pointer-events-none drop-shadow-lg"
              />
            </div>

          </div>
        </div>
      </section>
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}