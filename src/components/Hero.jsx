import { useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import ProofStrip from './ProofStrip'

function Hero() {
  const { t } = useLanguage()
  const heroImageRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!heroImageRef.current) return
      const scrolled = window.pageYOffset
      const parallaxSpeed = 0.5
      heroImageRef.current.style.transform = `translateY(${scrolled * parallaxSpeed}px)`
    }

    // Only add parallax if user doesn't prefer reduced motion
    if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleCTAClick = () => {
    // Analytics hook
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({ event: 'hero_cta_click' })
    }
    
    // Smooth scroll to franchise section
    const franchiseSection = document.getElementById('franchise')
    if (franchiseSection) {
      franchiseSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setTimeout(() => {
        franchiseSection.focus()
      }, 500)
    }
  }

  const handleSecondaryCTAClick = (e) => {
    e.preventDefault()
    // Analytics hook
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({ event: 'franchise_deck_download_click' })
    }
    // TODO: Implement PDF download link
    console.log('Download franchise deck')
  }

  return (
    <section id="hero" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          ref={heroImageRef}
          src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=2070&q=80" 
          alt="Warm Istanbul cafe interior with tables and chairs" 
          className="w-full h-full object-cover img-bakery" 
          loading="eager"
          width="2070"
          height="1380"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1493857671505-72967e2e2760?auto=format&fit=crop&w=2070&q=80'
          }}
        />
        <div className="absolute inset-0 bg-black/50 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/40 to-black/50"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white pt-20">
        <span className="inline-block py-2 px-6 rounded-full border-2 border-white/40 bg-black/40 backdrop-blur-md text-sm text-white font-semibold uppercase tracking-widest mb-8 shadow-lg animate-fade-in">
          {t('hero.established')}
        </span>
        <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-7xl leading-[1.1] tracking-tight font-semibold mb-6 animate-fade-in-up">
          {t('hero.title')}
        </h1>
        <p className="text-base md:text-lg lg:text-xl text-white/90 max-w-3xl mx-auto mb-10 font-light leading-relaxed animate-fade-in-up-delay-1">
          {t('hero.subtitle')}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 animate-fade-in-up-delay-2">
          <button
            onClick={handleCTAClick}
            className="w-full sm:w-auto bg-[#9B111E] text-white px-8 py-4 rounded text-sm font-medium uppercase tracking-widest shadow-lg transition-all duration-300 ring-1 ring-white/20 hover:bg-[#7a0d17] hover:shadow-xl hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50"
            aria-label={t('hero.cta')}
          >
            {t('hero.cta')}
          </button>
          <a
            href="#"
            onClick={handleSecondaryCTAClick}
            className="w-full sm:w-auto bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded text-sm font-medium uppercase tracking-widest border border-white/30 hover:bg-white/20 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50"
            aria-label={t('hero.ctaSecondary')}
          >
            {t('hero.ctaSecondary')}
          </a>
        </div>

        <ProofStrip />
      </div>
    </section>
  )
}

export default Hero


