function MenuSearch({ searchTerm, onSearchChange, language }) {
  return (
    <div className="px-4 py-4 bg-white border-b border-[#e6e1d6] sticky top-[130px] md:top-[146px] z-30">
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          <span
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666]"
            aria-hidden="true"
          >
            <span className="iconify" data-icon="lucide:search" data-width="20"></span>
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={language === 'tr' ? 'Ürün ara...' : 'Search items...'}
            className="w-full pl-10 pr-4 py-2.5 border border-[#dcd6ca] rounded-full bg-[#faf7f2] text-[#1a1a1a] placeholder-[#999] focus:outline-none focus:ring-2 focus:ring-[#9B111E] focus:border-transparent transition-all"
            aria-label={language === 'tr' ? 'Ürün ara' : 'Search items'}
          />
        </div>
      </div>
    </div>
  )
}

export default MenuSearch

