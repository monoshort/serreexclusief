import { useEffect, useState } from 'react'
import type { Testimonial } from '../types'

interface Props {
  review: Testimonial | null
  onClose: () => void
}

function Stars({ size = 'md' }: { size?: 'sm' | 'md' }) {
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

export default function ReviewModal({ review, onClose }: Props) {
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    if (!review) return
    setActiveImage(0)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setActiveImage((i) => Math.min(i + 1, review.gallery.length - 1))
      if (e.key === 'ArrowLeft') setActiveImage((i) => Math.max(i - 1, 0))
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [review, onClose])

  if (!review) return null

  const initials = review.authors
    .split('&')
    .map((n) => n.trim().charAt(0))
    .join('')

  return (
    <div
      className="fixed inset-0 z-[70] bg-forest-dark/90 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal
      aria-label={review.title}
    >
      <div
        className="bg-cream w-full sm:max-w-5xl sm:rounded-3xl overflow-hidden max-h-[95vh] sm:max-h-[90vh] flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 sm:px-8 py-4 border-b border-cream-dark/50 bg-white shrink-0">
          <div>
            <p className="text-xs text-gold uppercase tracking-widest font-medium">{review.model}</p>
            <h3 className="font-display text-xl sm:text-2xl text-forest font-semibold">{review.title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-cream hover:bg-cream-dark flex items-center justify-center transition-colors shrink-0"
            aria-label="Sluiten"
          >
            <svg className="w-5 h-5 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto flex-1">
          <div className="relative bg-forest-dark aspect-[16/9] sm:aspect-[21/9]">
            <img
              src={review.gallery[activeImage] ?? review.image}
              alt={`${review.title} foto ${activeImage + 1}`}
              className="w-full h-full object-cover"
            />
            {review.gallery.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => setActiveImage((i) => Math.max(0, i - 1))}
                  disabled={activeImage === 0}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center disabled:opacity-30 hover:bg-white transition-colors"
                  aria-label="Vorige foto"
                >
                  <svg className="w-5 h-5 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveImage((i) => Math.min(review.gallery.length - 1, i + 1))}
                  disabled={activeImage === review.gallery.length - 1}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center disabled:opacity-30 hover:bg-white transition-colors"
                  aria-label="Volgende foto"
                >
                  <svg className="w-5 h-5 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-forest-dark/80 backdrop-blur text-cream text-xs rounded-full">
                  {activeImage + 1} / {review.gallery.length}
                </div>
              </>
            )}
          </div>

          {review.gallery.length > 1 && (
            <div className="flex gap-2 px-5 sm:px-8 py-3 overflow-x-auto scrollbar-hide bg-white border-b border-cream-dark/40">
              {review.gallery.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  className={`shrink-0 w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden border-2 transition-all ${
                    i === activeImage ? 'border-gold shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          <div className="px-5 sm:px-8 py-6 sm:py-8 space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-forest/10 flex items-center justify-center font-display text-xl text-forest font-semibold">
                  {initials}
                </div>
                <div>
                  <Stars />
                  <p className="font-semibold text-forest mt-1">{review.authors}</p>
                  <p className="text-sm text-charcoal/50 flex items-center gap-1.5 mt-0.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {review.location}
                  </p>
                </div>
              </div>
              {review.highlight && (
                <span className="px-4 py-2 bg-gold/10 text-gold text-sm font-medium rounded-full">
                  {review.highlight}
                </span>
              )}
            </div>

            <blockquote className="font-display text-2xl sm:text-3xl text-forest leading-snug border-l-4 border-gold pl-5">
              &ldquo;{review.quote}&rdquo;
            </blockquote>

            <div className="space-y-4 text-charcoal/70 leading-relaxed">
              {review.story.map((para) => (
                <p key={para.slice(0, 40)}>{para}</p>
              ))}
            </div>

            <div className="pt-4 border-t border-cream-dark/50 flex flex-col sm:flex-row gap-3">
              <a
                href="#configurator"
                onClick={onClose}
                className="flex-1 py-3.5 text-center bg-gold text-forest-dark font-semibold rounded-full hover:bg-gold-light transition-colors"
              >
                Configureer uw serre
              </a>
              <a
                href="#contact"
                onClick={onClose}
                className="flex-1 py-3.5 text-center border border-forest/20 text-forest font-semibold rounded-full hover:bg-forest/5 transition-colors"
              >
                Neem contact op
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}