function FloatingActions() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* WhatsApp */}
      <a href="#" className="fixed bottom-6 left-6 z-40 w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-300">
        <span className="iconify" data-icon="lucide:message-circle" data-width="28"></span>
      </a>

      {/* Scroll to Top */}
      <button 
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-40 w-12 h-12 bg-white border border-[#dcd6ca] text-[#1a1a1a] rounded-full shadow-lg flex items-center justify-center hover:-translate-y-1 transition-transform duration-300 group"
      >
        <span className="iconify group-hover:text-[#9B111E] transition-colors" data-icon="lucide:arrow-up" data-width="24"></span>
      </button>
    </>
  )
}

export default FloatingActions


