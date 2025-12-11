import { useLanguage } from '../context/LanguageContext'

function SignatureProduct() {
  const { t } = useLanguage()

  return (
    <section className="relative h-[70vh] w-full overflow-hidden group">
      <div className="absolute inset-0">
        <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4734259a-bad7-422f-981e-ce01e79184f2_1600w.jpg" alt="Signature" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <span className="text-[#D4AF37] tracking-[0.2em] text-xs font-semibold uppercase mb-4">{t('signature.label')}</span>
        <h2 className="font-['Playfair_Display'] text-4xl md:text-6xl text-white mb-2 tracking-tight">{t('signature.title')}</h2>
        <div className="w-16 h-[2px] bg-[#9B111E] mt-6"></div>
      </div>

      {/* Navigation Chevrons */}
      <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-2">
        <span className="iconify" data-icon="lucide:chevron-left" data-width="48"></span>
      </button>
      <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-2">
        <span className="iconify" data-icon="lucide:chevron-right" data-width="48"></span>
      </button>
    </section>
  )
}

export default SignatureProduct


