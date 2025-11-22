"use client"

import { useState, FormEvent, ChangeEvent, useEffect } from "react"
import { Phone, MessageSquare, ChevronDown } from "lucide-react"
import { motion } from "framer-motion"
import consultationService from "@/services/consultationService"
import toast from "react-hot-toast"
import { useLanguage } from "@/contexts/LanguageContext"

interface FormData { name: string; email: string; phone: string; city: string; purpose: string; propertyType: string; comments: string; }

export default function VastuConsultationForm() {
  const { t } = useLanguage();
  const purposeOptions = t.servicesPage.form.purposeOptions;
  const propertyTypeOptions = t.servicesPage.form.propertyTypeOptions;

  const initialFormData: FormData = { name: "", email: "", phone: "", city: "", purpose: "", propertyType: "", comments: "" }
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (purposeOptions.length > 0 && propertyTypeOptions.length > 0) {
      setFormData(prev => ({ ...prev, purpose: purposeOptions[0], propertyType: propertyTypeOptions[0] }));
    }
  }, [purposeOptions, propertyTypeOptions]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
        await consultationService.submitConsultationForm(formData);
        toast.success("Request submitted! Redirecting to WhatsApp...");
        
        const whatsappMessage = `*New Vastu Consultation Request*\n-----------------------------\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone}\n*City:* ${formData.city}\n*Purpose:* ${formData.purpose}\n*Property Type:* ${formData.propertyType}\n*Comments:* ${formData.comments || 'N/A'}`;
        const adminWhatsAppNumber = process.env.NEXT_PUBLIC_ADMIN_WHATSAPP_NUMBER;
        const whatsappUrl = `https://wa.me/${adminWhatsAppNumber}?text=${encodeURIComponent(whatsappMessage)}`;
        
        window.open(whatsappUrl, '_blank');
        setSubmitted(true);
        setFormData(initialFormData);
    } catch (error: any) {
        toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
        setIsLoading(false);
    }
  }

  if (submitted) {
    return (
        <section className="py-24 sm:py-32 bg-gradient-to-r from-[#D7281E] via-[#F36C2C] to-[#F7A64A]">
            <div className="max-w-3xl mx-auto px-6 text-center text-white">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
                    <h2 className="text-4xl font-extrabold mb-4 font-serif">{t.servicesPage.form.successTitle}</h2>
                    <p className="text-lg">{t.servicesPage.form.successMessage}</p>
                </motion.div>
            </div>
        </section>
    );
  }

  return (
    <section className="py-12 sm:py-12 bg-gradient-to-r from-[#D7281E] via-[#F36C2C] to-[#F7A64A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.8, ease: "easeOut" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-extrabold text-white mb-4 font-serif drop-shadow-md">{t.servicesPage.form.title}</h2>
              <p className="text-white/90 mb-8 text-lg leading-relaxed drop-shadow-sm">{t.servicesPage.form.description}</p>
              <img src="/service1.jpg" alt="Vastu Consultation Plan" className="w-full rounded-full shadow-lg mb-8 aspect-square object-cover" />
              <div className="mt-8">
                <h3 className="font-bold text-white mb-4">{t.servicesPage.form.connectTitle}</h3>
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <a href={`https://wa.me/${process.env.NEXT_PUBLIC_ADMIN_WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 py-3 px-6 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors w-full sm:w-auto"><MessageSquare className="w-5 h-5" /><span>{t.servicesPage.form.whatsappButton}</span></a>
                  <a href="tel:+917303062088" className="inline-flex items-center justify-center gap-3 text-white/80 font-semibold hover:text-white transition-colors"><Phone className="w-5 h-5" /><span>{t.servicesPage.form.callButton}</span></a>
                </div>
              </div>
            </div>
            <div className="p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div><label htmlFor="name" className="block text-sm font-semibold text-white mb-2">{t.servicesPage.form.labelName}</label><input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white" /></div>
                <div><label htmlFor="phone" className="block text-sm font-semibold text-white mb-2">{t.servicesPage.form.labelPhone}</label><input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white" /></div>
                <div><label htmlFor="email" className="block text-sm font-semibold text-white mb-2">{t.servicesPage.form.labelEmail}</label><input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white" /></div>
                <div><label htmlFor="city" className="block text-sm font-semibold text-white mb-2">{t.servicesPage.form.labelCity}</label><input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white" /></div>
                <div><label className="block text-sm font-semibold text-white mb-3">{t.servicesPage.form.labelPurpose}</label><div className="grid grid-cols-1 sm:grid-cols-3 gap-3">{purposeOptions.map((option) => (<div key={option}><input type="radio" id={option} name="purpose" value={option} checked={formData.purpose === option} onChange={handleChange} className="peer hidden" /><label htmlFor={option} className="block text-center cursor-pointer select-none rounded-lg p-3 text-sm font-medium border border-white/30 bg-white/20 text-white/80 peer-checked:bg-white peer-checked:text-[#D7281E] peer-checked:border-white transition-colors">{option}</label></div>))}</div></div>
                <div><label htmlFor="propertyType" className="block text-sm font-semibold text-white mb-2">{t.servicesPage.form.labelPropertyType}</label><div className="relative"><select id="propertyType" name="propertyType" value={formData.propertyType} onChange={handleChange} className="w-full appearance-none px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white">{propertyTypeOptions.map((option) => (<option key={option} value={option} className="bg-[#F36C2C] text-white">{option}</option>))}</select><ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70 pointer-events-none" /></div></div>
                <div><label htmlFor="comments" className="block text-sm font-semibold text-white mb-2">{t.servicesPage.form.labelComments}</label><textarea id="comments" name="comments" value={formData.comments} onChange={handleChange} rows={4} className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"></textarea></div>
                <div><button type="submit" disabled={isLoading} className="w-full py-4 px-6 bg-white text-[#D7281E] font-bold rounded-lg hover:bg-white/90 transition-colors duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed">{isLoading ? t.servicesPage.form.buttonSubmitting : t.servicesPage.form.buttonSubmit}</button></div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}