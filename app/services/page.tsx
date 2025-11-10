"use client"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FloatingWhatsApp from "@/components/floating-whatsapp"
import Link from "next/link"

const packages = [
  {
    duration: "5-minute",
    price: 1100,
    description: "Quick consultation",
  },
  {
    duration: "11-minute",
    price: 2100,
    description: "Standard consultation",
  },
  {
    duration: "30-minute",
    price: 5100,
    description: "Extended consultation",
  },
  {
    duration: "60-minute",
    price: 9100,
    description: "Full consultation",
  },
  {
    duration: "60-minute",
    price: 15000,
    isFeatured: true,
    badge: "Most Popular",
    description: "Consultation + Video Horoscope",
    features: ["One-on-one detailed Kundli analysis", "Video Kundli (recorded personalized explanation)"],
  },
  {
    duration: "60-minute",
    price: 21000,
    isPremium: true,
    badge: "Premium",
    description: "Vedic, KP & Numerology + Video Horoscope",
    features: [
      "Complete Vedic, KP, and Numerology-based Kundli analysis",
      "One-on-one consultation",
      "Video Kundli (recorded personalized explanation)",
    ],
  },
  {
    duration: "60-minute",
    price: 51000,
    isUltimate: true,
    badge: "Ultimate",
    description: "Full Package with Vastu Consultation",
    features: [
      "Complete Kundli analysis (Vedic, KP & Numerology)",
      "Personalized Online Vastu Consultation",
      "Video Kundli (recorded personalized explanation)",
    ],
  },
]

const services = [
  "Marriage Analysis",
  "Husband-Wife Relationship",
  "Love Relationship Problem",
  "Overseas & Travel",
  "Family Problem",
  "Children Problem",
  "Career & Job",
  "Financial Problem",
  "Unemployment",
  "Health",
  "Enemy Problem",
  "Legal Problem",
]

export default function Services() {
  return (
    <div>
      <Header />

      <div className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="mb-4">Our Services</h1>
          <div className="flex justify-center gap-2 text-sm">
            <Link href="/" className="hover:text-[#f46f21] transition">
              Home
            </Link>
            <span className="text-gray-500">/</span>
            <span className="text-gray-700">Our Services</span>
          </div>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-2xl font-bold text-[#f46f21] mb-6 italic">
            {
              "Our expert astrology services offer you tailored insights that align with your unique cosmic blueprint, empowering you to make informed decisions and live with purpose."
            }
          </p>
          <p className="text-lg leading-relaxed text-gray-700">
            Expert Vedic astrology consultations offer personalized readings to guide individuals in areas like career,
            health, relationships, and finances. Unlock a brighter future through trusted guidance and expertise.
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center mb-4">Consultation Packages</h2>
          <div className="as_separator mb-12" style={{ margin: "0 auto", width: "100px" }}></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg, idx) => (
              <div
                key={idx}
                className={`rounded-lg shadow-lg overflow-hidden transition transform hover:scale-105 ${
                  pkg.isFeatured || pkg.isPremium || pkg.isUltimate ? "ring-2 ring-[#f46f21]" : ""
                } ${
                  pkg.isFeatured || pkg.isPremium || pkg.isUltimate
                    ? "bg-gradient-to-br from-[#f46f21] to-[#d45a1a] text-white"
                    : "bg-white"
                }`}
              >
                {pkg.badge && (
                  <div className="bg-[#f46f21] text-white text-center py-2 text-sm font-bold">{pkg.badge}</div>
                )}

                <div className="p-8">
                  <div className="text-3xl font-bold mb-2">₹{pkg.price.toLocaleString()}</div>
                  <div
                    className={`text-sm mb-4 ${pkg.isFeatured || pkg.isPremium || pkg.isUltimate ? "text-orange-100" : "text-gray-600"}`}
                  >
                    {pkg.duration} consultation
                  </div>
                  <p
                    className={`mb-6 font-semibold ${pkg.isFeatured || pkg.isPremium || pkg.isUltimate ? "" : "text-gray-700"}`}
                  >
                    {pkg.description}
                  </p>

                  {pkg.features && (
                    <ul className="space-y-2 mb-8">
                      {pkg.features.map((feature, i) => (
                        <li
                          key={i}
                          className={`text-sm flex items-start gap-2 ${pkg.isFeatured || pkg.isPremium || pkg.isUltimate ? "text-orange-100" : ""}`}
                        >
                          <span
                            className={
                              pkg.isFeatured || pkg.isPremium || pkg.isUltimate ? "text-orange-200" : "text-[#f46f21]"
                            }
                          >
                            •
                          </span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <button
                    className={`as_btn w-full ${pkg.isFeatured || pkg.isPremium || pkg.isUltimate ? "bg-white text-[#f46f21] hover:bg-gray-100" : "bg-[#f46f21] text-white hover:bg-[#d45a1a]"}`}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-center mb-4">Specific Services</h2>
          <div className="as_separator mb-12" style={{ margin: "0 auto", width: "100px" }}></div>

          <p className="text-center text-lg leading-relaxed text-gray-700 mb-12 max-w-3xl mx-auto">
            We offer expert astrology services to help you navigate life's challenges with clarity and confidence.
            Unlock a brighter future today!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <div
                key={idx}
                className="bg-white border-2 border-[#f46f21] rounded-lg p-6 text-center hover:bg-[#f46f21] hover:text-white transition cursor-pointer duration-300"
              >
                <p className="font-bold text-lg">{service}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}
