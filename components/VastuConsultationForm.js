"use client"

import { useState } from "react"
import { Phone, MessageSquare, ChevronDown } from "lucide-react"
import { motion } from "framer-motion"

const purposeOptions = [
  "New Construction / New Property",
  "Existing Property / Renovation",
  "Consultation Before Buying Property",
]

const propertyTypeOptions = [
  "Flat / Apartment",
  "Independent House / Villa",
  "Office",
  "Shop / Showroom",
  "Hotel / Restaurant",
  "Factory",
  "Warehouse / Godown",
  "Other",
]

export default function VastuConsultationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    purpose: purposeOptions[0],
    propertyType: propertyTypeOptions[0],
    comments: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form Submitted:", formData)
  }

  return (
    <section className="py-12 sm:py-12 bg-gradient-to-r from-[#D7281E] via-[#F36C2C] to-[#F7A64A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-extrabold text-white mb-4 font-serif drop-shadow-md">
                Vastu Consultation (with Site Visit)
              </h2>
              <p className="text-white/90 mb-8 text-lg leading-relaxed drop-shadow-sm">
                Fill the form to request an on-site consultation. Our experts visit your property to provide a detailed analysis and personalized remedies.
              </p>

              <img
                src="/meditation-spiritual-astrology.jpg"
                alt="Vastu Consultation Plan"
                className="w-full rounded-full shadow-lg mb-8 aspect-square object-cover"
              />

              <div className="mt-8">
                <h3 className="font-bold text-white mb-4">Or Connect Directly:</h3>
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 py-3 px-6 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors w-full sm:w-auto">
                    <MessageSquare className="w-5 h-5" />
                    <span>WhatsApp Us</span>
                  </a>
                  <a href="tel:+911234567890" className="inline-flex items-center justify-center gap-3 text-white/80 font-semibold hover:text-white transition-colors">
                    <Phone className="w-5 h-5" />
                    <span>Call Us</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-white mb-2">Full Name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-white mb-2">Phone Number</label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">Email Address</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white" />
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-semibold text-white mb-2">City</label>
                  <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-white mb-3">Purpose of Consultation</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {purposeOptions.map((option) => (
                      <div key={option}>
                        <input type="radio" id={option} name="purpose" value={option} checked={formData.purpose === option} onChange={handleChange} className="peer hidden" />
                        <label htmlFor={option} className="block text-center cursor-pointer select-none rounded-lg p-3 text-sm font-medium border border-white/30 bg-white/20 text-white/80 peer-checked:bg-white peer-checked:text-[#D7281E] peer-checked:border-white transition-colors">
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label htmlFor="propertyType" className="block text-sm font-semibold text-white mb-2">Property Type</label>
                  <div className="relative">
                    <select id="propertyType" name="propertyType" value={formData.propertyType} onChange={handleChange} className="w-full appearance-none px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white">
                      {propertyTypeOptions.map((option) => (<option key={option} value={option} className="bg-[#F36C2C] text-white">{option}</option>))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/70 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label htmlFor="comments" className="block text-sm font-semibold text-white mb-2">Comments / Requirement</label>
                  <textarea id="comments" name="comments" value={formData.comments} onChange={handleChange} rows={4} className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"></textarea>
                </div>
                <div>
                  <button type="submit" className="w-full py-4 px-6 bg-white text-[#D7281E] font-bold rounded-lg hover:bg-white/90 transition-colors duration-300 transform hover:scale-[1.02]">
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}