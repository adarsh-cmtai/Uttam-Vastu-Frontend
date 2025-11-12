"use client"

import Link from "next/link"
import { Facebook, Instagram, Youtube, MessageSquare } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#D7281E] via-[#F36C2C] to-[#F7A64A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <h3 className="text-2xl font-bold text-white mb-4 font-serif drop-shadow-md">
              Vastumaye
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
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-white/80 hover:text-white transition-colors duration-300">
                <MessageSquare className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-bold text-white uppercase text-sm tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="text-white/80 hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/services" className="text-white/80 hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/contact" className="text-white/80 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="text-white/80 hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link href="#" className="text-white/80 hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-bold text-white uppercase text-sm tracking-wider mb-4">Horoscope</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Daily Forecast</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Weekly Forecast</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Monthly Forecast</a></li>
              <li><a href="#" className="text-white/80 hover:text-white transition-colors">Yearly Forecast</a></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="font-bold text-white uppercase text-sm tracking-wider mb-4">Subscribe to Our Newsletter</h4>
            <p className="text-sm text-white/90 mb-4">
              Get weekly insights and cosmic guidance delivered straight to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow w-full px-4 py-2 bg-white/20 border border-white/30 rounded-md text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button
                type="submit"
                className="bg-white text-[#D7281E] font-bold py-2 px-4 rounded-md hover:bg-white/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/20 text-center text-sm text-white/70">
          <p>Copyright &copy; {new Date().getFullYear()} Vastumaye. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}