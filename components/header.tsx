"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { motion, AnimatePresence, Variants } from "framer-motion"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto"
  }, [menuOpen])

  const menuVariants: Variants = {
    hidden: { opacity: 0, transition: { duration: 0.3, ease: "easeOut" } },
    visible: { opacity: 1, transition: { duration: 0.3, ease: "easeIn" } },
  }

  const navContainerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
  }

  const navItemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { ease: "easeOut" } },
  }

  return (
    <>
      <header
        className={`w-full sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "h-16 bg-white/95 shadow-md backdrop-blur-xl"
            : "h-20 bg-white/80 backdrop-blur-lg"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            <Link href="/" className="text-3xl font-bold text-gray-900" style={{ fontFamily: "Philosopher, serif" }}>
              Uttam Vastu
            </Link>

            <div className="flex items-center gap-4">
              <nav className="hidden md:flex items-center gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative text-sm font-semibold text-gray-700 hover:text-orange-600 transition-colors duration-200 px-4 py-2 rounded-full
                      ${isActive(link.href) ? "text-orange-600" : ""}`}
                  >
                    {isActive(link.href) && (
                      <motion.span
                        layoutId="active-pill"
                        className="absolute inset-0 bg-orange-100/70 rounded-full -z-10"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    {link.name}
                  </Link>
                ))}
              </nav>

              <Link
                href="/booking"
                className="hidden md:inline-flex items-center gap-2 bg-[#f46f21] text-white font-bold py-2.5 px-6 rounded-full hover:bg-orange-600 transition-all duration-300 transform hover:scale-105"
              >
                <CalendarDaysIcon className="w-5 h-5" />
                Book Now
              </Link>

              <button
                className="md:hidden w-8 h-8 flex flex-col justify-center items-center gap-1.5 z-50"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                <span
                  className={`block w-7 h-0.5 bg-gray-900 rounded-full transition-all duration-300 ease-in-out ${
                    menuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                ></span>
                <span
                  className={`block w-7 h-0.5 bg-gray-900 rounded-full transition-all duration-300 ease-in-out ${
                    menuOpen ? "opacity-0" : ""
                  }`}
                ></span>
                <span
                  className={`block w-7 h-0.5 bg-gray-900 rounded-full transition-all duration-300 ease-in-out ${
                    menuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                ></span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 z-40 bg-white md:hidden"
          >
            <div className="h-full flex flex-col justify-between p-8">
              <Link href="/" onClick={() => setMenuOpen(false)} className="text-2xl font-bold text-gray-900" style={{ fontFamily: "Philosopher, serif" }}>
                Uttam Vastu
              </Link>
              
              <motion.nav
                variants={navContainerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-center gap-8"
              >
                {navLinks.map((link) => (
                  <motion.div variants={navItemVariants} key={link.name}>
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={`text-3xl font-bold text-gray-800 ${
                        isActive(link.href) ? "text-orange-500" : ""
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>

              <motion.div 
                className="flex flex-col items-center gap-8"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{delay: 0.6}}
              >
                 <Link
                  href="/booking"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center bg-[#f46f21] text-white font-bold py-4 px-10 rounded-full text-lg"
                >
                  Book Now
                </Link>
                <div className="flex gap-6">
                    <a href="#" className="text-gray-500 hover:text-orange-500"><FacebookIcon className="w-6 h-6"/></a>
                    <a href="#" className="text-gray-500 hover:text-orange-500"><InstagramIcon className="w-6 h-6"/></a>
                    <a href="#" className="text-gray-500 hover:text-orange-500"><YouTubeIcon className="w-6 h-6"/></a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

const CalendarDaysIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M12 12.75h.008v.008H12v-.008z" />
    </svg>
)

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg fill="currentColor" viewBox="0 0 24 24" {...props}> <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /> </svg>)
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg fill="currentColor" viewBox="0 0 24 24" {...props}> <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.644-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" /> </svg>)
const YouTubeIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg fill="currentColor" viewBox="0 0 24 24" {...props}> <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /> </svg>)