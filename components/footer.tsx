import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-slate-50 text-slate-700">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <h3 className="text-2xl font-bold text-slate-900 mb-4" style={{ fontFamily: "Philosopher, serif" }}>
              Uttam Vastu
            </h3>
            <p className="text-sm text-slate-600 mb-6 max-w-xs">
              Ancient wisdom for modern living. Unlock your potential through the power of Vedic Astrology.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                aria-label="Facebook"
                className="text-slate-500 hover:text-slate-900 transform transition-colors duration-300"
              >
                <FacebookIcon className="w-6 h-6" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-slate-500 hover:text-slate-900 transform transition-colors duration-300"
              >
                <InstagramIcon className="w-6 h-6" />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="text-slate-500 hover:text-slate-900 transform transition-colors duration-300"
              >
                <YouTubeIcon className="w-6 h-6" />
              </a>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="text-slate-500 hover:text-slate-900 transform transition-colors duration-300"
              >
                <WhatsAppIcon className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-semibold text-slate-900 mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="text-slate-600 hover:text-[#f46f21] transition-colors">About Us</Link></li>
              <li><Link href="/services" className="text-slate-600 hover:text-[#f46f21] transition-colors">Services</Link></li>
              <li><Link href="/contact" className="text-slate-600 hover:text-[#f46f21] transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="text-slate-600 hover:text-[#f46f21] transition-colors">Terms & Conditions</Link></li>
              <li><Link href="#" className="text-slate-600 hover:text-[#f46f21] transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-semibold text-slate-900 mb-4">Horoscope</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-slate-600 hover:text-[#f46f21] transition-colors">Daily Forecast</a></li>
              <li><a href="#" className="text-slate-600 hover:text-[#f46f21] transition-colors">Weekly Forecast</a></li>
              <li><a href="#" className="text-slate-600 hover:text-[#f46f21] transition-colors">Monthly Forecast</a></li>
              <li><a href="#" className="text-slate-600 hover:text-[#f46f21] transition-colors">Yearly Forecast</a></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="font-semibold text-slate-900 mb-4">Subscribe to Our Newsletter</h4>
            <p className="text-sm text-slate-600 mb-4">
              Get weekly insights and cosmic guidance delivered straight to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow w-full px-4 py-2 bg-white border border-slate-300 rounded-md text-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f46f21]"
              />
              <button
                type="submit"
                className="bg-[#f46f21] text-white font-bold py-2 px-4 rounded-md hover:bg-opacity-90 transition-opacity"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-200 text-center text-sm text-slate-500">
          <p>Copyright &copy; {new Date().getFullYear()} Uttam Vastu. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  </svg>
)

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.057 1.644-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" />
  </svg>
)

const YouTubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
)

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.38 1.25 4.81L2 22l5.3-1.38c1.37.71 2.93 1.11 4.57 1.11h.13c5.46 0 9.91-4.45 9.91-9.91s-4.45-9.91-9.91-9.91zm5.2 12.06c-.27.48-.99.9-1.36 1.04-.37.14-.85.14-1.28-.05-.42-.2-1.02-.37-1.93-1.18-1.39-1.23-2.3-2.75-2.6-3.25s-.3-.75-.3-1.4c0-.65.3-1 .44-1.14.14-.14.3-.37.44-.37.14 0 .28 0 .4-.02.12-.02.28-.3.42-.02.14.28.48.97.52 1.04.04.07.07.12.02.2-.05.08-.1.14-.2.22-.1.08-.2.18-.3.28-.08.1-.18.2-.08.34.1.14.44.75 1.02 1.28.78.72 1.4.95 1.6.97.2.02.34.02.46-.07.12-.08.5- .58.62-.78.12-.18.24-.18.4-.1.16.02.96.46 1.12.54.16.08.28.12.3.18.04.07.02.4-.04.88z" />
  </svg>
)