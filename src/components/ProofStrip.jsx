import { useLanguage } from '../context/LanguageContext'

// Editable config for proof metrics
const PROOF_METRICS = {
  tr: [
    { icon: 'lucide:calendar', label: 'Yıl', value: '128+' },
    { icon: 'lucide:store', label: 'Şube', value: '45+' },
    { icon: 'lucide:package', label: 'Günlük Üretim Kapasitesi', value: '10.000+' },
    { icon: 'lucide:graduation-cap', label: 'Eğitim Saati', value: '240+' }
  ],
  en: [
    { icon: 'lucide:calendar', label: 'Years', value: '128+' },
    { icon: 'lucide:store', label: 'Stores', value: '45+' },
    { icon: 'lucide:package', label: 'Daily Production', value: '10,000+' },
    { icon: 'lucide:graduation-cap', label: 'Training Hours', value: '240+' }
  ]
}

function ProofStrip() {
  const { language } = useLanguage()
  const metrics = PROOF_METRICS[language]

  return (
    <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto animate-fade-in-up-delay-2">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="bg-black/50 backdrop-blur-md border-2 border-white/30 rounded-lg p-4 md:p-6 text-center group hover:bg-black/60 hover:border-white/40 transition-all duration-300 shadow-xl"
        >
          <div className="text-white mb-2 flex justify-center">
            <span className="iconify" data-icon={metric.icon} data-width="24"></span>
          </div>
          <div className="text-white text-2xl md:text-3xl font-bold font-['Playfair_Display'] mb-1 drop-shadow-lg">
            {metric.value}
          </div>
          <div className="text-white text-xs md:text-sm font-semibold uppercase tracking-wide">
            {metric.label}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProofStrip

