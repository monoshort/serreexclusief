import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import {
  CONFIGURATOR_LOAD_EVENT,
  parseConfiguratorModel,
  parseConfiguratorView,
  type ConfiguratorView,
} from '../lib/configuratorNav'
import { getModelImpressions } from '../lib/modelImpressions'
import type { SerreConfig } from '../types'
import ImpressionGallery from './ImpressionGallery'
import PreviewErrorBoundary from './PreviewErrorBoundary'

const SerrePreview3D = lazy(() => import('./SerrePreview3D'))

interface Props {
  config: SerreConfig
}

type ViewMode = ConfiguratorView

function initialView(): ViewMode {
  return parseConfiguratorView() ?? (parseConfiguratorModel() ? '3d' : 'split')
}

function Preview3DFallback() {
  return (
    <div className="relative w-full aspect-[4/3] min-h-[240px] rounded-xl overflow-hidden bg-gradient-to-b from-[#c8dce8] to-[#dce8d4] flex flex-col items-center justify-center gap-2 text-sm text-charcoal/60">
      <div className="w-7 h-7 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      3D wordt geladen…
    </div>
  )
}

export default function PreviewPanel({ config }: Props) {
  const [retryKey, setRetryKey] = useState(0)
  const [view, setView] = useState<ViewMode>(initialView)
  const [impressionSrc, setImpressionSrc] = useState<string | undefined>(() => {
    const slides = getModelImpressions(config).slides
    return slides.find((s) => s.type === 'ai')?.src ?? slides[0]?.src
  })

  const handleSlideChange = useCallback((_index: number, src: string) => {
    setImpressionSrc(src)
  }, [])

  useEffect(() => {
    const slides = getModelImpressions(config).slides
    setImpressionSrc(slides.find((s) => s.type === 'ai')?.src ?? slides[0]?.src)
  }, [config.model])

  useEffect(() => {
    const syncView = () => {
      if (parseConfiguratorModel()) {
        setView(parseConfiguratorView() ?? '3d')
      }
    }
    syncView()
    window.addEventListener('hashchange', syncView)
    window.addEventListener(CONFIGURATOR_LOAD_EVENT, syncView)
    return () => {
      window.removeEventListener('hashchange', syncView)
      window.removeEventListener(CONFIGURATOR_LOAD_EVENT, syncView)
    }
  }, [])

  const tabs: { id: ViewMode; label: string }[] = [
    { id: 'split', label: 'Beide' },
    { id: '3d', label: '3D ontwerp' },
    { id: 'impressie', label: 'Impressie' },
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div className="inline-flex p-1 bg-cream rounded-xl border border-cream-dark/60">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setView(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
                view === tab.id
                  ? 'bg-forest text-cream shadow-sm'
                  : 'text-charcoal/55 hover:text-forest'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {view !== 'impressie' && (
          <span className="text-[10px] text-charcoal/40 hidden sm:inline">
            Sleep om te draaien · scroll om te zoomen
            {config.options.includes('schuifpui') || config.model === 'minimalistische-schuifpui' ? ' · open schuifpui' : ''}
          </span>
        )}
      </div>

      {(view === 'split' || view === '3d') && (
        <div className={view === 'split' ? 'space-y-2' : ''}>
          {view === 'split' && (
            <span className="text-xs font-semibold text-charcoal/50 uppercase tracking-wider">3D ontwerp</span>
          )}
          <PreviewErrorBoundary onRetry={() => setRetryKey((k) => k + 1)} key={retryKey}>
            <Suspense fallback={<Preview3DFallback />}>
              <SerrePreview3D config={config} impressionSrc={impressionSrc} />
            </Suspense>
          </PreviewErrorBoundary>
        </div>
      )}

      {(view === 'split' || view === 'impressie') && (
        <div className={view === 'split' ? 'pt-1 border-t border-cream-dark/50' : ''}>
          <ImpressionGallery config={config} onSlideChange={handleSlideChange} />
        </div>
      )}
    </div>
  )
}