import { useLanguage } from '../context/LanguageContext'

function ProductCard({ product, onCardClick }) {
  const { t } = useLanguage()

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'signature':
        return 'bg-[#D4AF37] text-white'
      case 'bestseller':
        return 'bg-[#9B111E] text-white'
      case 'highmargin':
        return 'bg-green-600 text-white'
      default:
        return 'bg-gray-600 text-white'
    }
  }

  const getBadgeText = (badge) => {
    const badges = {
      signature: t('products.badges.signature'),
      bestseller: t('products.badges.bestseller'),
      highmargin: t('products.badges.highmargin')
    }
    return badges[badge] || badge
  }

  return (
    <div
      onClick={() => onCardClick(product)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onCardClick(product)
        }
      }}
      className="group cursor-pointer bg-white border border-[#e6e1d6] rounded-sm overflow-hidden hover:shadow-premium-lg transition-all duration-300 transform hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E]"
      role="button"
      tabIndex={0}
      aria-label={`${t(`products.items.${product.key}.name`)} - ${t('products.viewDetails')}`}
    >
      {/* Image Container */}
      <div className="aspect-[4/5] relative overflow-hidden bg-[#e8e4dc]">
        <img
          src={product.image}
          alt={product.alt || t(`products.items.${product.key}.name`)}
          className="w-full h-full object-cover img-bakery group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          width={600}
          height={750}
          decoding="async"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onError={(e) => {
            if (product.fallback && e.target.src !== product.fallback) {
              e.target.src = product.fallback
            }
          }}
        />
        {/* Badge */}
        {product.badge && (
          <div className={`absolute top-4 left-4 px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-sm shadow-lg ${getBadgeColor(product.badge)}`}>
            {getBadgeText(product.badge)}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col h-[200px]">
        <h3 className="font-['Playfair_Display'] text-xl text-[#1a1a1a] mb-3 group-hover:text-[#9B111E] transition-colors line-clamp-2">
          {t(`products.items.${product.key}.name`)}
        </h3>
        <p className="text-sm text-[#666] leading-relaxed line-clamp-3 flex-grow">
          {t(`products.items.${product.key}.description`)}
        </p>
      </div>
    </div>
  )
}

export default ProductCard

