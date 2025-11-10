export default function AboutSection() {
  return (
    <section className="py-20 bg-white as_section">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Part */}
        <div className="text-center mb-16">
          <h1 className="mb-6">About My Uttam Vastu</h1>
          <div className="as_separator"></div>
          <p className="max-w-3xl mx-auto text-lg leading-relaxed">
            Uttam Vastu is your gateway to understanding the profound wisdom of Vedic Astrology. Our mission is to provide
            you with meaningful insights into your horoscope, planetary placements, and life's journey. Through daily,
            weekly, and monthly forecasts, we help you align with the cosmos and uncover your true potential. Whether
            you're seeking answers, clarity, or spiritual guidance, AstroRDJ is here to empower you with ancient
            knowledge adapted for modern living.
          </p>
        </div>

        {/* Bottom Part - Two Column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <div className="flex justify-center">
            <img
              src="/astrologer-professional-portrait.jpg"
              alt="Uttam vastu"
              className="w-80 h-80 rounded-2xl shadow-lg object-cover"
            />
          </div>

          {/* Right - Content */}
          <div>
            <h2 className="mb-6">What Do We Do?</h2>
            <div className="as_separator"></div>

            <p className="mb-6">
              We specialize in personalized Vedic Astrology consultations designed to illuminate your life's path. By
              analyzing your unique birth chart, we uncover hidden opportunities, strengths, and challenges, helping you
              navigate your journey with clarity and confidence.
            </p>

            <p className="mb-8">
              From addressing questions about health, relationships, career, and finances to providing effective
              remedies and muhurats, we ensure our guidance is practical, actionable, and life-transforming. With
              decades of expertise, we aim to help you live a life that's balanced, purposeful, and spiritually
              enriched.
            </p>

            {/* Experience Box */}
            <div className="bg-gradient-to-r from-[#f46f21] to-[#d45a1a] text-white p-6 rounded-lg mb-8 inline-block">
              <div className="flex items-center gap-4">
                <div className="text-4xl font-bold">18+</div>
                <div className="text-sm font-bold">Years of Experience</div>
              </div>
            </div>

            <button className="as_btn">Read More</button>
          </div>
        </div>
      </div>
    </section>
  )
}
