import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

function MobileNav({ isOpen, onClose }) {
  const { t, changeLanguage, language } = useLanguage()
  const location = useLocation()
  const navRef = useRef(null)
  const firstFocusableRef = useRef(null)
  const lastFocusableRef = useRef(null)
  const isHomePage = location.pathname === '/'

  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    const handleFocusTrap = (e) => {
      if (e.key !== 'Tab') return

      const focusableElements = navRef.current.querySelectorAll(
        'a, button, [tabindex]:not([tabindex="-1"])'
      )
      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault()
        lastElement.focus()
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.addEventListener('keydown', handleFocusTrap)

    // Focus first element
    setTimeout(() => {
      const firstElement = navRef.current.querySelector('a, button')
      if (firstElement) firstElement.focus()
    }, 100)

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('keydown', handleFocusTrap)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleLinkClick = () => {
    onClose()
  }

  const toggleLanguage = () => {
    changeLanguage(language === 'tr' ? 'en' : 'tr')
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Mobile Nav */}
      <nav
        ref={navRef}
        className="fixed top-20 left-0 right-0 bg-white z-50 md:hidden shadow-xl border-b border-[#e6e1d6]"
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="px-6 py-8 space-y-6">
          <Link
            to="/"
            onClick={handleLinkClick}
            className="block text-[#4a4a4a] hover:text-[#9B111E] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E] rounded-sm py-2"
          >
            {t('header.home')}
          </Link>
          <Link
            to="/about"
            onClick={handleLinkClick}
            className="block text-[#4a4a4a] hover:text-[#9B111E] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E] rounded-sm py-2"
          >
            {t('header.about')}
          </Link>
          <Link
            to="/products"
            onClick={handleLinkClick}
            className="block text-[#4a4a4a] hover:text-[#9B111E] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E] rounded-sm py-2"
          >
            {t('header.products')}
          </Link>
          <Link
            to="/menu"
            onClick={handleLinkClick}
            className="block text-[#4a4a4a] hover:text-[#9B111E] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E] rounded-sm py-2"
          >
            {t('header.menu')}
          </Link>
          <Link
            to="/franchise"
            onClick={handleLinkClick}
            className="block text-[#4a4a4a] hover:text-[#9B111E] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E] rounded-sm py-2"
          >
            {t('header.franchise')}
          </Link>
          <Link
            to="/locations"
            onClick={handleLinkClick}
            className="block text-[#4a4a4a] hover:text-[#9B111E] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E] rounded-sm py-2"
          >
            {t('header.locations')}
          </Link>

          <div className="pt-4 border-t border-[#e6e1d6] space-y-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-[#4a4a4a] hover:text-[#9B111E] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E] rounded-sm py-2"
              aria-label={`Change language to ${language === 'tr' ? 'English' : 'Türkçe'}`}
            >
              <span className="iconify" data-icon="lucide:globe" data-width="18"></span>
              <span>{t('header.language')}</span>
            </button>
            <Link
              to="/franchise#application"
              onClick={handleLinkClick}
              className="block w-full bg-[#9B111E] text-white px-5 py-3 rounded-sm text-sm font-medium uppercase tracking-wider hover:bg-[#7a0d17] transition-all text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50"
              aria-label={t('header.application')}
            >
              {t('header.application')}
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}

export default MobileNav

