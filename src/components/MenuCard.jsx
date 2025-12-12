function MenuCard({ item, language, onClick, sectionRef }) {
  const getTagColor = (tag) => {
    switch (tag) {
      case 'signature':
        return 'bg-[#D4AF37] text-white'
      case 'bestseller':
        return 'bg-[#9B111E] text-white'
      case 'spicy':
        return 'bg-orange-600 text-white'
      case 'vegetarian':
        return 'bg-green-600 text-white'
      default:
        return 'bg-gray-600 text-white'
    }
  }

  const getTagText = (tag) => {
    const tags = {
      signature: language === 'tr' ? 'İmza Ürün' : 'Signature',
      bestseller: language === 'tr' ? 'Çok Satan' : 'Best Seller',
      spicy: language === 'tr' ? 'Acılı' : 'Spicy',
      vegetarian: language === 'tr' ? 'Vejetaryen' : 'Vegetarian'
    }
    return tags[tag] || tag
  }

  return (
    <div className={`relative ${!item.available ? 'opacity-60' : ''}`}>
      <button
        onClick={() => item.available && onClick(item)}
        disabled={!item.available}
        className={`w-full bg-white border border-[#e6e1d6] rounded-2xl overflow-hidden text-left transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E] ${
          item.available
            ? 'hover:shadow-xl hover:-translate-y-1 cursor-pointer'
            : 'cursor-not-allowed'
        }`}
        aria-label={`${language === 'tr' ? item.nameTR : item.nameEN} - ${language === 'tr' ? 'Detayları gör' : 'View details'}`}
      >
        {/* Image */}
        <div className="aspect-[4/3] relative overflow-hidden bg-[#e8e4dc]">
          <img
            src={item.imageUrl}
            alt={language === 'tr' ? item.nameTR : item.nameEN}
            className="w-full h-full object-cover img-bakery"
            loading="lazy"
            width="400"
            height="300"
          />
          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="absolute top-3 left-3 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className={`px-2.5 py-1 text-xs font-semibold uppercase tracking-wide rounded-full ${getTagColor(tag)}`}
                >
                  {getTagText(tag)}
                </span>
              ))}
            </div>
          )}
          {/* Unavailable Overlay */}
          {!item.available && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="px-4 py-2 bg-white/90 text-[#666] text-sm font-semibold rounded-full">
                {language === 'tr' ? 'Müsait Değil' : 'Unavailable'}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-['Playfair_Display'] text-lg md:text-xl text-[#1a1a1a] mb-2 font-semibold line-clamp-1">
            {language === 'tr' ? item.nameTR : item.nameEN}
          </h3>
          <p className="text-sm text-[#666] leading-relaxed mb-3 line-clamp-2 font-light">
            {language === 'tr' ? item.descTR : item.descEN}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-[#9B111E]">
              {item.price} {item.currency}
            </span>
          </div>
        </div>
      </button>
    </div>
  )
}

export default MenuCard

