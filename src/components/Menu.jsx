import { useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import ProductModal from './ProductModal'

function Menu() {
  const { t } = useLanguage()
  const scrollContainerRef = useRef(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Authentic bakery/cafe images - replaced all irrelevant images
  const menuItems = [
    {
      image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=900&q=80",
      fallback: "https://images.unsplash.com/photo-1534620808146-d33bb39128b2?auto=format&fit=crop&w=900&q=80",
      titleKey: "menu.items.spinach",
      alt: "Spinach and cheese pastry and breakfast plate on a wooden table",
      isSignature: false,
      description: t('menu.items.spinach.description'),
      ingredients: "Taze ıspanak, beyaz peynir, yufka, tereyağı",
      addOns: ["Türk çayı", "Yoğurt"]
    },
    {
      image: "https://www.ardaninmutfagi.com/wp-content/uploads/2019/05/kiymali-borek-d.jpg",
      fallback: "https://images.unsplash.com/photo-1622808516114-02a5749cd965?auto=format&fit=crop&w=900&q=80",
      titleKey: "menu.items.meat",
      alt: "Fresh kıymalı börek (minced meat pastry) on a plate",
      isSignature: true,
      description: t('menu.items.meat.description'),
      ingredients: "Kıyma, soğan, maydanoz, yufka, tereyağı",
      addOns: ["Ayran", "Salata", "Türk çayı"]
    },
    {
      image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=900&q=80",
      fallback: "https://images.unsplash.com/photo-1583338917451-face2751d8d5?auto=format&fit=crop&w=900&q=80",
      titleKey: "menu.items.cheese",
      alt: "Warm breakfast plate with Turkish pastries and cheese",
      isSignature: false,
      description: t('menu.items.cheese.description'),
      ingredients: "Beyaz peynir, maydanoz, yufka, tereyağı",
      addOns: ["Bal", "Tereyağı", "Çay"]
    },
    {
      image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=900&q=80",
      fallback: "https://images.unsplash.com/photo-1534432182912-63863115e106?auto=format&fit=crop&w=900&q=80",
      titleKey: "menu.items.tea",
      alt: "Glass of Turkish tea on a saucer with traditional serving",
      isSignature: false,
      description: t('menu.items.tea.description'),
      ingredients: "Çay yaprakları, su",
      addOns: ["Şeker", "Limon"]
    }
  ]

  const handleProductClick = (item) => {
    setSelectedProduct({
      title: t(`${item.titleKey}.title`),
      description: item.description || t(`${item.titleKey}.description`),
      image: item.image,
      isSignature: item.isSignature,
      ingredients: item.ingredients,
      addOns: item.addOns
    })
    setIsModalOpen(true)
  }

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -350, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 350, behavior: 'smooth' })
    }
  }

  return (
    <section id="menu" className="py-24 bg-[#faf7f2] border-y border-[#e6e1d6]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl scroll-reveal">
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl text-[#1a1a1a] mb-4">{t('menu.title')}</h2>
            <p className="text-[#5a5a5a] font-light leading-relaxed">{t('menu.description')}</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={scrollLeft}
              className="w-10 h-10 rounded-sm border border-[#d1ccbf] flex items-center justify-center hover:bg-[#9B111E] hover:border-[#9B111E] hover:text-white transition-all text-[#5a5a5a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E]"
              aria-label="Scroll menu left"
            >
              <span className="iconify" data-icon="lucide:arrow-left" data-width="18"></span>
            </button>
            <button 
              onClick={scrollRight}
              className="w-10 h-10 rounded-sm border border-[#d1ccbf] flex items-center justify-center hover:bg-[#9B111E] hover:border-[#9B111E] hover:text-white transition-all text-[#5a5a5a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E]"
              aria-label="Scroll menu right"
            >
              <span className="iconify" data-icon="lucide:arrow-right" data-width="18"></span>
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-6 pb-8 snap-x scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {menuItems.map((item, index) => (
            <div 
              key={index} 
              className="min-w-[280px] md:min-w-[320px] snap-center group"
            >
              <div 
                onClick={() => handleProductClick(item)}
                className="cursor-pointer"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleProductClick(item)
                  }
                }}
                aria-label={`${t(`${item.titleKey}.title`)} - Daha fazla bilgi`}
              >
                <div className="aspect-[4/5] overflow-hidden rounded-sm mb-4 relative shadow-premium bg-[#e8e4dc] group-hover:shadow-premium-lg transition-all duration-300 transform group-hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E]">
                  <img 
                    src={item.image} 
                    alt={item.alt || t(`${item.titleKey}.title`)} 
                    className="w-full h-full img-bakery group-hover:scale-105 transition-transform duration-500 object-cover" 
                    loading={index === 0 ? 'eager' : 'lazy'}
                    width={400}
                    height={500}
                    decoding="async"
                    sizes="(max-width: 640px) 280px, 320px"
                    onError={(e) => {
                      if (item.fallback && e.target.src !== item.fallback) {
                        e.target.src = item.fallback
                      }
                    }}
                  />
                  {item.isSignature && (
                    <div className="absolute top-4 left-4 bg-[#D4AF37] text-white px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-sm shadow-lg">
                      İmza Ürün
                    </div>
                  )}
                </div>
                <h3 className="font-['Playfair_Display'] text-xl text-[#1a1a1a] mb-2 group-hover:text-[#9B111E] transition-colors">
                  {t(`${item.titleKey}.title`)}
                </h3>
                <p className="text-sm text-[#666] line-clamp-2 leading-relaxed mb-2">
                  {t(`${item.titleKey}.description`)}
                </p>
                <span className="text-xs text-[#9B111E] font-medium hover:underline inline-flex items-center gap-1">
                  Daha fazla bilgi
                  <span className="iconify" data-icon="lucide:arrow-right" data-width="14"></span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <a 
            href="#wholesale"
            className="inline-flex items-center gap-2 text-[#9B111E] font-medium hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E] rounded-sm px-2 py-1"
          >
            <span>Toptan Katalogu Görüntüle</span>
            <span className="iconify" data-icon="lucide:arrow-right" data-width="16"></span>
          </a>
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
      />
    </section>
  )
}

export default Menu


