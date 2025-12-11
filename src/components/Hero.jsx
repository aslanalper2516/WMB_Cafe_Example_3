import { useLanguage } from '../context/LanguageContext'

function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2574&auto=format&fit=crop" alt="Store Front" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/30"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
        <span className="inline-block py-1 px-3 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm text-xs uppercase tracking-widest mb-6 font-medium">{t('hero.established')}</span>
        <h1 className="font-['Playfair_Display'] text-5xl md:text-7xl lg:text-8xl leading-[1.1] tracking-tight font-medium mb-6">
          {t('hero.title')}<br />
          <span className="italic font-normal text-white/90">{t('hero.subtitle')}</span>
        </h1>
        <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
          {t('hero.description')}
        </p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <a href="#franchise" className="w-full md:w-auto bg-[#9B111E] text-white px-8 py-4 rounded text-sm font-medium uppercase tracking-widest hover:bg-[#7a0d17] hover:shadow-xl transition-all duration-300 shadow-lg ring-1 ring-white/20">
            {t('hero.cta')}
          </a>
          <button className="group flex items-center gap-3 text-white hover:text-white/80 transition-colors">
            <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white/10 transition-all">
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


