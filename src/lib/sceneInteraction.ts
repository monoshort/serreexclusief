import type { SerreConfig } from '../types'
import { getCameraForScene, type CameraVariant } from './impressionSceneMatch'

export type ViewMode3D = 'exterior' | 'interior'

export interface CameraPreset {
  position: [number, number, number]
  target: [number, number, number]
  fov: number
}

export function getInteriorCamera(config: SerreConfig): CameraPreset {
  if (config.model === 'minimalistische-schuifpui') {
    return {
      position: [0, 1.68, -1.35],
      target: [0, 1.52, 1.2],
      fov: 50,
    }
  }

  return {
    position: [0, 1.62, -config.depth * 0.22],
    target: [0, 1.42, config.depth * 0.62],
    fov: 52,
  }
}

export function getExteriorCamera(cameraVariant: CameraVariant = 'exterior'): CameraPreset {
  return getCameraForScene(cameraVariant)
}

export function lerp3(
  a: [number, number, number],
  b: [number, number, number],
  t: number,
): [number, number, number] {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]
}