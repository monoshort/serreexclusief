import type { Texture } from 'three'

export interface FrameProps {
  isWood: boolean
  isSteel: boolean
  hex: string
  frame: number
  metalness: number
  roughness: number
  clearcoat: number
  woodMap?: Texture
  woodNormal?: Texture
}