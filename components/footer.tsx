"use client"

import Link from "next/link"
import { Facebook, Instagram, Youtube, MessageSquare, MapPin, Mail, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#D7281E] via-[#F36C2C] to-[#F7A64A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-2xl font-bold text-white mb-4 font-serif drop-shadow-md">
              VastuMaye
            </h3>
            <p className="text-sm text-white/90 mb-6 max-w-xs drop-shadow-sm">
              Ancient wisdom for modern living. Unlock your potential through the power of Vastu Shastra.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" aria-label="Facebook" className="text-white/80 hover:text-white transition-colors duration-300">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" aria-label="Instagram" className="text-white/80 hover:text-white transition-colors duration-300">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" aria-label="YouTube" className="text-white/80 hover:text-white transition-colors duration-300">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase text-sm tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="text-white/80 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/services" className="text-white/80 hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/join-us" className="text-white/80 hover:text-white transition-colors">Join Us</Link></li>
              <li><Link href="/contact" className="text-white/80 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase text-sm tracking-wider mb-4">Our Services</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/services" className="text-white/80 hover:text-white transition-colors">Residential Vastu</Link></li>
              <li><Link href="/services" className="text-white/80 hover:text-white transition-colors">Commercial Vastu</Link></li>
              <li><Link href="/live-sessions" className="text-white/80 hover:text-white transition-colors">Online Consultation</Link></li>
              <li><Link href="/site-visits" className="text-white/80 hover:text-white transition-colors">Site Visit Practical</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase text-sm tracking-wider mb-4">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-white/80 mt-0.5 shrink-0" />
                <span className="text-white/80">Delhi, India</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-white/80 mt-0.5 shrink-0" />
                <a href="mailto:vastumaye@gmail.com" className="text-white/80 hover:text-white transition-colors">vastumaye@gmail.com</a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-white/80 mt-0.5 shrink-0" />
                <a href="tel:+917303062088" className="text-white/80 hover:text-white transition-colors">+91-73030-62088</a>
              </li>
              <li className="flex items-start gap-3">
                <MessageSquare className="w-5 h-5 text-white/80 mt-0.5 shrink-0" />
                <a href="https://wa.me/917303062088" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">WhatsApp Us</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/20 text-center text-sm text-white/70">
          <p>&copy; {new Date().getFullYear()} VastuMaye. All Rights Reserved.</p>
          <p className="mt-2 font-serif">सर्वे भवन्तु सुखिनः – May all be happy.</p>
        </div>
      </div>
    </footer>
  )
}