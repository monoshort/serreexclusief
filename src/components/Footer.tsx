import { brand, contact } from '../data'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer id="contact" className="bg-forest-dark text-cream/80 pb-4 lg:pb-0">
      <div className="border-b border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-display text-2xl text-white font-semibold">Klaar voor uw droomserre?</p>
            <p className="text-sm text-cream/55 mt-1">Gratis advies en opmeting bij u thuis — heel Nederland.</p>
          </div>
          <a
            href="#configurator"
            className="px-8 py-3.5 bg-gold text-forest-dark font-semibold rounded-full hover:bg-gold-light transition-all whitespace-nowrap"
          >
            Offerte aanvragen
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo variant="light" className="mb-5" />
            <p className="text-sm leading-relaxed text-cream/55 max-w-xs">
              {brand.description}
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-xs uppercase tracking-widest">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors leading-relaxed">
                  {contact.address}<br />{contact.postalCode} {contact.city}
                </a>
              </li>
              <li><a href={contact.phoneHref} className="hover:text-gold transition-colors">{contact.phone}</a></li>
              <li><a href={`mailto:${contact.email}`} className="hover:text-gold transition-colors">{contact.email}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-xs uppercase tracking-widest">{contact.showroom.title}</h4>
            <ul className="space-y-2 text-sm text-cream/55">
              {contact.showroom.hours.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-xs uppercase tracking-widest">Navigatie</h4>
            <ul className="space-y-2 text-sm">
              {['#modellen', '#inspiratie', '#configurator', '#ervaringen', '#faq'].map((href) => (
                <li key={href}>
                  <a href={href} className="text-cream/55 hover:text-gold transition-colors capitalize">
                    {href.replace('#', '')}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-cream/35">
          <p>&copy; {new Date().getFullYear()} {contact.company}</p>
          <a href={brand.website} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
            serreexclusief.nl
          </a>
        </div>
      </div>
    </footer>
  )
}