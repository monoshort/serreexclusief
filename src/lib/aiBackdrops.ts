import type { ModelId } from '../types'
import type { SceneMood } from './impressionSceneMatch'
import type { ViewMode3D } from './sceneInteraction'

/** 360° Grok Imagine HDR-omgevingen — voor fotorealistische 3D-belichting */
const envMaps: Record<SceneMood, string> = {
  day: '/impressions/3d/env-day.jpg',
  bright: '/impressions/3d/env-day.jpg',
  'golden-hour': '/impressions/3d/env-golden.jpg',
  evening: '/impressions/3d/env-evening.jpg',
  rainy: '/impressions/3d/env-rainy.jpg',
}

const moodBackdrops: Record<SceneMood, string> = {
  day: '/impressions/3d/backdrop-day.jpg',
  bright: '/impressions/3d/backdrop-day.jpg',
  'golden-hour': '/impressions/3d/env-golden.jpg',
  evening: '/impressions/3d/backdrop-evening.jpg',
  rainy: '/impressions/3d/backdrop-rainy.jpg',
}

const modelInteriors: Record<ModelId, string> = {
  'serre-uitbouw': '/impressions/uitbouw/interior-living.jpg',
  'steellook-serre': '/impressions/steellook/interior-living.jpg',
  'houten-serre': '/impressions/houten/interior-living.jpg',
  'tuinkamer-veranda': '/impressions/tuinkamer/cozy-rain.jpg',
  'minimalistische-schuifpui': '/impressions/schuifpui/hero-exterior.jpg',
}

const modelExteriors: Partial<Record<ModelId, Partial<Record<SceneMood, string>>>> = {
  'serre-uitbouw': {
    'golden-hour': '/impressions/uitbouw/hero-exterior.jpg',
    evening: '/impressions/uitbouw/evening-luxury.jpg',
    rainy: '/impressions/uitbouw/cozy-rain.jpg',
  },
  'steellook-serre': {
    day: '/impressions/steellook/hero-exterior.jpg',
    bright: '/impressions/steellook/hero-exterior.jpg',
    'golden-hour': '/impressions/steellook/hero-exterior.jpg',
    evening: '/impressions/steellook/evening-luxury.jpg',
  },
  'houten-serre': {
    day: '/impressions/houten/hero-exterior.jpg',
    bright: '/impressions/houten/hero-exterior.jpg',
    'golden-hour': '/impressions/houten/hero-exterior.jpg',
  },
  'tuinkamer-veranda': {
    day: '/impressions/tuinkamer/hero-exterior.jpg',
    bright: '/impressions/tuinkamer/hero-exterior.jpg',
    'golden-hour': '/impressions/tuinkamer/evening-garden.jpg',
    evening: '/impressions/tuinkamer/evening-garden.jpg',
    rainy: '/impressions/tuinkamer/cozy-rain.jpg',
  },
  'minimalistische-schuifpui': {
    day: '/impressions/schuifpui/hero-exterior.jpg',
    bright: '/impressions/schuifpui/hero-exterior.jpg',
    evening: '/impressions/schuifpui/evening-luxury.jpg',
  },
}

/** 360° environment map voor 3D-rendering (draait mee met camera) */
export function getAIEnvironment(
  mood: SceneMood,
  viewMode: ViewMode3D,
): string {
  if (viewMode === 'interior') return '/impressions/3d/env-interior.jpg'
  return envMaps[mood] ?? envMaps.day
}

/** Referentiebeeld voor AI-render modus en impressieslides */
export function getAIBackdrop(
  model: ModelId,
  mood: SceneMood,
  viewMode: ViewMode3D,
  slideSrc?: string,
): string {
  if (slideSrc?.startsWith('/impressions/') && slideSrc.endsWith('.jpg')) {
    return slideSrc
  }
  if (viewMode === 'interior') {
    return modelInteriors[model] ?? modelInteriors['serre-uitbouw']
  }
  return modelExteriors[model]?.[mood] ?? moodBackdrops[mood] ?? moodBackdrops.day
}

export interface ImagineRenderSettings {
  backgroundIntensity: number
  environmentIntensity: number
  groundColor: string
  fogNear: number
  fogFar: number
  exposure: number
}

export function getImagineRenderSettings(
  mood: SceneMood,
  viewMode: ViewMode3D,
): ImagineRenderSettings {
  const isInterior = viewMode === 'interior'

  const presets: Record<SceneMood, ImagineRenderSettings> = {
    day: {
      backgroundIntensity: 0.85,
      environmentIntensity: 1.75,
      groundColor: '#5a6e52',
      fogNear: 38,
      fogFar: 88,
      exposure: 1.14,
    },
    bright: {
      backgroundIntensity: 0.9,
      environmentIntensity: 1.9,
      groundColor: '#5e7258',
      fogNear: 42,
      fogFar: 92,
      exposure: 1.18,
    },
    'golden-hour': {
      backgroundIntensity: 0.88,
      environmentIntensity: 1.65,
      groundColor: '#6a5e48',
      fogNear: 36,
      fogFar: 85,
      exposure: 1.2,
    },
    evening: {
      backgroundIntensity: 0.78,
      environmentIntensity: 1.55,
      groundColor: '#3a4248',
      fogNear: 32,
      fogFar: 78,
      exposure: 1.28,
    },
    rainy: {
      backgroundIntensity: 0.82,
      environmentIntensity: 1.45,
      groundColor: '#4a5a50',
      fogNear: 30,
      fogFar: 72,
      exposure: 1.1,
    },
  }

  const base = presets[mood] ?? presets.day

  if (isInterior) {
    return {
      ...base,
      backgroundIntensity: 0.72,
      environmentIntensity: 1.85,
      groundColor: '#b8a898',
      fogNear: 26,
      fogFar: 58,
      exposure: 1.22,
    }
  }

  return base
}