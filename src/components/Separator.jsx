import { useLanguage } from '../context/LanguageContext'
import { useScrollReveal } from '../hooks/useScrollReveal'

function Separator() {
  const { t } = useLanguage()
  const sectionRef = useScrollReveal({ threshold: 0.3 })

  return (
    <section 
      ref={sectionRef}
      className="py-32 md:py-40 relative flex items-center justify-center overflow-hidden bg-cover bg-center scroll-reveal" 
      style={{backgroundImage: "url('https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=2400&q=80')"}}
      role="img"
      aria-label="WMB Fırın traditional baking heritage"
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10 text-center px-4">
        <h2 className="font-['Playfair_Display'] text-3xl md:text-5xl lg:text-6xl text-white tracking-widest flex flex-wrap justify-center gap-4 md:gap-8 items-center opacity-95">
          <span>{t('separator.text1')}</span>
          <span className="text-[#D4AF37] text-2xl md:text-3xl font-light transform rotate-12">/</span>
          <span>{t('separator.text2')}</span>
          <span className="text-[#D4AF37] text-2xl md:text-3xl font-light transform rotate-12">/</span>
          <span>{t('separator.text3')}</span>
          <span className="text-[#D4AF37] text-2xl md:text-3xl font-light transform rotate-12">/</span>
          <span>{t('separator.text4')}</span>
        </h2>
      </div>
    </section>
  )
}

export default Separator


