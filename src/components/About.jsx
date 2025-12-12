import { useLanguage } from '../context/LanguageContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import Timeline from './Timeline'

function About() {
  const { t } = useLanguage()
  const imageRef = useScrollReveal({ threshold: 0.2 })
  const textRef = useScrollReveal({ threshold: 0.2 })

  return (
    <section id="about" className="py-32 md:py-40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20 md:gap-32 items-center mb-20">
          {/* Image Side */}
          <div ref={imageRef} className="relative order-2 md:order-1 scroll-reveal">
            <div className="aspect-[4/5] bg-[#e8e4dc] rounded-sm overflow-hidden relative shadow-premium-lg">
              <img 
                src="https://images.unsplash.com/photo-1583338917451-face2751d8d5?auto=format&fit=crop&w=1200&q=85" 
                alt="Baker kneading dough on a floured wooden table" 
                className="w-full h-full img-bakery hover:scale-105 transition-transform duration-700 object-cover" 
                loading="lazy"
                width={1200}
                height={1500}
                decoding="async"
                sizes="(max-width: 768px) 100vw, 50vw"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1534432182912-63863115e106?auto=format&fit=crop&w=1200&q=85'
                }}
              />
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-[#9B111E] rounded-sm shadow-premium">
                {t('about.originalRecipe')}
              </div>
            </div>
          </div>

          {/* Text Side */}
          <div ref={textRef} className="order-1 md:order-2 scroll-reveal">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-12 h-[2px] bg-[#9B111E]"></span>
              <span className="text-[#9B111E] text-xs font-bold uppercase tracking-widest">{t('about.label')}</span>
            </div>
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl text-[#1a1a1a] mb-8 leading-tight">
              {t('about.title')}<br />
              <span className="text-[#888] text-3xl md:text-4xl italic font-normal">{t('about.subtitle')}</span>
            </h2>
            <p className="text-[#4a4a4a] text-lg md:text-xl leading-relaxed mb-8 font-light">
              {t('about.leadParagraph')}
            </p>
            
            {/* Bullet Points */}
            <ul className="space-y-4 mb-12">
              <li className="flex items-start gap-3">
                <span className="text-[#9B111E] mt-1 flex-shrink-0">
                  <span className="iconify" data-icon="lucide:check-circle" data-width="20"></span>
                </span>
                <span className="text-[#4a4a4a] text-base md:text-lg leading-relaxed">{t('about.bullet1')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#9B111E] mt-1 flex-shrink-0">
                  <span className="iconify" data-icon="lucide:check-circle" data-width="20"></span>
                </span>
                <span className="text-[#4a4a4a] text-base md:text-lg leading-relaxed">{t('about.bullet2')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#9B111E] mt-1 flex-shrink-0">
                  <span className="iconify" data-icon="lucide:check-circle" data-width="20"></span>
                </span>
                <span className="text-[#4a4a4a] text-base md:text-lg leading-relaxed">{t('about.bullet3')}</span>
              </li>
            </ul>

            <a 
              href="#" 
              className="inline-flex items-center gap-2 text-[#9B111E] font-medium border-b-2 border-[#9B111E]/30 pb-1.5 hover:border-[#9B111E] transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E] rounded-sm"
              aria-label={t('about.readMore')}
            >
              <span>{t('about.readMore')}</span>
              <span className="iconify" data-icon="lucide:arrow-right" data-width="16"></span>
            </a>
          </div>
        </div>

        {/* Timeline */}
        <Timeline />
      </div>
    </section>
  )
}

export default About


