import { useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'

function ProductDetailModal({ isOpen, onClose, product }) {
  const modalRef = useRef(null)
  const { t } = useLanguage()

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

    // Focus first element
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

  if (!isOpen || !product) return null

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
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
      >
        <div className="bg-white rounded-sm max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          {/* Header */}
          <div className="relative p-6 border-b border-[#e6e1d6]">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-[#4a4a4a] hover:text-[#9B111E] transition-colors p-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E] rounded-sm"
              aria-label={t('products.modal.close')}
            >
              <span className="iconify" data-icon="lucide:x" data-width="24"></span>
            </button>
            <div className="flex items-start gap-4 pr-12">
              <h2 id="product-modal-title" className="font-['Playfair_Display'] text-3xl md:text-4xl text-[#1a1a1a] flex-1">
                {t(`products.items.${product.key}.name`)}
              </h2>
              {product.badge && (
                <span className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-sm ${getBadgeColor(product.badge)}`}>
                  {getBadgeText(product.badge)}
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              {/* Image */}
              <div className="aspect-square overflow-hidden rounded-sm bg-[#e8e4dc]">
                <img
                  src={product.image}
                  alt={product.alt || t(`products.items.${product.key}.name`)}
                  className="w-full h-full object-cover img-bakery"
                  loading="eager"
                />
              </div>

              {/* Details */}
              <div>
                <p className="text-lg text-[#4a4a4a] leading-relaxed mb-6 font-light">
                  {t(`products.items.${product.key}.description`)}
                </p>

                {/* Ingredients */}
                {product.ingredients && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-lg text-[#1a1a1a] mb-3">
                      {t('products.modal.ingredients')}
                    </h3>
                    <p className="text-sm md:text-base text-[#666] leading-relaxed">
                      {product.ingredients}
                    </p>
                  </div>
                )}

                {/* Operational Notes */}
                {product.operationalNotes && product.operationalNotes.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-lg text-[#1a1a1a] mb-3">
                      {t('products.modal.operational')}
                    </h3>
                    <ul className="space-y-2">
                      {product.operationalNotes.map((note, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm md:text-base text-[#666]">
                          <span className="text-[#9B111E] mt-1 flex-shrink-0">
                            <span className="iconify" data-icon="lucide:check" data-width="18"></span>
                          </span>
                          <span>{t(`products.operational.${note}`)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-6 border-t border-[#e6e1d6]">
              <a
                href="#wholesale"
                className="flex-1 bg-[#9B111E] text-white px-6 py-3 rounded-sm text-sm font-medium uppercase tracking-wider hover:bg-[#7a0d17] transition-all text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E]"
              >
                {t('products.modal.requestCatalog')}
              </a>
              <button
                onClick={onClose}
                className="px-6 py-3 border border-[#dcd6ca] text-[#4a4a4a] rounded-sm text-sm font-medium hover:bg-[#faf7f2] transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E]"
              >
                {t('products.modal.close')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductDetailModal

