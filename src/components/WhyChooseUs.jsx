import { useLanguage } from '../context/LanguageContext'
import { useScrollReveal } from '../hooks/useScrollReveal'

function WhyChooseUs() {
  const { t } = useLanguage()

  const principles = [
    {
      icon: "lucide:map-pin",
      key: "siteSelection"
    },
    {
      icon: "lucide:graduation-cap",
      key: "training"
    },
    {
      icon: "lucide:package",
      key: "supply"
    },
    {
      icon: "lucide:megaphone",
      key: "marketing"
    }
  ]

  const titleRef = useScrollReveal({ threshold: 0.2 })
  const cardRef1 = useScrollReveal({ threshold: 0.2 })
  const cardRef2 = useScrollReveal({ threshold: 0.2 })
  const cardRef3 = useScrollReveal({ threshold: 0.2 })
  const cardRef4 = useScrollReveal({ threshold: 0.2 })
  const checklistRef = useScrollReveal({ threshold: 0.2 })
  const cardRefs = [cardRef1, cardRef2, cardRef3, cardRef4]

  // Get checklist items from translation
  const checklistItems = t('whyChooseUs.checklist.items', { returnObjects: true })

  return (
    <section className="py-32 md:py-40 max-w-7xl mx-auto px-6">
      <div ref={titleRef} className="text-center mb-20 scroll-reveal">
        <span className="text-[#9B111E] text-xs font-bold uppercase tracking-widest block mb-4">{t('whyChooseUs.label')}</span>
        <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl text-[#1a1a1a] mb-4">{t('whyChooseUs.title')}</h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-20">
        {principles.map((principle, index) => (
          <div 
            key={index} 
            ref={cardRefs[index]}
            className="p-6 md:p-8 bg-white border border-[#e6e1d6] rounded-sm card-hover group scroll-reveal"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="w-12 h-12 bg-[#faf7f2] rounded-full flex items-center justify-center text-[#9B111E] mb-4 group-hover:scale-110 transition-transform duration-300">
              <span className="iconify" data-icon={principle.icon} data-width="24"></span>
            </div>
            <h3 className="font-['Playfair_Display'] text-xl md:text-2xl mb-3 text-[#1a1a1a]">{t(`whyChooseUs.principles.${principle.key}.title`)}</h3>
            <p className="text-[#4a4a4a] text-sm md:text-base leading-relaxed mb-3">{t(`whyChooseUs.principles.${principle.key}.description`)}</p>
            <p className="text-[#666] text-xs md:text-sm leading-relaxed">{t(`whyChooseUs.principles.${principle.key}.detail`)}</p>
          </div>
        ))}
      </div>

      {/* Checklist */}
      <div ref={checklistRef} className="bg-[#faf7f2] border border-[#e6e1d6] rounded-sm p-8 md:p-12 scroll-reveal">
        <h3 className="font-['Playfair_Display'] text-2xl md:text-3xl text-[#1a1a1a] mb-8 text-center">{t('whyChooseUs.checklist.title')}</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
          {Array.isArray(checklistItems) && checklistItems.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <span className="text-[#9B111E] mt-0.5 flex-shrink-0">
                <span className="iconify" data-icon="lucide:check-circle" data-width="20"></span>
              </span>
              <span className="text-[#4a4a4a] text-sm md:text-base leading-relaxed">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUs
