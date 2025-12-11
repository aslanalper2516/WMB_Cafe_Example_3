import { useLanguage } from '../context/LanguageContext'
import { useScrollReveal } from '../hooks/useScrollReveal'

function News() {
  const { t } = useLanguage()
  const titleRef = useScrollReveal({ threshold: 0.2 })
  const articleRef1 = useScrollReveal({ threshold: 0.2 })
  const articleRef2 = useScrollReveal({ threshold: 0.2 })
  const articleRef3 = useScrollReveal({ threshold: 0.2 })
  const articleRefs = [articleRef1, articleRef2, articleRef3]

  const newsItems = [
    { 
      key: "news1",
      image: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=1200&q=80",
      fallback: "https://images.unsplash.com/photo-1493857671505-72967e2e2760?auto=format&fit=crop&w=1200&q=80",
      alt: "Warm Istanbul cafe interior with tables"
    },
    { 
      key: "news2",
      image: "https://images.unsplash.com/photo-1568254183919-78a4f43a2877?auto=format&fit=crop&w=1200&q=80",
      fallback: "https://images.unsplash.com/photo-1514066558159-fc8c737ef259?auto=format&fit=crop&w=1200&q=80",
      alt: "Fresh bakery pastries and bread on display"
    },
    { 
      key: "news3",
      image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=1200&q=80",
      fallback: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
      alt: "Baker preparing fresh pastries in bakery kitchen"
    }
  ]

  return (
    <section className="py-32 md:py-40 max-w-7xl mx-auto px-6">
      <div ref={titleRef} className="flex justify-between items-end mb-16 scroll-reveal">
        <div>
          <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl text-[#1a1a1a] mb-3">{t('news.title')}</h2>
          <p className="text-[#666] text-base">{t('news.description')}</p>
        </div>
        <a 
          href="#" 
          className="hidden md:inline-flex items-center gap-2 text-[#9B111E] text-sm font-medium hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E] rounded-sm px-2 py-1"
          aria-label={t('news.viewAll')}
        >
          {t('news.viewAll')}
          <span className="iconify" data-icon="lucide:arrow-right" data-width="16"></span>
        </a>
      </div>

      <div className="grid md:grid-cols-3 gap-8 md:gap-10">
        {newsItems.map((item, index) => (
          <article 
            key={index} 
            ref={articleRefs[index]}
            className="group cursor-pointer card-hover scroll-reveal"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="aspect-video overflow-hidden rounded-sm mb-5 relative shadow-premium bg-[#e8e4dc]">
              <img 
                src={item.image} 
                alt={item.alt || t(`news.items.${item.key}.title`)} 
                className="w-full h-full img-bakery group-hover:scale-105 transition-transform duration-500 object-cover" 
                loading="lazy"
                onError={(e) => {
                  if (item.fallback && e.target.src !== item.fallback) {
                    e.target.src = item.fallback
                  }
                }}
              />
            </div>
            <div className="flex items-center gap-2 text-xs text-[#9B111E] font-medium mb-3 uppercase tracking-wide">
              <span>{t(`news.items.${item.key}.category`)}</span>
              <span className="w-1 h-1 bg-[#D4AF37] rounded-full"></span>
              <span className="text-[#888]">{t(`news.items.${item.key}.date`)}</span>
            </div>
            <h3 className="font-['Playfair_Display'] text-xl md:text-2xl leading-tight mb-3 group-hover:text-[#9B111E] transition-colors">
              {t(`news.items.${item.key}.title`)}
            </h3>
            <p className="text-[#666] text-sm md:text-base line-clamp-2 leading-relaxed">
              {t(`news.items.${item.key}.description`)}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default News
