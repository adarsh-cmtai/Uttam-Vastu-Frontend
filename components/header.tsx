"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [menuOpen])

  return (
    <>
      <header className="w-full bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="text-3xl font-bold text-gray-800" style={{ fontFamily: "Philosopher, serif" }}>
              Uttam Vastu
            </Link>

            <div className="flex items-center gap-6">
              <nav className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative text-sm font-bold uppercase tracking-wider text-gray-700 hover:text-orange-500 transition-colors duration-300 group
                      ${isActive(link.href) ? "text-orange-500" : ""}`}
                  >
                    {link.name}
                    <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-orange-500 transition-transform duration-300 scale-x-0 group-hover:scale-x-100
                      ${isActive(link.href) ? "scale-x-100" : ""}`}
                    ></span>
                  </Link>
                ))}
              </nav>

              <div className="hidden md:block w-px h-6 bg-gray-200"></div>

              <Link href="/booking" className="hidden md:inline-block bg-orange-500 text-white font-bold py-2.5 px-6 rounded-full hover:bg-orange-600 transition-all duration-300 transform hover:scale-105">
                Book Now
              </Link>
              
              <button
                className="md:hidden w-8 h-8 flex flex-col justify-center items-center gap-1.5 z-50"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                <span className={`block w-7 h-0.5 bg-gray-800 rounded-full transition-all duration-300 ease-in-out ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
                <span className={`block w-7 h-0.5 bg-gray-800 rounded-full transition-all duration-300 ease-in-out ${menuOpen ? "opacity-0" : ""}`}></span>
                <span className={`block w-7 h-0.5 bg-gray-800 rounded-full transition-all duration-300 ease-in-out ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-gray-50 transition-transform duration-300 ease-in-out md:hidden
          ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <nav className="flex flex-col items-center gap-8">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`text-3xl font-bold uppercase text-gray-800 transition-all duration-500 ${isActive(link.href) ? "text-orange-500" : ""}
                  ${menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}
                style={{ transitionDelay: `${index * 100 + 150}ms` }}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <Link 
            href="/booking" 
            onClick={() => setMenuOpen(false)} 
            className={`mt-12 bg-orange-500 text-white font-bold py-3 px-10 rounded-full text-lg transition-all duration-500
              ${menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}
            style={{ transitionDelay: `${navLinks.length * 100 + 150}ms` }}
          >
            Book Now
          </Link>
        </div>
      </div>
    </>
  )
}