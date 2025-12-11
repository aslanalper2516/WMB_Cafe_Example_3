import { useLanguage } from '../context/LanguageContext'

function Menu() {
  const { t } = useLanguage()

  const menuItems = [
    {
      image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=2070&auto=format&fit=crop",
      titleKey: "menu.items.spinach"
    },
    {
      image: "https://images.unsplash.com/photo-1541288097308-7b8e3f58c4c6?q=80&w=2070&auto=format&fit=crop",
      titleKey: "menu.items.meat"
    },
    {
      image: "https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/917d6f93-fb36-439a-8c48-884b67b35381_1600w.jpg",
      titleKey: "menu.items.cheese"
    },
    {
      image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=2070&auto=format&fit=crop",
      titleKey: "menu.items.tea"
    }
  ]

  return (
    <section className="py-24 bg-[#f3efe6] border-y border-[#e6e1d6]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <h2 className="font-['Playfair_Display'] text-4xl text-[#1a1a1a] mb-4">{t('menu.title')}</h2>
            <p className="text-[#5a5a5a] font-light">{t('menu.description')}</p>
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded border border-[#d1ccbf] flex items-center justify-center hover:bg-[#9B111E] hover:border-[#9B111E] hover:text-white transition-all text-[#5a5a5a]">
              <span className="iconify" data-icon="lucide:arrow-left" data-width="18"></span>
            </button>
            <button className="w-10 h-10 rounded border border-[#d1ccbf] flex items-center justify-center hover:bg-[#9B111E] hover:border-[#9B111E] hover:text-white transition-all text-[#5a5a5a]">
              <span className="iconify" data-icon="lucide:arrow-right" data-width="18"></span>
            </button>
          </div>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="flex overflow-x-auto gap-6 pb-8 snap-x scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
          {menuItems.map((item, index) => (
            <div key={index} className="min-w-[280px] md:min-w-[350px] snap-center group cursor-pointer">
              <div className="aspect-[4/3] overflow-hidden rounded-sm mb-4 relative">
                <img src={item.image} alt={t(`${item.titleKey}.title`)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
              </div>
              <h3 className="font-['Playfair_Display'] text-xl text-[#1a1a1a] mb-1 group-hover:text-[#9B111E] transition-colors">{t(`${item.titleKey}.title`)}</h3>
              <p className="text-sm text-[#666]">{t(`${item.titleKey}.description`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Menu


