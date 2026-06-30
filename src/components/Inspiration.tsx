import { useEffect, useMemo, useState } from 'react'
import { galleryImages, models } from '../data'
import { configuratorHref, openConfiguratorWithModel } from '../lib/configuratorNav'
import { isModelId } from '../lib/modelDefaults'
import { useScrollReveal } from '../hooks/useScrollReveal'
import SectionHeading from './SectionHeading'

const filters = [
  { id: 'all', label: 'Alles' },
  ...models.map((m) => ({ id: m.id, label: m.shortName })),
  { id: 'referentie', label: 'Referenties' },
]

export default function Inspiration() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>()
  const [lightbox, setLightbox] = useState<(typeof galleryImages)[0] | null>(null)
  const [filter, setFilter] = useState('all')

  const filtered = useMemo(
    () => (filter === 'all' ? galleryImages : galleryImages.filter((img) => img.category === filter)),
    [filter],
  )

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [lightbox])

  return (
    <section id="inspiratie" className="py-24 sm:py-32 bg-forest-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgba(201,169,110,0.08),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Portfolio"
          title="Laat u inspireren"
          description="Echte projecten van Serre Exclusief door heel Nederland — filter op model."
          light
          className="mb-10 sm:mb-12"
        />

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all ${
                filter === f.id
                  ? 'bg-gold text-forest-dark'
                  : 'bg-white/8 text-cream/70 hover:bg-white/12 hover:text-cream'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div
          ref={ref}
          className={`grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 auto-rows-[180px] sm:auto-rows-[220px] lg:auto-rows-[200px] transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {filtered.map((img) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setLightbox(img)}
              className={`group relative rounded-2xl overflow-hidden img-overlay cursor-pointer text-left ${img.span}`}
            >
              <img
                src={img.src}
                alt={img.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute top-3 right-3 z-10 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                <span className="px-2.5 py-1 bg-forest-dark/70 backdrop-blur text-cream text-[10px] rounded-full uppercase tracking-wider">
                  Bekijk
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 z-10 flex items-end justify-between">
                <span className="text-white font-display text-lg sm:text-xl font-semibold">{img.label}</span>
                <span className="w-9 h-9 rounded-full bg-white/20 backdrop-blur flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#configurator"
            className="inline-flex items-center gap-2 text-gold hover:text-gold-light transition-colors font-medium"
          >
            Ontwerp uw eigen serre
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H7" />
            </svg>
          </a>
        </div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[60] bg-forest-dark/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal
          aria-label={lightbox.label}
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 text-cream hover:bg-white/20 transition-colors flex items-center justify-center"
            aria-label="Sluiten"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightbox.src}
              alt={lightbox.label}
              className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl"
            />
            <p className="text-center font-display text-2xl text-cream mt-6">{lightbox.label}</p>
            <div className="text-center mt-4">
              <a
                href={
                  lightbox && isModelId(lightbox.category)
                    ? configuratorHref(lightbox.category)
                    : '#configurator'
                }
                onClick={(e) => {
                  e.preventDefault()
                  setLightbox(null)
                  if (lightbox && isModelId(lightbox.category)) {
                    openConfiguratorWithModel(lightbox.category)
                  } else {
                    document.getElementById('configurator')?.scrollIntoView({ behavior: 'smooth' })
                  }
                }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-forest-dark font-semibold rounded-full hover:bg-gold-light transition-colors"
              >
                Configureer dit type
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}