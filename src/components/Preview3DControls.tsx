import type { ViewMode3D } from '../lib/sceneInteraction'

export type RenderMode3D = 'interactive' | 'photoreal'

interface Props {
  doorsOpen: boolean
  onToggleDoors: () => void
  viewMode: ViewMode3D
  onViewMode: (mode: ViewMode3D) => void
  renderMode: RenderMode3D
  onRenderMode: (mode: RenderMode3D) => void
  showDoorControls?: boolean
}

const btnBase =
  'min-h-[40px] sm:min-h-0 px-3 py-2 sm:py-1.5 rounded-full text-[11px] sm:text-[10px] font-semibold transition-all'

export default function Preview3DControls({
  doorsOpen,
  onToggleDoors,
  viewMode,
  onViewMode,
  renderMode,
  onRenderMode,
  showDoorControls = false,
}: Props) {
  const isInteractive = renderMode === 'interactive'

  return (
    <div className="absolute bottom-2 left-2 right-2 sm:top-3 sm:right-3 sm:left-auto sm:bottom-auto z-20 flex flex-col gap-1.5">
      <div className="flex flex-wrap sm:flex-col gap-1.5 justify-end">
        <div className="flex gap-1 p-1 bg-white/90 backdrop-blur rounded-full shadow-lg ml-auto">
          <button
            type="button"
            onClick={() => onRenderMode('interactive')}
            className={`${btnBase} ${isInteractive ? 'bg-gold text-forest-dark' : 'text-charcoal/60 hover:text-forest'}`}
          >
            3D interactief
          </button>
          <button
            type="button"
            onClick={() => onRenderMode('photoreal')}
            className={`${btnBase} ${!isInteractive ? 'bg-gold text-forest-dark' : 'text-charcoal/60 hover:text-forest'}`}
          >
            ✦ AI render
          </button>
        </div>

        {isInteractive && (
          <>
            {showDoorControls && (
              <button
                type="button"
                onClick={onToggleDoors}
                className={`flex items-center gap-1.5 ml-auto min-h-[40px] sm:min-h-0 px-3 py-2 sm:py-2 rounded-full text-[11px] font-semibold shadow-lg backdrop-blur transition-all ${
                  doorsOpen ? 'bg-gold text-forest-dark' : 'bg-white/90 text-forest hover:bg-white'
                }`}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4M16 17H4m0 0l4 4m-4-4l4-4" />
                </svg>
                {doorsOpen ? 'Sluit schuifpui' : 'Open schuifpui'}
              </button>
            )}

            <div className="flex gap-1 p-1 bg-white/85 backdrop-blur rounded-full shadow-lg ml-auto">
              <button
                type="button"
                onClick={() => onViewMode('exterior')}
                className={`${btnBase} ${viewMode === 'exterior' ? 'bg-forest text-cream' : 'text-charcoal/60 hover:text-forest'}`}
              >
                Buiten
              </button>
              <button
                type="button"
                onClick={() => onViewMode('interior')}
                className={`${btnBase} ${viewMode === 'interior' ? 'bg-forest text-cream' : 'text-charcoal/60 hover:text-forest'}`}
              >
                Binnen
              </button>
            </div>
          </>
        )}
      </div>

      <p className="text-[10px] sm:text-[9px] text-charcoal/55 bg-white/75 backdrop-blur px-2.5 py-1.5 rounded-lg text-center leading-tight ml-auto max-w-full">
        {isInteractive ? (
          <>
            <span className="sm:hidden">Sleep = draaien · Knijp = zoomen</span>
            <span className="hidden sm:inline">Imagine 360° · sleep = draaien</span>
          </>
        ) : (
          'Grok Imagine fotorealisme'
        )}
      </p>
    </div>
  )
}