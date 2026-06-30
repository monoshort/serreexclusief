import type { SerreConfig } from '../types'
import { getModelVisual } from '../lib/modelVisuals'

interface Props {
  config: SerreConfig
  imageSrc: string
  caption?: string
}

export default function PhotorealPreview({ config, imageSrc, caption }: Props) {
  const vis = getModelVisual(config)

  return (
    <div className="relative w-full aspect-[4/3] min-h-[300px] rounded-xl overflow-hidden bg-forest/10 group">
      <img
        src={imageSrc}
        alt={caption ?? vis.label}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-[1.02]"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/50 via-transparent to-transparent pointer-events-none" />

      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
        <span className="px-2.5 py-1 bg-gold/95 backdrop-blur text-forest-dark text-[10px] font-bold rounded-full">
          ✦ Grok Imagine render
        </span>
        <span className="px-2.5 py-1 bg-forest/90 backdrop-blur text-cream text-[10px] font-semibold rounded-full">
          {vis.label}
        </span>
      </div>

      <div className="absolute bottom-3 left-3 right-3 z-10 flex justify-between items-end">
        <div>
          {caption && (
            <p className="text-white font-display text-sm font-semibold drop-shadow-md">{caption}</p>
          )}
          <p className="text-cream/80 text-[10px] mt-0.5">Fotorealistische AI-visualisatie</p>
        </div>
        <span className="text-cream/90 text-xs font-medium bg-forest-dark/60 backdrop-blur px-2.5 py-1 rounded-full">
          {config.width}m × {config.depth}m
        </span>
      </div>
    </div>
  )
}