import { useRef, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'

function Menu() {
  const { t } = useLanguage()
  const scrollContainerRef = useRef(null)

  // Realistic bakery/börek images - replaced AI/abstract images
  const menuItems = [
    {
      image: "https://images.unsplash.com/photo-1574343066957-2f622158989f?q=80&w=2070&auto=format&fit=crop",
      titleKey: "menu.items.spinach"
    },
    {
      image: "https://images.unsplash.com/photo-1571875257727-256c39da42af?q=80&w=2070&auto=format&fit=crop",
      titleKey: "menu.items.meat"
    },
    {
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2070&auto=format&fit=crop",
      titleKey: "menu.items.cheese"
    },
    {
      image: "https://images.unsplash.com/photo-1606914469633-bd39206ea739?q=80&w=2070&auto=format&fit=crop",
      titleKey: "menu.items.tea"
    }
  ]

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
    <section className="py-24 bg-[#faf7f2] border-y border-[#e6e1d6]">
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
              className="min-w-[280px] md:min-w-[320px] snap-center group cursor-pointer card-hover"
            >
              <div className="aspect-[4/5] overflow-hidden rounded-sm mb-4 relative shadow-premium bg-[#e8e4dc]">
                <img 
                  src={item.image} 
                  alt={t(`${item.titleKey}.title`)} 
                  className="w-full h-full img-bakery group-hover:scale-105" 
                  loading="lazy"
                />
              </div>
              <h3 className="font-['Playfair_Display'] text-xl text-[#1a1a1a] mb-2 group-hover:text-[#9B111E] transition-colors">
                {t(`${item.titleKey}.title`)}
              </h3>
              <p className="text-sm text-[#666] line-clamp-2 leading-relaxed">
                {t(`${item.titleKey}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Menu


