"use client"

import { useState, FormEvent, ChangeEvent } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingWhatsApp from "@/components/floating-whatsapp"
import Link from "next/link"
import { motion } from "framer-motion"
import { Users, BookOpen, ShieldCheck } from "lucide-react"
import applicationService, { ApplicationFormData } from "@/services/applicationService"
import toast from "react-hot-toast"
import { useLanguage } from "@/contexts/LanguageContext"

export default function JoinUs() {
  const { t } = useLanguage();
  const initialData: ApplicationFormData = { name: "", contact: "", state: "", address: "", qualifications: "", experience: "" };
  const [formData, setFormData] = useState<ApplicationFormData>(initialData);
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
        await applicationService.submitApplication(formData);
        toast.success("Application submitted! Redirecting to WhatsApp...");
        
        const whatsappMessage = `
*New Join Us Application*
-----------------------------
*Name:* ${formData.name}
*Contact:* ${formData.contact}
*State:* ${formData.state}
*Address:* ${formData.address}
*Qualifications:* ${formData.qualifications}
*Experience:* ${formData.experience} years
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
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-4 font-serif drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]">{t.joinUsPage.title}</h1>
          <div className="flex justify-center items-center gap-2 text-sm font-medium drop-shadow-[0_1px_1px_rgba(255,255,255,0.3)]">
            <Link href="/" className="text-white hover:text-stone-900 transition-colors">{t.breadcrumbHome}</Link>
            <span className="text-stone-700">/</span>
            <span className="text-white font-semibold">{t.joinUsPage.breadcrumbCurrent}</span>
          </div>
        </div>
      </div>
      <section className="pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div className="rounded-2xl overflow-hidden" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="lg:pr-8 p-8 sm:p-12 bg-orange-50/80 backdrop-blur-sm">
                <h2 className="text-3xl font-extrabold text-stone-900 mb-2 font-serif">{t.joinUsPage.sectionTitle}</h2>
                <div className="h-1 bg-stone-900/30 rounded mb-6 w-24"></div>
                <p className="text-stone-700 mb-6 leading-relaxed text-lg">{t.joinUsPage.sectionDescription}</p>
                <h3 className="text-xl font-bold text-stone-900 mt-8 mb-4">{t.joinUsPage.onboardingTitle}</h3>
                <div className="bg-white/70 p-4 rounded-lg border border-orange-200/50 mb-6">
                  <p className="text-stone-800 font-semibold text-lg">{t.joinUsPage.onboardingPrice}</p>
                </div>
                <ul className="space-y-3 text-stone-700 mb-8 text-lg">
                  <li className="flex items-start gap-3"><span className="font-bold text-[#D7281E] mt-1">1.</span><span><strong dangerouslySetInnerHTML={{ __html: t.joinUsPage.step1.split(':')[0] + ':' }}></strong>{t.joinUsPage.step1.split(':')[1]}</span></li>
                  <li className="flex items-start gap-3"><span className="font-bold text-[#D7281E] mt-1">2.</span><span><strong dangerouslySetInnerHTML={{ __html: t.joinUsPage.step2.split(':')[0] + ':' }}></strong>{t.joinUsPage.step2.split(':')[1]}</span></li>
                  <li className="flex items-start gap-3"><span className="font-bold text-[#D7281E] mt-1">3.</span><span><strong dangerouslySetInnerHTML={{ __html: t.joinUsPage.step3.split(':')[0] + ':' }}></strong>{t.joinUsPage.step3.split(':')[1]}</span></li>
                </ul>
                <h3 className="text-xl font-bold text-stone-900 mt-8 mb-4">{t.joinUsPage.gainTitle}</h3>
                <ul className="space-y-4 text-lg">
                  <li className="flex gap-4 items-start"><div className="flex-shrink-0 w-10 h-10 bg-stone-900/10 rounded-full flex items-center justify-center"><Users className="w-5 h-5 text-[#D7281E]" /></div><div><h4 className="font-bold text-stone-900">{t.joinUsPage.gain1Title}</h4><p className="text-stone-700 text-md">{t.joinUsPage.gain1Desc}</p></div></li>
                  <li className="flex gap-4 items-start"><div className="flex-shrink-0 w-10 h-10 bg-stone-900/10 rounded-full flex items-center justify-center"><BookOpen className="w-5 h-5 text-[#D7281E]" /></div><div><h4 className="font-bold text-stone-900">{t.joinUsPage.gain2Title}</h4><p className="text-stone-700 text-md">{t.joinUsPage.gain2Desc}</p></div></li>
                  <li className="flex gap-4 items-start"><div className="flex-shrink-0 w-10 h-10 bg-stone-900/10 rounded-full flex items-center justify-center"><ShieldCheck className="w-5 h-5 text-[#D7281E]" /></div><div><h4 className="font-bold text-stone-900">{t.joinUsPage.gain3Title}</h4><p className="text-stone-700 text-md">{t.joinUsPage.gain3Desc}</p></div></li>
                </ul>
              </div>
              <div className="p-8 sm:p-12 bg-gradient-to-r from-[#D7281E] via-[#F36C2C] to-[#F7A64A]">
                {submitted ? (
                    <div className="flex flex-col items-center justify-center h-full text-white text-center">
                        <ShieldCheck className="w-16 h-16 mb-4 text-white"/>
                        <h3 className="text-2xl font-bold">{t.joinUsPage.successTitle}</h3>
                        <p className="mt-2">{t.joinUsPage.successMessage}</p>
                        <button onClick={() => setSubmitted(false)} className="mt-6 bg-white text-[#D7281E] font-bold py-2 px-6 rounded-lg hover:bg-gray-100">
                            {t.joinUsPage.successButton}
                        </button>
                    </div>
                ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div><label className="block text-sm font-semibold mb-2 text-white">{t.joinUsPage.formLabelName}</label><input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white" /></div>
                  <div><label className="block text-sm font-semibold mb-2 text-white">{t.joinUsPage.formLabelContact}</label><input type="tel" name="contact" value={formData.contact} onChange={handleChange} required className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white" /></div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5"><div><label className="block text-sm font-semibold mb-2 text-white">{t.joinUsPage.formLabelState}</label><input type="text" name="state" value={formData.state} onChange={handleChange} required className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white" /></div><div><label className="block text-sm font-semibold mb-2 text-white">{t.joinUsPage.formLabelAddress}</label><input type="text" name="address" value={formData.address} onChange={handleChange} required className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white" /></div></div>
                  <div><label className="block text-sm font-semibold mb-2 text-white">{t.joinUsPage.formLabelQualifications}</label><textarea name="qualifications" value={formData.qualifications} onChange={handleChange} required rows={3} className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white"></textarea></div>
                  <div><label className="block text-sm font-semibold mb-2 text-white">{t.joinUsPage.formLabelExperience}</label><textarea name="experience" value={formData.experience} onChange={handleChange} required rows={3} className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white"></textarea></div>
                  <button type="submit" disabled={isLoading} className="w-full bg-white text-[#D7281E] font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-md disabled:opacity-60">
                    {isLoading ? t.joinUsPage.buttonSubmitting : t.joinUsPage.buttonSubmit}
                  </button>
                </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}