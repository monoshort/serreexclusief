import { useMemo, useState } from 'react'
import { testimonials } from '../data'
import { useScrollReveal } from '../hooks/useScrollReveal'
import type { Testimonial } from '../types'
import ReviewModal from './ReviewModal'
import SectionHeading from './SectionHeading'

const filters = ['Alle', 'Serre uitbouw', 'Steellook serre', 'Tuinkamer / Veranda'] as const

function Stars({ size = 'sm' }: { size?: 'sm' | 'md' }) {
  const cls = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className={`${cls} text-gold`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function ReviewCard({ review, onOpen, featured = false }: { review: Testimonial; onOpen: () => void; featured?: boolean }) {
  return (
    <article
      className={`group bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-cream-dark/40 hover:border-gold/30 hover:shadow-xl hover:shadow-forest/5 transition-all duration-500 card-shine cursor-pointer ${
        featured ? 'lg:col-span-2' : ''
      }`}
      onClick={onOpen}
      onKeyDown={(e) => e.key === 'Enter' && onOpen()}
      role="button"
      tabIndex={0}
    >
      <div className={`flex ${featured ? 'flex-col lg:flex-row' : 'flex-col'}`}>
        <div className={`relative overflow-hidden ${featured ? 'lg:w-1/2 aspect-[16/10] lg:aspect-auto lg:min-h-[320px]' : 'aspect-[16/10]'}`}>
          <img
            src={review.image}
            alt={review.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/60 via-transparent to-transparent" />
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            <span className="px-2.5 py-1 bg-forest-dark/80 backdrop-blur text-cream text-[10px] rounded-full border border-white/10">
              {review.model}
            </span>
            {review.gallery.length > 1 && (
              <span className="px-2.5 py-1 bg-white/90 text-forest text-[10px] rounded-full font-medium">
                {review.gallery.length} foto&apos;s
              </span>
            )}
          </div>
          <div className="absolute bottom-3 right-3 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
            <span className="px-3 py-1.5 bg-gold text-forest-dark text-xs font-semibold rounded-full">
              Lees verhaal →
            </span>
          </div>
        </div>

        <div className={`p-5 sm:p-6 flex flex-col justify-center ${featured ? 'lg:w-1/2 lg:p-8' : ''}`}>
          <Stars />
          <h3 className={`font-display text-forest font-semibold mt-3 mb-2 ${featured ? 'text-2xl' : 'text-lg'}`}>
            {review.title}
          </h3>
          <blockquote className={`text-charcoal/70 leading-relaxed italic ${featured ? 'text-base mb-4' : 'text-sm mb-3 line-clamp-3'}`}>
            &ldquo;{review.quote}&rdquo;
          </blockquote>
          {review.highlight && (
            <p className="text-xs text-gold font-medium mb-3">{review.highlight}</p>
          )}
          <div className="flex items-center justify-between mt-auto pt-3 border-t border-cream-dark/40">
            <div>
              <p className="font-semibold text-forest text-sm">{review.authors}</p>
              <p className="text-xs text-charcoal/45 mt-0.5">{review.location}</p>
            </div>
            <span className="text-xs text-charcoal/40 group-hover:text-gold transition-colors">Bekijk →</span>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function Testimonials() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>()
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>('Alle')
  const [selected, setSelected] = useState<Testimonial | null>(null)
  const [featuredIndex, setFeaturedIndex] = useState(0)

  const filtered = useMemo(() => {
    if (activeFilter === 'Alle') return testimonials
    return testimonials.filter((t) => t.model === activeFilter)
  }, [activeFilter])

  const featured = filtered[featuredIndex % filtered.length] ?? filtered[0]
  const gridReviews = filtered.filter((t) => t.id !== featured?.id)

  return (
    <section id="ervaringen" className="py-24 sm:py-32 bg-cream relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Klanten aan het woord"
          title="Ervaringen van onze klanten"
          description="Echte verhalen van mensen die hun droomserre lieten realiseren door Serre Exclusief."
          className="mb-10"
        />

        <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-10">
          {[
            { value: String(testimonials.length), label: 'Referenties' },
            { value: '5.0', label: 'Gemiddelde score' },
            { value: '20+', label: 'Jaar ervaring' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="flex items-center justify-center gap-1">
                <span className="font-display text-3xl text-gold font-semibold">{stat.value}</span>
                {stat.label === 'Gemiddelde score' && <Stars size="sm" />}
              </div>
              <div className="text-[10px] text-charcoal/50 uppercase tracking-widest mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => {
                setActiveFilter(f)
                setFeaturedIndex(0)
              }}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                activeFilter === f
                  ? 'bg-forest text-cream font-semibold shadow-md'
                  : 'bg-white text-charcoal/60 border border-cream-dark hover:border-gold/40'
              }`}
            >
              {f}
              {f !== 'Alle' && (
                <span className="ml-1.5 text-xs opacity-60">
                  ({testimonials.filter((t) => t.model === f).length})
                </span>
              )}
            </button>
          ))}
        </div>

        <div
          ref={ref}
          className={`space-y-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {featured && (
            <ReviewCard review={featured} onOpen={() => setSelected(featured)} featured />
          )}

          {gridReviews.length > 0 && (
            <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
              {gridReviews.map((review) => (
                <ReviewCard key={review.id} review={review} onOpen={() => setSelected(review)} />
              ))}
            </div>
          )}

          {filtered.length > 1 && (
            <div className="flex justify-center gap-1 pt-4">
              {filtered.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setFeaturedIndex(i)}
                  className="flex items-center justify-center min-w-[44px] min-h-[44px] p-3"
                  aria-label={`Uitgelichte review ${i + 1}`}
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all ${
                      i === featuredIndex % filtered.length ? 'w-8 bg-gold' : 'w-2.5 bg-forest/20 hover:bg-forest/40'
                    }`}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <ReviewModal review={selected} onClose={() => setSelected(null)} />
    </section>
  )
}