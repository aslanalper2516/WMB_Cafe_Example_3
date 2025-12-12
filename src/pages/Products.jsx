import { useState, useMemo, lazy, Suspense } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useScrollReveal } from '../hooks/useScrollReveal'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import ProductFilters from '../components/ProductFilters'

// Lazy load modal for code splitting
const ProductDetailModal = lazy(() => import('../components/ProductDetailModal'))

function Products() {
  const { t } = useLanguage()
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const heroRef = useScrollReveal({ threshold: 0.2 })
  const ctaRef = useScrollReveal({ threshold: 0.2 })

  // Product data - would typically come from API/DB
  const allProducts = [
    // Börek Category
    {
      key: 'kiymali',
      category: 'borek',
      image: 'https://www.ardaninmutfagi.com/wp-content/uploads/2019/05/kiymali-borek-d.jpg',
      fallback: 'https://images.unsplash.com/photo-1626203704102-fd47cebb6a53?auto=format&fit=crop&w=900&q=80',
      alt: 'Kıymalı börek',
      badge: 'signature',
      ingredients: 'Kıyma, soğan, maydanoz, yufka, tereyağı',
      operationalNotes: ['central_production', 'daily_fresh']
    },
    {
      key: 'ispanakli',
      category: 'borek',
      image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=900&q=80',
      fallback: 'https://images.unsplash.com/photo-1534620808146-d33bb39128b2?auto=format&fit=crop&w=900&q=80',
      alt: 'Ispanaklı börek',
      badge: 'bestseller',
      ingredients: 'Taze ıspanak, beyaz peynir, yufka, tereyağı',
      operationalNotes: ['central_production', 'daily_fresh']
    },
    {
      key: 'su_boregi',
      category: 'borek',
      image: 'https://www.lepleziz.com/images/content/kolay-su-boregi_nsez.webp',
      fallback: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=900&q=80',
      alt: 'Su böreği',
      badge: null,
      ingredients: 'Beyaz peynir, maydanoz, yufka, tereyağı',
      operationalNotes: ['central_production', 'daily_fresh']
    },
    {
      key: 'sigara',
      category: 'borek',
      image: 'https://i.elele.com.tr/2/1280/720/storage/files/images/2021/09/17/sigara-boregi-PXYE_cover.jpg',
      fallback: 'https://images.unsplash.com/photo-1598713336794-59da6cc15bb7?auto=format&fit=crop&w=900&q=80',
      alt: 'Sigara böreği',
      badge: 'highmargin',
      ingredients: 'Beyaz peynir, yufka, tereyağı',
      operationalNotes: ['central_production', 'daily_fresh', 'quick_prep']
    },
    // Pastry & Desserts
    {
      key: 'baklava',
      category: 'pastry',
      image: 'https://images.unsplash.com/photo-1603532648955-039310d9ed75?auto=format&fit=crop&w=900&q=80',
      fallback: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=80',
      alt: 'Baklava',
      badge: 'signature',
      ingredients: 'Yufka, ceviz, şerbet, tereyağı',
      operationalNotes: ['central_production', 'shelf_stable']
    },
    {
      key: 'kunefe',
      category: 'pastry',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80',
      fallback: 'https://images.unsplash.com/photo-1600298881974-6be191ceeda1?auto=format&fit=crop&w=900&q=80',
      alt: 'Künefe',
      badge: 'bestseller',
      ingredients: 'Tel kadayıf, peynir, şerbet, tereyağı',
      operationalNotes: ['fresh_prep', 'high_margin']
    },
    {
      key: 'revani',
      category: 'pastry',
      image: 'https://images.unsplash.com/photo-1587241321921-91a834d6d191?auto=format&fit=crop&w=900&q=80',
      fallback: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=900&q=80',
      alt: 'Revani',
      badge: null,
      ingredients: 'Şeker, un, yumurta, şerbet',
      operationalNotes: ['central_production', 'shelf_stable']
    },
    // Bakery Staples
    {
      key: 'simit',
      category: 'staples',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80',
      fallback: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80',
      alt: 'Simit',
      badge: 'bestseller',
      ingredients: 'Un, susam, pekmez',
      operationalNotes: ['daily_fresh', 'quick_prep']
    },
    {
      key: 'pide',
      category: 'staples',
      image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=80',
      fallback: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=80',
      alt: 'Pide',
      badge: null,
      ingredients: 'Un, su, tuz, maya',
      operationalNotes: ['daily_fresh', 'quick_prep']
    },
    {
      key: 'ekmek',
      category: 'staples',
      image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=900&q=80',
      fallback: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80',
      alt: 'Ekmek',
      badge: null,
      ingredients: 'Un, su, tuz, maya',
      operationalNotes: ['daily_fresh', 'batch_production']
    },
    // Beverages
    {
      key: 'turkish_tea',
      category: 'beverages',
      image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=900&q=80',
      fallback: 'https://images.unsplash.com/photo-1534432182912-63863115e106?auto=format&fit=crop&w=900&q=80',
      alt: 'Türk çayı',
      badge: 'bestseller',
      ingredients: 'Çay yaprakları, su',
      operationalNotes: ['instant_prep', 'high_margin']
    },
    {
      key: 'coffee',
      category: 'beverages',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80',
      fallback: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80',
      alt: 'Türk kahvesi',
      badge: 'highmargin',
      ingredients: 'Kahve çekirdekleri, su, şeker',
      operationalNotes: ['instant_prep', 'high_margin']
    }
  ]

  const categories = ['borek', 'pastry', 'staples', 'beverages']

  // Filter products by category
  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') {
      return allProducts
    }
    return allProducts.filter((product) => product.category === activeCategory)
  }, [activeCategory, allProducts])

  const handleProductClick = (product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleWholesaleClick = () => {
    // Scroll to wholesale section or navigate
    const wholesaleSection = document.getElementById('wholesale-cta')
    if (wholesaleSection) {
      wholesaleSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-[#faf7f2] border-b border-[#e6e1d6]">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div ref={heroRef} className="scroll-reveal">
              <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl lg:text-6xl text-[#1a1a1a] mb-6 font-semibold">
                {t('products.hero.title')}
              </h1>
              <p className="text-lg md:text-xl text-[#4a4a4a] max-w-3xl mx-auto font-light leading-relaxed">
                {t('products.hero.subtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* Filters & Product Grid */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <ProductFilters
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.key}
                  product={product}
                  onCardClick={handleProductClick}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-lg text-[#666]">{t('products.noResults')}</p>
              </div>
            )}
          </div>
        </section>

        {/* Wholesale CTA */}
        <section id="wholesale-cta" ref={ctaRef} className="py-20 md:py-32 bg-[#faf7f2] border-y border-[#e6e1d6] scroll-reveal">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl text-[#1a1a1a] mb-6 font-semibold">
              {t('products.wholesale.title')}
            </h2>
            <p className="text-lg text-[#4a4a4a] mb-8 leading-relaxed font-light max-w-2xl mx-auto">
              {t('products.wholesale.description')}
            </p>
            <button
              onClick={handleWholesaleClick}
              className="bg-[#9B111E] text-white px-10 py-4 rounded text-base font-medium uppercase tracking-widest shadow-lg transition-all duration-300 hover:bg-[#7a0d17] hover:shadow-xl hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E]"
              aria-label={t('products.wholesale.button')}
            >
              {t('products.wholesale.button')}
            </button>
          </div>
        </section>
      </main>
      <Footer />

      {/* Product Detail Modal - Lazy loaded */}
      {isModalOpen && (
        <Suspense fallback={null}>
          <ProductDetailModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            product={selectedProduct}
          />
        </Suspense>
      )}
    </>
  )
}

export default Products

