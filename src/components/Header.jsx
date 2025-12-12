import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import MobileNav from './MobileNav'

function Header() {
  const { language, changeLanguage, t } = useLanguage()
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  
  const isHomePage = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!isHomePage) return
    
    const sections = ['hero', 'about', 'menu', 'franchise']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: '-100px 0px -50% 0px' }
    )

    sections.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [isHomePage])

  const toggleLanguage = () => {
    changeLanguage(language === 'tr' ? 'en' : 'tr')
  }

  const handleMobileNavToggle = () => {
    setIsMobileNavOpen(!isMobileNavOpen)
  }

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#dcd6ca]'
            : 'bg-[#faf7f2]/90 backdrop-blur-md border-b border-[#dcd6ca]/50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E] rounded-sm"
          >
            <div className="font-['Playfair_Display'] font-semibold text-xl tracking-tight leading-none text-[#1a1a1a]">
              WMB<br />
              <span className="text-[#9B111E]">Fırın</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav
            className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide"
            role="navigation"
            aria-label="Main navigation"
          >
            <Link
              to="/"
              className={`transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E] rounded-sm px-1 ${
                isHomePage && (activeSection === 'hero' || activeSection === '')
                  ? 'text-[#9B111E]'
                  : location.pathname === '/'
                  ? 'text-[#9B111E]'
                  : 'text-[#4a4a4a] hover:text-[#9B111E]'
              }`}
            >
              {t('header.home')}
            </Link>
            {isHomePage ? (
              <a
                href="#about"
                className={`transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E] rounded-sm px-1 ${
                  activeSection === 'about'
                    ? 'text-[#9B111E]'
                    : 'text-[#4a4a4a] hover:text-[#9B111E]'
                }`}
              >
                {t('header.about')}
              </a>
            ) : (
              <Link
                to="/about"
                className={`transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E] rounded-sm px-1 ${
                  location.pathname === '/about'
                    ? 'text-[#9B111E]'
                    : 'text-[#4a4a4a] hover:text-[#9B111E]'
                }`}
              >
                {t('header.about')}
              </Link>
            )}
            <Link
              to="/products"
              className={`transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E] rounded-sm px-1 ${
                location.pathname === '/products' || (isHomePage && activeSection === 'menu')
                  ? 'text-[#9B111E]'
                  : 'text-[#4a4a4a] hover:text-[#9B111E]'
              }`}
            >
              {t('header.products')}
            </Link>
            <Link
              to="/menu"
              className={`transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E] rounded-sm px-1 ${
                location.pathname === '/menu'
                  ? 'text-[#9B111E]'
                  : 'text-[#4a4a4a] hover:text-[#9B111E]'
              }`}
            >
              {t('header.menu')}
            </Link>
            {isHomePage ? (
              <a
                href="#franchise"
                className={`transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E] rounded-sm px-1 ${
                  activeSection === 'franchise'
                    ? 'text-[#9B111E]'
                    : 'text-[#4a4a4a] hover:text-[#9B111E]'
                }`}
              >
                {t('header.franchise')}
              </a>
            ) : (
              <Link
                to="/franchise"
                className={`transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E] rounded-sm px-1 ${
                  location.pathname === '/franchise'
                    ? 'text-[#9B111E]'
                    : 'text-[#4a4a4a] hover:text-[#9B111E]'
                }`}
              >
                {t('header.franchise')}
              </Link>
            )}
            <Link
              to="/locations"
              className={`transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E] rounded-sm px-1 ${
                location.pathname === '/locations'
                  ? 'text-[#9B111E]'
                  : 'text-[#4a4a4a] hover:text-[#9B111E]'
              }`}
            >
              {t('header.locations')}
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="hidden md:flex items-center gap-1 text-sm text-[#4a4a4a] hover:text-[#9B111E] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E] rounded-sm px-2 py-1"
              aria-label={`Change language to ${language === 'tr' ? 'English' : 'Türkçe'}`}
            >
              <span className="iconify" data-icon="lucide:globe" data-width="18"></span>
              <span>{t('header.language')}</span>
            </button>
            {isHomePage ? (
              <a
                href="#franchise"
                className="hidden sm:flex bg-[#9B111E] text-white px-5 py-2.5 rounded-sm text-xs font-medium uppercase tracking-wider hover:bg-[#7a0d17] hover:shadow-lg transition-all duration-300 shadow-sm items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50"
                aria-label={t('header.application')}
              >
                <span>{t('header.application')}</span>
                <span className="iconify" data-icon="lucide:arrow-right" data-width="16"></span>
              </a>
            ) : (
              <Link
                to="/franchise"
                className="hidden sm:flex bg-[#9B111E] text-white px-5 py-2.5 rounded-sm text-xs font-medium uppercase tracking-wider hover:bg-[#7a0d17] hover:shadow-lg transition-all duration-300 shadow-sm items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50"
                aria-label={t('header.application')}
              >
                <span>{t('header.application')}</span>
                <span className="iconify" data-icon="lucide:arrow-right" data-width="16"></span>
              </Link>
            )}
            {/* Mobile Menu Toggle */}
            <button
              onClick={handleMobileNavToggle}
              className="md:hidden text-[#1a1a1a] p-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E] rounded-sm"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileNavOpen}
            >
              <span
                className="iconify"
                data-icon={isMobileNavOpen ? 'lucide:x' : 'lucide:menu'}
                data-width="24"
              ></span>
            </button>
          </div>
        </div>
      </header>
      <MobileNav isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
    </>
  )
}

export default Header


