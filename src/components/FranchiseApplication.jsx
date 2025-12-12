import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { useScrollReveal } from '../hooks/useScrollReveal'

function FranchiseApplication() {
  const { t } = useLanguage()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    investmentRange: '',
    preferredContactTime: '',
    notes: '',
    consent: false
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | null
  const formStartTracked = useRef(false)
  const sectionRef = useScrollReveal({ threshold: 0.2 })

  // Track form start (first focus)
  useEffect(() => {
    if (!formStartTracked.current) {
      const handleFirstFocus = () => {
        if (typeof window !== 'undefined' && window.dataLayer) {
          window.dataLayer.push({ event: 'franchise_form_start' })
        }
        formStartTracked.current = true
      }

      const inputs = document.querySelectorAll('#franchise-form input, #franchise-form textarea, #franchise-form select')
      inputs.forEach((input) => {
        input.addEventListener('focus', handleFirstFocus, { once: true })
      })

      return () => {
        inputs.forEach((input) => {
          input.removeEventListener('focus', handleFirstFocus)
        })
      }
    }
  }, [])

  const validateStep = (step) => {
    const newErrors = {}
    
    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = t('franchise.form.errors.fullNameRequired')
      if (!formData.email.trim()) {
        newErrors.email = t('franchise.form.errors.emailRequired')
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = t('franchise.form.errors.emailInvalid')
      }
      if (!formData.phone.trim()) {
        newErrors.phone = t('franchise.form.errors.phoneRequired')
      } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
        newErrors.phone = t('franchise.form.errors.phoneInvalid')
      }
    } else if (step === 2) {
      if (!formData.city.trim()) newErrors.city = t('franchise.form.errors.cityRequired')
      if (!formData.investmentRange) newErrors.investmentRange = t('franchise.form.errors.investmentRequired')
      if (!formData.preferredContactTime) newErrors.preferredContactTime = t('franchise.form.errors.contactTimeRequired')
    } else if (step === 3) {
      if (!formData.consent) newErrors.consent = t('franchise.form.errors.consentRequired')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
    // Clear error for this field
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateStep(3)) return

    setIsSubmitting(true)
    setSubmitStatus(null)

    // Analytics hook
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({ event: 'franchise_form_submit_attempt' })
    }

    try {
      // Mock API call - replace with actual endpoint
      const response = await fetch('/api/franchise-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setSubmitStatus('success')
        // Analytics hook
        if (typeof window !== 'undefined' && window.dataLayer) {
          window.dataLayer.push({ event: 'franchise_form_submit_success' })
        }
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          city: '',
          investmentRange: '',
          preferredContactTime: '',
          notes: '',
          consent: false
        })
        setCurrentStep(1)
      } else {
        throw new Error('Submission failed')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
      // Analytics hook
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({ event: 'franchise_form_submit_error' })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const steps = [
    { number: 1, title: t('franchise.form.steps.step1') },
    { number: 2, title: t('franchise.form.steps.step2') },
    { number: 3, title: t('franchise.form.steps.step3') }
  ]

  return (
    <section id="franchise-application" className="py-32 md:py-40 bg-white">
      <div ref={sectionRef} className="max-w-4xl mx-auto px-6 scroll-reveal">
        <div className="text-center mb-12">
          <span className="text-[#9B111E] text-xs font-bold uppercase tracking-widest block mb-4">
            {t('franchise.form.label')}
          </span>
          <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl text-[#1a1a1a] mb-4">
            {t('franchise.form.title')}
          </h2>
          <p className="text-[#666] text-base md:text-lg max-w-2xl mx-auto">
            {t('franchise.form.description')}
          </p>
        </div>

        {/* Steps Indicator */}
        <div className="flex items-center justify-center mb-12">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                    currentStep >= step.number
                      ? 'bg-[#9B111E] text-white'
                      : 'bg-[#e6e1d6] text-[#666]'
                  }`}
                >
                  {currentStep > step.number ? (
                    <span className="iconify" data-icon="lucide:check" data-width="20"></span>
                  ) : (
                    step.number
                  )}
                </div>
                <span className={`mt-2 text-xs font-medium hidden md:block ${
                  currentStep >= step.number ? 'text-[#9B111E]' : 'text-[#666]'
                }`}>
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-16 md:w-24 h-0.5 mx-2 md:mx-4 transition-all ${
                    currentStep > step.number ? 'bg-[#9B111E]' : 'bg-[#e6e1d6]'
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>

        {/* Form */}
        <form id="franchise-form" onSubmit={handleSubmit} className="bg-[#faf7f2] border border-[#e6e1d6] rounded-sm p-8 md:p-12">
          {/* Step 1: Contact Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="font-['Playfair_Display'] text-2xl text-[#1a1a1a] mb-6">
                {t('franchise.form.steps.step1')}
              </h3>
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-[#4a4a4a] mb-2">
                  {t('franchise.form.fields.fullName')} *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#9B111E] focus:border-transparent ${
                    errors.fullName ? 'border-red-500' : 'border-[#dcd6ca]'
                  }`}
                  aria-invalid={!!errors.fullName}
                  aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                />
                {errors.fullName && (
                  <p id="fullName-error" className="mt-1 text-sm text-red-600" role="alert">
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#4a4a4a] mb-2">
                  {t('franchise.form.fields.email')} *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#9B111E] focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-[#dcd6ca]'
                  }`}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-[#4a4a4a] mb-2">
                  {t('franchise.form.fields.phone')} *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#9B111E] focus:border-transparent ${
                    errors.phone ? 'border-red-500' : 'border-[#dcd6ca]'
                  }`}
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                />
                {errors.phone && (
                  <p id="phone-error" className="mt-1 text-sm text-red-600" role="alert">
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Honeypot field */}
              <input
                type="text"
                name="website"
                style={{ position: 'absolute', left: '-9999px' }}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-[#9B111E] text-white px-8 py-3 rounded-sm text-sm font-medium uppercase tracking-wider hover:bg-[#7a0d17] transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E]"
                >
                  {t('franchise.form.buttons.next')}
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Location & Investment */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="font-['Playfair_Display'] text-2xl text-[#1a1a1a] mb-6">
                {t('franchise.form.steps.step2')}
              </h3>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-[#4a4a4a] mb-2">
                  {t('franchise.form.fields.city')} *
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#9B111E] focus:border-transparent ${
                    errors.city ? 'border-red-500' : 'border-[#dcd6ca]'
                  }`}
                  aria-invalid={!!errors.city}
                  aria-describedby={errors.city ? 'city-error' : undefined}
                />
                {errors.city && (
                  <p id="city-error" className="mt-1 text-sm text-red-600" role="alert">
                    {errors.city}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="investmentRange" className="block text-sm font-medium text-[#4a4a4a] mb-2">
                  {t('franchise.form.fields.investmentRange')} *
                </label>
                <select
                  id="investmentRange"
                  name="investmentRange"
                  value={formData.investmentRange}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#9B111E] focus:border-transparent ${
                    errors.investmentRange ? 'border-red-500' : 'border-[#dcd6ca]'
                  }`}
                  aria-invalid={!!errors.investmentRange}
                  aria-describedby={errors.investmentRange ? 'investmentRange-error' : undefined}
                >
                  <option value="">{t('franchise.form.fields.selectInvestment')}</option>
                  <option value="500k-1m">{t('franchise.form.options.investment1')}</option>
                  <option value="1m-2m">{t('franchise.form.options.investment2')}</option>
                  <option value="2m-3m">{t('franchise.form.options.investment3')}</option>
                  <option value="3m+">{t('franchise.form.options.investment4')}</option>
                </select>
                {errors.investmentRange && (
                  <p id="investmentRange-error" className="mt-1 text-sm text-red-600" role="alert">
                    {errors.investmentRange}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="preferredContactTime" className="block text-sm font-medium text-[#4a4a4a] mb-2">
                  {t('franchise.form.fields.preferredContactTime')} *
                </label>
                <select
                  id="preferredContactTime"
                  name="preferredContactTime"
                  value={formData.preferredContactTime}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-[#9B111E] focus:border-transparent ${
                    errors.preferredContactTime ? 'border-red-500' : 'border-[#dcd6ca]'
                  }`}
                  aria-invalid={!!errors.preferredContactTime}
                  aria-describedby={errors.preferredContactTime ? 'preferredContactTime-error' : undefined}
                >
                  <option value="">{t('franchise.form.fields.selectContactTime')}</option>
                  <option value="morning">{t('franchise.form.options.time1')}</option>
                  <option value="afternoon">{t('franchise.form.options.time2')}</option>
                  <option value="evening">{t('franchise.form.options.time3')}</option>
                </select>
                {errors.preferredContactTime && (
                  <p id="preferredContactTime-error" className="mt-1 text-sm text-red-600" role="alert">
                    {errors.preferredContactTime}
                  </p>
                )}
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="px-8 py-3 border border-[#dcd6ca] text-[#4a4a4a] rounded-sm text-sm font-medium hover:bg-[#faf7f2] transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E]"
                >
                  {t('franchise.form.buttons.previous')}
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-[#9B111E] text-white px-8 py-3 rounded-sm text-sm font-medium uppercase tracking-wider hover:bg-[#7a0d17] transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E]"
                >
                  {t('franchise.form.buttons.next')}
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Additional Info & Consent */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="font-['Playfair_Display'] text-2xl text-[#1a1a1a] mb-6">
                {t('franchise.form.steps.step3')}
              </h3>
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-[#4a4a4a] mb-2">
                  {t('franchise.form.fields.notes')}
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 border border-[#dcd6ca] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#9B111E] focus:border-transparent"
                />
              </div>

              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="mt-1 w-5 h-5 text-[#9B111E] border-[#dcd6ca] rounded focus:ring-2 focus:ring-[#9B111E] focus:ring-offset-2"
                    aria-invalid={!!errors.consent}
                    aria-describedby={errors.consent ? 'consent-error' : undefined}
                  />
                  <span className="text-sm text-[#4a4a4a] leading-relaxed">
                    {t('franchise.form.fields.consentText')} *
                  </span>
                </label>
                {errors.consent && (
                  <p id="consent-error" className="mt-2 text-sm text-red-600" role="alert">
                    {errors.consent}
                  </p>
                )}
              </div>

              {/* Submit Status Messages */}
              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-sm p-4 text-green-800" role="alert">
                  <div className="flex items-center gap-2">
                    <span className="iconify" data-icon="lucide:check-circle" data-width="20"></span>
                    <span className="font-medium">{t('franchise.form.messages.success')}</span>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-sm p-4 text-red-800" role="alert">
                  <div className="flex items-center gap-2">
                    <span className="iconify" data-icon="lucide:alert-circle" data-width="20"></span>
                    <span className="font-medium">{t('franchise.form.messages.error')}</span>
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="px-8 py-3 border border-[#dcd6ca] text-[#4a4a4a] rounded-sm text-sm font-medium hover:bg-[#faf7f2] transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E]"
                >
                  {t('franchise.form.buttons.previous')}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.consent}
                  className="bg-[#9B111E] text-white px-8 py-3 rounded-sm text-sm font-medium uppercase tracking-wider hover:bg-[#7a0d17] transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? t('franchise.form.buttons.submitting') : t('franchise.form.buttons.submit')}
                </button>
              </div>
            </div>
          )}
        </form>

        {/* Rate Limit Comment: Implement rate limiting on server side */}
      </div>
    </section>
  )
}

export default FranchiseApplication

