export default function ServicesSection() {
  return (
    <section className="py-20 bg-white as_section">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Part */}
        <div className="text-center mb-12">
          <h1 className="mb-6">Our Services</h1>
          <div className="as_separator"></div>
          <p className="max-w-3xl mx-auto text-lg leading-relaxed">
            Expert Vedic astrology consultations offer personalized readings to guide individuals in areas like career,
            health, relationships, and finances. Our comprehensive services are designed to provide you with clear,
            actionable insights.
          </p>
        </div>

        {/* Bottom Part - Two Column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <div className="flex justify-center">
            <img src="/meditation-spiritual-astrology.jpg" alt="Our services" className="w-full max-w-md rounded-lg shadow-lg" />
          </div>

          {/* Right - Service Boxes */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Service Box 1 */}
              <div className="bg-gradient-to-br from-[#f46f21] to-[#d45a1a] text-white p-8 rounded-lg text-center hover:shadow-lg transition">
                <div className="text-4xl mb-4">
                  <i className="fa fa-phone"></i>
                </div>
                <h4 className="font-bold mb-4">Online Telephonic Services</h4>
                <button className="as_btn bg-white text-[#f46f21] hover:bg-gray-100">Explore More</button>
              </div>

              {/* Service Box 2 */}
              <div className="bg-gradient-to-br from-[#212121] to-[#424242] text-white p-8 rounded-lg text-center hover:shadow-lg transition">
                <div className="text-4xl mb-4">
                  <i className="fa fa-star"></i>
                </div>
                <h4 className="font-bold mb-4">Specific Services</h4>
                <button className="as_btn bg-white text-[#212121] hover:bg-gray-100">Explore More</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
