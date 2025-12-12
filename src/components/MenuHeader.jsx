import { useState, useEffect } from 'react'

function MenuHeader({ language, onLanguageChange, subtitle }) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 bg-white border-b border-[#e6e1d6] transition-all duration-300 ${
        isScrolled ? 'shadow-sm' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="font-['Playfair_Display'] font-semibold text-xl md:text-2xl tracking-tight leading-none text-[#1a1a1a]">
              WMB<br />
              <span className="text-[#9B111E]">Fırın</span>
            </div>
            {subtitle && (
              <p className="text-xs text-[#666] mt-1 font-light">{subtitle}</p>
            )}
          </div>
          
          <button
            onClick={onLanguageChange}
            className="flex items-center gap-1.5 text-sm text-[#4a4a4a] hover:text-[#9B111E] transition-colors px-3 py-1.5 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E]"
            aria-label={`Change language to ${language === 'tr' ? 'English' : 'Türkçe'}`}
          >
            <span className="iconify" data-icon="lucide:globe" data-width="18"></span>
            <span className="font-medium">{language === 'tr' ? 'EN' : 'TR'}</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default MenuHeader

