import { getDefaultConfigForModel, isModelId } from './modelDefaults'
import type { ModelId } from '../types'

export const CONFIGURATOR_LOAD_EVENT = 'serre:load-config'

export type ConfiguratorView = 'split' | '3d' | 'impressie'

function parseConfiguratorParams(): URLSearchParams | null {
  const hash = window.location.hash
  if (!hash.startsWith('#configurator')) return null
  const queryStart = hash.indexOf('?')
  if (queryStart === -1) return null
  return new URLSearchParams(hash.slice(queryStart + 1))
}

export function configuratorHref(model: ModelId, view: ConfiguratorView = '3d'): string {
  return `#configurator?model=${model}&view=${view}`
}

export function parseConfiguratorView(): ConfiguratorView | null {
  const view = parseConfiguratorParams()?.get('view')
  if (view === 'split' || view === '3d' || view === 'impressie') return view
  return null
}

export function parseConfiguratorModel(): ModelId | null {
  const model = parseConfiguratorParams()?.get('model')
  return model && isModelId(model) ? model : null
}

export function loadConfiguratorModel(model: ModelId, view: ConfiguratorView = '3d'): void {
  const target = configuratorHref(model, view).slice(1)
  if (window.location.hash.slice(1) !== target) {
    window.location.hash = target
  }
  window.dispatchEvent(
    new CustomEvent<{ modelId: ModelId }>(CONFIGURATOR_LOAD_EVENT, {
      detail: { modelId: model },
    }),
  )
}

export function scrollToConfigurator(): void {
  document.getElementById('configurator')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function openConfiguratorWithModel(model: ModelId, view: ConfiguratorView = '3d'): void {
  loadConfiguratorModel(model, view)
  scrollToConfigurator()
}

export function getConfigFromHash(): ReturnType<typeof getDefaultConfigForModel> | null {
  const model = parseConfiguratorModel()
  return model ? getDefaultConfigForModel(model) : null
}