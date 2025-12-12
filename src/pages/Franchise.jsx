import { useLanguage } from '../context/LanguageContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import Header from '../components/Header'
import Footer from '../components/Footer'
import FranchiseForm from '../components/FranchiseForm'
import ProcessStepper from '../components/ProcessStepper'

function Franchise() {
  const { t } = useLanguage()
  const heroRef = useScrollReveal({ threshold: 0.2 })
  const whoRef = useScrollReveal({ threshold: 0.2 })
  const whyRef = useScrollReveal({ threshold: 0.2 })
  const supportRef = useScrollReveal({ threshold: 0.2 })
  const processRef = useScrollReveal({ threshold: 0.2 })
  const trustRef = useScrollReveal({ threshold: 0.2 })

  const handleCTAClick = () => {
    // Analytics hook
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({ event: 'franchise_hero_cta_click' })
    }
    
    // Scroll to form
    const formSection = document.getElementById('application-form')
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setTimeout(() => {
        const firstInput = formSection.querySelector('input')
        if (firstInput) firstInput.focus()
      }, 500)
    }
  }

  const handleFormSuccess = () => {
    // Optional: scroll to success message or show thank you
    console.log('Form submitted successfully')
  }

  const whyWMB = [
    { key: 'production', icon: 'lucide:factory' },
    { key: 'operations', icon: 'lucide:settings' },
    { key: 'supply', icon: 'lucide:package' },
    { key: 'heritage', icon: 'lucide:award' }
  ]

  const supportItems = [
    { key: 'site', icon: 'lucide:map-pin' },
    { key: 'training', icon: 'lucide:graduation-cap' },
    { key: 'equipment', icon: 'lucide:wrench' },
    { key: 'ongoing', icon: 'lucide:headphones' }
  ]

  const trustItems = t('franchisePage.trust.items', { returnObjects: true })

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 bg-[#faf7f2] border-b border-[#e6e1d6]">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div ref={heroRef} className="scroll-reveal">
              <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl text-[#1a1a1a] mb-6 font-semibold">
                {t('franchisePage.hero.title')}
              </h1>
              <p className="text-lg md:text-xl text-[#4a4a4a] mb-8 font-light leading-relaxed max-w-2xl mx-auto">
                {t('franchisePage.hero.subtitle')}
              </p>
              <button
                onClick={handleCTAClick}
                className="bg-[#9B111E] text-white px-10 py-4 rounded text-base font-medium uppercase tracking-widest shadow-lg transition-all duration-300 hover:bg-[#7a0d17] hover:shadow-xl hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E]"
                aria-label={t('franchisePage.hero.cta')}
              >
                {t('franchisePage.hero.cta')}
              </button>
            </div>
          </div>
        </section>

        {/* Who This Is For */}
        <section className="py-20 md:py-32 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <div ref={whoRef} className="scroll-reveal">
              <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-[#1a1a1a] mb-8 font-semibold">
                {t('franchisePage.who.title')}
              </h2>
              <ul className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <li key={item} className="flex items-start gap-4">
                    <span className="text-[#9B111E] mt-1 flex-shrink-0">
                      <span className="iconify" data-icon="lucide:check-circle" data-width="24"></span>
                    </span>
                    <p className="text-base md:text-lg text-[#4a4a4a] leading-relaxed font-light">
                      {t(`franchisePage.who.item${item}`)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Why WMB */}
        <section className="py-20 md:py-32 bg-[#faf7f2] border-y border-[#e6e1d6]">
          <div className="max-w-7xl mx-auto px-6">
            <div ref={whyRef} className="scroll-reveal">
              <div className="text-center mb-16">
                <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-[#1a1a1a] mb-4 font-semibold">
                  {t('franchisePage.why.title')}
                </h2>
                <p className="text-lg text-[#666] max-w-2xl mx-auto">
                  {t('franchisePage.why.subtitle')}
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {whyWMB.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white border border-[#e6e1d6] rounded-sm p-8 text-center group hover:shadow-premium-lg transition-all duration-300"
                  >
                    <div className="w-16 h-16 mx-auto bg-[#faf7f2] rounded-full flex items-center justify-center text-[#9B111E] mb-6 group-hover:scale-110 transition-transform duration-300">
                      <span className="iconify" data-icon={item.icon} data-width="32"></span>
                    </div>
                    <h3 className="font-['Playfair_Display'] text-xl md:text-2xl text-[#1a1a1a] mb-4 font-semibold">
                      {t(`franchisePage.why.${item.key}.title`)}
                    </h3>
                    <p className="text-sm md:text-base text-[#666] leading-relaxed mb-3 font-light">
                      {t(`franchisePage.why.${item.key}.benefit`)}
                    </p>
                    <p className="text-xs md:text-sm text-[#888] leading-relaxed font-light">
                      {t(`franchisePage.why.${item.key}.explanation`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Franchise Support */}
        <section className="py-20 md:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div ref={supportRef} className="scroll-reveal">
              <div className="text-center mb-16">
                <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-[#1a1a1a] mb-4 font-semibold">
                  {t('franchisePage.support.title')}
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {supportItems.map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="w-14 h-14 mx-auto bg-[#faf7f2] rounded-full flex items-center justify-center text-[#9B111E] mb-4">
                      <span className="iconify" data-icon={item.icon} data-width="28"></span>
                    </div>
                    <h3 className="font-semibold text-lg text-[#1a1a1a] mb-2">
                      {t(`franchisePage.support.${item.key}.title`)}
                    </h3>
                    <p className="text-sm md:text-base text-[#666] leading-relaxed font-light">
                      {t(`franchisePage.support.${item.key}.description`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3-Step Process */}
        <section className="py-20 md:py-32 bg-[#faf7f2] border-y border-[#e6e1d6]">
          <div className="max-w-4xl mx-auto px-6">
            <div ref={processRef} className="scroll-reveal">
              <div className="text-center mb-12">
                <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-[#1a1a1a] mb-4 font-semibold">
                  {t('franchisePage.process.title')}
                </h2>
                <p className="text-lg text-[#666] max-w-2xl mx-auto">
                  {t('franchisePage.process.description')}
                </p>
              </div>
              <ProcessStepper currentStep={1} />
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section id="application-form" className="py-20 md:py-32 bg-white">
          <div className="max-w-2xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-[#1a1a1a] mb-4 font-semibold">
                {t('franchisePage.form.title')}
              </h2>
              <p className="text-lg text-[#666] leading-relaxed font-light">
                {t('franchisePage.form.description')}
              </p>
            </div>

            <div className="bg-[#faf7f2] border border-[#e6e1d6] rounded-sm p-8 md:p-12">
              <FranchiseForm onSuccess={handleFormSuccess} />
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-20 md:py-32 bg-[#faf7f2] border-y border-[#e6e1d6]">
          <div className="max-w-4xl mx-auto px-6">
            <div ref={trustRef} className="scroll-reveal">
              <div className="text-center mb-12">
                <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-[#1a1a1a] mb-4 font-semibold">
                  {t('franchisePage.trust.title')}
                </h2>
                <p className="text-lg text-[#666] leading-relaxed font-light max-w-2xl mx-auto">
                  {t('franchisePage.trust.description')}
                </p>
              </div>

              <div className="bg-white border border-[#e6e1d6] rounded-sm p-8 md:p-12">
                <ul className="grid md:grid-cols-2 gap-6">
                  {Array.isArray(trustItems) && trustItems.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-[#9B111E] mt-0.5 flex-shrink-0">
                        <span className="iconify" data-icon="lucide:check-circle" data-width="20"></span>
                      </span>
                      <span className="text-base text-[#4a4a4a] leading-relaxed font-light">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Franchise

