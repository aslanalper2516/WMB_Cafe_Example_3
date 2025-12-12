import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-[#f2efe9] pt-24 md:pt-32 border-t border-[#dcd6ca]">
      {/* Trust Row */}
      <div className="max-w-7xl mx-auto px-6 py-8 border-b border-[#dcd6ca]">
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <span className="iconify text-[#9B111E] mb-2" data-icon="lucide:shield-check" data-width="32"></span>
            <span className="text-sm font-medium text-[#4a4a4a]">Gıda Güvenliği Standartları</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="iconify text-[#9B111E] mb-2" data-icon="lucide:factory" data-width="32"></span>
            <span className="text-sm font-medium text-[#4a4a4a]">Merkezi Üretim</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="iconify text-[#9B111E] mb-2" data-icon="lucide:headphones" data-width="32"></span>
            <span className="text-sm font-medium text-[#4a4a4a]">Franchise Desteği</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20 pt-12">
        <div className="grid md:grid-cols-3 gap-12 md:gap-16 mb-12">
          {/* Brand Col */}
          <div className="space-y-6">
            <div className="font-['Playfair_Display'] font-bold text-2xl tracking-tight leading-none text-[#1a1a1a]">
              WMB<br />
              <span className="text-[#9B111E]">Fırın</span>
            </div>
            <p className="text-[#5a5a5a] text-sm md:text-base leading-relaxed max-w-sm">
              {t('footer.description')}
            </p>
            <p className="text-xs text-[#888] leading-relaxed max-w-sm">
              Join our franchise family and bring authentic Turkish bakery traditions to your community. Established since 1895, we're growing together.
            </p>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="w-11 h-11 rounded-full border border-[#dcd6ca] flex items-center justify-center text-[#1a1a1a] hover:bg-[#9B111E] hover:border-[#9B111E] hover:text-white transition-all hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E]"
                aria-label="Instagram"
              >
                <span className="iconify" data-icon="lucide:instagram" data-width="18"></span>
              </a>
              <a 
                href="#" 
                className="w-11 h-11 rounded-full border border-[#dcd6ca] flex items-center justify-center text-[#1a1a1a] hover:bg-[#9B111E] hover:border-[#9B111E] hover:text-white transition-all hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E]"
                aria-label="Facebook"
              >
                <span className="iconify" data-icon="lucide:facebook" data-width="18"></span>
              </a>
              <a 
                href="#" 
                className="w-11 h-11 rounded-full border border-[#dcd6ca] flex items-center justify-center text-[#1a1a1a] hover:bg-[#9B111E] hover:border-[#9B111E] hover:text-white transition-all hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E]"
                aria-label="Twitter"
              >
                <span className="iconify" data-icon="lucide:twitter" data-width="18"></span>
              </a>
            </div>
          </div>

          {/* Links Col */}
          <div>
            <h4 className="font-['Playfair_Display'] text-lg md:text-xl font-semibold mb-8">{t('footer.quickMenu')}</h4>
            <ul className="space-y-4 text-sm md:text-base text-[#5a5a5a]">
              <li>
                <Link to="/about" className="hover:text-[#9B111E] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E] rounded-sm inline-block">
                  {t('footer.ourStory')}
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-[#9B111E] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E] rounded-sm inline-block">
                  {t('footer.products')}
                </Link>
              </li>
              <li>
                <Link to="/franchise" className="hover:text-[#9B111E] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E] rounded-sm inline-block">
                  {t('footer.franchiseApplication')}
                </Link>
              </li>
              <li>
                <Link to="/products#wholesale-cta" className="hover:text-[#9B111E] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E] rounded-sm inline-block">
                  {t('footer.wholesale')}
                </Link>
              </li>
              <li>
                <Link to="/locations" className="hover:text-[#9B111E] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E] rounded-sm inline-block">
                  {t('footer.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="font-['Playfair_Display'] text-lg md:text-xl font-semibold mb-8">{t('footer.contactInfo')}</h4>
            <ul className="space-y-5 text-sm md:text-base text-[#5a5a5a]">
              <li className="flex items-start gap-3">
                <span className="iconify text-[#9B111E] mt-1 flex-shrink-0" data-icon="lucide:map-pin" data-width="18"></span>
                <span className="leading-relaxed">Merkez Mah. Sarıyer Cad. No:1<br />Sarıyer, Istanbul, Turkey</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="iconify text-[#9B111E] flex-shrink-0" data-icon="lucide:phone" data-width="18"></span>
                <a href="tel:+902121234567" className="hover:text-[#9B111E] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E] rounded-sm">
                  +90 212 123 45 67
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="iconify text-[#9B111E] flex-shrink-0" data-icon="lucide:mail" data-width="18"></span>
                <span className="text-[#5a5a5a] text-sm md:text-base">İş Talepleri:</span>
                <a href="mailto:info@wmbfirin.com" className="hover:text-[#9B111E] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9B111E] rounded-sm">
                  info@wmbfirin.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-[#9B111E] text-white/90 text-xs md:text-sm py-5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p>© 2025 WMB Fırın. {t('footer.rights')}</p>
          <div className="flex gap-6 opacity-90">
            <a 
              href="#" 
              className="hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 rounded-sm px-1"
            >
              {t('footer.privacy')}
            </a>
            <a 
              href="#" 
              className="hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 rounded-sm px-1"
            >
              {t('footer.terms')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
