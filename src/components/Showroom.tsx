import { contact, showroomPhotos } from '../data'
import { useScrollReveal } from '../hooks/useScrollReveal'
import SectionHeading from './SectionHeading'

export default function Showroom() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>()

  return (
    <section className="py-24 sm:py-32 bg-cream relative overflow-hidden">
      <div className="absolute inset-0 pattern-dots opacity-40 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-forest/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Bezoek ons"
          title="Showroom in Borne"
          description="Bekijk materialen, kleuren en afwerkingen in het echt. Onze adviseurs nemen de tijd voor u."
          className="mb-14 sm:mb-18"
        />

        <div
          ref={ref}
          className={`grid lg:grid-cols-5 gap-8 lg:gap-10 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="lg:col-span-3 grid grid-cols-2 gap-3 sm:gap-4">
            <div className="col-span-2 relative rounded-3xl overflow-hidden aspect-[16/9] img-overlay group">
              <img
                src={showroomPhotos[0].src}
                alt={showroomPhotos[0].label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/50 via-transparent to-transparent" />
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1.5 bg-forest-dark/80 backdrop-blur text-cream text-xs rounded-full border border-white/10">
                  {showroomPhotos[0].label}
                </span>
              </div>
            </div>
            {showroomPhotos.slice(1).map((photo, i) => (
              <div
                key={photo.src}
                className={`relative rounded-2xl overflow-hidden img-overlay group ${
                  i === 2 ? 'col-span-2 sm:col-span-1 aspect-[4/3]' : 'aspect-[4/3]'
                }`}
              >
                <img
                  src={photo.src}
                  alt={photo.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/45 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
                  <span className="text-white text-xs font-medium drop-shadow">{photo.label}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-2 flex flex-col gap-5">
            <div className="bg-white rounded-3xl p-7 sm:p-8 border border-cream-dark/50 shadow-[0_8px_40px_rgba(26,58,47,0.06)] flex-1">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-forest/8 flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display text-2xl text-forest font-semibold">{contact.showroom.title}</h3>
                  <a
                    href={contact.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-charcoal/60 hover:text-gold transition-colors mt-1 inline-block"
                  >
                    {contact.address}, {contact.postalCode} {contact.city}
                  </a>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                {contact.showroom.hours.map((line) => (
                  <div key={line} className="flex items-center gap-3 text-sm">
                    <span className="w-2 h-2 rounded-full bg-gold shrink-0" />
                    <span className="text-charcoal/70">{line}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { label: 'Materialen', value: '50+' },
                  { label: 'RAL-kleuren', value: 'Alle' },
                  { label: 'Advies', value: 'Gratis' },
                  { label: 'Parkering', value: 'Gratis' },
                ].map((item) => (
                  <div key={item.label} className="bg-cream rounded-xl p-3 text-center">
                    <div className="font-display text-xl text-gold font-semibold">{item.value}</div>
                    <div className="text-[10px] text-charcoal/50 uppercase tracking-wider mt-0.5">{item.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={contact.phoneHref}
                  className="flex-1 py-3 text-center border border-forest/20 text-forest text-sm font-semibold rounded-full hover:bg-forest/5 transition-colors"
                >
                  {contact.phone}
                </a>
                <a
                  href="#configurator"
                  className="flex-1 py-3 text-center bg-gold text-forest-dark text-sm font-semibold rounded-full hover:bg-gold-light transition-colors"
                >
                  Plan afspraak
                </a>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden h-36 sm:h-40 bg-forest-dark">
              <div className="absolute inset-0 opacity-30">
                <svg viewBox="0 0 400 160" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                  <rect fill="#1a3a2f" width="400" height="160" />
                  {[...Array(8)].map((_, i) => (
                    <line key={i} x1={i * 55} y1="0" x2={i * 55 - 40} y2="160" stroke="#c9a96e" strokeWidth="0.5" opacity="0.3" />
                  ))}
                  {[...Array(5)].map((_, i) => (
                    <line key={i} x1="0" y1={i * 40} x2="400" y2={i * 40} stroke="#c9a96e" strokeWidth="0.5" opacity="0.2" />
                  ))}
                  <circle cx="200" cy="80" r="30" fill="none" stroke="#c9a96e" strokeWidth="1" opacity="0.5" />
                  <circle cx="200" cy="80" r="50" fill="none" stroke="#c9a96e" strokeWidth="0.5" opacity="0.3" />
                </svg>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-3 h-3 bg-gold rounded-full mx-auto mb-2 animate-pulse shadow-[0_0_12px_rgba(201,169,110,0.6)]" />
                  <p className="text-cream/80 text-xs tracking-widest uppercase">Borne, Overijssel</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}