import { useLanguage } from '../context/LanguageContext'

function ProductFilters({ categories, activeCategory, onCategoryChange }) {
  const { t } = useLanguage()

  return (
    <div className="flex flex-wrap gap-3 justify-center mb-12">
      <button
        onClick={() => onCategoryChange('all')}
        className={`px-6 py-2.5 rounded-sm text-sm font-medium uppercase tracking-wider transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E] ${
          activeCategory === 'all'
            ? 'bg-[#9B111E] text-white shadow-lg'
            : 'bg-white border border-[#dcd6ca] text-[#4a4a4a] hover:border-[#9B111E] hover:text-[#9B111E]'
        }`}
        aria-label={t('products.filters.all')}
        aria-pressed={activeCategory === 'all'}
      >
        {t('products.filters.all')}
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-6 py-2.5 rounded-sm text-sm font-medium uppercase tracking-wider transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E] ${
            activeCategory === category
              ? 'bg-[#9B111E] text-white shadow-lg'
              : 'bg-white border border-[#dcd6ca] text-[#4a4a4a] hover:border-[#9B111E] hover:text-[#9B111E]'
          }`}
          aria-label={t(`products.categories.${category}`)}
          aria-pressed={activeCategory === category}
        >
          {t(`products.categories.${category}`)}
        </button>
      ))}
    </div>
  )
}

export default ProductFilters

