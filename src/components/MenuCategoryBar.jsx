function MenuCategoryBar({ categories, activeCategory, onCategoryChange, language }) {
  const handleCategoryClick = (categoryId) => {
    onCategoryChange(categoryId)
    const targetElement = document.querySelector(`[data-category-section="${categoryId}"]`)
    if (targetElement) {
      const headerOffset = 180
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div
      className="sticky top-[73px] md:top-[89px] z-40 bg-white border-b border-[#e6e1d6] overflow-x-auto scrollbar-hide"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <div className="flex gap-2 px-4 py-3 max-w-7xl mx-auto">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E] ${
              activeCategory === category.id
                ? 'bg-[#9B111E] text-white shadow-md'
                : 'bg-[#faf7f2] text-[#4a4a4a] hover:bg-[#e6e1d6]'
            }`}
            aria-label={language === 'tr' ? category.nameTR : category.nameEN}
            aria-pressed={activeCategory === category.id}
          >
            {language === 'tr' ? category.nameTR : category.nameEN}
          </button>
        ))}
      </div>
    </div>
  )
}

export default MenuCategoryBar

