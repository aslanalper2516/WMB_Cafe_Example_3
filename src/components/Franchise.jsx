import { useLanguage } from '../context/LanguageContext'
import { useScrollReveal } from '../hooks/useScrollReveal'

function Franchise() {
  const { t } = useLanguage()
  const contentRef = useScrollReveal({ threshold: 0.2 })

  return (
    <section id="franchise" className="grid md:grid-cols-2 bg-white">
      {/* Left: Image - Professional baker working with dough */}
      <div className="relative h-[500px] md:h-[600px] overflow-hidden" style={{ aspectRatio: '4/5' }}>
        <img 
          src="https://images.unsplash.com/photo-1587241321921-91a834d6d191?auto=format&fit=crop&w=1200&q=85" 
          alt="Bakery professional kneading dough in a kitchen" 
          className="w-full h-full object-cover img-bakery" 
          loading="lazy"
          width={1200}
          height={1500}
          decoding="async"
          sizes="(max-width: 768px) 100vw, 50vw"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=1200&q=85'
          }}
        />
        {/* Subtle overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
      </div>

      {/* Right: Content */}
      <div ref={contentRef} className="p-12 md:p-20 flex flex-col justify-center bg-[#fdfcf8] relative scroll-reveal">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#9B111E] to-[#D4AF37] md:hidden"></div>
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#9B111E] to-[#D4AF37] hidden md:block"></div>
        
        <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl lg:text-5xl leading-tight mb-8">
          {t('franchise.title')} <br />
          <span className="text-[#9B111E]">{t('franchise.titleBold')}</span> {t('franchise.titleEnd')}
        </h2>
        <p className="text-[#4a4a4a] text-lg mb-12 font-light leading-relaxed">
          {t('franchise.description')}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
          <div className="flex gap-4">
            <div className="text-[#9B111E] mt-1 flex-shrink-0">
              <span className="iconify" data-icon="lucide:map-pin" data-width="24"></span>
            </div>
            <div>
              <h4 className="font-semibold text-base mb-2">{t('franchise.support1Title')}</h4>
              <p className="text-sm text-[#666] leading-relaxed">{t('franchise.support1Desc')}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-[#9B111E] mt-1 flex-shrink-0">
              <span className="iconify" data-icon="lucide:chef-hat" data-width="24"></span>
            </div>
            <div>
              <h4 className="font-semibold text-base mb-2">{t('franchise.support2Title')}</h4>
              <p className="text-sm text-[#666] leading-relaxed">{t('franchise.support2Desc')}</p>
            </div>
          </div>
        </div>

        <a 
          href="#franchise-application" 
          onClick={(e) => {
            e.preventDefault()
            const target = document.getElementById('franchise-application')
            if (target) {
              target.scrollIntoView({ behavior: 'smooth', block: 'start' })
              setTimeout(() => target.focus(), 500)
            }
          }}
          className="inline-block text-center bg-[#9B111E] text-white btn-premium hover:bg-[#7a0d17] focus-visible:outline-white/50 w-full sm:w-auto"
          aria-label={t('franchise.cta')}
        >
          {t('franchise.cta')}
        </a>
      </div>
    </section>
  )
}

export default Franchise
