import { useTexture } from '@react-three/drei'
import { createContext, createElement, useContext, useLayoutEffect, useMemo, type ReactNode } from 'react'
import * as THREE from 'three'
import { createFallbackTextures, type SceneTextures } from './proceduralTextures'

const BASE = 'https://dl.polyhaven.org/file/ph-assets/Textures/jpg/1k'

const REMOTE_URLS = [
  `${BASE}/brick_wall_02/brick_wall_02_diff_1k.jpg`,
  `${BASE}/brick_wall_02/brick_wall_02_nor_gl_1k.jpg`,
  `${BASE}/brick_wall_02/brick_wall_02_rough_1k.jpg`,
  `${BASE}/wood_floor_deck/wood_floor_deck_diff_1k.jpg`,
  `${BASE}/wood_floor_deck/wood_floor_deck_nor_gl_1k.jpg`,
  `${BASE}/forest_ground_04/forest_ground_04_diff_1k.jpg`,
  `${BASE}/forest_ground_04/forest_ground_04_nor_gl_1k.jpg`,
  `${BASE}/rock_tile_floor/rock_tile_floor_diff_1k.jpg`,
  `${BASE}/rock_tile_floor/rock_tile_floor_nor_gl_1k.jpg`,
  `${BASE}/concrete_floor_worn_001/concrete_floor_worn_001_diff_1k.jpg`,
  `${BASE}/concrete_floor_worn_001/concrete_floor_worn_001_nor_gl_1k.jpg`,
  `${BASE}/roof_tiles_14/roof_tiles_14_diff_1k.jpg`,
  `${BASE}/roof_tiles_14/roof_tiles_14_nor_gl_1k.jpg`,
]

const TexturesContext = createContext<SceneTextures | null>(null)

function configureRepeat(tex: THREE.Texture, repeat: [number, number], linear = false) {
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  tex.repeat.set(...repeat)
  tex.anisotropy = 8
  tex.colorSpace = linear ? THREE.LinearSRGBColorSpace : THREE.SRGBColorSpace
}

export function useSceneTextures(): SceneTextures {
  const ctx = useContext(TexturesContext)
  return ctx ?? createFallbackTextures()
}

export function useRemoteTextures(): SceneTextures {
  const [
    brickMap,
    brickNormal,
    brickRough,
    woodMap,
    woodNormal,
    grassMap,
    grassNormal,
    pavingMap,
    pavingNormal,
    concreteMap,
    concreteNormal,
    roofMap,
    roofNormal,
  ] = useTexture(REMOTE_URLS)

  useLayoutEffect(() => {
    configureRepeat(brickMap, [2.2, 1.6])
    configureRepeat(brickNormal, [2.2, 1.6], true)
    configureRepeat(brickRough, [2.2, 1.6], true)
    configureRepeat(woodMap, [3.5, 2.8])
    configureRepeat(woodNormal, [3.5, 2.8], true)
    configureRepeat(grassMap, [8, 8])
    configureRepeat(grassNormal, [8, 8], true)
    configureRepeat(pavingMap, [2.4, 1.2])
    configureRepeat(pavingNormal, [2.4, 1.2], true)
    configureRepeat(concreteMap, [1.8, 1.4])
    configureRepeat(concreteNormal, [1.8, 1.4], true)
    configureRepeat(roofMap, [3, 2])
    configureRepeat(roofNormal, [3, 2], true)
  }, [
    brickMap,
    brickNormal,
    brickRough,
    woodMap,
    woodNormal,
    grassMap,
    grassNormal,
    pavingMap,
    pavingNormal,
    concreteMap,
    concreteNormal,
    roofMap,
    roofNormal,
  ])

  return {
    brickMap,
    brickNormal,
    brickRough,
    woodMap,
    woodNormal,
    grassMap,
    grassNormal,
    pavingMap,
    pavingNormal,
    concreteMap,
    concreteNormal,
    roofMap,
    roofNormal,
  }
}

export function TexturesProvider({
  textures,
  children,
}: {
  textures: SceneTextures
  children: ReactNode
}) {
  return createElement(TexturesContext.Provider, { value: textures }, children)
}

export function useFallbackTextures(): SceneTextures {
  return useMemo(() => createFallbackTextures(), [])
}