import * as THREE from 'three'
import type { Texture } from 'three'

function canvasTexture(
  draw: (ctx: CanvasRenderingContext2D, s: number) => void,
  size = 256,
  linear = false,
) {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')!
  draw(ctx, size)
  const tex = new THREE.CanvasTexture(canvas)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  tex.colorSpace = linear ? THREE.LinearSRGBColorSpace : THREE.SRGBColorSpace
  return tex
}

function generateNormalFromHeight(
  heightFn: (x: number, y: number, s: number) => number,
  size = 256,
  strength = 2.5,
): Texture {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')!
  const img = ctx.createImageData(size, size)
  const data = img.data

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const hL = heightFn(x - 1, y, size)
      const hR = heightFn(x + 1, y, size)
      const hD = heightFn(x, y - 1, size)
      const hU = heightFn(x, y + 1, size)
      const nx = (hL - hR) * strength
      const ny = (hD - hU) * strength
      const nz = 1
      const len = Math.sqrt(nx * nx + ny * ny + nz * nz)
      const i = (y * size + x) * 4
      data[i] = ((nx / len) * 0.5 + 0.5) * 255
      data[i + 1] = ((ny / len) * 0.5 + 0.5) * 255
      data[i + 2] = ((nz / len) * 0.5 + 0.5) * 255
      data[i + 3] = 255
    }
  }

  ctx.putImageData(img, 0, 0)
  const tex = new THREE.CanvasTexture(canvas)
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping
  tex.colorSpace = THREE.LinearSRGBColorSpace
  return tex
}

export function createFallbackTextures() {
  const brickMap = canvasTexture((ctx, s) => {
    ctx.fillStyle = '#9a5a48'
    ctx.fillRect(0, 0, s, s)
    const bw = s / 8
    const bh = s / 16
    for (let row = 0; row < 16; row++) {
      const off = (row % 2) * (bw / 2)
      for (let col = 0; col < 9; col++) {
        const shade = 0.85 + Math.random() * 0.15
        ctx.fillStyle = `rgb(${140 * shade}, ${70 * shade}, ${55 * shade})`
        ctx.fillRect(col * bw + off - bw / 2, row * bh, bw - 2, bh - 2)
      }
    }
  })
  brickMap.repeat.set(2, 1.5)

  const woodMap = canvasTexture((ctx, s) => {
    for (let x = 0; x < s; x++) {
      const n = Math.sin(x * 0.08) * 15 + Math.sin(x * 0.3) * 5
      ctx.fillStyle = `rgb(${160 + n}, ${120 + n * 0.6}, ${70 + n * 0.3})`
      ctx.fillRect(x, 0, 1, s)
    }
  })
  woodMap.repeat.set(3, 2)

  const grassMap = canvasTexture((ctx, s) => {
    ctx.fillStyle = '#3d6b3a'
    ctx.fillRect(0, 0, s, s)
    for (let i = 0; i < 800; i++) {
      ctx.fillStyle = `hsl(${100 + Math.random() * 30}, ${40 + Math.random() * 20}%, ${25 + Math.random() * 20}%)`
      ctx.fillRect(Math.random() * s, Math.random() * s, 2, 4)
    }
  })
  grassMap.repeat.set(6, 6)

  const pavingMap = canvasTexture((ctx, s) => {
    ctx.fillStyle = '#8a8580'
    ctx.fillRect(0, 0, s, s)
    const ts = s / 4
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        const v = 0.9 + Math.random() * 0.1
        ctx.fillStyle = `rgb(${130 * v}, ${125 * v}, ${118 * v})`
        ctx.fillRect(col * ts + 1, row * ts + 1, ts - 2, ts - 2)
      }
    }
  })
  pavingMap.repeat.set(2, 1.5)

  const concreteMap = canvasTexture((ctx, s) => {
    ctx.fillStyle = '#9a9894'
    ctx.fillRect(0, 0, s, s)
    for (let i = 0; i < 300; i++) {
      ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.08})`
      ctx.fillRect(Math.random() * s, Math.random() * s, 3, 3)
    }
  })
  concreteMap.repeat.set(1.5, 1.2)

  const roofMap = canvasTexture((ctx, s) => {
    ctx.fillStyle = '#5a4038'
    ctx.fillRect(0, 0, s, s)
    const tw = s / 6
    const th = s / 10
    for (let row = 0; row < 10; row++) {
      const off = (row % 2) * (tw / 2)
      for (let col = 0; col < 7; col++) {
        ctx.fillStyle = `rgb(${70 + Math.random() * 20}, ${50 + Math.random() * 15}, ${40 + Math.random() * 10})`
        ctx.fillRect(col * tw + off, row * th, tw - 1, th - 1)
      }
    }
  })
  roofMap.repeat.set(2.5, 2)

  const brickNormal = generateNormalFromHeight((x, y, size) => {
    const bw = size / 8
    const bh = size / 16
    const row = Math.floor(y / bh)
    const off = (row % 2) * (bw / 2)
    const lx = (x - off) % bw
    const ly = y % bh
    const edge = Math.min(lx, bw - lx, ly, bh - ly) < 2.5 ? 0.55 : 0.08
    return edge
  })
  brickNormal.repeat.set(2, 1.5)

  const brickRough = brickMap.clone()

  const woodNormal = generateNormalFromHeight((x, y) => Math.sin(x * 0.15) * 0.3 + Math.sin(y * 0.05) * 0.1)
  woodNormal.repeat.set(3, 2)

  const grassNormal = generateNormalFromHeight((x, y) => {
    const seed = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453
    return (seed - Math.floor(seed)) * 0.4
  })
  grassNormal.repeat.set(6, 6)

  const pavingNormal = generateNormalFromHeight((x, y, s) => {
    const ts = s / 4
    const edgeX = Math.min(x % ts, ts - (x % ts)) < 2 ? 0.6 : 0
    const edgeY = Math.min(y % ts, ts - (y % ts)) < 2 ? 0.6 : 0
    return edgeX + edgeY
  })
  pavingNormal.repeat.set(2, 1.5)

  const concreteNormal = generateNormalFromHeight((x, y) => {
    const seed = Math.sin(x * 7.1 + y * 13.7) * 43758.5453
    return (seed - Math.floor(seed)) * 0.25
  })
  concreteNormal.repeat.set(1.5, 1.2)

  const roofNormal = generateNormalFromHeight((x, y, size) => {
    const tw = size / 6
    const th = size / 10
    const row = Math.floor(y / th)
    const off = (row % 2) * (tw / 2)
    const col = Math.floor((x - off) / tw)
    const lx = (x - off) % tw
    const ly = y % th
    const edge = Math.min(lx, tw - lx, ly, th - ly) < 1.5 ? 0.5 : 0.1
    return edge + col * 0.02
  })
  roofNormal.repeat.set(2.5, 2)

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

export interface SceneTextures {
  brickMap: Texture
  brickNormal: Texture
  brickRough: Texture
  woodMap: Texture
  woodNormal: Texture
  grassMap: Texture
  grassNormal: Texture
  pavingMap: Texture
  pavingNormal: Texture
  concreteMap: Texture
  concreteNormal: Texture
  roofMap: Texture
  roofNormal: Texture
}