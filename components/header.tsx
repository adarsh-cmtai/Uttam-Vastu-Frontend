"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence, Variants } from "framer-motion"
import { useLanguage } from "@/contexts/LanguageContext"

const CalendarDaysIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18" /></svg> )
const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg> )
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664 4.771 4.919 4.919 1.266-.057 1.644-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" /></svg> )
const YouTubeIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg fill="currentColor" viewBox="0 0 24 24" {...props}><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg> )
const Bars3Icon = (props: React.SVGProps<SVGSVGElement>) => ( <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg> )
const XMarkIcon = (props: React.SVGProps<SVGSVGElement>) => ( <svg fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg> )

export default function Header() {
  const { t, language, toggleLanguage } = useLanguage();
  const navLinks = t.header.navLinks;
  const bookNowText = t.header.bookNowButton;

  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  useEffect(() => { 
    const handleScroll = () => setIsScrolled(window.scrollY > 20); 
    window.addEventListener("scroll", handleScroll, { passive: true }); 
    return () => window.removeEventListener("scroll", handleScroll); 
  }, []);

  useEffect(() => { 
    document.body.style.overflow = menuOpen ? "hidden" : "auto"; 
  }, [menuOpen]);

  const menuVariants: Variants = { 
    hidden: { opacity: 0, clipPath: "circle(0% at 100% 0%)", transition: { duration: 0.5, ease: "easeInOut" } }, 
    visible: { opacity: 1, clipPath: "circle(150% at 100% 0%)", transition: { duration: 0.5, ease: "easeInOut" } } 
  };
  
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } }
  };

  const itemVariants: Variants = { 
    hidden: { y: 30, opacity: 0 }, 
    visible: { y: 0, opacity: 1, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.6 } } 
  };

  return (
    <>
      <header 
        className={`w-full sticky top-0 z-[60] transition-all duration-300 
        ${ menuOpen ? "bg-transparent shadow-none" : (isScrolled ? "h-16 bg-gradient-to-r from-[#D7281E]/95 via-[#F36C2C]/95 to-[#F7A64A]/95 backdrop-blur-lg shadow-xl" : "h-20 bg-gradient-to-r from-[#D7281E] via-[#F36C2C] to-[#F7A64A]") }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-full">
          <div className="flex items-center justify-between h-full">
            <Link href="/" className="flex items-center z-[70]" onClick={() => setMenuOpen(false)}>
              <Image src="/Logo2.PNG" alt="Vastumaye Logo" width={100} height={100} className={`w-48 h-28 transition-all duration-300 `} priority />
            </Link>

            <div className="flex items-center gap-2">
              <nav className="hidden md:flex items-baseline gap-1">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className={`relative text-md font-semibold text-white hover:text-white/80 transition-colors duration-200 px-3 py-2 rounded-full`}>
                    {isActive(link.href) && (<motion.span layoutId="active-pill" className="absolute inset-0 bg-white/10 rounded-full" style={{ zIndex: -1 }} transition={{ type: "spring", stiffness: 300, damping: 30 }} />)}
                    <span>{link.name}</span>
                    {link.tag && (
                        <span className="absolute top-full left-1/2 -translate-x-1/2 mt-[-6px] text-[10px] bg-white text-[#D7281E] px-1.5 rounded-sm font-bold shadow-sm whitespace-nowrap">
                          {link.tag}
                        </span>
                    )}
                  </Link>
                ))}
              </nav>

              <div className="hidden md:flex">
                <button onClick={toggleLanguage} className="font-semibold text-white/80 hover:text-white transition-colors px-3 py-2 rounded-full">
                  {language === 'en' ? 'हिन्दी' : 'English'}
                </button>
              </div>

              <motion.div 
                animate={{ y: [0, -4, 0], scale: [1, 1.05, 1] }} 
                transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }} 
                className="hidden lg:inline-flex"
              >
                <Link href="/services" className="flex items-center gap-2 bg-white text-[#D7281E] font-bold py-2.5 px-6 rounded-full shadow-md hover:bg-white/90 transition-all duration-300">
                  <CalendarDaysIcon className="w-5 h-5" />
                  {bookNowText}
                </Link>
              </motion.div>

              <button 
                className="md:hidden relative w-12 h-12 flex justify-center items-center rounded-full hover:bg-white/10 transition-colors z-[70] focus:outline-none" 
                onClick={() => setMenuOpen(!menuOpen)} 
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {menuOpen ? (
                    <motion.div 
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <XMarkIcon className="w-8 h-8 text-white drop-shadow-md" />
                    </motion.div>
                  ) : (
                    <motion.div 
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Bars3Icon className="w-8 h-8 text-white drop-shadow-md" />
                    </motion.div>
                  )}
                </AnimatePresence>
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
            className="fixed inset-0 z-[50] bg-[#D7281E] md:hidden overflow-hidden"
            style={{
                backgroundImage: 'linear-gradient(135deg, #D7281E 0%, #F36C2C 50%, #F7A64A 100%)'
            }}
          >
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[40%] bg-white/10 rounded-full blur-[80px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[40%] bg-white/10 rounded-full blur-[80px]" />

            <div className="flex flex-col h-full px-8 pb-10 pt-28 justify-between relative z-10">
              <motion.nav 
                variants={containerVariants} 
                initial="hidden" 
                animate="visible" 
                className="flex flex-col gap-5"
              >
                {navLinks.map((link, i) => (
                  <motion.div variants={itemVariants} key={i}>
                    <Link 
                      href={link.href} 
                      onClick={() => setMenuOpen(false)} 
                      className={`block text-3xl font-black tracking-tight transition-all duration-300 ${ isActive(link.href) ? "text-white translate-x-2" : "text-white/70 hover:text-white hover:translate-x-2" }`}
                    >
                      {link.name}
                      {link.tag && (
                        <span className="ml-3 align-middle text-xs bg-white text-[#D7281E] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider shadow-sm">
                          {link.tag}
                        </span>
                      )}
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>

              <motion.div 
                variants={containerVariants}
                initial="hidden" 
                animate="visible"
                className="flex flex-col gap-6"
              >
                 <motion.div variants={itemVariants} className="w-full h-px bg-white/20" />

                 <motion.div variants={itemVariants} className="flex items-center justify-between px-1">
                    <span className="text-white/90 font-medium text-lg">Language</span>
                    <button 
                      onClick={toggleLanguage} 
                      className="group relative inline-flex items-center px-5 py-2 rounded-full bg-white/10 border border-white/20 text-white font-semibold transition-all active:scale-95"
                    >
                      {language === 'en' ? 'हिन्दी' : 'English'}
                    </button>
                 </motion.div>

                <motion.div variants={itemVariants}>
                  <Link 
                    href="/services" 
                    onClick={() => setMenuOpen(false)} 
                    className="flex items-center justify-center gap-3 w-full bg-white text-[#D7281E] font-extrabold text-lg py-3.5 rounded-2xl shadow-xl hover:shadow-white/20 active:scale-[0.98] transition-all"
                  >
                    <CalendarDaysIcon className="w-6 h-6" />
                    {bookNowText}
                  </Link>
                </motion.div>

                <motion.div variants={itemVariants} className="flex justify-center gap-10 pt-2">
                    <a href="#" className="text-white/80 hover:text-white hover:scale-110 transition-transform"><FacebookIcon className="w-8 h-8"/></a>
                    <a href="#" className="text-white/80 hover:text-white hover:scale-110 transition-transform"><InstagramIcon className="w-8 h-8"/></a>
                    <a href="#" className="text-white/80 hover:text-white hover:scale-110 transition-transform"><YouTubeIcon className="w-8 h-8"/></a>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}