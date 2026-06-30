import { useState } from 'react'
import { models } from '../data'
import { openConfiguratorWithModel } from '../lib/configuratorNav'
import { useScrollReveal } from '../hooks/useScrollReveal'
import SectionHeading from './SectionHeading'

function ModelImage({ model }: { model: (typeof models)[0] }) {
  const primary = model.heroImage ?? model.image
  const [src, setSrc] = useState(primary)
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="relative aspect-[4/3] overflow-hidden img-overlay bg-forest/10">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-forest/8 to-cream-dark/40">
          <div className="w-8 h-8 border-2 border-gold/40 border-t-gold rounded-full animate-spin" />
        </div>
      )}
      <img
        src={src}
        alt={model.name}
        className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading="eager"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (src !== model.image) setSrc(model.image)
          else setLoaded(true)
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 z-10 translate-y-0 opacity-100 sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 transition-all duration-300">
        <a
          href={`#configurator?model=${model.id}`}
          onClick={(e) => {
            e.preventDefault()
            openConfiguratorWithModel(model.id)
          }}
          className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 bg-gold text-forest-dark text-sm font-semibold rounded-full shadow-lg"
        >
          Configureer dit model
        </a>
      </div>
    </div>
  )
}

function ModelCard({ model, featured = false }: { model: (typeof models)[0]; featured?: boolean }) {
  return (
    <article
      className={`group relative bg-white rounded-3xl overflow-hidden shadow-[0_4px_24px_rgba(26,58,47,0.06)] hover:shadow-[0_20px_60px_rgba(26,58,47,0.12)] transition-all duration-500 hover:-translate-y-1 border border-cream-dark/40 shrink-0 w-[85vw] sm:w-[340px] md:w-auto ${
        featured ? 'md:col-span-2 lg:col-span-1' : ''
      }`}
    >
      <ModelImage model={model} />
      <div className="p-6 lg:p-7">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs px-3 py-1 bg-forest/8 text-forest rounded-full capitalize font-medium">
            {model.material}
          </span>
          <span className="text-sm font-semibold text-gold">
            vanaf € {model.basePrice.toLocaleString('nl-NL')}
          </span>
        </div>
        <h3 className="font-display text-2xl lg:text-[1.75rem] text-forest font-semibold mb-2 group-hover:text-forest-light transition-colors">
          {model.name}
        </h3>
        <p className="text-sm text-charcoal/65 mb-5 leading-relaxed line-clamp-2">{model.description}</p>
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`w-6 h-6 rounded-lg border border-black/5 ${
              model.material === 'hout'
                ? 'bg-gradient-to-br from-[#8a6830] to-[#5a4020]'
                : 'bg-gradient-to-br from-[#6a6a68] to-[#3a3a38]'
            }`}
            title={model.material}
          />
          <span className="text-[10px] text-charcoal/40 uppercase tracking-wider">
            {model.material === 'hout' ? 'Hout afwerking' : 'Aluminium poedercoating'}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {model.features.slice(0, 3).map((f) => (
            <span key={f} className="text-[11px] px-2.5 py-1 bg-cream rounded-lg text-charcoal/55">
              {f}
            </span>
          ))}
        </div>
        <a
          href={`#configurator?model=${model.id}`}
          onClick={(e) => {
            e.preventDefault()
            openConfiguratorWithModel(model.id)
          }}
          className="sm:hidden mt-4 flex items-center justify-center min-h-[44px] w-full py-3 bg-forest text-cream text-sm font-semibold rounded-xl hover:bg-forest-light transition-colors"
        >
          Configureer dit model
        </a>
      </div>
    </article>
  )
}

export default function Models() {
  const { ref, visible } = useScrollReveal<HTMLDivElement>(0.05)

  return (
    <section id="modellen" className="py-24 sm:py-32 bg-cream relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Ons aanbod"
          title="Onze serre modellen"
          description="Van klassieke houten serres tot ultra-moderne steellook uitbouwen. Elk model volledig op maat gemaakt."
          className="mb-16 sm:mb-20"
        />

        <div
          ref={ref}
          className={`md:hidden -mx-4 px-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide flex gap-5 pb-4 transition-all duration-700 ${
            visible ? 'translate-y-0' : 'translate-y-4'
          }`}
        >
          {models.map((model) => (
            <div key={model.id} className="snap-center">
              <ModelCard model={model} />
            </div>
          ))}
        </div>

        <div
          className={`hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 transition-all duration-700 ${
            visible ? 'translate-y-0' : 'translate-y-4'
          }`}
        >
          {models.map((model, i) => (
            <ModelCard key={model.id} model={model} featured={i === 0} />
          ))}
        </div>

        <p className="md:hidden text-center text-xs text-charcoal/45 mt-6 tracking-wide">
          ← Swipe voor meer modellen →
        </p>
      </div>
    </section>
  )
}