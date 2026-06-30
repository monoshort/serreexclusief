import { ralColors } from '../data'
import type { ModelId, SerreConfig } from '../types'

export interface ModelVisualProfile {
  label: string
  feature: string
  frameMult: number
  height3d: number
  frontCols: number
  frontRows: number
  sideCols: number
  enclosed: boolean
  openFront: boolean
  showInterior: boolean
  archedPanes: boolean
  isWood: boolean
  isSlim: boolean
  isFacade: boolean
  isVeranda: boolean
}

const profiles: Record<ModelId, Omit<ModelVisualProfile, 'frontCols'>> = {
  'serre-uitbouw': {
    label: 'Serre uitbouw',
    feature: 'Gesloten uitbouw · geïsoleerd',
    frameMult: 0.85,
    height3d: 2.65,
    frontRows: 3,
    sideCols: 2,
    enclosed: true,
    openFront: false,
    showInterior: true,
    archedPanes: false,
    isWood: false,
    isSlim: false,
    isFacade: false,
    isVeranda: false,
  },
  'steellook-serre': {
    label: 'Steellook serre',
    feature: 'Ultraslanke profielen · veel glas',
    frameMult: 0.55,
    height3d: 2.7,
    frontRows: 3,
    sideCols: 3,
    enclosed: true,
    openFront: false,
    showInterior: true,
    archedPanes: false,
    isWood: false,
    isSlim: true,
    isFacade: false,
    isVeranda: false,
  },
  'houten-serre': {
    label: 'Houten serre',
    feature: 'Dik houten kozijn · klassiek',
    frameMult: 1.15,
    height3d: 2.55,
    frontRows: 2,
    sideCols: 1,
    enclosed: true,
    openFront: false,
    showInterior: true,
    archedPanes: true,
    isWood: true,
    isSlim: false,
    isFacade: false,
    isVeranda: false,
  },
  'tuinkamer-veranda': {
    label: 'Tuinkamer / Veranda',
    feature: 'Open constructie · overkapping',
    frameMult: 0.85,
    height3d: 2.25,
    frontRows: 1,
    sideCols: 1,
    enclosed: false,
    openFront: true,
    showInterior: false,
    archedPanes: false,
    isWood: false,
    isSlim: false,
    isFacade: false,
    isVeranda: true,
  },
  'minimalistische-schuifpui': {
    label: 'Schuifpui',
    feature: 'Vloer-tot-plafond · minimaal kozijn',
    frameMult: 0.45,
    height3d: 2.8,
    frontRows: 1,
    sideCols: 0,
    enclosed: false,
    openFront: false,
    showInterior: true,
    archedPanes: false,
    isWood: false,
    isSlim: true,
    isFacade: true,
    isVeranda: false,
  },
}

export function getModelVisual(config: SerreConfig): ModelVisualProfile {
  const base = profiles[config.model]
  let frontCols = 2

  switch (config.model) {
    case 'steellook-serre':
      frontCols = Math.min(5, Math.max(4, Math.round(config.width * 1.2)))
      break
    case 'houten-serre':
      frontCols = config.width >= 5 ? 3 : 2
      break
    case 'minimalistische-schuifpui':
      frontCols = config.width >= 5 ? 3 : 2
      break
    case 'tuinkamer-veranda':
      frontCols = Math.max(3, Math.round(config.width * 0.8))
      break
    default:
      frontCols = config.width >= 5 ? 3 : 2
  }

  return { ...base, frontCols }
}

export function hasSchuifpui(config: SerreConfig): boolean {
  return config.model === 'minimalistische-schuifpui' || config.options.includes('schuifpui')
}

export function getGlassTint(config: SerreConfig): string {
  if (config.options.includes('zonwering-glas')) return '#b8d4e8'
  if (config.glass === 'triple') return '#c0e8f8'
  return '#eaf6ff'
}

export function getFrameColor(config: SerreConfig): string {
  if (config.model === 'houten-serre') {
    const woods: Record<string, string> = {
      iroko: '#5a4828',
      meranti: '#6e4a30',
      accoya: '#7a6040',
    }
    return woods[config.woodType ?? 'accoya'] ?? '#6e5420'
  }
  if (config.model === 'steellook-serre') {
    return ralColors.find((c) => c.code === config.frameColor)?.hex ?? '#0e0e10'
  }
  return ralColors.find((c) => c.code === config.frameColor)?.hex ?? '#383E42'
}