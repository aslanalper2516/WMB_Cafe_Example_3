import { useLanguage } from '../context/LanguageContext'

function Separator() {
  const { t } = useLanguage()

  return (
    <section 
      className="py-32 relative flex items-center justify-center overflow-hidden bg-fixed bg-cover bg-center" 
      style={{backgroundImage: "url('https://images.unsplash.com/photo-1577110058859-74547990b411?q=80&w=2675&auto=format&fit=crop')"}}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10 text-center">
        <h2 className="font-['Playfair_Display'] text-3xl md:text-5xl text-white tracking-widest flex flex-wrap justify-center gap-4 md:gap-8 items-center opacity-90">
          <span>{t('separator.text1')}</span>
          <span className="text-[#D4AF37] text-2xl font-light transform rotate-12">/</span>
          <span>{t('separator.text2')}</span>
          <span className="text-[#D4AF37] text-2xl font-light transform rotate-12">/</span>
          <span>{t('separator.text3')}</span>
          <span className="text-[#D4AF37] text-2xl font-light transform rotate-12">/</span>
          <span>{t('separator.text4')}</span>
        </h2>
      </div>
    </section>
  )
}

export default Separator


