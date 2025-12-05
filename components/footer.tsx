"use client"

import React from "react";
import Link from "next/link"
import { Facebook, Instagram, Youtube, MessageSquare, MapPin, Mail, Phone } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const content = t.footer;

  return (
    <footer className="bg-gradient-to-r from-[#D7281E] via-[#F36C2C] to-[#F7A64A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          <div className="col-span-2 md:col-span-1">
            <img
              src="/Logo2.PNG"
              alt="VastuMaye"
              className="w-[200px] h-[110px] -mb-6 -mt-10 drop-shadow-md"
            />
            <p className="text-md text-white/90 mb-6 max-w-xs drop-shadow-sm">
              {content.description}
            </p>
            <div className="flex items-center gap-4">
              <a href="https://www.facebook.com/profile.php?id=61584037084111" target="_blank" aria-label="Facebook" className="text-white/80 hover:text-white transition-colors duration-300">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://www.instagram.com/vastumaye/saved/" target="_blank" aria-label="Instagram" className="text-white/80 hover:text-white transition-colors duration-300">
                <Instagram className="w-6 h-6" />
              </a>
              {/* <a href="#" aria-label="YouTube" target="_blank" className="text-white/80 hover:text-white transition-colors duration-300">
                <Youtube className="w-6 h-6" />
              </a> */}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase text-lg tracking-wider mb-4">{content.quickLinksTitle}</h4>
            <ul className="space-y-3 text-md">
              {content.links.map(link => (
                <li key={link.text}><Link href={link.href} className="text-white/80 hover:text-white transition-colors">{link.text}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase text-lg tracking-wider mb-4">{content.ourServicesTitle}</h4>
            <ul className="space-y-3 text-md">
              {content.services.map(service => (
                <li key={service.text}><Link href={service.href} className="text-white/80 hover:text-white transition-colors">{service.text}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase text-lg tracking-wider mb-4">{content.contactUsTitle}</h4>
            <ul className="space-y-4 text-md">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-white/80 mt-0.5 shrink-0" />
                <span className="text-white/80">{content.address}</span>
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
                <a href="https://wa.me/917303062088" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">{content.whatsapp}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/20 relative flex flex-col items-center justify-center">
          
          <img 
            src="/QR.JPG" 
            alt="Left Corner" 
            className="w-24 h-auto mb-4 md:mb-0 md:absolute md:left-0 md:top-8"
          />

          <div className="text-center text-sm text-white/70 w-full">
            <p>&copy; {new Date().getFullYear()} VastuMaye. {content.copyright}</p>
            <p className="mt-2 font-serif">{content.tagline}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}