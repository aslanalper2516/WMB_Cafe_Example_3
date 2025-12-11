import { useLanguage } from '../context/LanguageContext'

function Franchise() {
  const { t } = useLanguage()

  return (
    <section id="franchise" className="grid md:grid-cols-2 bg-white">
      {/* Left: Image */}
      <div className="relative h-[500px] md:h-auto overflow-hidden">
        <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/c543a9e1-f226-4ced-80b0-feb8445a75b9_1600w.jpg" alt="Taking photo of food" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
      </div>

      {/* Right: Content */}
      <div className="p-12 md:p-20 flex flex-col justify-center bg-[#fdfcf8] relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#9B111E] to-[#D4AF37] md:hidden"></div>
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#9B111E] to-[#D4AF37] hidden md:block"></div>
        
        <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl leading-tight mb-6">
          {t('franchise.title')} <br />
          <span className="text-[#9B111E]">{t('franchise.titleBold')}</span> {t('franchise.titleEnd')}
        </h2>
        <p className="text-[#4a4a4a] mb-10 font-light">
          {t('franchise.description')}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <div className="flex gap-4">
            <div className="text-[#9B111E] mt-1">
              <span className="iconify" data-icon="lucide:map-pin" data-width="20"></span>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-1">{t('franchise.support1Title')}</h4>
              <p className="text-xs text-[#666]">{t('franchise.support1Desc')}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-[#9B111E] mt-1">
              <span className="iconify" data-icon="lucide:chef-hat" data-width="20"></span>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-1">{t('franchise.support2Title')}</h4>
              <p className="text-xs text-[#666]">{t('franchise.support2Desc')}</p>
            </div>
          </div>
        </div>

        <a href="#" className="inline-block text-center bg-[#9B111E] text-white px-8 py-4 rounded-sm text-sm font-medium uppercase tracking-widest hover:bg-[#7a0d17] shadow-lg hover:shadow-xl transition-all w-full sm:w-auto">
          {t('franchise.cta')}
        </a>
      </div>
    </section>
  )
}

export default Franchise


