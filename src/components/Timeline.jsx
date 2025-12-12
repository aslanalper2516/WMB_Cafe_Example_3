import { useLanguage } from '../context/LanguageContext'

function Timeline() {
  const { t } = useLanguage()

  const milestones = [
    { key: 'milestone1' },
    { key: 'milestone2' },
    { key: 'milestone3' },
    { key: 'milestone4' }
  ]

  return (
    <div className="mt-12 relative">
      {/* Timeline line */}
      <div className="absolute left-0 top-8 bottom-8 w-0.5 bg-gradient-to-b from-[#9B111E] via-[#D4AF37] to-[#9B111E] hidden md:block"></div>
      
      <div className="grid md:grid-cols-4 gap-6 md:gap-8">
        {milestones.map((milestone, index) => (
          <div key={index} className="relative">
            {/* Timeline dot */}
            <div className="absolute left-0 top-8 w-4 h-4 bg-[#9B111E] rounded-full border-4 border-white shadow-lg hidden md:block"></div>
            
            <div className="pl-0 md:pl-6">
              <div className="text-2xl md:text-3xl font-bold font-['Playfair_Display'] text-[#9B111E] mb-2">
                {t(`about.${milestone.key}.year`)}
              </div>
              <h4 className="font-semibold text-base md:text-lg text-[#1a1a1a] mb-2">
                {t(`about.${milestone.key}.title`)}
              </h4>
              <p className="text-sm md:text-base text-[#666] leading-relaxed">
                {t(`about.${milestone.key}.description`)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Timeline

