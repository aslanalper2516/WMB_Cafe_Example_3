import { useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'

function ProductModal({ isOpen, onClose, product }) {
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

  const { t } = useLanguage()

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
        <div className="bg-white rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          {/* Header */}
          <div className="relative p-6 border-b border-[#e6e1d6]">
            <button
              ref={firstFocusableRef}
              onClick={onClose}
              className="absolute top-4 right-4 text-[#4a4a4a] hover:text-[#9B111E] transition-colors p-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E] rounded-sm"
              aria-label="Close modal"
            >
              <span className="iconify" data-icon="lucide:x" data-width="24"></span>
            </button>
            <h2 id="product-modal-title" className="font-['Playfair_Display'] text-2xl md:text-3xl text-[#1a1a1a] pr-12">
              {product.title}
            </h2>
            {product.isSignature && (
              <span className="inline-block mt-3 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                İmza Ürün
              </span>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            {product.image && (
              <div className="aspect-video overflow-hidden rounded-sm mb-6 bg-[#e8e4dc]">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover img-bakery"
                  loading="lazy"
                />
              </div>
            )}

            <p className="text-[#4a4a4a] text-base md:text-lg leading-relaxed mb-6">
              {product.description}
            </p>

            {product.ingredients && (
              <div className="mb-6">
                <h3 className="font-semibold text-lg text-[#1a1a1a] mb-3">İçindekiler</h3>
                <p className="text-[#666] text-sm md:text-base leading-relaxed">
                  {product.ingredients}
                </p>
              </div>
            )}

            {product.addOns && product.addOns.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-lg text-[#1a1a1a] mb-3">Önerilen Eşlikler</h3>
                <ul className="space-y-2">
                  {product.addOns.map((addOn, index) => (
                    <li key={index} className="flex items-center gap-2 text-[#666] text-sm md:text-base">
                      <span className="text-[#9B111E]">
                        <span className="iconify" data-icon="lucide:check" data-width="18"></span>
                      </span>
                      {addOn}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex gap-4 pt-4 border-t border-[#e6e1d6]">
              <a
                href="#wholesale"
                className="flex-1 bg-[#9B111E] text-white px-6 py-3 rounded-sm text-sm font-medium uppercase tracking-wider hover:bg-[#7a0d17] transition-all text-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E]"
              >
                Toptan Katalog
              </a>
              <button
                ref={lastFocusableRef}
                onClick={onClose}
                className="px-6 py-3 border border-[#dcd6ca] text-[#4a4a4a] rounded-sm text-sm font-medium hover:bg-[#faf7f2] transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E]"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductModal

