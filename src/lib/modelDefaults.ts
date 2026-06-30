import type { ModelId, RoofType, SerreConfig } from '../types'

const roofTypesByModel: Record<ModelId, RoofType[]> = {
  'serre-uitbouw': ['plat', 'lichtstraat', 'schuin'],
  'steellook-serre': ['plat', 'lichtstraat', 'schuin'],
  'houten-serre': ['plat', 'lichtstraat', 'schuin'],
  'tuinkamer-veranda': ['plat'],
  'minimalistische-schuifpui': ['plat'],
}

export function getRoofTypesForModel(model: ModelId): RoofType[] {
  return roofTypesByModel[model]
}

const presets: Record<ModelId, SerreConfig> = {
  'serre-uitbouw': {
    model: 'serre-uitbouw',
    width: 5,
    depth: 4,
    roof: 'lichtstraat',
    frameColor: 'RAL 9005',
    glass: 'triple',
    woodType: 'accoya',
    options: ['vloerverwarming', 'schuifpui'],
  },
  'steellook-serre': {
    model: 'steellook-serre',
    width: 5.5,
    depth: 4,
    roof: 'lichtstraat',
    frameColor: 'RAL 9005',
    glass: 'triple',
    woodType: 'accoya',
    options: ['zonwering'],
  },
  'houten-serre': {
    model: 'houten-serre',
    width: 4,
    depth: 3,
    roof: 'schuin',
    frameColor: 'RAL 7016',
    glass: 'hr-plus-plus',
    woodType: 'accoya',
    options: [],
  },
  'tuinkamer-veranda': {
    model: 'tuinkamer-veranda',
    width: 5,
    depth: 4,
    roof: 'plat',
    frameColor: 'RAL 9010',
    glass: 'hr-plus-plus',
    woodType: 'accoya',
    options: ['zonwering'],
  },
  'minimalistische-schuifpui': {
    model: 'minimalistische-schuifpui',
    width: 6,
    depth: 3,
    roof: 'plat',
    frameColor: 'RAL 9005',
    glass: 'triple',
    woodType: 'accoya',
    options: [],
  },
}

const modelIds: ModelId[] = [
  'serre-uitbouw',
  'steellook-serre',
  'houten-serre',
  'tuinkamer-veranda',
  'minimalistische-schuifpui',
]

export function isModelId(value: string): value is ModelId {
  return modelIds.includes(value as ModelId)
}

export function getDefaultConfigForModel(model: ModelId): SerreConfig {
  const preset = presets[model]
  return { ...preset, options: [...preset.options] }
}