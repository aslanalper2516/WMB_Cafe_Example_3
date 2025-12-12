import { useLanguage } from '../context/LanguageContext'

function LocationCard({ location }) {
  const { t } = useLanguage()

  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return 'bg-green-600 text-white'
      case 'coming_soon':
        return 'bg-[#D4AF37] text-white'
      default:
        return 'bg-gray-600 text-white'
    }
  }

  const getStatusText = (status) => {
    const statusMap = {
      open: t('locations.status.open'),
      coming_soon: t('locations.status.comingSoon')
    }
    return statusMap[status] || status
  }

  return (
    <div className="bg-white border border-[#e6e1d6] rounded-sm p-6 md:p-8 hover:shadow-premium-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-['Playfair_Display'] text-2xl md:text-3xl text-[#1a1a1a] mb-2 font-semibold">
            {location.city}
          </h3>
          {location.district && (
            <p className="text-sm md:text-base text-[#666] font-medium mb-3">
              {location.district}
            </p>
          )}
        </div>
        {location.status && (
          <span
            className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-sm ${getStatusColor(location.status)}`}
          >
            {getStatusText(location.status)}
          </span>
        )}
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-start gap-3">
          <span className="text-[#9B111E] mt-1 flex-shrink-0">
            <span className="iconify" data-icon="lucide:map-pin" data-width="20"></span>
          </span>
          <p className="text-sm md:text-base text-[#4a4a4a] leading-relaxed font-light">
            {location.address}
          </p>
        </div>

        {location.phone && (
          <div className="flex items-center gap-3">
            <span className="text-[#9B111E] flex-shrink-0">
              <span className="iconify" data-icon="lucide:phone" data-width="20"></span>
            </span>
            <a
              href={`tel:${location.phone}`}
              className="text-sm md:text-base text-[#4a4a4a] hover:text-[#9B111E] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E] rounded-sm"
            >
              {location.phone}
            </a>
          </div>
        )}

        {location.hours && (
          <div className="flex items-start gap-3">
            <span className="text-[#9B111E] mt-1 flex-shrink-0">
              <span className="iconify" data-icon="lucide:clock" data-width="20"></span>
            </span>
            <p className="text-sm md:text-base text-[#4a4a4a] leading-relaxed font-light">
              {location.hours}
            </p>
          </div>
        )}
      </div>

      {location.note && (
        <p className="text-sm text-[#666] leading-relaxed font-light pt-4 border-t border-[#e6e1d6]">
          {location.note}
        </p>
      )}
    </div>
  )
}

export default LocationCard

