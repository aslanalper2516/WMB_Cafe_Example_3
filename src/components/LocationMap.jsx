import { useLanguage } from '../context/LanguageContext'

function LocationMap({ locations }) {
  const { t } = useLanguage()

  // Generate Google Maps embed URL with markers
  // For production, you would use Google Maps API with proper markers
  // This is a placeholder that shows Istanbul area
  const generateMapUrl = () => {
    if (locations.length === 0) {
      // Default to Istanbul center if no locations
      return 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d385395.5590087968!2d28.6825!3d41.0082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa7040068086b%3A0xe1ccfe98bc01b0d0!2zxLBzdGFuYnVs!5e0!3m2!1str!2str!4v1234567890'
    }

    // In production, build proper embed URL with markers
    // For now, using a generic Istanbul map
    return 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d385395.5590087968!2d28.6825!3d41.0082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa7040068086b%3A0xe1ccfe98bc01b0d0!2zxLBzdGFuYnVs!5e0!3m2!1str!2str!4v1234567890'
  }

  return (
    <div className="w-full h-[400px] md:h-[500px] rounded-sm overflow-hidden border border-[#e6e1d6]">
      <iframe
        src={generateMapUrl()}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={t('locations.map.title')}
        aria-label={t('locations.map.ariaLabel')}
      />
    </div>
  )
}

export default LocationMap

