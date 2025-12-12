import { useLanguage } from '../context/LanguageContext'

function ProcessStepper({ currentStep = 1 }) {
  const { t } = useLanguage()

  const steps = [
    { number: 1, key: 'apply' },
    { number: 2, key: 'call' },
    { number: 3, key: 'planning' }
  ]

  return (
    <div className="flex items-center justify-center mb-12">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center font-semibold text-base transition-all ${
                currentStep >= step.number
                  ? 'bg-[#9B111E] text-white shadow-lg'
                  : 'bg-[#e6e1d6] text-[#666]'
              }`}
            >
              {currentStep > step.number ? (
                <span className="iconify" data-icon="lucide:check" data-width="24"></span>
              ) : (
                step.number
              )}
            </div>
            <span className={`mt-3 text-sm font-medium max-w-[120px] text-center ${
              currentStep >= step.number ? 'text-[#9B111E]' : 'text-[#666]'
            }`}>
              {t(`franchisePage.process.${step.key}`)}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`w-20 md:w-32 h-0.5 mx-4 md:mx-6 transition-all ${
                currentStep > step.number ? 'bg-[#9B111E]' : 'bg-[#e6e1d6]'
              }`}
            ></div>
          )}
        </div>
      ))}
    </div>
  )
}

export default ProcessStepper

