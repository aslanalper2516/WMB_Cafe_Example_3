import { useState, useMemo, useEffect, useRef, lazy, Suspense } from 'react'
import { menuCategories, menuItems } from '../data/menu'
import MenuHeader from '../components/MenuHeader'
import MenuCategoryBar from '../components/MenuCategoryBar'
import MenuSearch from '../components/MenuSearch'
import MenuCard from '../components/MenuCard'

// Lazy load modal for code splitting
const MenuItemModal = lazy(() => import('../components/MenuItemModal'))

function MenuPage() {
  const [language, setLanguage] = useState('tr')
  const [activeCategory, setActiveCategory] = useState(menuCategories[0]?.id || '')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedItem, setSelectedItem] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const sectionRefs = useRef({})

  // IntersectionObserver to highlight active category based on scroll
  useEffect(() => {
    if (searchTerm.trim()) return // Don't observe when searching

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            const categoryId = entry.target.getAttribute('data-category-section')
            if (categoryId && activeCategory !== categoryId) {
              setActiveCategory(categoryId)
            }
          }
        })
      },
      { threshold: 0.3, rootMargin: '-180px 0px -50% 0px' }
    )

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [activeCategory, searchTerm])

  const toggleLanguage = () => {
    setLanguage(language === 'tr' ? 'en' : 'tr')
  }

  // Filter items by search term
  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) {
      return menuItems.filter((item) => item.categoryId === activeCategory)
    }

    const searchLower = searchTerm.toLowerCase()
    return menuItems.filter((item) => {
      const nameMatch = (language === 'tr' ? item.nameTR : item.nameEN)
        .toLowerCase()
        .includes(searchLower)
      const descMatch = (language === 'tr' ? item.descTR : item.descEN)
        .toLowerCase()
        .includes(searchLower)
      return (nameMatch || descMatch) && item.categoryId === activeCategory
    })
  }, [searchTerm, activeCategory, language])

  // Group items by category for display
  const categoryItems = useMemo(() => {
    const grouped = {}
    menuCategories.forEach((cat) => {
      grouped[cat.id] = menuItems.filter((item) => item.categoryId === cat.id)
    })
    return grouped
  }, [])

  // When search is active, show all categories that have matching items
  const searchResultsByCategory = useMemo(() => {
    if (!searchTerm.trim()) return {}

    const searchLower = searchTerm.toLowerCase()
    const grouped = {}

    menuCategories.forEach((cat) => {
      const matching = menuItems.filter((item) => {
        if (item.categoryId !== cat.id) return false
        const nameMatch = (language === 'tr' ? item.nameTR : item.nameEN)
          .toLowerCase()
          .includes(searchLower)
        const descMatch = (language === 'tr' ? item.descTR : item.descEN)
          .toLowerCase()
          .includes(searchLower)
        return nameMatch || descMatch
      })
      if (matching.length > 0) {
        grouped[cat.id] = matching
      }
    })

    return grouped
  }, [searchTerm, language])

  const handleItemClick = (item) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId)
    setSearchTerm('') // Clear search when changing category
  }

  const subtitle = language === 'tr' ? 'Günlük taze üretim' : 'Fresh daily'

  // Determine which categories/items to display
  const displayData = searchTerm.trim()
    ? searchResultsByCategory
    : { [activeCategory]: filteredItems }

  return (
    <div className="min-h-screen bg-[#faf7f2]">
      <MenuHeader
        language={language}
        onLanguageChange={toggleLanguage}
        subtitle={subtitle}
      />

      {!searchTerm && (
        <MenuCategoryBar
          categories={menuCategories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          language={language}
        />
      )}

      <MenuSearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        language={language}
      />

      <main className="max-w-7xl mx-auto px-4 py-6 pb-24">
        {searchTerm.trim() && Object.keys(searchResultsByCategory).length === 0 ? (
          // No Results
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto bg-[#e6e1d6] rounded-full flex items-center justify-center text-[#666] mb-4">
              <span className="iconify" data-icon="lucide:search-x" data-width="32"></span>
            </div>
            <h2 className="font-['Playfair_Display'] text-2xl text-[#1a1a1a] mb-3 font-semibold">
              {language === 'tr' ? 'Sonuç bulunamadı' : 'No results found'}
            </h2>
            <p className="text-[#666] mb-6 font-light">
              {language === 'tr'
                ? 'Farklı bir arama terimi deneyin veya kategorilere göz atın.'
                : 'Try a different search term or browse categories.'}
            </p>
            <button
              onClick={() => setSearchTerm('')}
              className="text-[#9B111E] hover:underline font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E] rounded-sm"
            >
              {language === 'tr' ? 'Aramayı temizle' : 'Clear search'}
            </button>
          </div>
        ) : (
          // Menu Sections
          <>
            {Object.entries(displayData).map(([categoryId, items]) => {
              const category = menuCategories.find((cat) => cat.id === categoryId)
              if (!category || items.length === 0) return null

              return (
                <section
                  key={categoryId}
                  ref={(el) => (sectionRefs.current[categoryId] = el)}
                  data-category-section={categoryId}
                  className="mb-12 scroll-mt-[180px]"
                >
                  <h2 className="font-['Playfair_Display'] text-2xl md:text-3xl text-[#1a1a1a] mb-6 font-semibold">
                    {language === 'tr' ? category.nameTR : category.nameEN}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {items.map((item) => (
                      <MenuCard
                        key={item.id}
                        item={item}
                        language={language}
                        onClick={handleItemClick}
                      />
                    ))}
                  </div>
                </section>
              )
            })}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#e6e1d6] py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center space-y-4 mb-6">
            <p className="text-xs text-[#666] font-light">
              {language === 'tr'
                ? 'Alerjen bilgileri hakkında detaylı bilgi için lütfen çalışanlarımızdan bilgi alın.'
                : 'Please ask our staff for detailed allergen information.'}
            </p>
            <p className="text-xs text-[#666] font-light">
              {language === 'tr'
                ? 'Fiyatlar değişiklik gösterebilir.'
                : 'Prices may change.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <a
              href="tel:+902121234567"
              className="flex items-center gap-2 text-[#4a4a4a] hover:text-[#9B111E] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E] rounded-sm"
            >
              <span className="iconify" data-icon="lucide:phone" data-width="18"></span>
              <span>+90 212 123 45 67</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-2 text-[#4a4a4a] hover:text-[#9B111E] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E] rounded-sm"
            >
              <span className="iconify" data-icon="lucide:map-pin" data-width="18"></span>
              <span>{language === 'tr' ? 'Konum' : 'Location'}</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-2 text-[#4a4a4a] hover:text-[#9B111E] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E] rounded-sm"
            >
              <span className="iconify" data-icon="lucide:instagram" data-width="18"></span>
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </footer>

      {/* Item Modal - Lazy loaded */}
      {isModalOpen && (
        <Suspense fallback={null}>
          <MenuItemModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            item={selectedItem}
            language={language}
          />
        </Suspense>
      )}
    </div>
  )
}

export default MenuPage

