"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { LayoutDashboard, Newspaper, MessageSquare, Briefcase, LogOut, Menu, BookUser } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { logoutUser, fetchCurrentUser } from "@/lib/redux/slices/authSlice"
import toast from "react-hot-toast"
import { Loader2 } from "lucide-react"

const navLinks = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Enquiries", href: "/admin/enquiries", icon: MessageSquare },
  { label: "Join Us Apps", href: "/admin/join-applications", icon: Briefcase },
  { label: "Student Sessions", href: "/admin/student-sessions", icon: BookUser },
  // { label: "Content", href: "/admin/content", icon: Newspaper },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchCurrentUser()).finally(() => setIsVerifying(false));
  }, [dispatch]);

  const handleLogout = async () => {
    try {
        await dispatch(logoutUser()).unwrap();
        toast.success("Logged out successfully!");
        window.location.href = '/login';
    } catch (error) {
        toast.error("Logout failed. Please try again.");
    }
  }

  if (isVerifying) {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-gray-100 dark:bg-gray-900">
            <Loader2 className="h-12 w-12 animate-spin text-orange-500" />
        </div>
    );
  }

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
        <div className="flex-shrink-0 px-6 py-5">
            <Link href="/admin/dashboard" className="text-3xl font-bold text-white" style={{ fontFamily: "Philosopher, serif" }}>Vastumaye</Link>
        </div>
        <nav className="flex-1 space-y-2 px-4">
            {navLinks.map((link) => {
                const isActive = pathname.startsWith(link.href);
                return (
                    <Link key={link.label} href={link.href} className={`flex items-center gap-x-3 rounded-md px-4 py-3 text-sm font-medium transition-colors ${ isActive ? "bg-orange-600 text-white shadow-lg" : "text-gray-300 hover:bg-gray-800 hover:text-white" }`}>
                        <link.icon className="h-5 w-5" />
                        <span>{link.label}</span>
                    </Link>
                );
            })}
        </nav>
        <div className="mt-auto border-t border-gray-700 p-4">
            <button onClick={handleLogout} className="flex w-full items-center gap-x-3 rounded-md px-4 py-3 text-sm font-medium text-gray-300 transition-colors hover:bg-red-800/50 hover:text-white">
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
            </button>
        </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 z-30 bg-black/70 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
            <motion.aside initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ duration: 0.3, ease: "easeInOut" }} className="fixed inset-y-0 left-0 z-40 w-64 border-r border-gray-700 bg-[#1A2238] lg:hidden">
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
      <aside className="hidden w-64 flex-shrink-0 bg-[#1A2238] lg:flex">
        <SidebarContent />
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 w-full items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 sm:px-6 lg:hidden">
          <Link href="/admin/dashboard" className="text-2xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: "Philosopher, serif" }}>Vastumaye</Link>
          <button onClick={() => setIsSidebarOpen(true)} className="rounded-md p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
            <Menu className="h-6 w-6" />
          </button>
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}