/** Max ~11° — zichtbaar schuin maar proportioneel */
export const SLOPE_PITCH_MAX = 0.2

/** Voorgevel minstens 65% van achtergevelhoogte */
export const MIN_FRONT_WALL_RATIO = 0.65

export interface RoofSlope {
  pitch: number
  rise: number
  run: number
  roofLength: number
  backWallHeight: number
  frontWallHeight: number
}

/** Alle maten voor schuindak + gevels — één bron van waarheid */
export interface SchuinGeometry {
  pitch: number
  rise: number
  run: number
  roofLength: number
  floorY: number
  backZ: number
  frontZ: number
  backTopY: number
  frontTopY: number
  backWallHeight: number
  frontWallHeight: number
  backWallCenterY: number
  frontWallCenterY: number
  sideSpan: number
}

export function getSchuinGeometry(
  depth: number,
  height: number,
  frameSize: number,
  groupFloorLift = 0.12,
): SchuinGeometry {
  const f = frameSize
  const floorY = f + groupFloorLift
  const backWallHeight = height - f * 2
  const backTopY = floorY + backWallHeight
  /** Achtergevel tegen de woning; voorgevel naar de tuin */
  const backZ = -depth / 2 + f * 0.35
  const frontZ = depth / 2 - f * 0.35
  const run = frontZ - backZ
  const minFrontWallHeight = backWallHeight * MIN_FRONT_WALL_RATIO
  const maxRise = Math.max(0.12, backWallHeight - minFrontWallHeight)
  const pitchRise = Math.tan(SLOPE_PITCH_MAX) * run
  const rise = Math.min(pitchRise, maxRise)
  const pitch = Math.atan2(rise, run)
  const frontTopY = backTopY - rise
  const frontWallHeight = frontTopY - floorY

  return {
    pitch,
    rise,
    run,
    roofLength: run / Math.cos(pitch),
    floorY,
    backZ,
    frontZ,
    backTopY,
    frontTopY,
    backWallHeight,
    frontWallHeight,
    backWallCenterY: floorY + backWallHeight / 2,
    frontWallCenterY: floorY + frontWallHeight / 2,
    sideSpan: run,
  }
}

/** Lokaal Z=0 op achtergevel, Z=run op voorgevel (groep verankerd op backZ) */
export function schuinLocalZ(geo: SchuinGeometry, t: number): number {
  return geo.backZ + geo.run * Math.max(0, Math.min(1, t))
}

export function schuinWallTopY(geo: SchuinGeometry, localZ: number): number {
  const t = localZ / geo.run
  return geo.backTopY + (geo.frontTopY - geo.backTopY) * Math.max(0, Math.min(1, t))
}

/** @deprecated gebruik getSchuinGeometry */
export function getRoofSlope(depth: number, baseWallHeight: number): RoofSlope {
  const g = getSchuinGeometry(depth, baseWallHeight + 0.18, 0.09)
  return {
    pitch: g.pitch,
    rise: g.rise,
    run: g.run,
    roofLength: g.roofLength,
    backWallHeight: g.backWallHeight,
    frontWallHeight: g.frontWallHeight,
  }
}

export function wallHeightAtZ(
  z: number,
  backZ: number,
  frontZ: number,
  backH: number,
  frontH: number,
): number {
  const t = (z - backZ) / (frontZ - backZ)
  return backH + (frontH - backH) * Math.max(0, Math.min(1, t))
}

export function wallTopAtZ(
  z: number,
  geo: SchuinGeometry,
): number {
  const t = (z - geo.backZ) / geo.run
  return geo.backTopY + (geo.frontTopY - geo.backTopY) * Math.max(0, Math.min(1, t))
}

export function wallCenterY(floorOffset: number, wallHeight: number): number {
  return floorOffset + wallHeight / 2
}