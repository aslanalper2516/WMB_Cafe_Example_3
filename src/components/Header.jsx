import { useLanguage } from '../context/LanguageContext'

function Header() {
  const { language, changeLanguage, t } = useLanguage()

  const toggleLanguage = () => {
    changeLanguage(language === 'tr' ? 'en' : 'tr')
  }

  return (
    <header className="fixed top-0 w-full z-50 bg-[#faf7f2]/90 backdrop-blur-md border-b border-[#dcd6ca]/50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="font-['Playfair_Display'] font-semibold text-xl tracking-tight leading-none text-[#1a1a1a]">
            WMB<br />
            <span className="text-[#9B111E]">Fırın</span>
          </div>
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-[#4a4a4a]">
          <a href="#" className="hover:text-[#9B111E] transition-colors">{t('header.home')}</a>
          <a href="#about" className="hover:text-[#9B111E] transition-colors">{t('header.about')}</a>
          <a href="#" className="hover:text-[#9B111E] transition-colors">{t('header.wholesale')}</a>
          <a href="#franchise" className="hover:text-[#9B111E] transition-colors">{t('header.franchise')}</a>
          <a href="#" className="hover:text-[#9B111E] transition-colors">{t('header.locations')}</a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleLanguage}
            className="hidden md:flex items-center gap-1 text-sm text-[#4a4a4a] hover:text-[#9B111E] transition-colors"
          >
            <span className="iconify" data-icon="lucide:globe" data-width="18"></span>
            <span>{t('header.language')}</span>
          </button>
          <a href="#franchise" className="bg-[#9B111E] text-white px-5 py-2.5 rounded text-xs font-medium uppercase tracking-wider hover:bg-[#7a0d17] hover:shadow-lg transition-all duration-300 shadow-sm flex items-center gap-2">
            <span>{t('header.application')}</span>
            <span className="iconify" data-icon="lucide:arrow-right" data-width="16"></span>
          </a>
          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-[#1a1a1a]">
            <span className="iconify" data-icon="lucide:menu" data-width="24"></span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header


