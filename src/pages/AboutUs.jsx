import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import Timeline from '../components/Timeline'
import Header from '../components/Header'
import Footer from '../components/Footer'

function AboutUs() {
  const { t } = useLanguage()
  const heroRef = useScrollReveal({ threshold: 0.2 })
  const storyRef = useScrollReveal({ threshold: 0.2 })
  const valuesRef = useScrollReveal({ threshold: 0.2 })
  const philosophyRef = useScrollReveal({ threshold: 0.2 })

  // CTA handled via Link component

  const coreValues = [
    { key: 'consistency', icon: 'lucide:repeat' },
    { key: 'process', icon: 'lucide:settings' },
    { key: 'scalable', icon: 'lucide:trending-up' },
    { key: 'partnerships', icon: 'lucide:handshake' }
  ]

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1583338917451-face2751d8d5?auto=format&fit=crop&w=1920&q=80" 
              alt="Traditional bakery kitchen with wooden tables and baking equipment" 
              className="w-full h-full object-cover img-bakery" 
              loading="eager"
              width="1920"
              height="1080"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1534432182912-63863115e106?auto=format&fit=crop&w=1920&q=80'
              }}
            />
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60"></div>
          </div>

          <div ref={heroRef} className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white scroll-reveal">
            <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl leading-tight font-semibold mb-6">
              {t('aboutUs.hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-white/95 max-w-3xl mx-auto font-light leading-relaxed">
              {t('aboutUs.hero.subtitle')}
            </p>
          </div>
        </section>

        {/* Brand Story */}
        <section className="py-20 md:py-32 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <div ref={storyRef} className="scroll-reveal">
              <p className="text-lg md:text-xl text-[#4a4a4a] leading-relaxed mb-8 font-light">
                {t('aboutUs.story.lead')}
              </p>

              <div className="space-y-6 mb-12">
                <div>
                  <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl text-[#1a1a1a] mb-4 font-semibold">
                    {t('aboutUs.story.paragraph1.title')}
                  </h2>
                  <p className="text-base md:text-lg text-[#4a4a4a] leading-relaxed font-light">
                    {t('aboutUs.story.paragraph1.content')}
                  </p>
                </div>

                <div>
                  <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl text-[#1a1a1a] mb-4 font-semibold">
                    {t('aboutUs.story.paragraph2.title')}
                  </h2>
                  <p className="text-base md:text-lg text-[#4a4a4a] leading-relaxed font-light">
                    {t('aboutUs.story.paragraph2.content')}
                  </p>
                </div>

                <div>
                  <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl text-[#1a1a1a] mb-4 font-semibold">
                    {t('aboutUs.story.paragraph3.title')}
                  </h2>
                  <p className="text-base md:text-lg text-[#4a4a4a] leading-relaxed font-light">
                    {t('aboutUs.story.paragraph3.content')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 md:py-32 bg-[#faf7f2] border-y border-[#e6e1d6]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl text-[#1a1a1a] mb-4 font-semibold">
                {t('aboutUs.timeline.title')}
              </h2>
            </div>
            <Timeline />
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 md:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div ref={valuesRef} className="scroll-reveal">
              <div className="text-center mb-16">
                <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl text-[#1a1a1a] mb-4 font-semibold">
                  {t('aboutUs.values.title')}
                </h2>
                <p className="text-lg text-[#666] max-w-2xl mx-auto">
                  {t('aboutUs.values.subtitle')}
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                {coreValues.map((value, index) => (
                  <div
                    key={index}
                    className="p-8 bg-[#faf7f2] border border-[#e6e1d6] rounded-sm text-center group hover:shadow-premium-lg transition-all duration-300"
                  >
                    <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center text-[#9B111E] mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                      <span className="iconify" data-icon={value.icon} data-width="32"></span>
                    </div>
                    <h3 className="font-['Playfair_Display'] text-xl md:text-2xl text-[#1a1a1a] mb-4 font-semibold">
                      {t(`aboutUs.values.${value.key}.title`)}
                    </h3>
                    <p className="text-[#4a4a4a] text-base leading-relaxed font-light">
                      {t(`aboutUs.values.${value.key}.description`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Operating Philosophy */}
        <section className="py-20 md:py-32 bg-[#faf7f2] border-y border-[#e6e1d6]">
          <div className="max-w-4xl mx-auto px-6">
            <div ref={philosophyRef} className="scroll-reveal">
              <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl text-[#1a1a1a] mb-8 font-semibold text-center">
                {t('aboutUs.philosophy.title')}
              </h2>
              
              <div className="bg-white border border-[#e6e1d6] rounded-sm p-8 md:p-12">
                <ul className="space-y-6">
                  {[1, 2, 3, 4].map((item) => (
                    <li key={item} className="flex items-start gap-4">
                      <span className="text-[#9B111E] mt-1 flex-shrink-0">
                        <span className="iconify" data-icon="lucide:check-circle" data-width="24"></span>
                      </span>
                      <p className="text-base md:text-lg text-[#4a4a4a] leading-relaxed font-light">
                        {t(`aboutUs.philosophy.item${item}`)}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-32 bg-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-[#1a1a1a] mb-6 font-semibold">
              {t('aboutUs.cta.title')}
            </h2>
            <p className="text-lg text-[#666] mb-8 max-w-2xl mx-auto">
              {t('aboutUs.cta.description')}
            </p>
            <Link
              to="/franchise#application"
              className="inline-block bg-[#9B111E] text-white px-10 py-4 rounded text-base font-medium uppercase tracking-widest shadow-lg transition-all duration-300 hover:bg-[#7a0d17] hover:shadow-xl hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E]"
              aria-label={t('aboutUs.cta.button')}
            >
              {t('aboutUs.cta.button')}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default AboutUs

