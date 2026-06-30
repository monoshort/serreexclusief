import { configOptions, models } from '../data'
import { getFrameColor, getModelVisual } from '../lib/modelVisuals'
import type { SerreConfig } from '../types'

interface Props {
  config: SerreConfig
}

export default function ConfigSpecs({ config }: Props) {
  const model = models.find((m) => m.id === config.model)
  const vis = getModelVisual(config)
  const frameColor = getFrameColor(config)
  const activeOptions = config.options
    .map((id) => configOptions.find((o) => o.id === id))
    .filter(Boolean)

  const specs = [
    {
      icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z',
      label: 'Afmeting',
      value: `${config.width} × ${config.depth} m`,
      detail: `${config.width * config.depth} m²`,
    },
    {
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
      label: 'Dak',
      value: config.roof === 'plat' ? 'Plat dak' : config.roof === 'lichtstraat' ? 'Lichtstraat' : 'Schuin dak',
    },
    {
      icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
      label: 'Glas',
      value: config.glass === 'triple' ? 'Triple glas' : 'HR++ glas',
    },
  ]

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-forest text-cream rounded-full text-xs font-semibold">
          {vis.label}
        </span>
        <span className="px-3 py-1.5 bg-gold/10 text-gold text-xs rounded-full font-medium">
          {vis.feature}
        </span>
        {!vis.isWood && (
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-cream rounded-full text-xs text-charcoal/70">
            <span className="w-3.5 h-3.5 rounded-full border border-black/10" style={{ backgroundColor: frameColor }} />
            {model?.material === 'aluminium' ? config.frameColor : 'Kozijn'}
          </span>
        )}
        {vis.isWood && (
          <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-cream rounded-full text-xs text-charcoal/70 capitalize">
            <span className="w-3.5 h-3.5 rounded-full border border-black/10" style={{ backgroundColor: frameColor }} />
            {config.woodType}
          </span>
        )}
        {activeOptions.map((opt) => (
          <span key={opt!.id} className="px-3 py-1.5 bg-gold/10 text-gold text-xs rounded-full font-medium">
            + {opt!.name}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-2">
        {specs.map((spec) => (
          <div key={spec.label} className="bg-cream/80 rounded-xl p-2.5 sm:p-3 text-center border border-cream-dark/40">
            <svg className="w-4 h-4 text-gold mx-auto mb-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={spec.icon} />
            </svg>
            <div className="text-[10px] text-charcoal/45 uppercase tracking-wider">{spec.label}</div>
            <div className="text-xs font-semibold text-forest mt-0.5">{spec.value}</div>
            {spec.detail && <div className="text-[10px] text-gold mt-0.5">{spec.detail}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}