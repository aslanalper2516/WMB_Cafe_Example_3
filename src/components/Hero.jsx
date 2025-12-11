import { useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'

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

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          ref={heroImageRef}
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2574&auto=format&fit=crop" 
          alt="WMB Fırın Store Front" 
          className="w-full h-full object-cover img-bakery" 
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/40 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/30"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
        <span className="inline-block py-1.5 px-4 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-xs uppercase tracking-widest mb-8 font-medium animate-fade-in">
          {t('hero.established')}
        </span>
        <h1 className="font-['Playfair_Display'] text-6xl md:text-7xl lg:text-9xl leading-[1.05] tracking-tight font-semibold mb-8 animate-fade-in-up">
          {t('hero.title')}<br />
          <span className="italic font-normal text-white/95">{t('hero.subtitle')}</span>
        </h1>
        <p className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto mb-12 font-light leading-relaxed animate-fade-in-up-delay-1">
          {t('hero.description')}
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 animate-fade-in-up-delay-2">
          <a 
            href="#franchise" 
            className="w-full md:w-auto bg-[#9B111E] text-white btn-premium hover:bg-[#7a0d17] focus-visible:outline-white/50"
            aria-label={t('hero.cta')}
          >
            {t('hero.cta')}
          </a>
          <button 
            className="group flex items-center gap-3 text-white hover:text-white/90 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 rounded"
            aria-label={t('hero.watchStory')}
          >
            <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white/10 transition-all group-hover:scale-110">
              <span className="iconify" data-icon="lucide:play" data-width="20"></span>
            </div>
            <span className="text-sm font-medium tracking-wide">{t('hero.watchStory')}</span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero


