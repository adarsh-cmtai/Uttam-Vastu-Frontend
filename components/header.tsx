"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path ? "text-[#f46f21] border-b-2 border-[#f46f21]" : ""
  }

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-[#212121]" style={{ fontFamily: "Philosopher, serif" }}>
          Uttam Vastu
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-8">
          <Link href="/" className={`uppercase text-sm font-bold transition ${isActive("/")}`}>
            Home
          </Link>
          <Link href="/about" className={`uppercase text-sm font-bold transition ${isActive("/about")}`}>
            About Us
          </Link>
          <Link href="/services" className={`uppercase text-sm font-bold transition ${isActive("/services")}`}>
            Services
          </Link>
          <Link href="/contact" className={`uppercase text-sm font-bold transition ${isActive("/contact")}`}>
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <i className="fa fa-bars text-2xl"></i>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-white border-t px-6 py-4 flex flex-col gap-4">
          <Link href="/" className="uppercase text-sm font-bold">
            Home
          </Link>
          <Link href="/about" className="uppercase text-sm font-bold">
            About Us
          </Link>
          <Link href="/services" className="uppercase text-sm font-bold">
            Services
          </Link>
          <Link href="/contact" className="uppercase text-sm font-bold">
            Contact
          </Link>
        </nav>
      )}
    </header>
  )
}
