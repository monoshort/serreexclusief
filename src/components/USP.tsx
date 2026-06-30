import { usps } from '../data'
import { useStaggerReveal } from '../hooks/useStaggerReveal'

const icons = [
  'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
  'M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z',
  'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
  'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
]

export default function USP() {
  const { ref, visible } = useStaggerReveal(usps.length)

  return (
    <section className="py-16 sm:py-20 bg-forest relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.07]"
        style={{ backgroundImage: "url(https://cdn.prod.website-files.com/62d6989abb98a366adf0ea30/62dfea03b7d0787ecc62e610_logo-lines.svg)" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(201,169,110,0.06)_0%,transparent_50%)]" />
      <div className="absolute inset-0 pattern-grid opacity-[0.04] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {usps.map((usp, i) => (
            <div
              key={usp.title}
              className={`group glass-card rounded-2xl p-6 lg:p-7 hover:bg-white/12 transition-all duration-500 card-shine ${
                visible[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-xl bg-gold/15 border border-gold/25 flex items-center justify-center group-hover:scale-110 group-hover:bg-gold/25 transition-all">
                  <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={icons[i]} />
                  </svg>
                </div>
                <span className="font-display text-3xl text-gold/15 font-bold group-hover:text-gold/25 transition-colors">
                  0{i + 1}
                </span>
              </div>
              <h3 className="font-display text-xl text-white font-semibold mb-2">{usp.title}</h3>
              <p className="text-sm text-cream/65 leading-relaxed">{usp.description}</p>
              <div className="mt-4 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-gold/60 to-transparent transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}