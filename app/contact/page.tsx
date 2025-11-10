"use client"

import type React from "react"
import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingWhatsApp from "@/components/floating-whatsapp"
import Link from "next/link"

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
    console.log("[v0] Form submitted:", formData)
    setSubmitted(true)
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <div>
      <Header />

      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="mb-4">Contact Us</h1>
          <div className="flex justify-center gap-2 text-sm">
            <Link href="/" className="hover:text-[#f46f21] transition">
              Home
            </Link>
            <span className="text-gray-500">/</span>
            <span className="text-gray-700">Contact Us</span>
          </div>
        </div>
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left Column - Contact Form */}
            <div>
              <h2 className="mb-6">Get In Touch</h2>
              <div className="as_separator mb-8" style={{ width: "100px" }}></div>

              {submitted && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 animate-pulse">
                  Thank you! Your message has been sent successfully.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-700">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f46f21] transition"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-700">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f46f21] transition"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-700">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f46f21] transition"
                    placeholder="+91 Your Phone Number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-700">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f46f21] transition"
                    placeholder="Subject"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2 text-gray-700">Your Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f46f21] transition"
                    placeholder="Your message here..."
                  ></textarea>
                </div>

                <button type="submit" className="as_btn w-full">
                  Send Message
                </button>
              </form>
            </div>

            {/* Right Column - Contact Info & Map */}
            <div>
              <h2 className="mb-6">Contact Info</h2>
              <div className="as_separator mb-8" style={{ width: "100px" }}></div>

              <div className="space-y-8 mb-12">
                {/* Address */}
                <div className="flex gap-4">
                  <div className="text-3xl text-[#f46f21] flex-shrink-0">
                    <i className="fa fa-map-marker"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2 text-gray-800">Address</h4>
                    <p className="text-gray-700">123 Uttam Vastu Street, Cosmic City, Country 12345</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4">
                  <div className="text-3xl text-[#f46f21] flex-shrink-0">
                    <i className="fa fa-phone"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2 text-gray-800">Phone</h4>
                    <p className="text-gray-700">+91 1234567890</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <div className="text-3xl text-[#f46f21] flex-shrink-0">
                    <i className="fa fa-envelope"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2 text-gray-800">Email</h4>
                    <p className="text-gray-700">help@astrordjj.com</p>
                  </div>
                </div>
              </div>

              {/* Social Media Icons */}
              <div className="mb-12">
                <h4 className="font-bold mb-4 text-gray-800">Follow Us</h4>
                <div className="flex gap-6">
                  <a href="#" className="text-3xl text-[#f46f21] hover:opacity-70 transition">
                    <i className="fa fa-facebook"></i>
                  </a>
                  <a href="#" className="text-3xl text-[#f46f21] hover:opacity-70 transition">
                    <i className="fa fa-instagram"></i>
                  </a>
                  <a href="#" className="text-3xl text-[#f46f21] hover:opacity-70 transition">
                    <i className="fa fa-youtube"></i>
                  </a>
                  <a href="https://wa.me/1234567890" className="text-3xl text-[#f46f21] hover:opacity-70 transition">
                    <i className="fa fa-whatsapp"></i>
                  </a>
                </div>
              </div>

              {/* Embedded Map */}
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
