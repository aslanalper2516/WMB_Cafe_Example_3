import { useState, useEffect, useRef, useCallback } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

// Signature Product Type
/**
 * @typedef {Object} SignatureProduct
 * @property {string} title
 * @property {string} [subtitle]
 * @property {string} [description]
 * @property {string} imageUrl
 * @property {string} [alt]
 */

// Default signature products data
const defaultSignatureProducts = [
  {
    title: "WMB Özel Kıymalı Börek",
    subtitle: "İmza Ürünler",
    description: "Geleneksel yöntemlerle hazırlanan, çıtır katmanları ve bol iç harcıyla WMB'nin en özel lezzeti.",
    imageUrl: "https://i.lezzet.com.tr/images-xxlarge-recipe/el-acmasi-kiymali-borek-74b8a5b9-12ef-47d5-969b-27f73ef2df87.jpg",
    alt: "Tepsi içinde kızarmış katmanlı kıymalı börek"
  },
  {
    title: "El Açması Su Böreği",
    subtitle: "İmza Ürünler",
    description: "İnce ince açılan el açması yufkalar, kaliteli peynir ve tereyağı ile klasik su böreği yorumu.",
    imageUrl: "https://www.lepleziz.com/images/content/kolay-su-boregi_nsez.webp",
    alt: "Peynirli su böreği dilimleriyle servis tabağı"
  },
  {
    title: "Çıtır Sigara Böreği",
    subtitle: "İmza Ürünler",
    description: "Her lokmada çıtır doku, içi yumuşak peynir dolgusu ile klasikleşmiş bir ara sıcak.",
    imageUrl: "https://i.elele.com.tr/2/1280/720/storage/files/images/2021/09/17/sigara-boregi-PXYE_cover.jpg",
    alt: "Altın rengi kızarmış sigara börekleri"
  }
]

/**
 * @param {Object} props
 * @param {SignatureProduct[]} [props.items]
 * @param {number} [props.autoPlayIntervalMs]
 * @param {number} [props.transitionDurationMs]
 */
function SignatureProductsSlider({
  items = defaultSignatureProducts,
  autoPlayIntervalMs = 5000,
  transitionDurationMs = 700
} = {}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const sectionRef = useScrollReveal({ threshold: 0.3 })
  const autoPlayRef = useRef(null)

  // Navigation functions
  const clearAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
      autoPlayRef.current = null
    }
  }, [])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length)
    clearAutoPlay()
  }, [items.length, clearAutoPlay])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
    clearAutoPlay()
  }, [items.length, clearAutoPlay])

  const goToSlide = useCallback((index) => {
    setCurrentIndex(index)
    clearAutoPlay()
  }, [clearAutoPlay])

  // Auto-play functionality
  useEffect(() => {
    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || isPaused) {
      clearAutoPlay()
      return
    }

    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length)
    }, autoPlayIntervalMs)

    return () => {
      clearAutoPlay()
    }
  }, [items.length, autoPlayIntervalMs, isPaused, clearAutoPlay])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      const container = sectionRef.current
      if (!container || !container.contains(document.activeElement)) return

      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goToPrevious()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        goToNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goToNext, goToPrevious])

  const handleMouseEnter = () => {
    setIsPaused(true)
  }

  const handleMouseLeave = () => {
    setIsPaused(false)
  }

  const currentItem = items[currentIndex]

  return (
    <section
      ref={sectionRef}
      role="region"
      aria-label="İmza ürünler slider"
      className="relative h-[380px] md:h-[450px] lg:h-[550px] w-full overflow-hidden scroll-reveal"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      tabIndex={0}
    >
      {/* Slides Container */}
      <div className="absolute inset-0">
        {items.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity ease-in-out ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            style={{
              transitionDuration: `${transitionDurationMs}ms`
            }}
          >
            <img
              src={item.imageUrl}
              alt={item.alt || item.title}
              width={1920}
              height={1080}
              decoding="async"
              sizes="100vw"
              className="w-full h-full object-cover img-bakery"
              loading={index === 0 ? 'eager' : 'lazy'}
              onError={(e) => {
                // Fallback to Unsplash images if external URLs fail
                const fallbackImages = [
                  "https://images.unsplash.com/photo-1626203704102-fd47cebb6a53?auto=format&fit=crop&w=1600&q=80",
                  "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=1600&q=80",
                  "https://images.unsplash.com/photo-1598713336794-59da6cc15bb7?auto=format&fit=crop&w=1600&q=80"
                ]
                if (e.target.src !== fallbackImages[index]) {
                  e.target.src = fallbackImages[index] || fallbackImages[0]
                }
              }}
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-20">
        {currentItem.subtitle && (
          <span className="text-[#D4AF37] tracking-[0.2em] text-xs font-semibold uppercase mb-4">
            {currentItem.subtitle}
          </span>
        )}
        <h2 className="font-['Playfair_Display'] text-4xl md:text-6xl lg:text-7xl text-white mb-4 tracking-tight font-semibold">
          {currentItem.title}
        </h2>
        {currentItem.description && (
          <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto mb-6 font-light leading-relaxed">
            {currentItem.description}
          </p>
        )}
        <div className="w-20 h-[3px] bg-[#9B111E] mt-4"></div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-all p-3 md:p-4 rounded-full hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 z-30"
        aria-label="Önceki ürün"
      >
        <span className="iconify" data-icon="lucide:chevron-left" data-width="48"></span>
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-all p-3 md:p-4 rounded-full hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 z-30"
        aria-label="Sonraki ürün"
      >
        <span className="iconify" data-icon="lucide:chevron-right" data-width="48"></span>
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-[#9B111E] w-8'
                : 'bg-white/40 hover:bg-white/60 w-2'
            }`}
            aria-label={`Ürün ${index + 1}'e git`}
            aria-current={index === currentIndex ? 'true' : 'false'}
          />
        ))}
      </div>
    </section>
  )
}

export default SignatureProductsSlider
