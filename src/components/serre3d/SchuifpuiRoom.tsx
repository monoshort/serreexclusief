import type { Texture } from 'three'
import type { InteriorVariant } from '../../lib/impressionSceneMatch'
import { getSchuifpuiRoomPlacement } from '../../lib/housePlacement'
import { InteriorLifestyle } from './InteriorLifestyle'

interface Props {
  width: number
  height: number
  woodMap: Texture
  woodNormal: Texture
  variant?: InteriorVariant
  warm?: boolean
}

const FLOOR_THICK = 0.04
const CEIL_THICK = 0.08
const WALL_THICK = 0.1
const SILL_H = 0.12

/** Woonkamer zichtbaar door de schuifpui — afgesloten shell zodat plafond niet zweeft */
export function SchuifpuiRoom({ width, height, woodMap, woodNormal, variant = 'living', warm = true }: Props) {
  const room = getSchuifpuiRoomPlacement(width, height)
  const openH = room.roomHeight
  const shellW = room.roomWidth
  const shellD = room.roomDepth
  const innerW = shellW - WALL_THICK * 2
  const innerD = shellD - WALL_THICK

  const wallMat = { color: '#f2ede6', roughness: 0.92 }
  const sideMat = { color: '#f5f0ea', roughness: 0.92 }

  return (
    <group position={[0, SILL_H, room.roomCenterZ]}>
      <mesh position={[0, FLOOR_THICK / 2, 0]} receiveShadow>
        <boxGeometry args={[shellW, FLOOR_THICK, shellD]} />
        <meshStandardMaterial color="#c8b8a0" roughness={0.55} metalness={0.05} />
      </mesh>

      <mesh position={[0, openH - CEIL_THICK / 2, 0]} receiveShadow>
        <boxGeometry args={[shellW, CEIL_THICK, shellD]} />
        <meshStandardMaterial color="#faf8f4" roughness={0.94} />
      </mesh>

      <mesh position={[0, openH / 2, -shellD / 2 + WALL_THICK / 2]} receiveShadow>
        <boxGeometry args={[shellW, openH, WALL_THICK]} />
        <meshStandardMaterial {...wallMat} />
      </mesh>

      <mesh position={[-shellW / 2 + WALL_THICK / 2, openH / 2, 0]} receiveShadow>
        <boxGeometry args={[WALL_THICK, openH, shellD]} />
        <meshStandardMaterial {...sideMat} />
      </mesh>

      <mesh position={[shellW / 2 - WALL_THICK / 2, openH / 2, 0]} receiveShadow>
        <boxGeometry args={[WALL_THICK, openH, shellD]} />
        <meshStandardMaterial {...sideMat} />
      </mesh>

      <InteriorLifestyle
        width={innerW}
        depth={innerD}
        height={openH}
        woodMap={woodMap}
        woodNormal={woodNormal}
        variant={variant}
        warm={warm}
        hideShell
      />

      <pointLight position={[0, openH * 0.75, 0.4]} intensity={warm ? 1.4 : 0.9} color="#ffe8c8" distance={6} decay={2} />
      <pointLight position={[width * 0.2, openH * 0.45, -0.6]} intensity={0.5} color="#fff0e0" distance={4} decay={2} />
    </group>
  )
}