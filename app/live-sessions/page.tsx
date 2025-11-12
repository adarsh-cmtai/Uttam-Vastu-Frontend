"use client"

import { useState } from "react"
import type React from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingWhatsApp from "@/components/floating-whatsapp"
import Link from "next/link"
import { motion } from "framer-motion"
import { Users, Video, Award } from "lucide-react"

const packages = [
  {
    title: "One Case Study",
    price: "₹ 1,500",
    description: "60-min Zoom call",
  },
  {
    title: "Three Case Studies",
    price: "₹ 3,000",
    description: "Weekend sessions",
  },
  {
    title: "Three Case Studies (Advanced)",
    price: "₹ 5,000",
    description: "Weekend sessions",
  },
]

export default function LiveSessions() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    state: "",
    address: "",
    qualifications: "",
    experience: "",
    chosenPackage: packages[0].title,
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Booking Submitted:", formData)
    setSubmitted(true)
    setFormData({
      name: "",
      contact: "",
      state: "",
      address: "",
      qualifications: "",
      experience: "",
      chosenPackage: packages[0].title,
    })
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <div className="bg-gradient-to-r from-[#D7281E] via-[#F36C2C] to-[#F7A64A]">
      <Header />

      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-4 font-serif drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]">
            Live Case Discussion
          </h1>
          <div className="flex justify-center items-center gap-2 text-sm font-medium drop-shadow-[0_1px_1px_rgba(255,255,255,0.3)]">
            <Link href="/" className="text-white hover:text-stone-900 transition-colors">
              Home
            </Link>
            <span className="text-stone-700">/</span>
            <span className="text-white font-semibold">For Students</span>
          </div>
        </div>
      </div>

      <section className="pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="bg-orange-50/80 backdrop-blur-sm rounded-2xl overflow-hidden p-8 sm:p-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="lg:pr-8">
                <h2 className="text-3xl font-extrabold text-stone-900 mb-2 font-serif">
                  Online Vastu Practice Sessions
                </h2>
                <div className="h-1 bg-stone-900/30 rounded mb-6 w-24"></div>
                <p className="text-stone-700 mb-6 leading-relaxed">
                  Deepen your understanding and sharpen your skills by analyzing real-world Vastu cases. We provide actual home and office floor plans for a hands-on learning experience. Limited seats available to ensure personalized attention.
                </p>

                <div className="space-y-4 mt-8">
                  {packages.map((pkg, index) => (
                    <motion.div
                      key={index}
                      className="bg-white/70 p-4 rounded-lg border border-orange-200/50"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-bold text-stone-900">{pkg.title}</h4>
                          <p className="text-sm text-stone-700">{pkg.description}</p>
                        </div>
                        <p className="text-xl font-bold text-[#D7281E]">{pkg.price}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                {submitted && (
                  <div className="bg-green-500/10 border border-green-600 text-green-800 px-4 py-3 rounded mb-6 text-center">
                    Thank you for booking! We will contact you shortly with the session details.
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-stone-900">Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 bg-white/70 border border-orange-200/50 rounded-lg text-stone-900 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-[#D7281E]" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-stone-900">Contact Number</label>
                    <input type="tel" name="contact" value={formData.contact} onChange={handleChange} required className="w-full px-4 py-3 bg-white/70 border border-orange-200/50 rounded-lg text-stone-900 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-[#D7281E]" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-stone-900">State</label>
                      <input type="text" name="state" value={formData.state} onChange={handleChange} required className="w-full px-4 py-3 bg-white/70 border border-orange-200/50 rounded-lg text-stone-900 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-[#D7281E]" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-stone-900">Address</label>
                      <input type="text" name="address" value={formData.address} onChange={handleChange} required className="w-full px-4 py-3 bg-white/70 border border-orange-200/50 rounded-lg text-stone-900 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-[#D7281E]" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-stone-900">Qualifications</label>
                    <textarea name="qualifications" value={formData.qualifications} onChange={handleChange} required rows={2} className="w-full px-4 py-3 bg-white/70 border border-orange-200/50 rounded-lg text-stone-900 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-[#D7281E]"></textarea>
                  </div>
                   <div>
                    <label className="block text-sm font-semibold mb-2 text-stone-900">Experience</label>
                    <textarea name="experience" value={formData.experience} onChange={handleChange} required rows={2} className="w-full px-4 py-3 bg-white/70 border border-orange-200/50 rounded-lg text-stone-900 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-[#D7281E]"></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-stone-900">Choose Your Package</label>
                    <div className="space-y-2">
                        {packages.map((pkg) => (
                            <label key={pkg.title} className="flex items-center p-3 rounded-lg bg-white/70 border border-orange-200/50 has-[:checked]:bg-stone-900 has-[:checked]:text-white has-[:checked]:border-stone-900 transition-colors cursor-pointer">
                                <input type="radio" name="chosenPackage" value={pkg.title} checked={formData.chosenPackage === pkg.title} onChange={handleChange} className="w-4 h-4 mr-3 accent-[#D7281E]" />
                                <span className="font-semibold">{pkg.title} - {pkg.price}</span>
                            </label>
                        ))}
                    </div>
                  </div>
                  <button type="submit" className="w-full bg-[#D7281E] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#b82218] transition-colors duration-300 shadow-md">
                    Book Now
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