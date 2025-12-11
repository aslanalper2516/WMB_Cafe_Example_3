import { useLanguage } from '../context/LanguageContext'

function WhyChooseUs() {
  const { t } = useLanguage()

  const principles = [
    {
      icon: "lucide:medal",
      key: "taste"
    },
    {
      icon: "lucide:leaf",
      key: "ingredients"
    },
    {
      icon: "lucide:users",
      key: "community"
    }
  ]

  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <span className="text-[#9B111E] text-xs font-bold uppercase tracking-widest block mb-3">{t('whyChooseUs.label')}</span>
        <h2 className="font-['Playfair_Display'] text-4xl text-[#1a1a1a]">{t('whyChooseUs.title')}</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {principles.map((principle, index) => (
          <div key={index} className="p-8 bg-white border border-[#e6e1d6] rounded-sm hover:shadow-lg transition-all duration-300 group text-center">
            <div className="w-12 h-12 mx-auto bg-[#faf7f2] rounded-full flex items-center justify-center text-[#9B111E] mb-6 group-hover:scale-110 transition-transform">
              <span className="iconify" data-icon={principle.icon} data-width="24"></span>
            </div>
            <h3 className="font-['Playfair_Display'] text-xl mb-3 text-[#1a1a1a]">{t(`whyChooseUs.principles.${principle.key}.title`)}</h3>
            <p className="text-[#666] text-sm leading-relaxed">{t(`whyChooseUs.principles.${principle.key}.description`)}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default WhyChooseUs


