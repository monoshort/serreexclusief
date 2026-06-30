import type { ModelId, SerreConfig } from '../types'

export type SceneMood = 'day' | 'golden-hour' | 'evening' | 'rainy' | 'bright'
export type InteriorVariant = 'living' | 'plants' | 'scandinavian' | 'dining' | 'cozy' | 'minimal'
export type CameraVariant = 'exterior' | 'corner' | 'wide'

export interface ImpressionSceneMatch {
  mood: SceneMood
  interior: InteriorVariant
  camera: CameraVariant
  accentPlants: boolean
  gardenLights: boolean
  warmInterior: boolean
  glassRoof: boolean
}

const defaultScene: ImpressionSceneMatch = {
  mood: 'day',
  interior: 'living',
  camera: 'exterior',
  accentPlants: false,
  gardenLights: false,
  warmInterior: false,
  glassRoof: false,
}

const modelSceneDefaults: Record<ModelId, ImpressionSceneMatch> = {
  'serre-uitbouw': {
    mood: 'evening',
    interior: 'living',
    camera: 'exterior',
    accentPlants: true,
    gardenLights: true,
    warmInterior: true,
    glassRoof: true,
  },
  'steellook-serre': {
    mood: 'bright',
    interior: 'minimal',
    camera: 'wide',
    accentPlants: false,
    gardenLights: false,
    warmInterior: false,
    glassRoof: true,
  },
  'houten-serre': {
    mood: 'golden-hour',
    interior: 'scandinavian',
    camera: 'corner',
    accentPlants: true,
    gardenLights: false,
    warmInterior: true,
    glassRoof: false,
  },
  'tuinkamer-veranda': {
    mood: 'day',
    interior: 'plants',
    camera: 'wide',
    accentPlants: true,
    gardenLights: false,
    warmInterior: false,
    glassRoof: false,
  },
  'minimalistische-schuifpui': {
    mood: 'bright',
    interior: 'minimal',
    camera: 'wide',
    accentPlants: false,
    gardenLights: false,
    warmInterior: false,
    glassRoof: false,
  },
}

const slideOverrides: Record<string, Partial<ImpressionSceneMatch>> = {
  '/impressions/uitbouw/hero-exterior.jpg': {
    mood: 'golden-hour',
    interior: 'plants',
    camera: 'exterior',
    accentPlants: true,
    gardenLights: false,
    warmInterior: false,
    glassRoof: true,
  },
  '/impressions/uitbouw/evening-luxury.jpg': {
    mood: 'evening',
    interior: 'living',
    camera: 'exterior',
    accentPlants: true,
    gardenLights: true,
    warmInterior: true,
    glassRoof: true,
  },
  '/impressions/uitbouw/interior-living.jpg': {
    mood: 'bright',
    interior: 'scandinavian',
    camera: 'corner',
    accentPlants: true,
    gardenLights: false,
    warmInterior: false,
    glassRoof: true,
  },
  '/impressions/uitbouw/morning-breakfast.jpg': {
    mood: 'bright',
    interior: 'dining',
    camera: 'corner',
    accentPlants: true,
    gardenLights: false,
    warmInterior: true,
    glassRoof: true,
  },
  '/impressions/uitbouw/cozy-rain.jpg': {
    mood: 'rainy',
    interior: 'cozy',
    camera: 'corner',
    accentPlants: false,
    gardenLights: false,
    warmInterior: true,
    glassRoof: true,
  },
  '/impressions/steellook/hero-exterior.jpg': {
    mood: 'bright',
    interior: 'minimal',
    camera: 'exterior',
    accentPlants: true,
    gardenLights: false,
    warmInterior: false,
    glassRoof: true,
  },
  '/impressions/steellook/evening-luxury.jpg': {
    mood: 'evening',
    interior: 'living',
    camera: 'exterior',
    accentPlants: true,
    gardenLights: true,
    warmInterior: true,
    glassRoof: true,
  },
  '/impressions/steellook/interior-living.jpg': {
    mood: 'bright',
    interior: 'minimal',
    camera: 'corner',
    accentPlants: true,
    gardenLights: false,
    warmInterior: false,
    glassRoof: true,
  },
  '/impressions/houten/hero-exterior.jpg': {
    mood: 'golden-hour',
    interior: 'scandinavian',
    camera: 'exterior',
    accentPlants: true,
    gardenLights: false,
    warmInterior: true,
    glassRoof: false,
  },
  '/impressions/houten/interior-living.jpg': {
    mood: 'golden-hour',
    interior: 'cozy',
    camera: 'corner',
    accentPlants: true,
    gardenLights: false,
    warmInterior: true,
    glassRoof: false,
  },
  '/impressions/tuinkamer/hero-exterior.jpg': {
    mood: 'day',
    interior: 'plants',
    camera: 'wide',
    accentPlants: true,
    gardenLights: false,
    warmInterior: false,
    glassRoof: false,
  },
  '/impressions/tuinkamer/evening-garden.jpg': {
    mood: 'golden-hour',
    interior: 'plants',
    camera: 'wide',
    accentPlants: true,
    gardenLights: true,
    warmInterior: false,
    glassRoof: false,
  },
  '/impressions/tuinkamer/cozy-rain.jpg': {
    mood: 'rainy',
    interior: 'cozy',
    camera: 'corner',
    accentPlants: false,
    gardenLights: false,
    warmInterior: true,
    glassRoof: false,
  },
  '/impressions/schuifpui/hero-exterior.jpg': {
    mood: 'bright',
    interior: 'minimal',
    camera: 'wide',
    accentPlants: false,
    gardenLights: false,
    warmInterior: false,
    glassRoof: false,
  },
  '/impressions/schuifpui/evening-luxury.jpg': {
    mood: 'evening',
    interior: 'living',
    camera: 'wide',
    accentPlants: false,
    gardenLights: true,
    warmInterior: true,
    glassRoof: false,
  },
}

export function getSceneMatch(model: ModelId, slideSrc?: string): ImpressionSceneMatch {
  const base = modelSceneDefaults[model] ?? defaultScene
  const override = slideSrc ? slideOverrides[slideSrc] : undefined
  return { ...base, ...override }
}

export function getCameraForScene(camera: CameraVariant): {
  position: [number, number, number]
  target: [number, number, number]
  fov: number
} {
  switch (camera) {
    case 'corner':
      return { position: [6.8, 3.8, 6.2], target: [0, 1.5, -0.3], fov: 38 }
    case 'wide':
      return { position: [9.5, 4.5, 9.5], target: [0, 1.4, -0.5], fov: 34 }
    default:
      return { position: [7.5, 4.2, 8], target: [0, 1.45, -0.2], fov: 36 }
  }
}

/** Config tweaks alleen voor 3D-weergave — maakt het model visueel gelijk aan de referentiefoto's */
export function getDisplayConfig(config: SerreConfig, scene: ImpressionSceneMatch): SerreConfig {
  const next = { ...config, options: [...config.options] }

  if (config.model === 'serre-uitbouw') {
    if (scene.glassRoof && next.roof === 'plat') next.roof = 'lichtstraat'
    if (scene.interior === 'living' || scene.mood === 'evening') {
      if (!next.options.includes('schuifpui')) next.options.push('schuifpui')
    }
  }

  if (config.model === 'steellook-serre') {
    if (scene.glassRoof && next.roof === 'plat') next.roof = 'lichtstraat'
    if (scene.mood === 'evening' && !next.options.includes('schuifpui')) next.options.push('schuifpui')
  }

  if (config.model === 'houten-serre' && !scene.glassRoof && next.roof !== 'schuin') {
    next.roof = 'schuin'
  }

  if (config.model === 'tuinkamer-veranda') {
    next.roof = 'plat'
    if (scene.mood === 'rainy' && !next.options.includes('zonwering')) next.options.push('zonwering')
  }

  if (config.model === 'minimalistische-schuifpui') {
    next.roof = 'plat'
    if (!next.options.includes('schuifpui')) next.options.push('schuifpui')
  }

  return next
}