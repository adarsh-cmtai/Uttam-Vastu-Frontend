import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-[#1a2238] text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Logo & Social */}
          <div>
            <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "Philosopher, serif" }}>
              Utam Vastu
            </h3>
            <p className="text-sm mb-4">help@astrordjj.com</p>
            <div className="flex gap-4">
              <a href="#" className="text-xl hover:text-[#f46f21]">
                <i className="fa fa-facebook"></i>
              </a>
              <a href="#" className="text-xl hover:text-[#f46f21]">
                <i className="fa fa-instagram"></i>
              </a>
              <a href="#" className="text-xl hover:text-[#f46f21]">
                <i className="fa fa-youtube"></i>
              </a>
              <a href="https://wa.me/1234567890" className="text-xl hover:text-[#f46f21]">
                <i className="fa fa-whatsapp"></i>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-[#f46f21]">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#f46f21]">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#f46f21]">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#f46f21]">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#f46f21]">
                  Privacy & Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Horoscope */}
          <div>
            <h4 className="text-lg font-bold mb-4">Horoscope Forecasts</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-[#f46f21]">
                  My Daily Horoscope
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#f46f21]">
                  My Weekly Horoscope
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#f46f21]">
                  My Monthly Horoscope
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#f46f21]">
                  My Yearly Horoscope
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: YouTube */}
          <div className="flex items-center justify-center md:justify-start">
            <a href="#" className="text-6xl text-[#f46f21] hover:opacity-80">
              <i className="fa fa-youtube"></i>
            </a>
          </div>
        </div>

        <div className="border-t border-gray-600 pt-8 text-center">
          <p className="text-sm">Copyright © 2025 CMT AI. All Right Reserved.</p>
        </div>
      </div>
    </footer>
  )
}
