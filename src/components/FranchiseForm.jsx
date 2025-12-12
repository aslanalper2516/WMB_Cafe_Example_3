import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'

function FranchiseForm({ onSuccess }) {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    investmentRange: '',
    notes: '',
    consent: false
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const formStartTracked = useRef(false)

  // Track form start (first focus)
  useEffect(() => {
    if (!formStartTracked.current) {
      const handleFirstFocus = () => {
        if (typeof window !== 'undefined' && window.dataLayer) {
          window.dataLayer.push({ event: 'franchise_form_start' })
        }
        formStartTracked.current = true
      }

      const inputs = document.querySelectorAll('#application input, #application textarea, #application select')
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

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = t('franchisePage.form.errors.fullNameRequired')
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t('franchisePage.form.errors.emailRequired')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('franchisePage.form.errors.emailInvalid')
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = t('franchisePage.form.errors.phoneRequired')
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = t('franchisePage.form.errors.phoneInvalid')
    }
    
    if (!formData.city.trim()) {
      newErrors.city = t('franchisePage.form.errors.cityRequired')
    }
    
    if (!formData.investmentRange) {
      newErrors.investmentRange = t('franchisePage.form.errors.investmentRequired')
    }
    
    if (!formData.consent) {
      newErrors.consent = t('franchisePage.form.errors.consentRequired')
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus(null)

    // Analytics hook
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({ event: 'franchise_form_submit_attempt' })
    }

    try {
      // Mock API call
      const response = await fetch('/api/franchise-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setSubmitStatus('success')
        if (typeof window !== 'undefined' && window.dataLayer) {
          window.dataLayer.push({ event: 'franchise_form_submit_success' })
        }
        if (onSuccess) onSuccess()
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          city: '',
          investmentRange: '',
          notes: '',
          consent: false
        })
      } else {
        throw new Error('Submission failed')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({ event: 'franchise_form_submit_error' })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form id="franchise-form-page" onSubmit={handleSubmit} className="space-y-6">
      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-[#4a4a4a] mb-2">
          {t('franchisePage.form.fields.fullName')} *
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

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[#4a4a4a] mb-2">
          {t('franchisePage.form.fields.email')} *
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

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-[#4a4a4a] mb-2">
          {t('franchisePage.form.fields.phone')} *
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

      {/* City */}
      <div>
        <label htmlFor="city" className="block text-sm font-medium text-[#4a4a4a] mb-2">
          {t('franchisePage.form.fields.city')} *
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

      {/* Investment Range */}
      <div>
        <label htmlFor="investmentRange" className="block text-sm font-medium text-[#4a4a4a] mb-2">
          {t('franchisePage.form.fields.investmentRange')} *
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
          <option value="">{t('franchisePage.form.selectInvestment')}</option>
          <option value="500k-1m">{t('franchisePage.form.options.investment1')}</option>
          <option value="1m-2m">{t('franchisePage.form.options.investment2')}</option>
          <option value="2m-3m">{t('franchisePage.form.options.investment3')}</option>
          <option value="3m+">{t('franchisePage.form.options.investment4')}</option>
        </select>
        {errors.investmentRange && (
          <p id="investmentRange-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.investmentRange}
          </p>
        )}
      </div>

      {/* Notes */}
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-[#4a4a4a] mb-2">
          {t('franchisePage.form.fields.notes')}
        </label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 border border-[#dcd6ca] rounded-sm focus:outline-none focus:ring-2 focus:ring-[#9B111E] focus:border-transparent"
        />
      </div>

      {/* Consent */}
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
            {t('franchisePage.form.fields.consentText')} *
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
            <span className="font-medium">{t('franchisePage.form.messages.success')}</span>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-sm p-4 text-red-800" role="alert">
          <div className="flex items-center gap-2">
            <span className="iconify" data-icon="lucide:alert-circle" data-width="20"></span>
            <span className="font-medium">{t('franchisePage.form.messages.error')}</span>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[#9B111E] text-white px-8 py-4 rounded-sm text-base font-medium uppercase tracking-wider hover:bg-[#7a0d17] transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? t('franchisePage.form.submitting') : t('franchisePage.form.submit')}
      </button>
    </form>
  )
}

export default FranchiseForm

