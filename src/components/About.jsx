import { useLanguage } from '../context/LanguageContext'

function About() {
  const { t } = useLanguage()

  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Image Side */}
          <div className="relative order-2 md:order-1">
            <div className="aspect-[4/5] bg-[#e8e4dc] rounded-sm overflow-hidden relative shadow-2xl">
              <img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2000&auto=format&fit=crop" alt="Traditional Pastry" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 text-xs font-semibold tracking-wider uppercase text-[#9B111E]">
                {t('about.originalRecipe')}
              </div>
            </div>
            {/* Decorative Element */}
            <div className="absolute -top-12 -left-12 opacity-10 text-[#9B111E] pointer-events-none">
              <span className="iconify" data-icon="lucide:wheat" data-width="200"></span>
            </div>
          </div>

          {/* Text Side */}
          <div className="order-1 md:order-2">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-[1px] bg-[#9B111E]"></span>
              <span className="text-[#9B111E] text-xs font-bold uppercase tracking-widest">{t('about.label')}</span>
            </div>
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl text-[#1a1a1a] mb-8 leading-tight">
              {t('about.title')}<br />
              <span className="text-[#888] text-3xl italic">{t('about.subtitle')}</span>
            </h2>
            <p className="text-[#4a4a4a] text-lg leading-relaxed mb-8 font-light">
              {t('about.paragraph1')}
            </p>
            <p className="text-[#4a4a4a] leading-relaxed mb-10 font-light">
              {t('about.paragraph2')}
            </p>
            <a href="#" className="inline-flex items-center gap-2 text-[#9B111E] font-medium border-b border-[#9B111E]/30 pb-1 hover:border-[#9B111E] transition-all">
              <span>{t('about.readMore')}</span>
              <span className="iconify" data-icon="lucide:arrow-right" data-width="16"></span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About


