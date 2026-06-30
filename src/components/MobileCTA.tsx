import { useEffect, useState } from 'react'
import { contact } from '../data'

export default function MobileCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const hero = document.querySelector('section')
      const configurator = document.getElementById('configurator')
      const heroBottom = hero?.getBoundingClientRect().bottom ?? 0
      const configTop = configurator?.getBoundingClientRect().top ?? Infinity
      setVisible(heroBottom < 0 && configTop > window.innerHeight * 0.4)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 lg:hidden transition-transform duration-500 ease-out ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="bg-forest-dark/95 backdrop-blur-xl border-t border-white/10 px-4 py-3 flex items-center gap-3 safe-bottom">
        <a
          href={contact.phoneHref}
          className="flex items-center justify-center w-11 h-11 rounded-full border border-cream/20 text-cream shrink-0 hover:border-gold hover:text-gold transition-colors"
          aria-label="Bel ons"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
        </a>
        <a
          href="#configurator"
          className="flex-1 py-3 bg-gold text-forest-dark text-sm font-semibold rounded-full text-center hover:bg-gold-light transition-colors"
        >
          Start 3D configurator
        </a>
      </div>
    </div>
  )
}