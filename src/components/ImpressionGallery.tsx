import { useEffect, useState } from 'react'
import { getModelImpressions, type ImpressionType } from '../lib/modelImpressions'
import type { SerreConfig } from '../types'

const typeBadge: Record<ImpressionType, { label: string; className: string }> = {
  ai: { label: '✦ Visualisatie', className: 'bg-gold/90 text-forest-dark border-gold/30' },
  referentie: { label: 'Echt project', className: 'bg-forest-dark/75 text-cream border-white/10' },
  optie: { label: 'Optie', className: 'bg-white/20 text-cream border-white/15' },
}

interface Props {
  config: SerreConfig
  onSlideChange?: (index: number, src: string) => void
}

export default function ImpressionGallery({ config, onSlideChange }: Props) {
  const impression = getModelImpressions(config)
  const [index, setIndex] = useState(0)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setIndex(0)
    setLoaded(false)
  }, [config.model])

  useEffect(() => {
    const slide = impression.slides[index]
    if (slide) onSlideChange?.(index, slide.src)
  }, [index, impression.slides, onSlideChange])

  const aiSlideIndexes = impression.slides
    .map((s, i) => (s.type === 'ai' ? i : -1))
    .filter((i) => i >= 0)

  useEffect(() => {
    if (aiSlideIndexes.length <= 1) return
    const timer = setInterval(() => {
      setIndex((current) => {
        const pos = aiSlideIndexes.indexOf(current)
        const next = pos < 0 ? 0 : (pos + 1) % aiSlideIndexes.length
        return aiSlideIndexes[next]
      })
    }, 7000)
    return () => clearInterval(timer)
  }, [config.model, aiSlideIndexes.join(',')])

  const slide = impression.slides[index]

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div>
          <span className="text-xs font-semibold text-charcoal/50 uppercase tracking-wider">
            Impressie
          </span>
          <p className="text-sm font-medium text-forest mt-0.5">{impression.headline}</p>
        </div>
        <span className="text-[10px] text-charcoal/40 shrink-0">
          {index + 1}/{impression.slides.length}
        </span>
      </div>

      <div className="relative rounded-xl overflow-hidden aspect-[16/10] bg-forest/8 group">
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-gold/40 border-t-gold rounded-full animate-spin" />
          </div>
        )}

        {impression.slides.map((s, i) => (
          <img
            key={s.src}
            src={s.src}
            alt={s.caption}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              i === index ? 'opacity-100' : 'opacity-0'
            }`}
            loading={i <= 1 ? 'eager' : 'lazy'}
            onLoad={() => i === index && setLoaded(true)}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/85 via-forest-dark/15 to-transparent pointer-events-none" />

        {(() => {
          const badge = typeBadge[slide.type ?? 'referentie']
          return (
            <span
              className={`absolute top-3 left-3 z-10 px-2.5 py-1 backdrop-blur text-[10px] font-semibold rounded-full border ${badge.className}`}
            >
              {slide.type === 'ai' ? badge.label : slide.location ?? badge.label}
            </span>
          )
        })()}

        <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
          <p className="text-white font-display text-lg font-semibold leading-tight">{slide.caption}</p>
          <p className="text-cream/65 text-xs mt-1 line-clamp-1">{impression.subline}</p>
        </div>

        <button
          type="button"
          onClick={() => setIndex((i) => (i - 1 + impression.slides.length) % impression.slides.length)}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/15 backdrop-blur text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/25 flex items-center justify-center"
          aria-label="Vorige foto"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => setIndex((i) => (i + 1) % impression.slides.length)}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/15 backdrop-blur text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/25 flex items-center justify-center"
          aria-label="Volgende foto"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-0.5">
        {impression.slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => setIndex(i)}
            className={`shrink-0 w-14 h-10 rounded-lg overflow-hidden border-2 transition-all ${
              i === index ? 'border-gold scale-105' : 'border-transparent opacity-60 hover:opacity-90'
            }`}
            aria-label={s.caption}
          >
            <img src={s.src} alt="" className="w-full h-full object-cover" loading="lazy" />
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {impression.highlights.map((h) => (
          <span
            key={h}
            className="text-[10px] px-2.5 py-1 bg-gold/12 text-forest rounded-full font-medium border border-gold/20"
          >
            {h}
          </span>
        ))}
      </div>

      {impression.quote && (
        <blockquote className="relative pl-4 border-l-2 border-gold/50 py-1">
          <p className="text-xs text-charcoal/70 italic leading-relaxed line-clamp-2">
            &ldquo;{impression.quote.text}&rdquo;
          </p>
          <footer className="text-[10px] text-charcoal/45 mt-1.5">
            — {impression.quote.author}, {impression.quote.location}
          </footer>
        </blockquote>
      )}
    </div>
  )
}