import { useLanguage } from '../context/LanguageContext'
import { useScrollReveal } from '../hooks/useScrollReveal'

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

  const titleRef = useScrollReveal({ threshold: 0.2 })
  const cardRef1 = useScrollReveal({ threshold: 0.2 })
  const cardRef2 = useScrollReveal({ threshold: 0.2 })
  const cardRef3 = useScrollReveal({ threshold: 0.2 })
  const cardRefs = [cardRef1, cardRef2, cardRef3]

  return (
    <section className="py-32 md:py-40 max-w-7xl mx-auto px-6">
      <div ref={titleRef} className="text-center mb-20 scroll-reveal">
        <span className="text-[#9B111E] text-xs font-bold uppercase tracking-widest block mb-4">{t('whyChooseUs.label')}</span>
        <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl text-[#1a1a1a]">{t('whyChooseUs.title')}</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-8 md:gap-10">
        {principles.map((principle, index) => (
          <div 
            key={index} 
            ref={cardRefs[index]}
            className="p-8 md:p-10 bg-white border border-[#e6e1d6] rounded-sm card-hover group text-center scroll-reveal"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="w-14 h-14 mx-auto bg-[#faf7f2] rounded-full flex items-center justify-center text-[#9B111E] mb-6 group-hover:scale-110 transition-transform duration-300">
              <span className="iconify" data-icon={principle.icon} data-width="28"></span>
            </div>
            <h3 className="font-['Playfair_Display'] text-xl md:text-2xl mb-4 text-[#1a1a1a]">{t(`whyChooseUs.principles.${principle.key}.title`)}</h3>
            <p className="text-[#666] text-sm md:text-base leading-relaxed">{t(`whyChooseUs.principles.${principle.key}.description`)}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default WhyChooseUs
