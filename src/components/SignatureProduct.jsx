import { useLanguage } from '../context/LanguageContext'
import { useScrollReveal } from '../hooks/useScrollReveal'

function SignatureProduct() {
  const { t } = useLanguage()
  const sectionRef = useScrollReveal({ threshold: 0.3 })

  return (
    <section 
      ref={sectionRef}
      className="relative h-[70vh] min-h-[500px] w-full overflow-hidden group scroll-reveal"
    >
      <div className="absolute inset-0">
        {/* Bakery display filled with pastries - replaced produce image */}
        <img 
          src="https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?auto=format&fit=crop&w=1920&q=85" 
          alt="Bakery display filled with different pastries and baked goods" 
          className="w-full h-full object-cover img-bakery" 
          loading="lazy"
          width={1920}
          height={1080}
          decoding="async"
          sizes="100vw"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1568254183919-78a4f43a2877?auto=format&fit=crop&w=1920&q=85'
          }}
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
        <span className="text-[#D4AF37] tracking-[0.2em] text-xs font-semibold uppercase mb-6 animate-fade-in">
          {t('signature.label')}
        </span>
        <h2 className="font-['Playfair_Display'] text-4xl md:text-6xl lg:text-7xl text-white mb-4 tracking-tight font-semibold animate-fade-in-up">
          {t('signature.title')}
        </h2>
        <div className="w-20 h-[3px] bg-[#9B111E] mt-8"></div>
      </div>

      {/* Navigation Chevrons */}
      <button 
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-all p-3 rounded-full hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50"
        aria-label="Previous product"
      >
        <span className="iconify" data-icon="lucide:chevron-left" data-width="48"></span>
      </button>
      <button 
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-all p-3 rounded-full hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50"
        aria-label="Next product"
      >
        <span className="iconify" data-icon="lucide:chevron-right" data-width="48"></span>
      </button>
    </section>
  )
}

export default SignatureProduct
