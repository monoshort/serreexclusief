export type ModelId =
  | 'serre-uitbouw'
  | 'steellook-serre'
  | 'houten-serre'
  | 'tuinkamer-veranda'
  | 'minimalistische-schuifpui'

export type RoofType = 'plat' | 'lichtstraat' | 'schuin'
export type GlassType = 'hr-plus-plus' | 'triple'
export type WoodType = 'iroko' | 'meranti' | 'accoya'

export interface SerreModel {
  id: ModelId
  name: string
  shortName: string
  description: string
  image: string
  heroImage?: string
  basePrice: number
  pricePerSqm: [number, number]
  material: 'aluminium' | 'hout' | 'hybrid'
  features: string[]
}

export interface RalColor {
  code: string
  name: string
  hex: string
}

export interface ConfigOption {
  id: string
  name: string
  description: string
  price: number
}

export interface SerreConfig {
  model: ModelId
  width: number
  depth: number
  roof: RoofType
  frameColor: string
  glass: GlassType
  woodType?: WoodType
  options: string[]
}

export interface Testimonial {
  id: string
  title: string
  quote: string
  authors: string
  location: string
  model: string
  image: string
  gallery: string[]
  story: string[]
  highlight?: string
}

export interface PriceBreakdown {
  base: number
  area: number
  areaCost: number
  optionsCost: number
  total: number
  totalInclBtw: number
  range: [number, number]
}