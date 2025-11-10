const zodiacSigns = [
  { name: "Aries", dates: "Mar 21 - Apr 19", symbol: "♈" },
  { name: "Taurus", dates: "Apr 20 - May 20", symbol: "♉" },
  { name: "Gemini", dates: "May 21 - Jun 20", symbol: "♊" },
  { name: "Cancer", dates: "Jun 21 - Jul 22", symbol: "♋" },
  { name: "Leo", dates: "Jul 23 - Aug 22", symbol: "♌" },
  { name: "Virgo", dates: "Aug 23 - Sep 22", symbol: "♍" },
  { name: "Libra", dates: "Sep 23 - Oct 22", symbol: "♎" },
  { name: "Scorpio", dates: "Oct 23 - Nov 21", symbol: "♏" },
  { name: "Sagittarius", dates: "Nov 22 - Dec 21", symbol: "♐" },
  { name: "Capricorn", dates: "Dec 22 - Jan 19", symbol: "♑" },
  { name: "Aquarius", dates: "Jan 20 - Feb 18", symbol: "♒" },
  { name: "Pisces", dates: "Feb 19 - Mar 20", symbol: "♓" },
]

export default function HoroscopeSection() {
  return (
    <section className="py-20 bg-gray-50 as_section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="mb-6">Horoscope Forecasts</h1>
          <div className="as_separator"></div>
          <p className="max-w-3xl mx-auto text-lg leading-relaxed">
            This week is a time for reflection and personal growth. Focus on nurturing your relationships, both at work
            and at home, and take some time for self-care to recharge your energy. The planetary alignments favor
            introspection and spiritual practices this week.
          </p>
        </div>

        {/* Zodiac Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {zodiacSigns.map((sign) => (
            <div key={sign.name} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition text-center">
              <div className="text-4xl mb-3">{sign.symbol}</div>
              <h4 className="font-bold mb-2">{sign.name}</h4>
              <p className="text-xs text-gray-600">{sign.dates}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
