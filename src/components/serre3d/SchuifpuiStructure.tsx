import { useMemo } from 'react'
import type { Texture } from 'three'
import type { InteriorVariant } from '../../lib/impressionSceneMatch'
import { getHousePlacement } from '../../lib/housePlacement'
import type { SerreConfig } from '../../types'
import { SchuifpuiRoom } from './SchuifpuiRoom'
import { SlidingDoorWall } from './SlidingDoorWall'
import type { FrameProps } from './types'

export function SchuifpuiStructure({
  config,
  width,
  height,
  frame,
  tint,
  woodMap,
  woodNormal,
  interiorVariant,
  warmInterior,
}: {
  config: SerreConfig
  width: number
  height: number
  frame: FrameProps
  tint: string
  woodMap: Texture
  woodNormal: Texture
  interiorVariant?: InteriorVariant
  warmInterior?: boolean
}) {
  const f = frame.frame
  const panels = useMemo(() => (config.width >= 5 ? 3 : 2), [config.width])
  const sillH = 0.12
  const openH = height - 0.06
  const wallH = openH
  const wallY = sillH + wallH / 2
  const frameDepth = f * 0.65
  const { facadeCenterZ } = getHousePlacement(0)

  return (
    <>
      <SchuifpuiRoom
        width={width}
        height={height}
        woodMap={woodMap}
        woodNormal={woodNormal}
        variant={interiorVariant}
        warm={warmInterior ?? true}
      />

      <group position={[0, 0, facadeCenterZ]}>
      <mesh position={[0, sillH * 0.5, frameDepth * 0.35]} castShadow receiveShadow>
        <boxGeometry args={[width + f * 1.2, 0.06, 0.14]} />
        <meshPhysicalMaterial color="#3a3836" metalness={0.75} roughness={0.28} clearcoat={0.5} />
      </mesh>
      <mesh position={[0, f * 0.06, frameDepth * 0.42]} receiveShadow>
        <boxGeometry args={[width + f * 0.6, 0.018, 0.06]} />
        <meshStandardMaterial color="#5a5856" roughness={0.4} metalness={0.35} />
      </mesh>

      <SlidingDoorWall
        width={width}
        height={wallH}
        depth={frameDepth}
        x={0}
        y={wallY}
        z={0}
        frame={frame}
        tint={tint}
        panelCount={panels}
        transomRows={0}
        quality="high"
        floorToCeiling
      />
      </group>
    </>
  )
}