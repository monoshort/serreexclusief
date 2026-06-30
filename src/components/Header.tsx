import { useState } from 'react'
import { contact } from '../data'
import { useActiveSection } from '../hooks/useActiveSection'
import { useHeaderScroll } from '../hooks/useHeaderScroll'
import Logo from './Logo'

const navLinks = [
  { href: '#modellen', label: 'Modellen' },
  { href: '#inspiratie', label: 'Inspiratie' },
  { href: '#configurator', label: 'Configurator' },
  { href: '#ervaringen', label: 'Ervaringen' },
  { href: '#contact', label: 'Contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const scrolled = useHeaderScroll()
  const activeSection = useActiveSection()

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-forest-dark/92 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.18)] border-b border-white/8'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[4.75rem]">
          <a href="#" className="group shrink-0">
            <Logo variant="light" showTagline className="transition-opacity group-hover:opacity-90" />
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const id = link.href.slice(1)
              const isActive = activeSection === id
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm rounded-full transition-all ${
                    isActive
                      ? 'text-gold bg-white/8 font-medium'
                      : 'text-cream/80 hover:text-gold hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </a>
              )
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a href={contact.phoneHref} className="text-sm text-cream/60 hover:text-gold transition-colors">
              {contact.phone}
            </a>
            <a
              href="#configurator"
              className="px-6 py-2.5 bg-gold text-forest-dark text-sm font-semibold rounded-full hover:bg-gold-light hover:shadow-lg hover:shadow-gold/20 transition-all"
            >
              Configureer
            </a>
          </div>

          <button
            type="button"
            className="lg:hidden p-2.5 text-cream rounded-lg hover:bg-white/10"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="bg-forest-dark/95 backdrop-blur-xl border-t border-white/10 px-4 py-5 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block py-3 px-3 text-cream/90 hover:text-gold hover:bg-white/5 rounded-xl"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#configurator"
            className="block text-center py-3.5 mt-2 bg-gold text-forest-dark font-semibold rounded-full"
            onClick={() => setOpen(false)}
          >
            Start configurator
          </a>
        </nav>
      </div>
    </header>
  )
}