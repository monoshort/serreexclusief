import { contact } from '../data'

const highlights = [
  { value: '3D', label: 'Live preview' },
  { value: '24u', label: 'Reactietijd' },
  { value: 'Gratis', label: 'Advies thuis' },
]

export default function CTABanner() {
  return (
    <section className="relative py-28 sm:py-36 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center hero-bg"
          style={{
            backgroundImage:
              'url(https://cdn.prod.website-files.com/62d6989abb98a33f33f0ea56/637787be7bbecf6df3e3c8e6_steellook_serre2.avif)',
          }}
        />
      </div>
      <div className="absolute inset-0 bg-forest-dark/82" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,169,110,0.15),transparent_70%)]" />
      <div className="film-grain pointer-events-none" aria-hidden />

      <div className="absolute inset-6 sm:inset-10 border border-white/8 rounded-3xl pointer-events-none hidden sm:block" />
      <div className="absolute inset-8 sm:inset-14 border border-gold/10 rounded-2xl pointer-events-none hidden sm:block" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-gold text-sm tracking-[0.35em] uppercase mb-4">Klaar om te beginnen?</p>
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white font-semibold mb-6 leading-tight">
          Uw serre begint hier
        </h2>
        <p className="text-cream/80 text-lg mb-8 max-w-2xl mx-auto">
          Configureer online, ontvang een prijsindicatie en plan een vrijblijvend adviesgesprek bij u thuis.
        </p>

        <div className="flex justify-center gap-6 sm:gap-10 mb-10">
          {highlights.map((h) => (
            <div key={h.label} className="text-center">
              <div className="font-display text-2xl sm:text-3xl text-gold font-semibold">{h.value}</div>
              <div className="text-[10px] text-cream/50 uppercase tracking-widest mt-1">{h.label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#configurator"
            className="group px-10 py-4 bg-gold text-forest-dark font-semibold rounded-full hover:bg-gold-light hover:shadow-[0_8px_40px_rgba(201,169,110,0.3)] transition-all hover:-translate-y-0.5 inline-flex items-center gap-3"
          >
            Start configurator
            <span className="w-7 h-7 rounded-full bg-forest-dark/10 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H7" />
              </svg>
            </span>
          </a>
          <a
            href={contact.phoneHref}
            className="px-10 py-4 border border-cream/30 text-cream rounded-full hover:bg-white/10 transition-all inline-flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {contact.phone}
          </a>
        </div>
      </div>
    </section>
  )
}