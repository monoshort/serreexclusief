import { useEffect, useState } from 'react'
import { brand, heroSlides } from '../data'
import { useCountUp } from '../hooks/useCountUp'
import { useScrollReveal } from '../hooks/useScrollReveal'

const stats = [
  { value: 20, suffix: '+', label: 'Jaar ervaring' },
  { value: null, display: 'A–Z', label: 'Volledig project' },
  { value: null, display: 'NL', label: 'Heel Nederland' },
  { value: null, display: 'Gratis', label: 'Advies thuis' },
]

function StatCard({ stat, active, compact = false }: { stat: (typeof stats)[0]; active: boolean; compact?: boolean }) {
  const count = useCountUp(stat.value ?? 0, active && stat.value !== null)

  return (
    <>
      <div className={`font-display text-gold font-semibold mb-1 ${compact ? 'text-2xl' : 'text-4xl'}`}>
        {stat.value !== null ? `${count}${stat.suffix}` : stat.display}
      </div>
      <div className={`text-cream/70 uppercase ${compact ? 'text-[10px] tracking-wider mt-1' : 'text-xs tracking-widest'}`}>
        {stat.label}
      </div>
    </>
  )
}

export default function Hero() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>(0.05)
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setSlide((s) => (s + 1) % heroSlides.length), 7000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        {heroSlides.map((s, i) => (
          <div
            key={s.src}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[2000ms] ease-in-out ${
              i === slide ? 'opacity-100 hero-bg' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${s.src})` }}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-forest-dark/92 via-forest/75 to-forest-dark/40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(201,169,110,0.15),transparent_50%)]" />
      <div className="film-grain pointer-events-none" aria-hidden />

      <div
        ref={ref}
        className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-24 w-full transition-all duration-1000 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-end">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-cream/90 text-xs tracking-[0.2em] uppercase">Exclusieve serres · Borne</span>
            </div>

            <h1 className="font-display text-[clamp(2.75rem,7vw,5.5rem)] text-white font-semibold leading-[1.05] mb-6">
              {brand.tagline.split(' ').map((word, i) =>
                i === 1 ? (
                  <span key={word} className="text-gold italic font-normal">{word}</span>
                ) : (
                  <span key={word}>{word} </span>
                ),
              )}
            </h1>

            <p className="text-lg sm:text-xl text-cream/85 leading-relaxed mb-10 max-w-xl">
              {brand.description}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#configurator"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gold text-forest-dark font-semibold rounded-full hover:bg-gold-light transition-all hover:shadow-[0_8px_32px_rgba(201,169,110,0.35)] hover:-translate-y-0.5"
              >
                Start 3D configurator
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-forest-dark/10 group-hover:translate-x-0.5 transition-transform">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </a>
              <a
                href="#modellen"
                className="inline-flex items-center gap-2 px-8 py-4 border border-cream/25 text-cream rounded-full hover:bg-white/10 hover:border-cream/40 transition-all"
              >
                Bekijk modellen
              </a>
            </div>
          </div>

          <div className="hidden lg:grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="glass-card rounded-2xl p-6 animate-float"
                style={{ animationDelay: `${i * 0.5}s` }}
              >
                <StatCard stat={stat} active={visible} />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 lg:hidden grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="glass-card rounded-xl p-4 text-center">
              <StatCard stat={stat} active={visible} compact />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-24 sm:bottom-20 left-1/2 -translate-x-1/2 flex gap-1 z-10">
        {heroSlides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => setSlide(i)}
            className="flex items-center justify-center min-w-[44px] min-h-[44px] p-3"
            aria-label={`Slide ${i + 1}: ${s.label}`}
          >
            <span
              className={`block h-1.5 rounded-full transition-all duration-500 ${
                i === slide ? 'w-8 bg-gold' : 'w-2.5 bg-cream/30 hover:bg-cream/50'
              }`}
            />
          </button>
        ))}
      </div>

      <a
        href="#modellen"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream/50 hover:text-gold transition-colors scroll-hint"
        aria-label="Scroll naar beneden"
      >
        <span className="text-[10px] uppercase tracking-[0.25em]">Ontdek</span>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </a>
    </section>
  )
}