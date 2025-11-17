"use client"

import { useState, FormEvent, ChangeEvent, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingWhatsApp from "@/components/floating-whatsapp"
import Link from "next/link"
import { motion } from "framer-motion"
import { MapPin, Users } from "lucide-react"
import toast from "react-hot-toast"
import siteVisitService, { SiteVisitFormData } from "@/services/siteVisitService"
import { useLanguage } from "@/contexts/LanguageContext"

export default function SiteVisits() {
  const { t } = useLanguage();
  const packages = t.siteVisitsPage.packages;

  const initialData: SiteVisitFormData = { name: "", contact: "", location: "", address: "", qualifications: "", experience: "", chosenPackage: "" };
  const [formData, setFormData] = useState<SiteVisitFormData>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (packages.length > 0) {
      setFormData(prev => ({ ...prev, chosenPackage: packages[0].title }));
    }
  }, [packages]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
        await siteVisitService.submitApplication(formData);
        toast.success("Application successful! Redirecting to WhatsApp...");
        
        const whatsappMessage = `
*New Site Visit Application*
-----------------------------
*Name:* ${formData.name}
*Contact:* ${formData.contact}
*Location:* ${formData.location}
*Package:* ${formData.chosenPackage}
*Qualifications:* ${formData.qualifications}
*Experience:* ${formData.experience}
        `.trim().replace(/\n\s+/g, '\n');

        const adminWhatsAppNumber = process.env.NEXT_PUBLIC_ADMIN_WHATSAPP_NUMBER;
        if (adminWhatsAppNumber) {
            const whatsappUrl = `https://wa.me/${adminWhatsAppNumber}?text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappUrl, '_blank');
        }

        setSubmitted(true);
        setFormData(initialData);

    } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to submit application.");
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <div className="bg-gradient-to-r from-[#D7281E] via-[#F36C2C] to-[#F7A64A]">
      <Header />
      <div className="py-16"><div className="max-w-7xl mx-auto px-6 text-center"><h1 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-4 font-serif drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]">{t.siteVisitsPage.title}</h1><div className="flex justify-center items-center gap-2 text-sm font-medium drop-shadow-[0_1px_1px_rgba(255,255,255,0.3)]"><Link href="/" className="text-white hover:text-stone-900 transition-colors">{t.breadcrumbHome}</Link><span className="text-stone-700">/</span><span className="text-white font-semibold">{t.siteVisitsPage.breadcrumbCurrent}</span></div></div></div>
      <section className="pb-20 sm:pb-28"><div className="max-w-7xl mx-auto px-6 lg:px-8"><motion.div className="bg-orange-50/80 backdrop-blur-sm rounded-2xl overflow-hidden p-8 sm:p-12" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.8, ease: "easeOut" }}><div className="grid grid-cols-1 lg:grid-cols-2 gap-12"><div className="lg:pr-8"><h2 className="text-3xl font-extrabold text-stone-900 mb-2 font-serif">{t.siteVisitsPage.sectionTitle}</h2><div className="h-1 bg-stone-900/30 rounded mb-6 w-24"></div><p className="text-stone-700 text-lg mb-6 leading-relaxed">{t.siteVisitsPage.sectionDescription}</p><div className="flex flex-col sm:flex-row gap-4 mb-8"><div className="flex items-center gap-3 bg-white/70 p-3 rounded-lg border border-orange-200/50"><Users className="w-6 h-6 text-[#D7281E]" /><span className="font-semibold text-stone-800">{t.siteVisitsPage.info1}</span></div><div className="flex items-center gap-3 bg-white/70 p-3 rounded-lg border border-orange-200/50"><MapPin className="w-6 h-6 text-[#D7281E]" /><span className="font-semibold text-stone-800">{t.siteVisitsPage.info2}</span></div></div><div className="space-y-4 mt-8">{packages.map((pkg, index) => ( <motion.div key={index} className="bg-white/70 p-4 rounded-lg border border-orange-200/50" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}><div className="flex justify-between items-center"><div><h4 className="font-bold text-stone-900">{pkg.title}</h4><p className="text-sm text-stone-700">{pkg.description}</p></div><p className="text-xl font-bold text-[#D7281E]">{pkg.price}</p></div></motion.div> ))}</div></div>
              <div>{submitted ? (<div className="bg-green-500/10 border border-green-600 text-green-800 px-4 py-3 rounded mb-6 text-center">{t.siteVisitsPage.successMessage}</div>) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div><label className="block text-sm font-semibold mb-2 text-stone-900">{t.siteVisitsPage.formLabelName}</label><input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 bg-white/70 border border-orange-200/50 rounded-lg text-stone-900 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-[#D7281E]" /></div>
                  <div><label className="block text-sm font-semibold mb-2 text-stone-900">{t.siteVisitsPage.formLabelContact}</label><input type="tel" name="contact" value={formData.contact} onChange={handleChange} required className="w-full px-4 py-3 bg-white/70 border border-orange-200/50 rounded-lg text-stone-900 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-[#D7281E]" /></div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5"><div><label className="block text-sm font-semibold mb-2 text-stone-900">{t.siteVisitsPage.formLabelLocation}</label><input type="text" name="location" value={formData.location} onChange={handleChange} required className="w-full px-4 py-3 bg-white/70 border border-orange-200/50 rounded-lg text-stone-900 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-[#D7281E]" /></div><div><label className="block text-sm font-semibold mb-2 text-stone-900">{t.siteVisitsPage.formLabelAddress}</label><input type="text" name="address" value={formData.address} onChange={handleChange} required className="w-full px-4 py-3 bg-white/70 border border-orange-200/50 rounded-lg text-stone-900 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-[#D7281E]" /></div></div>
                  <div><label className="block text-sm font-semibold mb-2 text-stone-900">{t.siteVisitsPage.formLabelQualifications}</label><textarea name="qualifications" value={formData.qualifications} onChange={handleChange} required rows={2} className="w-full px-4 py-3 bg-white/70 border border-orange-200/50 rounded-lg text-stone-900 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-[#D7281E]"></textarea></div>
                  <div><label className="block text-sm font-semibold mb-2 text-stone-900">{t.siteVisitsPage.formLabelExperience}</label><textarea name="experience" value={formData.experience} onChange={handleChange} required rows={2} className="w-full px-4 py-3 bg-white/70 border border-orange-200/50 rounded-lg text-stone-900 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-[#D7281E]"></textarea></div>
                  <div><label className="block text-sm font-semibold mb-2 text-stone-900">{t.siteVisitsPage.formLabelPackage}</label><div className="space-y-2">{packages.map((pkg) => ( <label key={pkg.title} className="flex items-center p-3 rounded-lg bg-white/70 border border-orange-200/50 has-[:checked]:bg-stone-900 has-[:checked]:text-white has-[:checked]:border-stone-900 transition-colors cursor-pointer"><input type="radio" name="chosenPackage" value={pkg.title} checked={formData.chosenPackage === pkg.title} onChange={handleChange} className="w-4 h-4 mr-3 accent-[#D7281E]" /><span className="font-semibold">{pkg.title} - {pkg.price}</span></label> ))}</div></div>
                  <button type="submit" disabled={isLoading} className="w-full bg-[#D7281E] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#b82218] transition-colors duration-300 shadow-md disabled:opacity-60">
                    {isLoading ? t.siteVisitsPage.buttonSubmitting : t.siteVisitsPage.buttonSubmit}
                  </button>
                </form>
              )}</div></div></motion.div></div></section>
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}