import { useLanguage } from '../context/LanguageContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import Header from '../components/Header'
import Footer from '../components/Footer'
import LocationCard from '../components/LocationCard'
import LocationMap from '../components/LocationMap'

function Locations() {
  const { t } = useLanguage()
  const heroRef = useScrollReveal({ threshold: 0.2 })
  const listRef = useScrollReveal({ threshold: 0.2 })
  const mapRef = useScrollReveal({ threshold: 0.2 })
  const expansionRef = useScrollReveal({ threshold: 0.2 })

  // Location data - replace with real data from API/backend
  // For now, using sample data structure
  const locations = [
    {
      id: 1,
      city: 'İstanbul',
      district: 'Sarıyer',
      address: 'Merkez Mah. Sarıyer Cad. No:1, Sarıyer',
      phone: '+90 212 123 45 67',
      hours: 'Pazartesi - Pazar: 07:00 - 22:00',
      status: 'open',
      note: 'İlk şubemiz. 1895\'ten beri burada hizmet veriyoruz.',
      coordinates: { lat: 41.1065, lng: 29.0505 }
    },
    {
      id: 2,
      city: 'İstanbul',
      district: 'Kadıköy',
      address: 'Moda Caddesi No:45, Kadıköy',
      phone: '+90 216 234 56 78',
      hours: 'Pazartesi - Pazar: 07:00 - 22:00',
      status: 'open',
      note: null,
      coordinates: { lat: 40.9833, lng: 29.0167 }
    }
    // Add more locations as they become available
    // {
    //   id: 3,
    //   city: 'Ankara',
    //   district: 'Çankaya',
    //   address: 'Kızılay Mah. Atatürk Bulvarı No:100, Çankaya',
    //   phone: '+90 312 345 67 89',
    //   hours: 'Pazartesi - Pazar: 07:00 - 22:00',
    //   status: 'coming_soon',
    //   note: 'Yakında açılıyoruz!',
    //   coordinates: { lat: 39.9334, lng: 32.8597 }
    // }
  ]

  const handleFranchiseClick = () => {
    // Navigate to franchise page or scroll if on same page
    if (window.location.pathname === '/') {
      const franchiseSection = document.getElementById('franchise')
      if (franchiseSection) {
        franchiseSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    } else {
      window.location.href = '/#franchise'
    }
  }

  const openLocations = locations.filter(loc => loc.status === 'open')
  const comingSoonLocations = locations.filter(loc => loc.status === 'coming_soon')

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-[#faf7f2] border-b border-[#e6e1d6]">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div ref={heroRef} className="scroll-reveal">
              <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl text-[#1a1a1a] mb-6 font-semibold">
                {t('locations.hero.title')}
              </h1>
              <p className="text-lg md:text-xl text-[#4a4a4a] font-light leading-relaxed max-w-2xl mx-auto">
                {t('locations.hero.subtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* Location List */}
        <section className="py-20 md:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div ref={listRef} className="scroll-reveal">
              {locations.length === 0 ? (
                // Empty State
                <div className="text-center py-16">
                  <div className="w-20 h-20 mx-auto bg-[#faf7f2] rounded-full flex items-center justify-center text-[#9B111E] mb-6">
                    <span className="iconify" data-icon="lucide:map-pin" data-width="40"></span>
                  </div>
                  <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl text-[#1a1a1a] mb-4 font-semibold">
                    {t('locations.empty.title')}
                  </h2>
                  <p className="text-lg text-[#666] mb-8 max-w-2xl mx-auto leading-relaxed font-light">
                    {t('locations.empty.description')}
                  </p>
                  <button
                    onClick={handleFranchiseClick}
                    className="bg-[#9B111E] text-white px-8 py-3 rounded text-base font-medium uppercase tracking-wider shadow-lg transition-all duration-300 hover:bg-[#7a0d17] hover:shadow-xl hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E]"
                  >
                    {t('locations.empty.cta')}
                  </button>
                </div>
              ) : (
                <>
                  {openLocations.length > 0 && (
                    <div className="mb-12">
                      <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-[#1a1a1a] mb-8 font-semibold">
                        {t('locations.sections.open')}
                      </h2>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {openLocations.map((location) => (
                          <LocationCard key={location.id} location={location} />
                        ))}
                      </div>
                    </div>
                  )}

                  {comingSoonLocations.length > 0 && (
                    <div>
                      <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-[#1a1a1a] mb-8 font-semibold">
                        {t('locations.sections.comingSoon')}
                      </h2>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {comingSoonLocations.map((location) => (
                          <LocationCard key={location.id} location={location} />
                        ))}
                      </div>
                    </div>
                  )}

                  {locations.length < 3 && (
                    <div className="mt-16 text-center bg-[#faf7f2] border border-[#e6e1d6] rounded-sm p-8 md:p-12">
                      <p className="text-lg text-[#4a4a4a] mb-6 leading-relaxed font-light max-w-2xl mx-auto">
                        {t('locations.growing.description')}
                      </p>
                      <button
                        onClick={handleFranchiseClick}
                        className="bg-[#9B111E] text-white px-8 py-3 rounded text-base font-medium uppercase tracking-wider shadow-lg transition-all duration-300 hover:bg-[#7a0d17] hover:shadow-xl hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E]"
                      >
                        {t('locations.growing.cta')}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </section>

        {/* Map Section */}
        {locations.length > 0 && (
          <section className="py-20 md:py-32 bg-[#faf7f2] border-y border-[#e6e1d6]">
            <div className="max-w-7xl mx-auto px-6">
              <div ref={mapRef} className="scroll-reveal">
                <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-[#1a1a1a] mb-8 font-semibold text-center">
                  {t('locations.map.title')}
                </h2>
                <LocationMap locations={locations} />
                <p className="text-sm text-[#666] text-center mt-4 font-light">
                  {t('locations.map.note')}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Expansion Note */}
        <section className="py-20 md:py-32 bg-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div ref={expansionRef} className="scroll-reveal">
              <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-[#1a1a1a] mb-6 font-semibold">
                {t('locations.expansion.title')}
              </h2>
              <p className="text-lg text-[#4a4a4a] mb-8 leading-relaxed font-light max-w-2xl mx-auto">
                {t('locations.expansion.description')}
              </p>
              <button
                onClick={handleFranchiseClick}
                className="bg-[#9B111E] text-white px-10 py-4 rounded text-base font-medium uppercase tracking-widest shadow-lg transition-all duration-300 hover:bg-[#7a0d17] hover:shadow-xl hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E]"
                aria-label={t('locations.expansion.cta')}
              >
                {t('locations.expansion.cta')}
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Locations

