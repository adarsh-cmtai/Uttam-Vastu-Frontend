"use client"

import type React from "react"
import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingWhatsApp from "@/components/floating-whatsapp"
import Link from "next/link"
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube, MessageSquare } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setSubmitted(true)
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <div className="bg-gradient-to-r from-[#D7281E] via-[#F36C2C] to-[#F7A64A]">
      <Header />

      <div className="py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-stone-900 mb-4 font-serif drop-shadow-md">
            Contact Us
          </h1>
          <div className="flex justify-center items-center gap-2 text-sm font-medium text-white/80 drop-shadow-sm">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-white/70">/</span>
            <span className="text-white font-semibold">Contact Us</span>
          </div>
        </div>
      </div>

      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl p-8 sm:p-12 rounded-2xl">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2 font-serif drop-shadow-md">Get In Touch</h2>
              <div className="h-1 bg-white/30 rounded mb-8 w-24"></div>

              {submitted && (
                <div className="bg-green-500/20 border border-green-500/50 text-white px-4 py-3 rounded mb-6">
                  Thank you! Your message has been sent successfully.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-white">Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white" placeholder="Your name"/>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-white">Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white" placeholder="your.email@example.com"/>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-white">Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white" placeholder="+91 Your Phone Number"/>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-white">Subject</label>
                  <input type="text" name="subject" value={formData.subject} onChange={handleChange} required className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white" placeholder="Subject"/>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-white">Your Message</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} required rows={5} className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white" placeholder="Your message here..."></textarea>
                </div>
                <button type="submit" className="w-full bg-white text-[#D7281E] font-bold py-3 px-6 rounded-lg hover:bg-white/90 transition-colors duration-300 shadow-md">
                  Send Message
                </button>
              </form>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-white mb-2 font-serif drop-shadow-md">Contact Info</h2>
              <div className="h-1 bg-white/30 rounded mb-8 w-24"></div>

              <div className="space-y-8 mb-12">
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Address</h4>
                    <p className="text-white/80">123 Vastumaye Street, Cosmic City, Country 12345</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Phone</h4>
                    <p className="text-white/80">+91 12345 67890</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Email</h4>
                    <p className="text-white/80">contact@vastumaye.com</p>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="font-bold mb-4 text-white">Follow Us</h4>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-full text-white hover:bg-white/30 transition"><Facebook /></a>
                  <a href="#" className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-full text-white hover:bg-white/30 transition"><Instagram /></a>
                  <a href="#" className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-full text-white hover:bg-white/30 transition"><Youtube /></a>
                  <a href="https://wa.me/1234567890" className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-full text-white hover:bg-white/30 transition"><MessageSquare /></a>
                </div>
              </div>

              <div className="rounded-lg overflow-hidden shadow-lg h-80">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.5789522894737!2d77.20721541111103!3d28.599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce2aab6c1d6a1%3A0x1234567890!2sNew%20Delhi%2C%20India!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}