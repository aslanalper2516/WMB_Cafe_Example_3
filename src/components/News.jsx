import { useLanguage } from '../context/LanguageContext'

function News() {
  const { t } = useLanguage()

  const newsItems = [
    { 
      key: "news1",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
    },
    { 
      key: "news2",
      image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=1974&auto=format&fit=crop"
    },
    { 
      key: "news3",
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2070&auto=format&fit=crop"
    }
  ]

  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="font-['Playfair_Display'] text-4xl text-[#1a1a1a] mb-2">{t('news.title')}</h2>
          <p className="text-[#666] text-sm">{t('news.description')}</p>
        </div>
        <a href="#" className="hidden md:inline-flex items-center text-[#9B111E] text-sm font-medium hover:underline">{t('news.viewAll')}</a>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {newsItems.map((item, index) => (
          <article key={index} className="group cursor-pointer">
            <div className="aspect-video overflow-hidden rounded-sm mb-4">
              <img src={item.image} alt={t(`news.items.${item.key}.title`)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="flex items-center gap-2 text-xs text-[#9B111E] font-medium mb-2 uppercase tracking-wide">
              <span>{t(`news.items.${item.key}.category`)}</span>
              <span className="w-1 h-1 bg-[#D4AF37] rounded-full"></span>
              <span>{t(`news.items.${item.key}.date`)}</span>
            </div>
            <h3 className="font-['Playfair_Display'] text-xl leading-tight mb-2 group-hover:text-[#9B111E] transition-colors">{t(`news.items.${item.key}.title`)}</h3>
            <p className="text-[#666] text-sm line-clamp-2">{t(`news.items.${item.key}.description`)}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default News


