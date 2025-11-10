export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/1234567890"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white rounded-full w-14 h-14 flex items-center justify-center text-2xl hover:bg-green-600 transition shadow-lg z-40"
      aria-label="Chat on WhatsApp"
    >
      <i className="fa fa-whatsapp"></i>
    </a>
  )
}
