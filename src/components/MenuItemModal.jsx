import { useEffect, useRef } from 'react'

function MenuItemModal({ isOpen, onClose, item, language }) {
  const modalRef = useRef(null)
  const firstFocusableRef = useRef(null)
  const lastFocusableRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    const handleFocusTrap = (e) => {
      if (e.key !== 'Tab') return

      const focusableElements = modalRef.current.querySelectorAll(
        'a, button, [tabindex]:not([tabindex="-1"])'
      )
      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault()
        lastElement.focus()
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.addEventListener('keydown', handleFocusTrap)
    document.body.style.overflow = 'hidden'

    setTimeout(() => {
      const firstElement = modalRef.current.querySelector('button')
      if (firstElement) firstElement.focus()
    }, 100)

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('keydown', handleFocusTrap)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen || !item) return null

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

  const getAllergenText = (allergen) => {
    const allergens = {
      gluten: language === 'tr' ? 'Gluten' : 'Gluten',
      milk: language === 'tr' ? 'Süt' : 'Milk',
      eggs: language === 'tr' ? 'Yumurta' : 'Eggs',
      nuts: language === 'tr' ? 'Kuruyemiş' : 'Nuts',
      sesame: language === 'tr' ? 'Susam' : 'Sesame'
    }
    return allergens[allergen] || allergen
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={modalRef}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="menu-item-modal-title"
      >
        <div className="bg-white rounded-2xl max-w-2xl w-full my-8 shadow-2xl">
          {/* Header */}
          <div className="relative p-6 border-b border-[#e6e1d6]">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-[#4a4a4a] hover:text-[#9B111E] transition-colors p-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E] rounded-full"
              aria-label={language === 'tr' ? 'Kapat' : 'Close'}
            >
              <span className="iconify" data-icon="lucide:x" data-width="24"></span>
            </button>
            <h2
              id="menu-item-modal-title"
              className="font-['Playfair_Display'] text-2xl md:text-3xl text-[#1a1a1a] pr-12 font-semibold"
            >
              {language === 'tr' ? item.nameTR : item.nameEN}
            </h2>
            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded-full ${getTagColor(tag)}`}
                  >
                    {getTagText(tag)}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Image */}
            <div className="aspect-video rounded-xl overflow-hidden bg-[#e8e4dc] mb-6">
              <img
                src={item.imageUrl}
                alt={language === 'tr' ? item.nameTR : item.nameEN}
                className="w-full h-full object-cover img-bakery"
                width={1200}
                height={675}
                loading="eager"
                decoding="async"
                sizes="(max-width: 768px) 100vw, 672px"
              />
            </div>

            {/* Description */}
            <p className="text-base md:text-lg text-[#4a4a4a] leading-relaxed mb-6 font-light">
              {language === 'tr' ? item.descTR : item.descEN}
            </p>

            {/* Price */}
            <div className="mb-6 pb-6 border-b border-[#e6e1d6]">
              <span className="text-2xl font-semibold text-[#9B111E]">
                {item.price} {item.currency}
              </span>
            </div>

            {/* Allergens */}
            {item.allergens && item.allergens.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-lg text-[#1a1a1a] mb-3">
                  {language === 'tr' ? 'Alerjenler' : 'Allergens'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {item.allergens.map((allergen) => (
                    <span
                      key={allergen}
                      className="px-3 py-1.5 bg-[#faf7f2] border border-[#e6e1d6] text-[#4a4a4a] text-sm rounded-full font-medium"
                    >
                      {getAllergenText(allergen)}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Availability */}
            {!item.available && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-800 text-sm mb-6">
                <div className="flex items-center gap-2">
                  <span className="iconify" data-icon="lucide:alert-circle" data-width="20"></span>
                  <span className="font-medium">
                    {language === 'tr' ? 'Şu anda müsait değil' : 'Currently unavailable'}
                  </span>
                </div>
              </div>
            )}

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-full bg-[#9B111E] text-white px-6 py-3 rounded-xl text-base font-medium hover:bg-[#7a0d17] transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E]"
            >
              {language === 'tr' ? 'Kapat' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default MenuItemModal

