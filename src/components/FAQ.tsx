import { useState } from 'react'
import { faqs, galleryImages } from '../data'
import { useScrollReveal } from '../hooks/useScrollReveal'
import SectionHeading from './SectionHeading'

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)
  const { ref, visible } = useScrollReveal<HTMLDivElement>()

  return (
    <section id="faq" className="py-24 sm:py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Veelgestelde vragen"
          title="Alles wat u wilt weten"
          className="mb-12"
        />

        <div
          ref={ref}
          className={`grid lg:grid-cols-5 gap-10 lg:gap-14 transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="hidden lg:block lg:col-span-2">
            <div className="sticky top-28 space-y-4">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] img-overlay">
                <img
                  src={galleryImages[0].src}
                  alt="Serre project"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  <p className="font-display text-2xl text-white font-semibold mb-2">Nog vragen?</p>
                  <p className="text-cream/70 text-sm">Bel ons of start de configurator voor een prijsindicatie.</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {galleryImages.slice(1, 3).map((img) => (
                  <div key={img.src} className="rounded-2xl overflow-hidden aspect-square">
                    <img src={img.src} alt={img.label} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={faq.question}
                className={`bg-cream rounded-2xl border transition-all duration-300 overflow-hidden ${
                  open === i ? 'border-gold/40 shadow-md shadow-gold/5' : 'border-cream-dark/60'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left gap-4"
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        open === i ? 'bg-gold text-forest-dark' : 'bg-forest/8 text-forest/50'
                      }`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-medium text-forest text-base sm:text-lg">{faq.question}</span>
                  </div>
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      open === i ? 'bg-forest text-cream rotate-180' : 'bg-forest/8 text-forest'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    open === i ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm sm:text-base text-charcoal/65 leading-relaxed border-t border-cream-dark/40 pt-4 ml-12 sm:ml-14">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}