import { useLanguage } from '../context/LanguageContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import Header from '../components/Header'
import Footer from '../components/Footer'

function Terms() {
  const { t } = useLanguage()
  const heroRef = useScrollReveal({ threshold: 0.2 })
  const contentRef = useScrollReveal({ threshold: 0.2 })

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-[#faf7f2] border-b border-[#e6e1d6]">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div ref={heroRef} className="scroll-reveal">
              <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl text-[#1a1a1a] mb-6 font-semibold">
                {t('terms.title')}
              </h1>
              <p className="text-lg md:text-xl text-[#4a4a4a] font-light leading-relaxed">
                {t('terms.lastUpdated')}: {new Date().toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-20 md:py-32 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <div ref={contentRef} className="scroll-reveal prose prose-lg max-w-none">
              <div className="space-y-8 text-[#4a4a4a] leading-relaxed font-light">
                <p>{t('terms.intro')}</p>
                
                <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl text-[#1a1a1a] mt-12 mb-6 font-semibold">
                  {t('terms.acceptance.title')}
                </h2>
                <p>{t('terms.acceptance.content')}</p>
                
                <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl text-[#1a1a1a] mt-12 mb-6 font-semibold">
                  {t('terms.useOfService.title')}
                </h2>
                <p>{t('terms.useOfService.content')}</p>
                
                <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl text-[#1a1a1a] mt-12 mb-6 font-semibold">
                  {t('terms.liability.title')}
                </h2>
                <p>{t('terms.liability.content')}</p>
                
                <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl text-[#1a1a1a] mt-12 mb-6 font-semibold">
                  {t('terms.contact.title')}
                </h2>
                <p>{t('terms.contact.content')}</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Terms

