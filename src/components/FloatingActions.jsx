import { useState, useEffect } from 'react'

function FloatingActions() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility, { passive: true })
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ 
      top: 0, 
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' 
    })
  }

  return (
    <>
      {/* WhatsApp */}
      <a 
        href="#" 
        className={`fixed bottom-6 left-6 z-40 w-14 h-14 bg-[#25D366] text-white rounded-full shadow-premium-lg flex items-center justify-center hover:scale-110 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        aria-label="Contact us on WhatsApp"
      >
        <span className="iconify" data-icon="lucide:message-circle" data-width="28"></span>
      </a>

      {/* Scroll to Top */}
      <button 
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-40 w-12 h-12 bg-white border border-[#dcd6ca] text-[#1a1a1a] rounded-full shadow-premium-lg flex items-center justify-center hover:-translate-y-1 hover:text-[#9B111E] transition-all duration-300 group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        aria-label="Scroll to top"
      >
        <span className="iconify group-hover:text-[#9B111E] transition-colors" data-icon="lucide:arrow-up" data-width="24"></span>
      </button>
    </>
  )
}

export default FloatingActions
