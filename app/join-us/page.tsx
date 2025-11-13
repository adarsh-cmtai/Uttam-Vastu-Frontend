"use client"

import { useState } from "react"
import type React from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingWhatsApp from "@/components/floating-whatsapp"
import Link from "next/link"
import { motion } from "framer-motion"
import { Users, BookOpen, ShieldCheck } from "lucide-react"

export default function JoinUs() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    state: "",
    address: "",
    qualifications: "",
    experience: "",
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Application Submitted:", formData)
    setSubmitted(true)
    setFormData({ name: "", contact: "", state: "", address: "", qualifications: "", experience: "" })
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <div className="bg-gradient-to-r from-[#D7281E] via-[#F36C2C] to-[#F7A64A]">
      <Header />

      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-4 font-serif drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]">
            Join Our Team
          </h1>
          <div className="flex justify-center items-center gap-2 text-sm font-medium drop-shadow-[0_1px_1px_rgba(255,255,255,0.3)]">
            <Link href="/" className="text-white hover:text-stone-900 transition-colors">
              Home
            </Link>
            <span className="text-stone-700">/</span>
            <span className="text-white font-semibold">Join Vastumaye Team</span>
          </div>
        </div>
      </div>

      <section className="pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="lg:pr-8 p-8 sm:p-12 bg-orange-50/80 backdrop-blur-sm">
                <h2 className="text-3xl font-extrabold text-stone-900 mb-2 font-serif">
                  Vastu Solutions | Learn, Consult, Earn
                </h2>
                <div className="h-1 bg-stone-900/30 rounded mb-6 w-24"></div>
                <p className="text-stone-700 mb-6 leading-relaxed text-lg">
                  If you are a certified Vastu, Astrology, or Numerology practitioner with a heart for dharma and a commitment to excellence, we invite you to grow with us. We are weaving a trusted network of authentic consultants across India.
                </p>

                <h3 className="text-xl font-bold text-stone-900 mt-8 mb-4">Seamless Onboarding. Meaningful Opportunities.</h3>
                <div className="bg-white/70 p-4 rounded-lg border border-orange-200/50 mb-6">
                  <p className="text-stone-800 font-semibold text-lg">
                    Become part of our inner circle for a modest annual contribution of <span className="text-[#D7281E]">₹5,000 per year</span>.
                  </p>
                </div>
                <ul className="space-y-3 text-stone-700 mb-8 text-lg">
                  <li className="flex items-start gap-3">
                    <span className="font-bold text-[#D7281E] mt-1">1.</span>
                    <span><strong>Share Your Journey:</strong> Fill out the application with your details, qualifications, and experience.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-bold text-[#D7281E] mt-1">2.</span>
                    <span><strong>Connect With Us:</strong> We'll schedule a one-on-one discussion to explore alignment and expertise.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-bold text-[#D7281E] mt-1">3.</span>
                    <span><strong>Welcome Aboard:</strong> If your vision resonates with ours, you’re in.</span>
                  </li>
                </ul>

                <h3 className="text-xl font-bold text-stone-900 mt-8 mb-4">What You Gain</h3>
                <ul className="space-y-4 text-lg">
                  <li className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-stone-900/10 rounded-full flex items-center justify-center"><Users className="w-5 h-5 text-[#D7281E]" /></div>
                    <div>
                      <h4 className="font-bold text-stone-900">Real Client Cases</h4>
                      <p className="text-stone-700 text-md">Allocated by geography, availability, and your unique strengths.</p>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-stone-900/10 rounded-full flex items-center justify-center"><BookOpen className="w-5 h-5 text-[#D7281E]" /></div>
                    <div>
                      <h4 className="font-bold text-stone-900">Exclusive Peer Circle</h4>
                      <p className="text-stone-700 text-md">A private discussion group for learning, support, and collaboration.</p>
                    </div>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-stone-900/10 rounded-full flex items-center justify-center"><ShieldCheck className="w-5 h-5 text-[#D7281E]" /></div>
                    <div>
                      <h4 className="font-bold text-stone-900">A Trusted Brand</h4>
                      <p className="text-stone-700 text-md">Carry the Vastumaye name with pride in Delhi-NCR and beyond.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="p-8 sm:p-12 bg-gradient-to-r from-[#D7281E] via-[#F36C2C] to-[#F7A64A]">
                {submitted && (
                  <div className="bg-green-100 border border-green-500 text-green-900 px-4 py-3 rounded mb-6 text-center">
                    Thank you! Your application has been submitted. We will get in touch with you shortly.
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-white">Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-white">Contact Number</label>
                    <input type="tel" name="contact" value={formData.contact} onChange={handleChange} required className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-white">State</label>
                      <input type="text" name="state" value={formData.state} onChange={handleChange} required className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-white">Address</label>
                      <input type="text" name="address" value={formData.address} onChange={handleChange} required className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-white">Qualifications</label>
                    <textarea name="qualifications" value={formData.qualifications} onChange={handleChange} required rows={3} className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white"></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-white">Experience (in years)</label>
                    <textarea name="experience" value={formData.experience} onChange={handleChange} required rows={3} className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white"></textarea>
                  </div>
                  <button type="submit" className="w-full bg-white text-[#D7281E] font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-md">
                    Apply in 3 Minutes →
                  </button>
                </form>
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