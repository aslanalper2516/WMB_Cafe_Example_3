import { useLanguage } from '../context/LanguageContext'

function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-[#f2efe9] pt-20 border-t border-[#dcd6ca]">
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand Col */}
          <div className="space-y-6">
            <div className="font-['Playfair_Display'] font-bold text-2xl tracking-tight leading-none text-[#1a1a1a]">
              WMB<br />
              <span className="text-[#9B111E]">Fırın</span>
            </div>
            <p className="text-[#5a5a5a] text-sm leading-relaxed max-w-sm">
              {t('footer.description')}
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-[#dcd6ca] flex items-center justify-center text-[#1a1a1a] hover:bg-[#9B111E] hover:border-[#9B111E] hover:text-white transition-all">
                <span className="iconify" data-icon="lucide:instagram" data-width="18"></span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-[#dcd6ca] flex items-center justify-center text-[#1a1a1a] hover:bg-[#9B111E] hover:border-[#9B111E] hover:text-white transition-all">
                <span className="iconify" data-icon="lucide:facebook" data-width="18"></span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-[#dcd6ca] flex items-center justify-center text-[#1a1a1a] hover:bg-[#9B111E] hover:border-[#9B111E] hover:text-white transition-all">
                <span className="iconify" data-icon="lucide:twitter" data-width="18"></span>
              </a>
            </div>
          </div>

          {/* Links Col */}
          <div>
            <h4 className="font-['Playfair_Display'] text-lg font-semibold mb-6">{t('footer.quickMenu')}</h4>
            <ul className="space-y-3 text-sm text-[#5a5a5a]">
              <li><a href="#" className="hover:text-[#9B111E] transition-colors">{t('footer.ourStory')}</a></li>
              <li><a href="#" className="hover:text-[#9B111E] transition-colors">{t('footer.products')}</a></li>
              <li><a href="#" className="hover:text-[#9B111E] transition-colors">{t('footer.franchiseApplication')}</a></li>
              <li><a href="#" className="hover:text-[#9B111E] transition-colors">{t('footer.wholesale')}</a></li>
              <li><a href="#" className="hover:text-[#9B111E] transition-colors">{t('footer.contact')}</a></li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="font-['Playfair_Display'] text-lg font-semibold mb-6">{t('footer.contactInfo')}</h4>
            <ul className="space-y-4 text-sm text-[#5a5a5a]">
              <li className="flex items-start gap-3">
                <span className="iconify text-[#9B111E] mt-0.5" data-icon="lucide:map-pin" data-width="16"></span>
                <span>Merkez Mah. Sarıyer Cad. No:1<br />Sarıyer, Istanbul, Turkey</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="iconify text-[#9B111E]" data-icon="lucide:phone" data-width="16"></span>
                <span>+90 212 123 45 67</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="iconify text-[#9B111E]" data-icon="lucide:mail" data-width="16"></span>
                <span>info@wmbfirin.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-[#9B111E] text-white/90 text-xs py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-2">
          <p>© 2025 WMB Fırın. {t('footer.rights')}</p>
          <div className="flex gap-4 opacity-80">
            <a href="#" className="hover:text-white">{t('footer.privacy')}</a>
            <a href="#" className="hover:text-white">{t('footer.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer


